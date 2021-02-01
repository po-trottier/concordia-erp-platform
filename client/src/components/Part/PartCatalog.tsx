import React, { useEffect, useState } from 'react';
import { Table, Space, Input, InputNumber, Button } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import { PartCatalogEntry } from '../../interfaces/PartCatalogEntry';

export const PartCatalog = () => {
	const { Search } = Input;

	const [parts, setParts] = useState<PartCatalogEntry[]>([
		{
			partId: '6013855b6c24ef1dc4d21125',
			partName: 'padded_saddle',
			vendorId: '6016e42a84bff16218374423',
			vendorName: "Bill's Bike Supply",
			price: 8.5,
		},
		{
			partId: '601385659f0d6061b89ac171',
			partName: 'street_frame',
			vendorId: '6016e42a84bff16218374423',
			vendorName: "Bill's Bike Supply",
			price: 46.5,
		},
		{
			partId: '601385659f0d6061b89ac171',
			partName: 'street_frame',
			vendorId: '60173d92d1d5cf7e082e6b1a',
			vendorName: 'Internal',
			price: 30.0,
		},
		{
			partId: '6013856ba9f14acff30344d8',
			partName: 'mountain_frame',
			vendorId: '6016e45c524d74c1d18fa31b',
			vendorName: 'Mountain Inc.',
			price: 80.0,
		},
		{
			partId: '601385704569c47eb79ffc28',
			partName: 'pedals',
			vendorId: '60173d92d1d5cf7e082e6b1a',
			vendorName: 'Internal',
			price: 11.0,
		},
		{
			partId: '601385704569c47eb79ffc28',
			partName: 'pedals',
			vendorId: '6016e42a84bff16218374423',
			vendorName: "Bill's Bike Supply",
			price: 16.0,
		},
		{
			partId: '601385747ef2ed6535fc0539',
			partName: 'shock_absorbers',
			vendorId: '6016e45c524d74c1d18fa31b',
			vendorName: 'Mountain Inc.',
			price: 6.5,
		},
		{
			partId: '60138578d3ca261a2f1c24d8',
			partName: 'handlebars',
			vendorId: '6016e42a84bff16218374423',
			vendorName: "Bill's Bike Supply",
			price: 8.5,
		},
	]);
	const [data, setData] = useState(parts);
	const [searchValue, setSearchValue] = useState('');

	const columns: ColumnsType<PartCatalogEntry> = [
		{
			title: 'Part ID',
			dataIndex: 'partId',
			key: 'PartId',
		},
		{
			title: 'Part Name',
			dataIndex: 'partName',
			key: 'partName',
			defaultSortOrder: 'ascend',
			sorter: {
				compare: (a: PartCatalogEntry, b: PartCatalogEntry) =>
					a.partName.localeCompare(b.partName),
			},
		},
		{
			title: 'Vendor ID',
			dataIndex: 'vendorId',
			key: 'vendorId',
		},
		{
			title: 'Vendor Name',
			dataIndex: 'vendorName',
			key: 'vendorName',
			sorter: {
				compare: (a: PartCatalogEntry, b: PartCatalogEntry) =>
					a.vendorName.localeCompare(b.vendorName),
			},
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			sorter: {
				compare: (a: PartCatalogEntry, b: PartCatalogEntry) =>
					a.price - b.price,
			},
		},
		{
			title: 'Order',
			key: 'order',
			// eslint-disable-next-line react/display-name
			render: (text: string, record: PartCatalogEntry) => (
				<Space size="middle">
					<InputNumber min={0} defaultValue={0} onChange={() => {}} />
				</Space>
			),
		},
	];

	useEffect(() => {
		let rows = parts;
		if (searchValue) {
			rows = rows.filter((part) =>
				part.partName.toLowerCase().includes(searchValue)
			);
		}

		setData(rows);
	}, [searchValue, parts]);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toLowerCase();
		setSearchValue(value);
	};

	return (
		<div>
			<h2>Parts Catalog</h2>
			<Search
				placeholder="input search text"
				onChange={onSearch}
				style={{ width: 200 }}
			/>
			<Table columns={columns} dataSource={data} />
			<Button type="primary" onClick={() => {}}>
				Place Order
			</Button>
		</div>
	);
};
