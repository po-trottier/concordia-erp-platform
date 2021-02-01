import React from 'react';
import { Modal, Card } from 'antd';
import { Line } from '@ant-design/charts';

export const PartHistoryModal = (props: any) => {
	return (
		<div>
			<Modal
				title={`${props.part.name} Inventory History`}
				visible={props.visible}
				onOk={props.onOk}
				onCancel={props.onCancel}
				destroyOnClose={true}
			>
				<Card style={{ margin: '24px 0' }}>
					<Line data={props.data} xField="date" yField="quantity" />
				</Card>
			</Modal>
		</div>
	);
};
