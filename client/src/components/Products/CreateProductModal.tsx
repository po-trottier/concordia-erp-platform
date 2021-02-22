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
    form.resetFields();
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
          <div style={{display:'flex', alignItems:'center', padding:4}}>
            <span style={{marginRight:4}}>Product Name : </span>
          <Form.Item 
            name="product_name"
            rules={[{ required: true, message: 'Please enter a product name!' }]}>
            <Input placeholder='Product Name'
              style={{width: 335}} />
          </Form.Item>
          </div>
          <Form.List name="list_parts"
           rules={[
                    {
                      validator: async (_, parts) => {
                        console.log(parts)
                         if (!parts || parts.length < 1 || !parts[0]) { 
                           return Promise.reject(new Error('Add at least one part')); 
                         } 
                      },
                    },
                  ]}

          >

            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div style={{display:'flex', alignItems:'center', padding:4}} key={index}>
                    <span style={{marginRight:4}}>Part :</span>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      noStyle
                    >
                      <Select
                        showSearch
                        style={{ width: 220, display:'inline-table' }}
                        placeholder="Select a part"
                        optionFilterProp="children"
                      >
                        {partsData.map((part, index) => (<Option key={part.id} value={part.id}>{part.name}</Option>))}
                      </Select>
                    </Form.Item>
                    <span style={{marginLeft:8, marginRight:4}}>Quantity : </span>
                    <Form.Item
                      style={{marginBottom:0}}>
                      <InputNumber min={1} defaultValue={1}/>
                    </Form.Item>
                      <MinusCircleOutlined
                        style={{marginLeft:4}}
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                  </div>
                ))}

                <Form.ErrorList errors={errors} />
                <Form.Item>

                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{width:'-webkit-fill-available', marginLeft:50, marginTop:10}}
                    icon={<PlusOutlined />}
                  >
                    Add Part
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};
