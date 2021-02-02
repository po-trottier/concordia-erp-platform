import React, { useEffect, useState } from 'react';
import { Table, Space, Input, Button } from 'antd';

import { PartInventoryEntry } from '../../interfaces/PartInventoryEntry';
import { ColumnsType } from 'antd/lib/table';
import { PartHistoryModal } from './PartHistoryModal';

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
		}

		setLineGraphData(timeLineData);
		setTableData(data);
	}, [searchValue]);

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
