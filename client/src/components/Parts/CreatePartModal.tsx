import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { MaterialDropdownEntry } from '../../interfaces/MaterialDropdownEntry';
import axios from '../../plugins/Axios';

const { Option } = Select;

interface Material {
  materialId : string,
  quantity : number
}

export const CreatePartModal = () => {

  const [form] = Form.useForm();

  const emptyData : MaterialDropdownEntry[] = [];
  const [materialsData, setMaterialsData] = useState(emptyData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios.get('/materials')
      .then((res) => {
        if (res && res.data) {
          const data : MaterialDropdownEntry[] = [];
          res.data.forEach((m : any) => {
            data.push({
              id: m['_id'],
              name: m.name
            });
          });
          setMaterialsData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of materials.');
        console.error(err);
      })
      .finally(() => setUpdated(true));
  }, [updated]);

  const hideMaterialsError = () => {
    const MaterialsError = document.getElementById('display-parts-error');
    if (MaterialsError) {
      MaterialsError.style.display = 'none';
    }
  };

  const displayMaterialsError = () => {
    const materialsError = document.getElementById('display-parts-error');
    if (materialsError) {
      materialsError.style.display = 'block';
    }
  };

  const handleSubmit = (values : any) => {
    let materials = values['list_materials'];
    if (!materials) {
      displayMaterialsError();
      return;
    }
    let hasDefinedMaterial = false;
    materials.forEach((m : Material) => {
      if (m && m.materialId) {
        hasDefinedMaterial = true;
        return;
      }
    });
    if (!hasDefinedMaterial) {
      displayMaterialsError();
      return;
    }

    let materialsFiltered : Material[] = [];

    materials.forEach((m : Material) => {
      if (m.materialId) {
        materialsFiltered.push({ materialId: m.materialId, quantity: m.quantity ? m.quantity : 1 });
      }
    });
    axios.post('materials', {
      name: values['part_name'],
      materials: materialsFiltered,
    })
      .then(() => {
        setIsModalVisible(false);
        form.resetFields();
        message.success('The part was successfully created.');
      })
      .catch(err => {
        console.error(err);
        message.error('Something went wrong while creating the part.');
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginTop: 16 }}>
        Add a New Part
      </Button>

      <Modal title='Define a New Part' visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          {/*part Name Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Part Name:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='part_name'
                rules={[{ required: true, message: 'Please enter a part name.' }]}>
                <Input placeholder='Part Name' />
              </Form.Item>
            </Col>
          </Row>
          <h4 style={{ fontWeight: 'bold' }}>Part Materials</h4>
          <Form.List name='list_materials'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  // Single part Part Entry
                  <Row key={index} align='middle' style={{ marginBottom: 8 }}>
                    {/*Part Selector*/}
                    <Col sm={4} span={6} style={{ paddingRight: 8 }}>
                      Materials:
                    </Col>
                    <Col className='margin-bottom-mobile' sm={11} span={18}>
                      <Form.Item
                        name={[field.name, 'materialId']}
                        fieldKey={[field.fieldKey, 'materialId']}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle>
                        <Select
                          showSearch
                          style={{ width: '100%', display: 'inline-table' }}
                          placeholder='Select a material'
                          optionFilterProp='children'
                          onChange={hideMaterialsError}>
                          {materialsData.map((material) => (
                            <Option key={material.id} value={material.id}>
                              {material.name}
                            </Option>))}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/*Quantity Selector*/}
                    <Col className='text-left-mobile' sm={4} span={6} style={{ textAlign: 'right', paddingRight: 8 }}>
                      Quantity:
                    </Col>
                    <Col sm={3} span={14}>
                      <Form.Item
                        name={[field.name, 'quantity']}
                        fieldKey={[field.fieldKey, 'quantity']}
                        style={{ marginBottom: 0 }}>
                        <InputNumber
                          style={{ width: '100%' }}
                          min={1}
                          defaultValue={1} />
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
                  Please add at least one material.
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