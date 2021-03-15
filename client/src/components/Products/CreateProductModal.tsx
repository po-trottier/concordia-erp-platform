import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { PartDropdownEntry } from '../../interfaces/PartDropdownEntry';
import { addProductEntry } from '../../store/slices/ProductListSlice';
import axios from '../../plugins/Axios';

const { Option } = Select;

interface ProductPart {
  partId : string,
  quantity : number
}

export const CreateProductModal = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const emptyData : PartDropdownEntry[] = [];
  const [partsData, setPartsData] = useState(emptyData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('/parts')
      .then((res) => {
        if (res && res.data) {
          const data : PartDropdownEntry[] = [];
          res.data.forEach((p : any) => {
            data.push({
              id: p['_id'],
              name: p.name
            });
          });
          setPartsData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of parts.');
        console.error(err);
      });
  }, [updated]);

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
    const parts = values['list_parts'];

    if (!parts) {
      displayPartsError();
      return;
    }

    let hasDefinedPart = false;
    parts.forEach((p : ProductPart) => {
      if (p && p.partId) {
        hasDefinedPart = true;
        return;
      }
    });
    if (!hasDefinedPart) {
      displayPartsError();
      return;
    }

    const partsFiltered : ProductPart[] = [];
    parts.forEach((p : ProductPart) => {
      if (!p.partId) {
        return;
      }
      if (!partsFiltered.find((f) => f.partId === p.partId)) {
        partsFiltered.push({ partId: p.partId, quantity: p.quantity ? p.quantity : 1 });
      } else {
        const i = partsFiltered.findIndex(f => f.partId === p.partId);
        if (i >= 0) {
          partsFiltered[i].quantity += p.quantity;
        }
      }
    });

    axios.post('/products', {
      name: values['product_name'],
      parts: partsFiltered,
      price: values['product_price'],
      properties: values['list_properties']
    })
      .then(({ data }) => {
        const newProduct = data;
        newProduct.id = newProduct['_id'];
        dispatch(addProductEntry(newProduct));
        setIsModalVisible(false);
        form.resetFields();
        message.success('The product was successfully created.');
      })
      .catch(err => {
        message.error('Something went wrong while creating the product.');
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginTop: 16 }}>
        Add a New Product
      </Button>

      <Modal title='Define a New Product' visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          {/*Product Name Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Product Name:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='product_name'
                rules={[{ required: true, message: 'Please enter a product name.' }]}>
                <Input placeholder='Product Name' />
              </Form.Item>
            </Col>
          </Row>
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Price:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='product_price'
                rules={[{ required: true, message: 'Please enter a price.' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={0}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>
            </Col>
          </Row>
          <h4 style={{ fontWeight: 'bold' }}>Product Parts</h4>
          {/*Product Parts Fields*/}
          <Form.List name='list_parts'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  // Single Product Part Entry
                  <Row key={index} align='middle' style={{ marginBottom: 8 }}>
                    {/*Part Selector*/}
                    <Col sm={3} span={6} style={{ paddingRight: 8 }}>
                      Part:
                    </Col>
                    <Col className='margin-bottom-mobile' sm={12} span={18}>
                      <Form.Item
                        name={[field.name, 'partId']}
                        fieldKey={[field.fieldKey, 'partId']}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle>
                        <Select
                          showSearch
                          style={{ width: '100%', display: 'inline-table' }}
                          placeholder='Select a part'
                          optionFilterProp='children'
                          onChange={hidePartsError}>
                          {partsData.map((part) => (
                            <Option key={part.id} value={part.id}>
                              {part.name}
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
                        Add a Part
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}
          </Form.List>
          <h4 style={{ fontWeight: 'bold', marginTop: 16 }}>Product Properties</h4>
          {/*Product Properties Fields*/}
          <Form.List name='list_properties'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  // Single Product Property Entry
                  <Row key={index} align='middle' style={{ marginBottom: 8 }}>
                    {/*Property Name*/}
                    <Col sm={4} span={6} style={{ paddingRight: 8 }}>
                      Property:
                    </Col>
                    <Col className='margin-bottom-mobile' sm={7} span={18}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'key']}
                        fieldKey={[field.fieldKey, 'key']}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle>
                        <Input placeholder='Property Name' />
                      </Form.Item>
                    </Col>
                    {/*Property Value*/}
                    <Col className='text-left-mobile' sm={4} span={6} style={{ textAlign: 'right', paddingRight: 8 }}>
                      Value:
                    </Col>
                    <Col sm={7} span={14}>
                      <Form.Item
                        name={[field.name, 'value']}
                        fieldKey={[field.fieldKey, 'value']}
                        style={{ marginBottom: 0 }}>
                        <Input placeholder='Property Value' />
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
                {/*Default error messages*/}
                <Form.ErrorList errors={errors} />
                {/*Add Property Button*/}
                <Row>
                  <Col span={24}>
                    <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        style={{ width: '100%' }}
                        icon={<PlusOutlined />}>
                        Add a Property
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
