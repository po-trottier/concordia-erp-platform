import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { updateMaterialEntry } from '../../store/slices/MaterialListSlice';
import axios from '../../plugins/Axios';

export const OrderMaterialButtons = () => {
	const dispatch = useDispatch();
	const materials = useSelector((state : RootState) => state.materialList.list);
	const locationId = useSelector((state : RootState) => state.location.selected);

	const [orderLoading, setOrderLoading] = useState(false);

	const getIncrement = (day : number) => {
		let increment = 0;
		switch(day){
			case 0:
				increment = 5;
				break;
			case 1:
				increment = 4;
				break;
			case 2:
				increment = 3;
				break;
			case 3:
				increment = 2;
				break;
			case 4:
				increment = 8;
				break;
			case 5:
				increment = 7;
				break;
			case 6:
				increment = 6;
				break;
		}

		return increment;
	}

	const createOrder = () => {
    let order : any[] = [];

    materials.forEach((material : any) => {
			if(material.quantity){
				const dateOrdered = new Date();
				const dateDue = new Date();
				dateDue.setDate(dateDue.getDate() + getIncrement(dateDue.getDay()));
				const amountDue = material.quantity * material.price;

				order.push({
					materialId: material._id,
					quantity: material.quantity,
					supplierName: material.vendorName,
					amountDue,
					dateOrdered,
					dateDue,
					isPaid: false,
				})
			}
		});
    if (order.length > 0)
			placeOrder(order);
    else 
			message.error('You order is empty.');
  }

  const placeOrder = (order : any[]) => {
		setOrderLoading(true);
		axios.post('/orders/materials', { "orders": order })
			.then(() => {
				updateStock(order);
				message.success('Order was successfully placed.');
			})
			.catch((err) => {
				message.error('Something went wrong while placing order.');
				console.log(err);
			})
			.finally(() => setOrderLoading(false));
  }

	const resetOrder = () => {
		materials.forEach((material : any) => {
			if (material.quantity){
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
				});
			}
		});
	}

	const updateStock = (order : any[]) => {

		const materialStocks : any[] = [];

		order.forEach(orderItem => {
			materialStocks.push({
				stockUsed: 0,
				stockBought: orderItem.quantity,
				materialId: orderItem.materialId
			});
		});

		axios.patch('/materials/stock/' + locationId, materialStocks)
			.then(() => resetOrder())
			.catch((err) => {
				console.log(err);
			})
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