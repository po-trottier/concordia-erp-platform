import React, { useEffect, useState } from 'react';
import { Table, Space, Input, Button } from 'antd';

import { PartInventoryEntry } from '../../interfaces/PartInventoryEntry';
import { ColumnsType } from 'antd/lib/table';
import { PartHistoryModal } from './PartHistoryModal';

export const PartInventory = () => {
	const { Search } = Input;

	const [parts, setParts] = useState<PartInventoryEntry[]>([
		{
			id: '6013855b6c24ef1dc4d21125',
			name: 'padded_saddle',
			description: 'Standard seat with some extra padding.',
			quantity: 1500,
			forecast: 1320,
		},
		{
			id: '601385659f0d6061b89ac171',
			name: 'street_frame',
			description: 'Street style aluminum bike frame.',
			quantity: 1100,
			forecast: 1260,
		},
		{
			id: '6013856ba9f14acff30344d8',
			name: 'mountain_frame',
			description: 'Mountain style aluminum frame.',
			quantity: 1600,
			forecast: 1580,
		},
		{
			id: '601385704569c47eb79ffc28',
			name: 'pedals',
			description: 'Standard pedals.',
			quantity: 850,
			forecast: 900,
		},
		{
			id: '601385747ef2ed6535fc0539',
			name: 'shock_absorbers',
			description: 'Absorbs shock.',
			quantity: 1160,
			forecast: 1000,
		},
		{
			id: '60138578d3ca261a2f1c24d8',
			name: 'handlebars',
			description: 'Handlebar grips.',
			quantity: 800,
			forecast: 799,
		},
	]);
	const [searchValue, setSearchValue] = useState('');
	const [partDetail, setPartDetail] = useState<PartInventoryEntry>();
	const [rows, setRows] = useState(parts);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const dummyTimelineData: any[] = [
		{
			id: '6013855b6c24ef1dc4d21125',
			date: new Date('2021-01-30').toLocaleDateString(),
			quantity: 1300,
		},
		{
			id: '6013855b6c24ef1dc4d21125',
			date: new Date('2021-02-30').toLocaleDateString(),
			quantity: 1200,
		},
		{
			id: '6013855b6c24ef1dc4d21125',
			date: new Date('2021-03-30').toLocaleDateString(),
			quantity: 950,
		},
		{
			id: '6013855b6c24ef1dc4d21125',
			date: new Date('2021-04-30').toLocaleDateString(),
			quantity: 800,
		},
		{
			id: '6013855b6c24ef1dc4d21125',
			date: new Date('2021-05-30').toLocaleDateString(),
			quantity: 1425,
		},
	];

	const columns: ColumnsType<PartInventoryEntry> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			defaultSortOrder: 'ascend',
			sorter: {
				compare: (a: PartInventoryEntry, b: PartInventoryEntry) =>
					a.name.localeCompare(b.name),
			},
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			sorter: {
				compare: (a: PartInventoryEntry, b: PartInventoryEntry) =>
					a.quantity - b.quantity,
			},
		},
		{
			title: 'Forecast',
			dataIndex: 'forecast',
			key: 'forecast',
		},
		{
			title: 'History',
			key: 'action',
			// eslint-disable-next-line react/display-name
			render: (text: string, record: PartInventoryEntry) => (
				<Space size="middle">
					<Button
						type="primary"
						onClick={() => {
							console.log(text);
							showModal(record);
						}}
					>
						Show History
					</Button>
				</Space>
			),
		},
	];

	useEffect(() => {
		let data = parts;
		if (searchValue) {
			data = data.filter(
				(part) =>
					part.name.toLowerCase().includes(searchValue) ||
					part.description.toLowerCase().includes(searchValue)
			);
		}
		setRows(data);
	}, [searchValue, parts]);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toLowerCase();
		setSearchValue(value);
	};

	const showModal = (record: PartInventoryEntry) => {
		setPartDetail(record);
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div>
			<h2>Parts Inventory</h2>
			<Search
				placeholder="input search text"
				onChange={onSearch}
				style={{ width: 200 }}
			/>
			<Table columns={columns} dataSource={rows} />
			<Button type="primary" onClick={() => {}}>
				Add Part Record
			</Button>
			{partDetail && (
				<PartHistoryModal
					part={partDetail}
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
					data={dummyTimelineData}
				/>
			)}
		</div>
	);
};
