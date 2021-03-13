import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { updateMaterialEntry } from '../../store/slices/MaterialListSlice';
import axios from '../../plugins/Axios';

export const OrderMaterialButtons = (props : any) => {
	const dispatch = useDispatch();
	const materials = useSelector((state : RootState) => state.materialList.list);

	const [resetLoading, setResetLoading] = useState(false);
	const [orderLoading, setOrderLoading] = useState(false);

	const createOrder = () => {
    let order : any[] = [];

    materials.forEach((material : any) => {
		const dateOrdered = new Date;
		const dateDue = new Date; 

		if(material.quantity)
			order.push({
				materialId: material._id,
				quantity: material.quantity,
				amountDue: material.price,
				dateOrdered,
				dateDue,
				isPaid: false,
			})
		});

    if (order.length > 0) {
			placeOrder(order);
    }
    else {
			message.error('You order is empty.');
      return;
		}
  }

  const placeOrder = (order : any[]) => {
		setOrderLoading(true);
		console.log(order);
		axios.post('/orders/materials', order)
			.then(({ data }) => {
				console.log(data);
				message.success('Order was successfully placed.');
			})
			.catch((err) => {
				message.error('Something went wrong while placing order.');
				console.log(err);
			})
			.finally(() => setOrderLoading(false));
  }

	const resetOrder = () => {
		setResetLoading(true);
		const success = true;

		materials.forEach((material : any) => {

			const newMaterial : MaterialEntry= {
				...material,
				quantity: 0
			}

			axios.patch('/materials/' + material._id, newMaterial)
			.then(({ data }) => {
				const newMaterial = data;
				newMaterial.id = data['_id'];
				dispatch(updateMaterialEntry({
					id: material._id,
					newMaterial
				}));
			})
			.catch((err) => {
				console.error(err);
			})
		});

		if(success)
			message.success('Order was successfully reset.');
		else
			message.error('Something went wrong while updating the order.');

		setResetLoading(false);
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
				<Button
				type='primary'
				style={{ marginTop: 16, marginRight: 15, float: 'right' }}
				loading={resetLoading}
				onClick={() => resetOrder()}>
						Reset Order
				</Button>
			</div>
    );
}