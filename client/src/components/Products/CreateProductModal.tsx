import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InputNumber, Form, Input, Button, Modal, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PartEntry } from '../../interfaces/PartEntry'

const { Option } = Select;

export const CreateProductModal = () => {

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [partsData, setPartsData] = useState([{name:'Pink Tassels', id:'23'}, {name:'A very cool wheel', id:'42'}, {name:'Bike Frame', id:'22'}]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = (values : any) => {
    setIsModalVisible(false);
    console.log(values);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };



  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginTop: 16 }}>
        Create New Product
      </Button>
      <Modal title="Create New Product" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit} name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
          <Form.Item 
            name="product_name"
            rules={[{ required: true, message: 'Please enter a product name!' }]}>
            <h3>Product Name</h3>
            <Input placeholder='Product Name'
              style={{width: '90%'}} />
          </Form.Item>
          <Form.List name="names">

            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Parts' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      noStyle
                    >
                      <Select
                        showSearch
                        style={{ width: 220 }}
                        placeholder="Select a part"
                        optionFilterProp="children"
                      >
                        {partsData.map((part, index) => (<Option key={part.id} value={part.id}>{part.name}</Option>))}
                      </Select>
                      <span style={{margin:10}}>Qty</span>
                      <InputNumber min={1} defaultValue={1}/>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{marginLeft: 10}}
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}

                <Form.Item>

                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '90%', position: 'absolute'}}
                    icon={<PlusOutlined />}
                  >
                    Add Part
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};
