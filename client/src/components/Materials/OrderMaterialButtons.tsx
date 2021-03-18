import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/Store';
import { updateMaterialQuantities } from '../../store/slices/MaterialQuantitiesSlice';
import { setMaterialList } from '../../store/slices/MaterialListSlice';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { MaterialOrderItem } from '../../interfaces/MaterialOrderItem';
import { MaterialQuantity } from '../../interfaces/MaterialQuantity';
import axios from '../../plugins/Axios';

export const OrderMaterialButtons = () => {
	const location = useSelector((state: RootState) => state.location.selected);

	const dispatch = useDispatch();
	const materials = useSelector((state: RootState) => state.materialList.list);
	const quantities = useSelector(
		(state: RootState) => state.materialQuantities.quantities
	);

	const [orderLoading, setOrderLoading] = useState(false);

	const createOrder = () => {
		let order: MaterialOrderItem[] = [];
		quantities.forEach((materialQuantity: MaterialQuantity) => {
			if (materialQuantity.quantity) {
				const material = materials.find(
					(m: MaterialEntry) => materialQuantity.materialId === m._id
				);
				const dateOrdered = new Date();
				order.push({
					materialId: material._id,
					quantity: materialQuantity.quantity,
					locationId: location,
					dateOrdered,
				});
			}
		});
		if (order.length > 0) {
			placeOrder(order);
		} else {
			message.error('You order is empty.');
		}
	};

	const placeOrder = (order: MaterialOrderItem[]) => {
		setOrderLoading(true);
		axios
			.post('/orders/materials', order)
			.then(() => {
				const materialList = JSON.parse(JSON.stringify(materials));
				quantities.forEach((materialQuantity: MaterialQuantity) => {
					if (materialQuantity.quantity) {
						const index = materialList.findIndex(
							(m: MaterialEntry) => materialQuantity.materialId === m._id
						);
						materialList[index].stock += materialQuantity.quantity;
						dispatch(
							updateMaterialQuantities({
								...materialQuantity,
								quantity: 0,
							})
						);
					}
				});
				dispatch(setMaterialList(materialList));
				message.success('Order was successfully placed.');
			})
			.catch((err) => {
				message.error('Something went wrong while placing order.');
				console.error(err);
			})
			.finally(() => setOrderLoading(false));
	};

	return (
		<div>
			<Button
				type="primary"
				style={{ marginTop: 16, float: 'right' }}
				loading={orderLoading}
				onClick={() => createOrder()}
			>
				Place Order
			</Button>
		</div>
	);
};
