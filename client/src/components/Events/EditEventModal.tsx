import React, { useEffect, useState } from 'react';
import { Button, Col, Form, message, Modal, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { updateListenerEntry, removeListenerEntry } from '../../store/slices/ListenerListSlice';
import { EventDropdownEntry } from '../../interfaces/EventDropdownEntry';
import { CustomerDropdownEntry } from '../../interfaces/CustomerDropdownEntry';
import { UserDropdownEntry } from '../../interfaces/UserDropdownEntry';
import { EventEntry } from '../../interfaces/EventEntry';
import { getRoleString, Role } from '../../router/Roles';
import axios from '../../plugins/Axios';

const { Option } = Select;

export const EditEventModal = (props: { event: EventEntry }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const emptyEventsData : EventDropdownEntry[] = [];
  const emptyCustomersData : CustomerDropdownEntry[] = [];
  const emptyUsersData : UserDropdownEntry[] = [];
  const [recipientType, setRecipientType] = useState(props.event.recipientType);
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

  const editEvent = (values : any) => {
    const body = values;
    delete body.recipient;

    setLoading(true);
    axios.patch('/events/' + props.event._id, body)
      .then(({ data }) => {
        message.success('The event was edited successfully.');
        handleCancel();
        dispatch(updateListenerEntry({
          id: props.event._id,
          newListener: data
        }));
      })
      .catch((err) => {
        message.error('Something went wrong while editing the event.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteEvent = () => {
    setLoading(true);
    axios.delete('/events/' + props.event._id)
      .then(() => {
        message.success('The event was removed successfully.');
        handleCancel();
        dispatch(removeListenerEntry(props.event._id));
      })
      .catch((err) => {
        message.error('Something went wrong while removing the event.');
        console.error(err);
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
    let field = '';
    let initial = [];
    let data;

    switch (recipientType?.toLowerCase()) {
      case 'users':
        field = 'userId';
        initial = props.event.userId.map((u : any) => u._id);
        data = usersData.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.username}
          </Option>
        ));
        break;

      case 'customers':
        field = 'customerId'
        initial = props.event.customerId.map((c) => c._id);
        data = customersData.map((customer) => (
          <Option key={customer.id} value={customer.id}>
            {customer.name}
          </Option>
        ));
        break;

      case 'roles':
        field = 'role'
        initial = props.event.role;
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
          <span>{recipientType}:</span>
        </Col>
        <Col sm={18} span={15}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={field}
            rules={[{ required: true, message: 'Please select ' + recipientType?.toLowerCase() + '.' }]}>
            <Select
              mode='multiple'
              showSearch
              defaultValue={initial}
              style={{ width: '100%', display: 'inline-table' }}
              placeholder={'Select 1 or more ' + recipientType?.toLowerCase()}
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
        size='small'
        type='ghost'
        style={{ width: 60 }}
        onClick={() => {
          setRecipientType(props.event.recipientType);
          setVisible(true);
        }}>
        Edit
      </Button>
      <Modal
        title='Add New Event'
        visible={visible}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button
            key='delete'
            type='dashed'
            style={{ float: 'left' }}
            onClick={() => deleteEvent()}>
            Remove
          </Button>,
          <Button
            key='cancel'
            type='ghost'
            onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={() => form.submit()}>
            OK
          </Button>
        ]}>
        <Form
          form={form}
          onFinish={editEvent}
          style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
          initialValues={{
            'eventId': props.event.eventId,
            'recipient': props.event.recipientType?.toLocaleLowerCase(),
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
