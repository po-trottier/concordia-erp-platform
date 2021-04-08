import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Form, Row, Col, Input, InputNumber, Radio, RadioChangeEvent, message } from 'antd';
import { useDispatch } from 'react-redux';

import { addListenerEntry } from '../../store/slices/ListenerListSlice';
import { EventDropdownEntry } from '../../interfaces/EventDropdownEntry';
import { CustomerDropdownEntry } from '../../interfaces/CustomerDropdownEntry';
import { UserDropdownEntry } from '../../interfaces/UserDropdownEntry';
import { getRoleString, Role } from '../../router/Roles';
import axios from '../../plugins/Axios';

const { Option } = Select;

export const AddEventModal = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipientType, setRecipientType] = useState('customers');
  const [allInfoUpdated, setAllInfoUpdated] = useState(false);

  const emptyEventsData: EventDropdownEntry[] = [];
  const [eventsData, setEventsData] = useState(emptyEventsData);

  const emptyCustomersData: CustomerDropdownEntry[] = [];
  const [customersData, setCustomersData] = useState(emptyCustomersData);

  const emptyUsersData: UserDropdownEntry[] = [];
  const [usersData, setUsersData] = useState(emptyUsersData);


  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setAllInfoUpdated(true);

    //get the events
    axios.get('/events/all')
      .then((res) => {
        if (res && res.data) {
          const data: EventDropdownEntry[] = [];
          res.data.forEach((p: any) => {
            data.push({
              id: p.id,
              name: p.name
            });
          });
          setEventsData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of events.');
        console.error(err);
      });

      //get the customers
      axios.get('/customers')
      .then((res) => {
        if (res && res.data) {
          const data: CustomerDropdownEntry[] = [];
          res.data.forEach((p: any) => {
            data.push({
              id: p['_id'],
              name: p.name
            });
          });
          setCustomersData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of customers.');
        console.error(err);
      });

      //get the users
      axios.get('/users')
      .then((res) => {
        if (res && res.data) {
          const data: UserDropdownEntry[] = [];
          res.data.forEach((p: any) => {
            data.push({
              id: p['_id'],
              username: p.username
            });
          });
          setUsersData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of users.');
        console.error(err);
      });
  }, [allInfoUpdated]);

  const addEvent = (values: any) => {

    const body = values;
    delete body.recipient;

    setLoading(true);
    axios
      .post('/events', body)
      .then(({data}) => {
        dispatch(addListenerEntry(data));
        handleCancel();
        message.success('Event was added successfully.');
      })
      .catch((err) => {
        message.error('Something went wrong while creating the Event.');
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

  const handleRecipientChange = (e: RadioChangeEvent) => {
    form.resetFields(['customers', 'users', 'roles']);
    setRecipientType(e.target.value);
  };

  const renderRecipientField = () => {
    switch (recipientType) {
      case 'users':
        return (
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Users:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='userId'
                rules={[{ required: true, message: 'Please select users.' }]}>
                <Select
                  mode='multiple'
                  showSearch
                  style={{ width: '100%', display: 'inline-table' }}
                  placeholder='Select 1 or more users'
                  optionFilterProp='children'>
                  {usersData.map((user) => (
                    <Option key={user.id} value={user.id}>
                      {user.username}
                    </Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        );

      case 'roles':
        return (
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Roles:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='role'
                rules={[{ required: true, message: 'Please select roles.' }]}>
                <Select
                  mode='multiple'
                  showSearch
                  style={{ width: '100%', display: 'inline-table' }}
                  placeholder='Select 1 or more roles'
                  optionFilterProp='children'>
                  {
                    Object.keys(Role).map((rkey, rval) => {
                      if (isFinite(Number(rkey))) {
                        dropdownOffset++;
                        return null;
                      }
                      const role: Role = rval - dropdownOffset;
                      return (
                        <Option key={rkey} value={role}>{getRoleString(role)}</Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        );

      case 'customers':
      default:
        return (
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Customers:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='customerId'
                rules={[{ required: true, message: 'Please select customers.' }]}>
                <Select
                  mode='multiple'
                  showSearch
                  style={{ width: '100%', display: 'inline-table' }}
                  placeholder='Select 1 or more customers'
                  optionFilterProp='children'>
                  {customersData.map((customer) => (
                    <Option key={customer.id} value={customer.id}>
                      {customer.name}
                    </Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>);
    }
  }

  let dropdownOffset = 0;

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
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={addEvent}
          name='basic'
          style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}>
          {/*Action/Event Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Action:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='eventId'
                rules={[{ required: true, message: 'Please select an action.' }]}>
                <Select
                  showSearch
                  style={{ width: '100%', display: 'inline-table' }}
                  placeholder='Select an action'
                  optionFilterProp='children'>
                  {eventsData.map((event) => (
                    <Option key={event.name} value={event.id}>
                      {event.name}
                    </Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/*Group Selector Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Group:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='recipient'
                rules={[{ required: true, message: 'Please select a group for this event.' }]}>
                <Radio.Group name="recipient" onChange={handleRecipientChange}>
                  <Radio value={'customers'}>Customers</Radio>
                  <Radio value={'users'}>Users</Radio>
                  <Radio value={'roles'}>Roles</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {renderRecipientField()}
        </Form>
      </Modal>
    </div>
  );
};
