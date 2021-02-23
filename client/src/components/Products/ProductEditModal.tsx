import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';


// export const ProductEditModal = (props:any) => {
//     const [form] = Form.useForm();
//     return (
//       <Modal
//         visible={props.visible}
//         title="Edit Product"
//         okText="Save"
//         cancelText="Cancel"
//         onCancel={props.onCancel}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               props.onSave(values);
//             })
//             .catch((info) => {
//               console.log('Validate Failed:', info);
//             });
//         }}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="form_in_modal"
//           initialValues={{
//             name: props.name,
//             price: props.price,
//             parts: props.parts,
//             frameSize: props.frameSize,
//             color: props.color,
//             grade: props.grade,
//             finish: props.finish,
//           }}
//         >
//           <Form.Item name="name" label="Product Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="price" label="Price">
//             <Input />
//           </Form.Item>
//           <Form.Item name="parts" label="Parts">
//             <Input />
//           </Form.Item>
//           <Form.Item name="frameSize" label="Frame Size">
//             <Input />
//           </Form.Item>
//           <Form.Item name="color" label="Color">
//             <Input />
//           </Form.Item>
//           <Form.Item name="grade" label="Grade">
//             <Input />
//           </Form.Item>
//           <Form.Item name="fnish" label="Finish">
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     );
//   };

export const ProductEditModal = (props: any) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        parts: [],
        quantity: 0,
        price: 0,
        frameSize: "",
        color: "",
        finish: "",
        grade: "",
    });

    const showModal = (rowData:any) => {
        setIsModalVisible(true);
        setProductData(rowData);
    }
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = (values: any) => {
        setIsModalVisible(false);
        console.log(values);
    }

    return (
        <React.Fragment>
            <Button type='ghost' onClick={() => showModal(props)}>Edit</Button>
            <Modal 
                title="Edit Product" 
                visible={isModalVisible} 
                onOk={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      handleSubmit(values);
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