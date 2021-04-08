import React, { useEffect, useState } from 'react';
import { Button, Col, Form, message, Modal, Radio, RadioChangeEvent, Row, Select } from 'antd';
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

  const [visible, setVisible] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const emptyEventsData : EventDropdownEntry[] = [];
  const emptyCustomersData : CustomerDropdownEntry[] = [];
  const emptyUsersData : UserDropdownEntry[] = [];
  const [recipientType, setRecipientType] = useState('customers');
  const [eventsData, setEventsData] = useState(emptyEventsData);
  const [customersData, setCustomersData] = useState(emptyCustomersData);
  const [usersData, setUsersData] = useState(emptyUsersData);

  useEffect(() => {
    setUpdated(true);
    //get the events
    axios.get('/events/all')
      .then((res) => {
        if (res && res.data) {
          const data : EventDropdownEntry[] = [];
          res.data.forEach((p : any) => {
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
          const data : CustomerDropdownEntry[] = [];
          res.data.forEach((p : any) => {
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
          const data : UserDropdownEntry[] = [];
          res.data.forEach((p : any) => {
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
  }, [updated]);

  const addEvent = (values : any) => {
    const body = values;
    delete body.recipient;

    setLoading(true);
    axios
      .post('/events', body)
      .then(({ data }) => {
        message.success('The event was added successfully.');
        dispatch(addListenerEntry(data));
        handleCancel();
      })
      .catch((err) => {
        message.error('Something went wrong while creating the event.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleRecipientChange = (e : RadioChangeEvent) => {
    form.resetFields(['customers', 'users', 'roles']);
    setRecipientType(e.target.value);
  };

  const renderRecipientField = () => {
    let dropdownOffset = 0;
    let text = '';
    let field = '';
    let data;

    switch (recipientType) {
      case 'users':
        text = 'Users:';
        field = 'userId';
        data = usersData.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.username}
          </Option>
        ));
        break;

      case 'customers':
        text = 'Customers:'
        field = 'customerId'
        data = customersData.map((customer) => (
          <Option key={customer.id} value={customer.id}>
            {customer.name}
          </Option>
        ));
        break;

      case 'roles':
        text = 'Roles:'
        field = 'role'
        data = Object.keys(Role).map((key, val) => {
          if (isFinite(Number(key))) {
            dropdownOffset++;
            return null;
          }
          const role: Role = val - dropdownOffset;
          return (
            <Option key={key} value={role}>{getRoleString(role)}</Option>
          );
        });
        break;
    }

    return (
      <Row align='middle' style={{ marginBottom: 16 }}>
        <Col sm={6} span={9}>
          <span>{text}</span>
        </Col>
        <Col sm={18} span={15}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={field}
            rules={[{ required: true, message: 'Please select ' + recipientType + '.' }]}>
            <Select
              mode='multiple'
              showSearch
              style={{ width: '100%', display: 'inline-table' }}
              placeholder={'Select 1 or more ' + recipientType}
              optionFilterProp='children'>
              { data }
            </Select>
          </Form.Item>
        </Col>
      </Row>
    )
  };

  return (
    <div>
      <Button
        type='primary'
        style={{ marginTop: 16 }}
        onClick={() => setVisible(true)}>
        Add a new Event
      </Button>
      <Modal
        title='Add New Event'
        visible={visible}
        confirmLoading={loading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={addEvent}
          style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
          initialValues={{
            'recipient': recipientType
          }}>
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
                <Radio.Group name='recipient' onChange={handleRecipientChange}>
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
