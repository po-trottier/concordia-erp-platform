import React, { useState } from 'react';
import { Button, Modal} from 'antd';

export const AddEventModal = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        type='primary'
        style={{ marginTop: 16 }}
        onClick={() => setIsModalVisible(true)}>
        Add a new Event
      </Button>
      <Modal
        title='Add New Event'
        visible={isModalVisible}
        confirmLoading={loading}
        onCancel={handleCancel}>
      </Modal>
    </div>
  );
};
