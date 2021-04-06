import React, { useState } from 'react';
import { Button, Modal, Select, Form, Row, Col, Input, InputNumber, Radio } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

//import { addEventEntry } from '../../store/slices/EventListSlice';
import { EventDropdownEntry } from '../../interfaces/EventDropdownEntry';
import { getRoleString, Role } from '../../router/Roles';
import axios from '../../plugins/Axios';

const { Option } = Select;

export const AddEventModal = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerIdList, setCustomerIdList] = useState(['']);
  const [customerId, setCustomerId] = useState('');
  const [userIdList, setUserIdList] = useState(['']);
  const [userId, setUserId] = useState('');
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(0);

  const emptyData: EventDropdownEntry[] = [];
  const [eventsData, setEventsData] = useState(emptyData);

  const [loading, setLoading] = useState(false);

  const addEvent = () => {
    const newEvent = {
      customerIdList,
      userIdList,
      roles
    }

    setLoading(true);
    // axios
    //   .post('/events', newEvent)
    //   .then(() => {
    //     // what to do with Dispatch?
    //     // dispatch(addEventEntry(newEvent));
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

  const hideActionsError = () => {
    const actionsError = document.getElementById('display-parts-error');
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
                    <Option key={event.id} value={event.id}>
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
                name='group'
                rules={[{ required: true, message: 'Please select a group for this event.' }]}>
                <Radio.Group name="group" defaultValue={1}>
                  <Radio value={'customers'}>Customers</Radio>
                  <Radio value={'users'}>Users</Radio>
                  <Radio value={'roles'}>Roles</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {/*Customers Field*/}
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
                  onChange={hideActionsError}>
                  {eventsData.map((event) => (
                    <Option key={event.id} value={event.id}>
                      {event.name}
                    </Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/*Users Field*/}
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
                  onChange={hideActionsError}>
                  {eventsData.map((event) => (
                    <Option key={event.id} value={event.id}>
                      {event.name}
                    </Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/*Roles Field*/}
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
                  onChange={hideActionsError}>
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
        </Form>
      </Modal>
    </div>
  );
};
