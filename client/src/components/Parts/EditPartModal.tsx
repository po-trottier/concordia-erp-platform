import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { MaterialDropdownEntry } from '../../interfaces/MaterialDropdownEntry';
import { PartEntry } from '../../interfaces/PartEntry';
import { removePartEntry, updatePartEntry } from '../../store/slices/PartListSlice';
import axios from '../../plugins/Axios';

const { Option } = Select;

interface Material {
  materialId : string,
  quantity : number
}

export const EditPartModal = (props : { part : PartEntry }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const emptyData : MaterialDropdownEntry[] = [];
  const [materialsData, setMaterialsData] = useState(emptyData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
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
      });
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
    const materials = values['list_materials'];
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
      if (!m.materialId) {
        return;
      }
      if (!materialsFiltered.find((f) => f.materialId === m.materialId)) {
        materialsFiltered.push({ materialId: m.materialId, quantity: m.quantity ? m.quantity : 1 });
      } else {
        const i = materialsFiltered.findIndex(f => f.materialId === m.materialId);
        if (i >= 0) {
          materialsFiltered[i].quantity += m.quantity;
        }
      }
    });

    axios.patch('/parts/' + props.part.id, {
      name: values['part_name'],
      materials: materialsFiltered,
    })
      .then(({ data }) => {
        const newPart = data;
        newPart.id = data['_id'];
        dispatch(updatePartEntry({
          id: props.part.id,
          newPart: newPart
        }));
        setIsModalVisible(false);
        form.resetFields();
        message.success('The part was successfully modified.');
      })
      .catch(err => {
        console.error(err);
        message.error('Something went wrong while modifying the part.');
      });
  };

  const deletePart = () => {
    Modal.confirm({
      onOk() {
        axios.delete('/parts/' + props.part.id)
          .then(() => {
            dispatch(removePartEntry(props.part.id));
            message.success('The part was removed successfully');
            setIsModalVisible(false);
          })
          .catch((err) => {
            console.error(err);
            message.error('Something went wrong while removing the part.');
          })
          .finally(() => false);
      },
      title: 'Remove a Part',
      content: 'Are you sure you want to remove the selected part?'
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='ghost' size='small' onClick={() => setIsModalVisible(true)} style={{ width: 60 }}>
        Edit
      </Button>

      <Modal
        title='Define a New Part'
        visible={isModalVisible}
        footer={[
          <Button
            key='delete'
            type='dashed'
            style={{ float: 'left' }}
            onClick={() => deletePart()}>
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
          onFinish={handleSubmit}
          initialValues={{
            'part_name': props.part.name,
            'list_materials': props.part.materials,
          }}>
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