import React, { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { MaterialDropdownEntry } from '../../interfaces/MaterialDropdownEntry';

const { Option } = Select;

export const CreatePartModal = () => {

  const [form] = Form.useForm();

  const emptyData : MaterialDropdownEntry[] = [];
  // TODO Actually use the parts data to update the product
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [materialsData, setMaterialsData] = useState(emptyData);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const hideMaterialsError = () => {
    const materialsError = document.getElementById('display-materials-error');
    if (materialsError) {
      materialsError.style.display = 'none';
    }
  };

  const showMaterialsError = () => {
    const materialsError = document.getElementById('display-materials-error');
    if (materialsError) {
      materialsError.style.display = 'block';
    }
  };

  const handleSubmit = (values : any) => {
    let materials = values['list_materials'];
    if (!materials) {
      showMaterialsError();
      return;
    }
    let hasDefinedMaterial = false;
    for (let i = 0; i < materials.length; i++) {
      if (materials[i]) {
        hasDefinedMaterial = true;
        break;
      }
    }
    if (!hasDefinedMaterial) {
      showMaterialsError();
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
        Define a new part
      </Button>

      <Modal title='Define a new part' visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          {/*Part Name Entry*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Part Name:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='part_name'
                rules={[{ required: true, message: 'Please enter a part name!' }]}>
                <Input placeholder='Part Name' />
              </Form.Item>
            </Col>
          </Row>
          {/*Materials List*/}
          <Form.List name='list_materials'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  // Single Material Entry
                  <Row key={index} align='middle' style={{ marginBottom: 8 }}>
                    {/*Material Selector*/}
                    <Col sm={4} span={6} style={{ paddingRight: 8 }}>
                      Material:
                    </Col>
                    <Col className='margin-bottom-mobile' sm={11} span={18}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle>
                        <Select
                          showSearch
                          style={{ width: '100%', display: 'inline-table' }}
                          placeholder='Select a material'
                          optionFilterProp='children'
                          onChange={hideMaterialsError}>
                          {materialsData.map((material, index) => (
                            <Option key={material.id} value={material.id}>{material.name}</Option>))}
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
                <span id='display-materials-error' style={{ color: 'red', display: 'none' }}>
                  Please add at least one material.
                </span>
                {/*Default error messages*/}
                <Form.ErrorList errors={errors} />
                {/*Add Material Button*/}
                <Row>
                  <Col span={24}>
                    <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        style={{ width: '100%' }}
                        icon={<PlusOutlined />}>
                        Add a Material
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