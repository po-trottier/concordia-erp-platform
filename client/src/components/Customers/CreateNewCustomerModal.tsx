import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
// import { useDispatch } from 'react-redux';

//import { addUserEntry } from '../../store/slices/UserListSlice';
import axios from '../../plugins/Axios';


export const CreateNewCustomerModal = () => {
  // const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [itemsSold, setItemsSold] = useState('');
  const [balance, setBalance] = useState('');
  const [paid, setPaid] = useState('');
  const [loading, setLoading] = useState(false);

  const addCustomer = () => {
    const newCustomer = {
      companyName,
      itemsSold,
      paid,
      balance
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
        if (err.response.data.message.isArray()) {
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
              <span>Company :</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='companyName'
                rules={[{ required: true, message: 'Please input company name!' }]}>
                <Input placeholder="Enter the company name"
                       onChange={(e) => setCompanyName(e.currentTarget.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>Items bought:</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='itemsBought'
                rules={[{ required: true, message: 'Please input the amount of items bought!' }]}>
                <Input placeholder="Enter the amount of items purchased" onChange={(e) => setItemsSold(e.currentTarget.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>Amount paid</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='amountPaid'
                rules={[{ required: true, message: 'Please input the amount that has been paid!' }]}>
                <Input placeholder="Enter the amount that has been paid" onChange={(e) => setBalance(e.currentTarget.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>Balance :</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='balance'
                rules={[{ required: true, message: 'Please input balance!' }]}>
                <Input placeholder="Enter the customers balance" onChange={(e) => setPaid(e.currentTarget.value)} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
