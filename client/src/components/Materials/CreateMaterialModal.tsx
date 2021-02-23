import React, { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';

//Materials Dummy Data
import MetalImg from '../../assets/metal.png';
import PlasticImg from '../../assets/plastic.png';
import WoodImg from '../../assets/wood.png';
import GoldImg from '../../assets/gold.png';
import { MaterialsListEntry } from '../../interfaces/MaterialsListEntry';

const { Option } = Select;

// TODO find a way to update the table on Modal submit with the gold image
export const CreateMaterialModal = () => {

  const [form] = Form.useForm();

  const dummyVendorsData: string[] = ['BHP', 'Rio Tinto', 'China Mining Inc.'];

  // TODO Actually use the img data to update the material (as soon as it's figured out)
  const dummyImagesData: MaterialsListEntry[] = [
    {
      img: <img src={MetalImg} alt='Metal Preview' width={32} />,
      name: 'Metal',
      quantity: 30,
      price: 5,
    },
    {
      img: <img src={PlasticImg} alt='Plastic Preview' width={32} />,
      name: 'Plastic',
      quantity: 10,
      price: 2,
    },
    {
      img: <img src={WoodImg} alt='Wood Preview' width={32} />,
      name: 'Wood',
      quantity: 15,
      price: 4,
    },
    {
      img: <img src={GoldImg} alt='Wood Preview' width={32} />,
      name: 'Gold',
      quantity: 15,
      price: 4,
    },
  ];

  // TODO Actually use the vendors data to update the material (as soon as it's figured out)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [vendorsData, setVendorsData] = useState(dummyVendorsData);

  // TODO Actually use the img data to update the material (as soon as it's figured out)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imgsData, setImgsData] = useState(dummyImagesData);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const hideVendorsError = () => {
    const vendorsError = document.getElementById('display-vendors-error');
    if (vendorsError) {
      vendorsError.style.display = 'none';
    }
  };

  const displayVendorsError = () => {
    const vendorsError = document.getElementById('display-vendors-error');
    if (vendorsError) {
      vendorsError.style.display = 'block';
    }
  };

  const handleSubmit = (values: any) => {
    let vendors = values['list_vendors'];

    if (!vendors) {
      displayVendorsError();
      return;
    }

    let hasDefinedPart = false;
    for (let i = 0; i < vendors.length; i++) {
      if (vendors[i]) {
        hasDefinedPart = true;
        break;
      }
    }
    if (!hasDefinedPart) {
      displayVendorsError();
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
          {/*Material Picture Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Select an image:</span>
            </Col>
            {/*Image Selector*/}
            <Col className='margin-bottom-mobile' sm={12} span={18}>
              <Form.Item
                validateTrigger={['onChange', 'onBlur']}
                noStyle>
                <Select
                  style={{ width: '100%', display: 'inline-table' }}
                  placeholder='Select an image'
                  optionFilterProp='children'
                  onChange={hideVendorsError}>
                  {imgsData.map((img, index) => (
                    <Option key={img.name} value={img.name}>{img.img}</Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/*Material Vendors Fields*/}
          <Form.List name='list_vendors'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  // Single Material Vendor Entry
                  <Row key={index} align='middle' style={{ marginBottom: 8 }}>
                    {/*Vendor Selector*/}
                    <Col sm={3} span={6} style={{ paddingRight: 8 }}>
                      Vendor:
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
                          onChange={hideVendorsError}>
                          {vendorsData.map((vendor, index) => (
                            <Option key={vendor} value={vendor}>{vendor}</Option>))}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/*Price Selector*/}
                    <Col className='text-left-mobile' sm={4} span={6} style={{ textAlign: 'right', paddingRight: 8 }}>
                      Price/Unit:
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
                <span id='display-vendors-error' style={{ color: 'red', display: 'none' }}>
                  Please add at least one vendor.
                </span>
                {/*Default error messages*/}
                <Form.ErrorList errors={errors} />
                {/*Add Vendor Button*/}
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
