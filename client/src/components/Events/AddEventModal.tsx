import React, { useState } from 'react';
import { Button, Modal, Select, Form, Row, Col, Input, InputNumber} from 'antd';
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

  const emptyData : EventDropdownEntry[] = [];
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
          <Form.List name='list_events'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  // Single Action/Event Entry
                  <Row key={index} align='middle' style={{ marginBottom: 8 }}>
                    {/*Action/Event Selector*/}
                    <Col sm={4} span={6} style={{ paddingRight: 8 }}>
                      Actions:
                    </Col>
                    <Col className='margin-bottom-mobile' sm={11} span={18}>
                      <Form.Item
                        name={[field.name, 'eventId']}
                        fieldKey={[field.fieldKey, 'eventId']}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle>
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
                    {/*Delete Button*/}
                    <Col sm={2} span={4} style={{ textAlign: 'right' }}>
                      <MinusCircleTwoTone
                        className='dynamic-delete-button'
                        twoToneColor='red'
                        onClick={() => remove(field.name)} />
                    </Col>
                  </Row>
                ))}
                {/*Custom error message*/}
                <span id='display-actions-error' style={{ color: 'red', display: 'none' }}>
                  Please add at least one action.
                </span>
                {/*Default error messages*/}
                <Form.ErrorList errors={errors} />
                {/*Add Part Button*/}
                <Row>
                  <Col span={24}>
                    <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        style={{ width: '100%' }}
                        icon={<PlusOutlined />}>
                        Add an Event
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};
