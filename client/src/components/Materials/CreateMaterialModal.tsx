import React, { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { PartEntry } from '../../interfaces/PartEntry';

const { Option } = Select;

export const CreateMaterialModal = () => {

  const [form] = Form.useForm();

  const emptyData : PartEntry[] = [];
  // TODO Actually use the parts data to update the material
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [partsData, setPartsData] = useState(emptyData);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const hidePartsError = () => {
    const partsError = document.getElementById('display-parts-error');
    if (partsError) {
      partsError.style.display = 'none';
    }
  };

  const displayPartsError = () => {
    const partsError = document.getElementById('display-parts-error');
    if (partsError) {
      partsError.style.display = 'block';
    }
  };

  const handleSubmit = (values : any) => {
    let parts = values['list_parts'];

    if (!parts) {
      displayPartsError();
      return;
    }

    let hasDefinedPart = false;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        hasDefinedPart = true;
        break;
      }
    }
    if (!hasDefinedPart) {
      displayPartsError();
      return;
    }

    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginTop: 16 }}>
        Add a New Material
      </Button>

      <Modal title='Create New Material' visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit} name='dynamic_form_item'>
          {/*Material Name Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Material Name:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='material_name'
                rules={[{ required: true, message: 'Please enter a material name.' }]}>
                <Input placeholder='Material Name' />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Vendors Fields*/}
          <Form.List name='list_parts'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  // Single Material Vendor Entry
                  <Row key={index} align='middle' style={{ marginBottom: 8 }}>
                    {/*Vendor Selector*/}
                    <Col sm={3} span={6} style={{ paddingRight: 8 }}>
                      Part:
                    </Col>
                    <Col className='margin-bottom-mobile' sm={12} span={18}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle>
                        <Select
                          showSearch
                          style={{ width: '100%', display: 'inline-table' }}
                          placeholder='Select a vendor'
                          optionFilterProp='children'
                          onChange={hidePartsError}>
                          {partsData.map((part, index) => (
                            <Option key={part.id} value={part.id}>{part.name}</Option>))}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/*Quantity Selector*/}
                    <Col className='text-left-mobile' sm={4} span={6} style={{ textAlign: 'right', paddingRight: 8 }}>
                      Quantity:
                    </Col>
                    <Col sm={3} span={14}>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <InputNumber style={{ width: '100%' }} min={1} defaultValue={1} />
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
                <span id='display-parts-error' style={{ color: 'red', display: 'none' }}>
                  Please add at least one part.
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
                        Add a Vendor
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
