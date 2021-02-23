import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select} from 'antd';
import {MinusCircleTwoTone, PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

export const CreateProductModal = () => {

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [partsData, setPartsData] = useState([{name: 'Pink Tassels', id: '23'}, {
    name: 'A very cool wheel',
    id: '42'
  }, {name: 'Bike Frame', id: '22'}]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hidePartsError = () => {
      const partsError = document.getElementById('display-parts-error');
      if(partsError) {
          partsError.style.display = 'none';
      }
  }

  const displayPartsError = () => {
    const partsError = document.getElementById('display-parts-error');
    if(partsError) {
        partsError.style.display = 'block';
    }
  };

  const handleSubmit = (values: any) => {
  let parts = values['list_parts'];

    if (!parts) {
        displayPartsError();
        return;
    }

    let hasDefinedPart = false;
    for (let i = 0; i < parts.length; i++) {
        if (parts[i]) {
            hasDefinedPart = true;
            break;
        }
    }
    if (!hasDefinedPart) {
        displayPartsError();
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
      <Button type="primary" onClick={showModal} style={{marginTop: 16}}>
        Create New Product
      </Button>
      <Modal title="Create New Product" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit} name="dynamic_form_item">
          <Row align="middle" style={{marginBottom:16}}>
            <Col sm={6} span={9}>
              <span>Product Name : </span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{marginBottom:0}}
                name="product_name"
                rules={[{required: true, message: 'Please enter a product name!'}]}>
                <Input placeholder='Product Name'/>
              </Form.Item>
            </Col>
          </Row>
          <Form.List name="list_parts">

            {(fields, {add, remove}, {errors}) => (
              <div>
                {fields.map((field, index) => (
                  <Row key={index} align="middle" style={{marginBottom:8}}>
                    <Col sm={3} span={6} style={{paddingRight:8}}>
                      Part :
                    </Col>
                    <Col className="margin-bottom-mobile"  sm={12} span={18}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle
                      >
                        <Select
                          showSearch
                          style={{width: '100%', display: 'inline-table'}}
                          placeholder="Select a part"
                          optionFilterProp="children"
                          onChange={hidePartsError}
                        >
                          {partsData.map((part, index) => (
                            <Option key={part.id} value={part.id}>{part.name}</Option>))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col className="text-left-mobile" sm={4} span={6}  style={{textAlign:'right', paddingRight:8}}>
                      Quantity :
                    </Col>
                    <Col sm={3} span={14}>
                      <Form.Item style={{marginBottom:0}}>
                        <InputNumber style={{width: '100%'}} min={1} defaultValue={1}/>
                      </Form.Item>
                    </Col>
                    <Col sm={2} span={4} style={{textAlign:'right'}}>
                      <MinusCircleTwoTone
                        className="dynamic-delete-button"
                        twoToneColor="red"
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                ))}
                <span id="display-parts-error" style={{color:'red', display:'none'}}>Please add at least one part</span>
                <Form.ErrorList errors={errors}/>
                <Row>
                  <Col span={24}>
                    <Form.Item style={{marginBottom:0, marginTop:16}}>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{width: '100%'}}
                        icon={<PlusOutlined/>}
                      >
                        Add Part
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
