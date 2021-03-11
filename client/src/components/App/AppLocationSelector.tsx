import React, { HTMLProps, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Select, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, MinusCircleTwoTone } from '@ant-design/icons';

import axios from '../../plugins/Axios';
import { RootState } from '../../store/Store';
import { setSelectedLocation } from '../../store/slices/LocationSlice';
import { LocationEntry } from '../../interfaces/LocationEntry';
import { Role } from '../../router/Roles';

const { Option } = Select;

export const AppLocationSelector = (props: HTMLProps<HTMLDivElement>) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const selected = useSelector((state : RootState) => state.location.selected);
  const user = useSelector((state : RootState) => state.login.user);

  const empty : LocationEntry[] = [];
  const [locations, setLocations] = useState(empty);
  const [role, setRole] = useState(Role.ANY);
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    axios.get('/locations')
      .then(({ data }) => {
        setLocations(data);
        if (data.length < 1) {
          message.error('Something went wrong while getting the locations.')
          return;
        }
        if (!data.find((l : LocationEntry) => l._id === selected)) {
          console.log('changing selected');
          dispatch(setSelectedLocation(locations[0]._id));
        }
      })
      .catch((err) => {
        message.error('Something went wrong while getting the locations.');
        console.error(err);
      });
    setRole(user.authType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations.length]);

  const onChange = (val: string) => {
    dispatch(setSelectedLocation(val))
  }

  const handleCancel = () => {
    setShowEdit(false);
    form.resetFields();
  }

  const handleSubmit = async (values: any) => {
    const trimmedLocations : LocationEntry[] = [];
    values.locations.forEach((loc: LocationEntry) => {
      if (!loc.name || loc.name.trim().length < 1)
        return;
      trimmedLocations.push(loc);
    });

    if (trimmedLocations.length < 1) {
      const error = document.getElementById('display-locations-error')
      if (error)
        error.style.display = 'block';
      return;
    }

    setEditLoading(true);

    for (let i = 0; i < locations.length; i++) {
      const loc = locations[i];
      const entry = trimmedLocations.find((l) => l._id === loc._id);
      if (!entry) {
        await removeLocation(loc._id);
      } else if (entry.name !== loc.name) {
        await editLocation(entry);
      }
    }

    for (let i = 0; i < trimmedLocations.length; i++) {
      const loc = trimmedLocations[i];
      if (!loc._id && loc.name.trim().length > 0)
        await addLocation(loc.name);
    }

    setEditLoading(false);
    handleCancel();
  }

  const removeLocation = async (id: string) => {
    console.log('Remove', id)
  }

  const editLocation = async (loc: LocationEntry) => {
    console.log('Edit', loc)
  }

  const addLocation = async (name: string) => {
    console.log('Add', name)
  }

  return (
    <div>
      <div {...props}>
        { role === Role.SYSTEM_ADMINISTRATOR ?
          <Button
            style={{ float: 'right' }}
            className="dark-button"
            type="ghost"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => setShowEdit(true)} /> : <div />
        }
        <div style={{ marginRight: role === Role.SYSTEM_ADMINISTRATOR ? 48 : 0 }}>
          <Select
            style={{ width: '100%' }}
            showSearch
            className="dark"
            dropdownClassName="dark-dropdown"
            placeholder="Select a location"
            optionFilterProp="children"
            defaultValue={selected}
            onChange={onChange}>
            {
              locations.map((location) => {
                return <Option
                  key={location._id}
                  value={location._id}>
                  { location.name }
                </Option>
              })
            }
          </Select>
        </div>
      </div>
      <Modal
        title='Edit Locations'
        visible={showEdit}
        confirmLoading={editLoading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            'locations': locations,
          }}>
          <Form.List name="locations">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <div key={field.key} style={{ marginBottom: 16 }}>
                    {fields.length > 1 ? (
                      <MinusCircleTwoTone
                        style={{ float: 'right', fontSize: 16, lineHeight: '32px'}}
                        twoToneColor='red'
                        onClick={() => remove(field.name)} />
                    ) : null}
                    <Form.Item
                      {...field}
                      key={'name_' + field.key}
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      label="Location Name"
                      style={{ marginBottom: 0, marginRight: fields.length > 1 ? 36 : 0 }}>
                      <Input placeholder="Location Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      key={'id_' + field.key}
                      name={[field.name, '_id']}
                      fieldKey={[field.fieldKey, '_id']}
                      style={{ display: 'none' }} />
                  </div>
                ))}
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="ghost"
                    onClick={() => add()}
                    style={{ width: '100%', marginTop: 16 }}>
                    Add a Location
                  </Button>
                </Form.Item>
                <span id='display-locations-error' style={{ color: 'red', display: 'none', marginTop: 16 }}>
                  At least 1 location must exist.
                </span>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};
