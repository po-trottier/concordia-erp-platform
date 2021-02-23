import React, {useState} from 'react';
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select} from 'antd';
import {MinusCircleTwoTone, PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

export const CreatePartModal = () => {

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [materialsData, setMaterialsData] = useState([{name: 'Metal', id: '23'}, {
    name: 'Plastic',
    id: '42'
  }, {name: 'Wood', id: '22'}]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hidematerialsError = () => {
    const materialsError = document.getElementById('display-materials-error');
    if(materialsError) {
      materialsError.style.display = 'none';
    }
  }

  const displaymaterialsError = () => {
    const materialsError = document.getElementById('display-materials-error');
    if(materialsError) {
      materialsError.style.display = 'block';
    }
  };

  const handleSubmit = (values: any) => {
    let materials = values['list_materials'];

    if (!materials) {
      displaymaterialsError();
      return;
    }

    let hasDefinedmaterial = false;
    for (let i = 0; i < materials.length; i++) {
      if (materials[i]) {
        hasDefinedmaterial = true;
        break;
      }
    }
    if (!hasDefinedmaterial) {
      displaymaterialsError();
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
        Create New part
      </Button>
      <Modal title="Create New part" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit} name="dynamic_form_item">
          <Row align="middle" style={{marginBottom:16}}>
            <Col sm={6} span={9}>
              <span>Part Name : </span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{marginBottom:0}}
                name="part_name"
                rules={[{required: true, message: 'Please enter a part name!'}]}>
                <Input placeholder='Part Name'/>
              </Form.Item>
            </Col>
          </Row>
          <Form.List name="list_materials">

            {(fields, {add, remove}, {errors}) => (
              <div>
                {fields.map((field, index) => (
                  <Row key={index} align="middle" style={{marginBottom:8}}>
                    <Col sm={6} span={9} style={{paddingRight:8}}>
                      Material :
                    </Col>
                    <Col className="margin-bottom-mobile"  sm={16} span={13}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle
                      >
                        <Select
                          showSearch
                          style={{width: '100%', display: 'inline-table'}}
                          placeholder="Select a material"
                          optionFilterProp="children"
                          onChange={hidematerialsError}
                        >
                          {materialsData.map((material, index) => (
                            <Option key={material.id} value={material.id}>{material.name}</Option>))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={2} span={2} style={{textAlign:'right'}}>
                      <MinusCircleTwoTone
                        className="dynamic-delete-button"
                        twoToneColor="red"
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                ))}
                <span id="display-materials-error" style={{color:'red', display:'none'}}>Please add at least one material</span>
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
                        Add material
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