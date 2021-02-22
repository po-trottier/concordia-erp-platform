import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InputNumber, Form, Input, Button, Modal, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export const CreatePartModal = () => {

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [materialsData, setPartsData] = useState([{name:'Metal', id:'23'}, {name:'Plastic', id:'42'}, {name:'Wood', id:'22'}]);

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
        Create New Part
      </Button>
      <Modal title="Create New Part" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit} name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
          <div style={{display:'flex', alignItems:'center', padding:4}}>
            <span style={{marginRight:4}}>Part Name : </span>
            <Form.Item
              name="part_name"
              rules={[{ required: true, message: 'Please enter a part name!' }]}>
              <Input placeholder='Part Name'
                     style={{width: 335}} />
            </Form.Item>
          </div>
          <Form.List name="list_materials"
                     rules={[
                       {
                         validator: async (_, materials) => {
                           console.log(materials)
                           if (!materials || materials.length < 1 || !materials[0]) {
                             return Promise.reject(new Error('Add at least one material'));
                           }
                         },
                       },
                     ]}

          >

            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div style={{display:'flex', alignItems:'center', padding:4}} key={index}>
                    <span style={{marginRight:4}}>Material :</span>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      noStyle
                    >
                      <Select
                        showSearch
                        style={{ width: 355, display:'inline-table' }}
                        placeholder="Select a material"
                        optionFilterProp="children"
                      >
                        {materialsData.map((material, index) => (<Option key={material.id} value={material.id}>{material.name}</Option>))}
                      </Select>
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
                    Add Material
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