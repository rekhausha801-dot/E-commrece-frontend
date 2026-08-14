import React, { useState } from 'react';
import { Modal, Form, Input, Select, Switch, Row, Col, Upload, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    layout: "vertical",
    style: { marginBottom: '16px' }
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Saved values:', values);
      onClose();
    }).catch(info => {
      console.log('Validation Failed:', info);
    });
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
      title={<div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Add New Category</div>}
      open={isOpen}
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={onClose} style={{ borderRadius: '6px' }}>
          Cancel
        </Button>,
        <Button key="publish" type="primary" onClick={handleSave} style={{ background: 'linear-gradient(90deg, #c9a05b 0%, #b08a4c 100%)', borderColor: '#c9a05b', borderRadius: '6px' }}>
          Save Category
        </Button>,
      ]}
      style={{ top: 20 }}
      styles={{ body: { maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', padding: '0 24px 24px 24px' } }}
    >
      <Form form={form} layout="vertical" initialValues={{ status: true, productCreation: 'enabled' }}>

        {/* Basic Information */}
        <div style={sectionHeaderStyle}>Basic Information</div>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="image" label="Category Image" {...formItemLayout}>
              <Upload listType="picture-card" maxCount={1}>
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
            <Form.Item name="slug" label="URL Slug" rules={[{ required: true, message: 'Please enter slug' }]} {...formItemLayout}>
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
