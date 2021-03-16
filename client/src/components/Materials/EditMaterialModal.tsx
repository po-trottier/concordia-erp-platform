import React, { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { MaterialImageUploader } from './MaterialImageUploader';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { RootState } from '../../store/Store';
import { setSelected } from '../../store/slices/UploadSlice';
import { removeMaterialEntry, updateMaterialEntry } from '../../store/slices/MaterialListSlice';
import { removeMaterialQuantity } from '../../store/slices/MaterialQuantitiesSlice';
import axios from '../../plugins/Axios';

export const EditMaterialModal = (props : { material : MaterialEntry }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const selectedFile = useSelector((state : RootState) => state.upload.selectedFile);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values : any) => {
    setLoading(true);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        updateMaterial(values, reader.result);
      };

      reader.onerror = () => {
        setLoading(false);
        message.error('Something went wrong while reading the uploaded image');
      };
    } else {
      updateMaterial(values, null);
    }

  };

  const updateMaterial = (values: any, image: any) => {
    const newMaterial = {
      density: values.density,
      name: values.name,
      price: values.price,
      vendorName: values.vendor,
      image: image
    };

    if (!newMaterial.image) {
      delete newMaterial.image;
    }
    if (!newMaterial.density) {
      newMaterial.density = 1;
    }
    if (!newMaterial.price) {
      newMaterial.price = 1;
    }

    axios.patch('/materials/' + props.material._id, newMaterial)
      .then(({ data }) => {
        const newMaterial = data;
        newMaterial.id = data['_id'];
        dispatch(updateMaterialEntry({
          id: props.material._id,
          newMaterial: newMaterial
        }));
        dispatch(setSelected(undefined));
        setIsModalVisible(false);
        message.success('The material was successfully added.');
        form.resetFields();
      })
      .catch((err) => {
        message.error('Something went wrong while adding the material.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  const deleteMaterial = () => {
    Modal.confirm({
      onOk() {
        axios.delete('/materials/' + props.material._id)
          .then(() => {
            dispatch(removeMaterialEntry(props.material._id));
            dispatch(removeMaterialQuantity(props.material._id));
            message.success('The material was removed successfully');
            setIsModalVisible(false);
          })
          .catch((err) => {
            console.error(err);
            message.error('Something went wrong while removing the material.');
          })
          .finally(() => false);
      },
      title: 'Remove a Material',
      content: 'Are you sure you want to remove the selected material?'
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='ghost' size='small' onClick={() => setIsModalVisible(true)} style={{ width: 60 }}>
        Edit
      </Button>

      <Modal
        title='Edit a Material'
        onCancel={handleCancel}
        visible={isModalVisible}
        confirmLoading={loading}
        footer={[
          <Button
            key='delete'
            type='dashed'
            style={{ float: 'left' }}
            onClick={() => deleteMaterial()}>
            Remove
          </Button>,
          <Button
            key='cancel'
            type='ghost'
            onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={() => form.submit()}>
            OK
          </Button>
        ]}>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            'name': props.material.name,
            'vendor': props.material.vendorName,
            'density': props.material.density,
            'price': props.material.price,
          }}>
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
          {/*Custom error message*/}
          <span id='display-file-error' style={{ color: 'red', display: 'none' }}>
            Please select at least one image.
          </span>
        </Form>
      </Modal>
    </div>
  );
};
