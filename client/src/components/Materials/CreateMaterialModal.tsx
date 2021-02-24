import React, { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import { MaterialImageUploader } from './MaterialImageUploader';

// TODO find a way to update the table on Modal submit with the gold image
export const CreateMaterialModal = () => {

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (values : any) => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const initialValues = {
    'density': 1,
    'price': 1
  };

  return (
    <div>
      <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginTop: 16 }}>
        Add a New Material
      </Button>

      <Modal title='Add a New Material' visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
          {/*Material Name Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Material Name:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='name'
                rules={[{ required: true, message: 'Please enter a material name.' }]}>
                <Input placeholder='Material Name' />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Vendor Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Vendor:</span>
            </Col>
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='vendor'
                rules={[{ required: true, message: 'Please enter a material vendor.' }]}>
                <Input placeholder='Material Vendor' />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Density Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Density:</span>
            </Col>
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='density'
                rules={[{ required: true, message: 'Please enter a material density.' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  step={0.5} />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Price Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Price:</span>
            </Col>
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='price'
                rules={[{ required: true, message: 'Please enter a material price.' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  step={0.5} />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Picture Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Thumbnail:</span>
            </Col>
            {/*Image Selector*/}
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <MaterialImageUploader />
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
