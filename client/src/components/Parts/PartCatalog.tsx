import React, {useEffect, useState} from 'react';
import {Input, Button, Card} from 'antd';

import {dummyPartData} from './PartDummyData';
import {ResponsiveTable} from '../ResponsiveTable';

const {Search} = Input;

export const PartCatalog = () => {
	const data: any[] = dummyPartData;
	data.forEach((row) => {
		row.build = <Input placeholder="Input a quantity" />
	});

	const [tableData, setTableData] = useState(data);
	const [searchValue, setSearchValue] = useState('');

	const cols = {
		name: 'Part Name',
		materials: 'Materials',
		quantity: 'Owned',
		build: 'Build',
	};

	useEffect(() => {
		let rows = data;
		if (searchValue) {
			rows = rows.filter(
				(part) =>
					part.name.toLowerCase().includes(searchValue) ||
					part.id.includes(searchValue)
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
			<Card>
				<Search
					placeholder="Search for part"
					onChange={onSearch}
					style={{ marginBottom: 18 }} />
				<ResponsiveTable cols={cols} rows={tableData} />
			</Card>
			<Button
				type="primary"
				style={{ marginTop: 16, float: 'right' }}>
				Build Parts
			</Button>
			<Button
				type="ghost"
				style={{ marginTop: 16 }}>
				Define a new Part
			</Button>
		</div>
	);
};
