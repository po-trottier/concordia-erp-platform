import React from 'react';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { updateMaterialEntry } from '../../store/slices/MaterialListSlice';
import axios from '../../plugins/Axios';

export const OrderMaterialButtons = (props : any) => {
	const dispatch = useDispatch();
	const materials = useSelector((state : RootState) => state.materialList.list);

	const createOrder = () => {
    let order : any[] = [];

    materials.forEach((material : MaterialEntry) => {

		// TODO Make date due the next friday.
		const dateOrdered = new Date;
		const dateDue = new Date; 

		if(material.quantity)
			order.push({
				supplierName: material.vendorName,
				materialId: material.id,
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
		// TODO Connect create order to backend
		console.log(order);
  }

	const resetOrder = () => {
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
				message.error('Something went wrong while updating the order.');
				console.error(err);
				return;
			})
		});
	}

    return(
			<div>
        <Button
        type='primary'
        style={{ marginTop: 16, float: 'right' }}
        onClick={() => createOrder()}>
            Place Order
        </Button>
				<Button
				type='primary'
				style={{ marginTop: 16, marginRight: 15, float: 'right' }}
				onClick={() => resetOrder()}>
						Reset Order
				</Button>
			</div>
    );
}