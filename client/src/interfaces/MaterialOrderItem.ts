export interface MaterialOrderItem {
	materialId : string,
	quantity : number,
	supplierName : string,
	amountDue : number,
	dateOrdered : Date,
	dateDue : Date,
	isPaid : boolean,
}