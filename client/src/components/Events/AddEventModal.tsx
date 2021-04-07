import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Form, Row, Col, Input, InputNumber, Radio, RadioChangeEvent, message } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

//import { addEventEntry } from '../../store/slices/EventListSlice';
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
  const [recipientType, setRecipientType] = useState('');

  const emptyEventsData: EventDropdownEntry[] = [];
  const [eventsData, setEventsData] = useState(emptyEventsData);
  const [eventsUpdated, setEventsUpdated] = useState(false);

  const emptyChosenCustomers: String[] = [];
  const [chosenCustomers, setChosenCustomers] = useState(emptyChosenCustomers);

  const emptyChosenUsers: String[] = [];
  const [chosenUsers, setChosenUsers] = useState(emptyChosenUsers);

  const emptyChosenRoles: Role[] = [];
  const [chosenRoles, setChosenRoles] = useState(emptyChosenRoles);

  const emptyCustomersData: CustomerDropdownEntry[] = [];
  const [customersData, setCustomersData] = useState(emptyCustomersData);
  const [customersUpdated, setCustomersUpdated] = useState(false);

  const emptyUsersData: UserDropdownEntry[] = [];
  const [usersData, setUsersData] = useState(emptyUsersData);
  const [usersUpdated, setUsersUpdated] = useState(false);

  const emptyRolesData: Role[] = [];
  const [rolesData, setRolesData] = useState(emptyRolesData);


  const [loading, setLoading] = useState(false);

  //get the events
  useEffect(() => {
    setEventsUpdated(true);
    axios.get('/events/all')
      .then((res) => {
        if (res && res.data) {
          const data: EventDropdownEntry[] = [];
          res.data.forEach((p: any) => {
            data.push({
              id: p['_id'],
              name: p.name
            });
          });
          setEventsData(data);
        }
      })
      .catch(err => {
        // message.error('Something went wrong while fetching the list of events.');
        console.error(err);
      });
  }, [eventsUpdated]);

  //get the customers
  useEffect(() => {
    setCustomersUpdated(true);
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
        // message.error('Something went wrong while fetching the list of customers.');
        console.error(err);
      });
  }, [customersUpdated]);

  //get the users
  useEffect(() => {
    setUsersUpdated(true);
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
        // message.error('Something went wrong while fetching the list of users.');
        console.error(err);
      });
  }, [usersUpdated]);

  const addEvent = () => {
    const newEvent = {
      chosenCustomers,
      chosenUsers,
      chosenRoles
    }

    console.log(newEvent);

    setLoading(true);
    // axios
    //   .post('/events', newEvent)
    //   .then(() => {
    //     setIsModalVisible(false);
    //     form.resetFields();
    //     message.success('User was added successfully.');
    //   })
    //   .catch((err) => {
    //     message.error('Something went wrong while creating the user.');
    //     console.error(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleRecipientChange = (e : RadioChangeEvent) => {
    form.resetFields(['customers','users','roles']);
    // setChosenCustomers(emptyChosenCustomers);
    // setChosenUsers(emptyChosenUsers);
    // setChosenRoles(emptyChosenRoles);
    setRecipientType(e.target.value);
  };

  const renderRecipientField = () => {
    switch (recipientType)
    {
      case 'users':
        return (
        <Row align='middle' style={{ marginBottom: 16 }}>
        <Col sm={6} span={9}>
          <span>Users:</span>
        </Col>
        <Col sm={18} span={15}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='users'
            rules={[{ required: true, message: 'Please select users.' }]}>
            <Select
              mode='multiple'
              showSearch
              style={{ width: '100%', display: 'inline-table' }}
              placeholder='Select 1 or more users'
              optionFilterProp='children'
              onChange={ (e: any) =>updateChosenUsers(e) }>
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
                name='roles'
                rules={[{ required: true, message: 'Please select roles.' }]}>
                <Select
                  mode='multiple'
                  showSearch
                  style={{ width: '100%', display: 'inline-table' }}
                  placeholder='Select 1 or more roles'
                  optionFilterProp='children'
                  onChange={ (e: any) =>updateChosenRoles(e) }>
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
              name='customers'
              rules={[{ required: true, message: 'Please select customers.' }]}>
              <Select
                mode='multiple'
                showSearch
                style={{ width: '100%', display: 'inline-table' }}
                placeholder='Select 1 or more customers'
                optionFilterProp='children'
                onChange={ (e: any) =>updateChosenCustomers(e) }>
                {customersData.map((customer) => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.name}
                  </Option>))}
              </Select>
            </Form.Item>
          </Col>
        </Row>);
        break;
    }
  }

  const updateChosenCustomers = (e: any) => {
    setChosenCustomers(e);
  }

  const updateChosenUsers = (e: any) => {
    setChosenUsers(e);
  }

  const updateChosenRoles = (e: any) => {
    setChosenRoles(e);
  }
  const hideActionsError = () => {
    const actionsError = document.getElementById('display-actions-error');
    if (actionsError) {
      actionsError.style.display = 'none';
    }
  };

  const displayActionsError = () => {
    const actionsError = document.getElementById('display-actions-error');
    if (actionsError) {
      actionsError.style.display = 'block';
    }
  };

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
                name='action'
                rules={[{ required: true, message: 'Please select an action.' }]}>
                <Select
                  showSearch
                  style={{ width: '100%', display: 'inline-table' }}
                  placeholder='Select an action'
                  optionFilterProp='children'
                  onChange={hideActionsError}>
                  {eventsData.map((event) => (
                    <Option key={event.id} value={event.name}>
                      {event.name}
                    </Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/*Custom error message*/}
          <span id='display-actions-error' style={{ color: 'red', display: 'none' }}>
            You must select an action.
          </span>
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
                <Radio.Group name="recipient" defaultValue={'customers'} onChange={handleRecipientChange}>
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
