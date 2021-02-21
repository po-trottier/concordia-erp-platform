import React, { useEffect, useState } from 'react';
import {Button, Modal, Input} from 'antd';

export const CreatePartModal = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Part Name"/>
        <br/>
        <Button>+</Button>
      </Modal>
    </div>
  );

};