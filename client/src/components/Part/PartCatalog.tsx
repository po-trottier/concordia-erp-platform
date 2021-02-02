import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';

import { dummyPartCatalogData } from './PartDummyData';
import { ResponsiveTable } from '../ResponsiveTable';

export const PartCatalog = () => {
	const { Search } = Input;

	const [tableData, setTableData] = useState(dummyPartCatalogData);
	const [searchValue, setSearchValue] = useState('');

	const cols = {
		partId: 'Part ID',
		partName: 'Part Name',
		vendorId: 'Vendor ID',
		vendorName: 'Vendor Name',
		price: 'Price',
	};

	useEffect(() => {
		let rows = dummyPartCatalogData;
		if (searchValue) {
			rows = rows.filter(
				(part) =>
					part.partName.toLowerCase().includes(searchValue) ||
					part.partId.includes(searchValue)
			);
		}

		setTableData(rows);
	}, [searchValue]);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toLowerCase();
		setSearchValue(value);
	};

	return (
		<div>
			<h2>Parts Catalog</h2>
			<Search
				placeholder="Search for part"
				onChange={onSearch}
				style={{ width: 200, marginBottom: 18 }}
			/>
			<ResponsiveTable cols={cols} rows={tableData} />
			<Button type="primary" onClick={() => {}} style={{ margin: 18 }}>
				Place Order
			</Button>
		</div>
	);
};
