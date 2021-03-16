import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/Store';
import { updateMaterialQuantities } from '../../store/slices/MaterialQuantitiesSlice';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { MaterialOrderItem } from '../../interfaces/MaterialOrderItem';
import { MaterialQuantity } from '../../interfaces/MaterialQuantity';
import axios from '../../plugins/Axios';

export const OrderMaterialButtons = (props : any) => {
	const dispatch = useDispatch();
	const materials = useSelector((state : RootState) => state.materialList.list);
	const quantities = useSelector((state : RootState) => state.materialQuantities.quantities);
	const locationId = useSelector((state : RootState) => state.location.selected);

	const [orderLoading, setOrderLoading] = useState(false);

	const createOrder = () => {
    let order : MaterialOrderItem[] = [];
    quantities.forEach((materialQuantity : MaterialQuantity) => {
			if(materialQuantity.quantity){
				const material = materials.find((m : MaterialEntry) => materialQuantity.materialId === m._id);
				const dateOrdered = new Date();
				order.push({
					materialId: material._id,
					quantity: materialQuantity.quantity,
					supplierName: material.vendorName,
					dateOrdered,
				})
			}
			dispatch(updateMaterialQuantities({
				...materialQuantity,
				quantity: 0,
			}));
		});
    if (order.length > 0)
			placeOrder(order);
		else
			message.error('You order is empty.');
  }

  const placeOrder = (order : MaterialOrderItem[]) => {
		setOrderLoading(true);
		axios.post('/orders/materials', order)
			.then(() => {
				updateStock(order);
				message.success('Order was successfully placed.');
			})
			.catch((err) => {
				message.error('Something went wrong while placing order.');
				console.error(err);
			})
			.finally(() => setOrderLoading(false));
  }

	const updateStock = (order : MaterialOrderItem[]) => {
		const materialStocks : any[] = [];

		order.forEach(orderItem => {
			materialStocks.push({
				stockUsed: 0,
				stockBought: orderItem.quantity,
				materialId: orderItem.materialId
			});
		});

		axios.patch('/materials/stock/' + locationId, materialStocks)
			.then(() => props.setMaterialListState())
			.catch((err) => {
				console.error(err);
				message.error('Error updating the material stock.');
			});
	}

    return(
			<div>
        <Button
        type='primary'
        style={{ marginTop: 16, float: 'right' }}
				loading={orderLoading}
        onClick={() => createOrder()}>
            Place Order
        </Button>
			</div>
    );
}
