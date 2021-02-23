import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

export const ProductEditModal = (props: any) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <React.Fragment>
            <Button type='ghost' onClick={() => showModal()}>Edit</Button>
            <Modal 
                title="Edit Product" 
                visible={isModalVisible} 
                onOk={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      setIsModalVisible(false);
                      props.submitEditHandler(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
                }}
                onCancel={handleCancel}>
                <Form 
                  form={form}
                  initialValues={{
                    name: props.name,
                    price: props.price,
                    parts: props.parts,
                    frameSize: props.frameSize,
                    color: props.color,
                    grade: props.grade,
                    finish: props.finish,
                  }}>
                    <Form.Item
                        label='Product Name'
                        name='name'
                        rules={[{ required: true, message: 'Please enter a product name or Cancel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Price'
                        name='price'
                        rules={[{ required: true, message: 'Please enter a price or Cancel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Parts'
                        name='parts'
                        rules={[{ required: true, message: 'Please enter the parts or Cancel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Frame Size'
                        name='frameSize'
                        rules={[{ required: true, message: 'Please enter a frame size or Cancel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Color'
                        name='color'
                        rules={[{ required: true, message: 'Please enter a color or Cancel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Finish'
                        name='finish'
                        rules={[{ required: true, message: 'Please enter a finish or Cancel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Grade'
                        name='grade'
                        rules={[{ required: true, message: 'Please enter a grade or Cancel' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    )

}