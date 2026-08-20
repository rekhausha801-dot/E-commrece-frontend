import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Row, Col, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createCategory, updateCategory } from '../../services/api';

const { TextArea } = Input;
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddCategoryModal = ({ isOpen, onClose, onSuccess, editData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const formItemLayout = {
    layout: "vertical",
    style: { marginBottom: '16px' }
  };

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        form.setFieldsValue({
          name: editData.name,
          description: editData.description || editData.desc,
          status: editData.status === 'active' || editData.status === 'Active',
          slug: editData.slug || '',
          parent: editData.parent || 'none',
          displayOrder: editData.order || 1,
          productCreation: editData.productCreation ? editData.productCreation.toLowerCase() : 'enabled',
          image: editData.image || editData.img ? [{ url: editData.image || editData.img }] : []
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ status: true, productCreation: 'enabled', parent: 'none' });
      }
    }
  }, [isOpen, editData, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      let imageUrl = '';
      if (values.image && values.image.fileList && values.image.fileList.length > 0) {
        const file = values.image.fileList[0].originFileObj;
        if (file) {
          imageUrl = await getBase64(file);
        } else {
          imageUrl = values.image.fileList[0].url || '';
        }
      } else if (typeof values.image === 'string') {
        imageUrl = values.image;
      }

      const payload = {
        name: values.name,
        description: values.description,
        status: values.status ? 'active' : 'inactive',
        image: imageUrl
      };

      if (editData && editData._id) {
        await updateCategory(editData._id, payload);
        message.success('Category updated successfully');
      } else {
        await createCategory(payload);
        message.success('Category created successfully');
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Validation or API Failed:', error);
      if (error.response && error.response.data) {
         message.error(error.response.data.message || 'Failed to save category');
      } else if (!error.errorFields) {
         message.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const sectionHeaderStyle = {
    marginTop: '24px',
    marginBottom: '16px',
    color: '#111827',
    fontSize: '16px',
    fontWeight: '600',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '8px'
  };

  return (
    <Modal
      title={<div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>{editData ? 'Edit Category' : 'Add New Category'}</div>}
      open={isOpen}
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={onClose} style={{ borderRadius: '6px' }} disabled={loading}>
          Cancel
        </Button>,
        <Button key="publish" type="primary" onClick={handleSave} loading={loading} style={{ background: 'linear-gradient(90deg, #c9a05b 0%, #b08a4c 100%)', borderColor: '#c9a05b', borderRadius: '6px' }}>
          {editData ? 'Update Category' : 'Save Category'}
        </Button>,
      ]}
      style={{ top: 20 }}
      styles={{ body: { maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', padding: '0 24px 24px 24px' } }}
    >
      <Form form={form} layout="vertical">

        {/* Basic Information */}
        <div style={sectionHeaderStyle}>Basic Information</div>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="image" label="Category Image" {...formItemLayout}>
              <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please enter category name' }]} {...formItemLayout}>
              <Input placeholder="e.g., Western Wear" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="parent" label="Parent Category" {...formItemLayout}>
              <Select placeholder="Select Parent Category" size="large">
                <Option value="none">None (Top Level)</Option>
                <Option value="women">Women</Option>
                <Option value="men">Men</Option>
                <Option value="kids">Kids</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="description" label="Description" {...formItemLayout}>
              <TextArea rows={3} placeholder="Brief description of this category..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="slug" label="URL Slug" {...formItemLayout}>
              <Input placeholder="e.g., /western-wear" size="large" />
            </Form.Item>
          </Col>
        </Row>

        {/* SEO Settings */}
        <div style={sectionHeaderStyle}>SEO Settings</div>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="seoTitle" label="SEO Title" {...formItemLayout}>
              <Input placeholder="e.g., Shop Western Wear | BrandName" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="seoDescription" label="SEO Description" {...formItemLayout}>
              <TextArea rows={3} placeholder="Write a compelling meta description..." />
            </Form.Item>
          </Col>
        </Row>

        {/* Display Settings */}
        <div style={sectionHeaderStyle}>Display Settings</div>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="displayOrder" label="Sort Order" {...formItemLayout}>
              <Input type="number" placeholder="e.g., 1" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="Status" valuePropName="checked" {...formItemLayout}>
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>

        {/* Product Settings */}
        <div style={sectionHeaderStyle}>Product Settings</div>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="productCreation" label="Product Creation" {...formItemLayout}>
              <Select size="large">
                <Option value="enabled">Enabled (Allow new products)</Option>
                <Option value="paused">Paused (Temporarily disabled)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
