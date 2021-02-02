import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import { Line } from '@ant-design/charts';
import { dummyPartHistoryData, dummyPartInventoryData } from './PartDummyData';

export const PartInventory = () => {
	const { Search } = Input;

	const [lineGraphData, setLineGraphData] = useState(dummyPartHistoryData);
	const [searchValue, setSearchValue] = useState('');
	const [tableData, setTableData] = useState(dummyPartInventoryData);

	useEffect(() => {
		let data = dummyPartInventoryData;
		let timeLineData: any[] = dummyPartHistoryData;
		if (searchValue) {
			data = data.filter(
				(part) =>
					part.name.toLowerCase().includes(searchValue) ||
					part.description.toLowerCase().includes(searchValue) ||
					part.id.includes(searchValue)
			);

			timeLineData = [];
			data.forEach(({ id: partId }) => {
				timeLineData.push(
					...dummyPartHistoryData.filter(({ id }) => id === partId)
				);
			});
		}

		setLineGraphData(timeLineData);
		setTableData(data);
	}, [searchValue]);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toLowerCase();
		setSearchValue(value);
	};

	const cols = {
		id: 'ID',
		name: 'Part',
		description: 'Description',
		quantity: 'Quantity',
		forecast: 'Forecast',
	};

	return (
		<div>
			<h2>Parts Inventory</h2>
			<Search
				placeholder="Search for part"
				onChange={onSearch}
				style={{ width: 200, marginBottom: 18 }}
			/>
			<Line
				data={lineGraphData}
				xField="date"
				yField="quantity"
				seriesField="name"
				style={{ marginBottom: '48px' }}
			/>
			<ResponsiveTable cols={cols} rows={tableData} />
			<Button type="primary" onClick={() => {}} style={{ margin: 18 }}>
				Add Part Record
			</Button>
		</div>
	);
};
