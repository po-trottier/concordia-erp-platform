import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Modal, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const CreatePartModal = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      <Button type="primary" onClick={showModal}>
        Create New Part
      </Button>
      <Modal title="Create New Part" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
          <Form.Item>
            <Input placeholder='Part Name'
              style={{width: '90%', position: 'absolute'}}/>
          </Form.Item>
          <Form.List name="names">

            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Materials' : ''}
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
                        style={{ width: 350 }}
                        placeholder="Select a material"
                        optionFilterProp="children"
                      >
                      </Select>
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
                    Add Material
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