import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
// import { useDispatch } from 'react-redux';

//import { addUserEntry } from '../../store/slices/UserListSlice';
import axios from '../../plugins/Axios';
import { isArray } from 'util';


export const CreateNewCustomerModal = () => {
  // const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const addCustomer = () => {
    const newCustomer = {
      name,
      email,
    };

    setLoading(true);
    axios.post('/customers', newCustomer)
      .then(() => {
        //dispatch(addCustomerEntry(newCustomer));
        setIsModalVisible(false);
        form.resetFields();
        message.success('Customer was added successfully.');
      })
      .catch((err) => {
        let error = err.response.data.message;
        if (isArray(err.response.data.message)) {
          error = err.response.data.message.join('; ');
        }
        message.error(error, 10);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='primary' style={{ marginTop: 16 }} onClick={() => setIsModalVisible(true)}>
        Create New Customer
      </Button>
      <Modal
        title='Create New Customer'
        visible={isModalVisible}
        confirmLoading={loading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={addCustomer}
          name='basic'
          style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>Company:</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='companyName'
                rules={[{ required: true, message: 'Please input company name!' }]}>
                <Input placeholder="Enter the company name"
                       onChange={(e) => setName(e.currentTarget.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>Email:</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='itemsBought'
                rules={[{ required: true, message: 'Please input the amount of items bought!' }]}>
                <Input placeholder="Enter an email address" onChange={(e) => setEmail(e.currentTarget.value)} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
