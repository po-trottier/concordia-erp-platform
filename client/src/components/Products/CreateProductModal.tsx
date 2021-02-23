import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

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

    const handleSubmit = (values: any) => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" onClick={showModal} style={{marginTop: 16}}>
                Create New Product
            </Button>
            <Modal title="Create New Product" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                <Form form={form} onFinish={handleSubmit} name="dynamic_form_item">
                    <Row>
                        <Col span={6}>
                            <span>Product Name : </span>
                        </Col>
                        <Col span={18}>
                            <Form.Item
                                name="product_name"
                                rules={[{required: true, message: 'Please enter a product name!'}]}>
                                <Input placeholder='Product Name'/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.List name="list_parts"
                               rules={[
                                   {
                                       validator: async (_, parts) => {
                                           if (!parts) {
                                               return Promise.reject(new Error('Add at least one part'));
                                           }

                                           let hasDefinedPart = false;
                                           for (let i = 0; i < parts.length; i++) {
                                               if (parts[i]) {
                                                   hasDefinedPart = true;
                                                   break;
                                               }
                                           }
                                           if (!hasDefinedPart) {
                                               return Promise.reject(new Error('Add at least one part'));
                                           }
                                       },
                                   },
                               ]}

                    >

                        {(fields, {add, remove}, {errors}) => (
                            <>
                                {fields.map((field, index) => (
                                    <Row key={index}>
                                        <Col span={2}>
                                            <span>Part :</span>
                                        </Col>
                                        <Col span={13}>
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
                                                >
                                                    {partsData.map((part, index) => (
                                                        <Option key={part.id} value={part.id}>{part.name}</Option>))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <span>Quantity : </span>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item>
                                                <InputNumber style={{width: '100%'}} min={1} defaultValue={1}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={1}>
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        </Col>
                                    </Row>
                                ))}

                                <Form.ErrorList errors={errors}/>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item>

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
                            </>
                        )}
                    </Form.List>

                </Form>
            </Modal>
        </>
    );
};
