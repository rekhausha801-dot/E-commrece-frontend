import React, { useState } from 'react';
import { Modal, Tabs, Form, Input, Select, Switch, Row, Col, Upload, Button, ColorPicker } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  // Basic styling for form items to make it look premium
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

  return (
    <Modal
      title={<div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '500', color: '#111827' }}>Add New Category</div>}
      open={isOpen}
      onCancel={onClose}
      width={900}
      footer={[
        <Button key="draft" onClick={onClose} style={{ borderRadius: '6px' }}>Save as Draft</Button>,
        <Button key="preview" style={{ borderRadius: '6px' }}>Preview</Button>,
        <Button key="publish" type="primary" onClick={handleSave} style={{ background: '#cda85c', borderColor: '#cda85c', borderRadius: '6px' }}>
          Publish Category
        </Button>,
      ]}
      style={{ top: 20 }}
      bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding: '24px' }}
    >
      <Form form={form} layout="vertical" initialValues={{ status: true, filter_price: true }}>
        <Tabs defaultActiveKey="1" tabPosition="left" style={{ minHeight: '400px' }}>
          
          {/* TAB 1: BASIC INFO */}
          <TabPane tab="1. Basic Info" key="1">
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#111827', fontSize: '18px' }}>Basic Information</h3>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please enter category name' }]} {...formItemLayout}>
                  <Input placeholder="e.g., Western Wear" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="slug" label="URL Slug" rules={[{ required: true, message: 'Please enter slug' }]} {...formItemLayout}>
                  <Input placeholder="e.g., western-wear" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="parent" label="Parent Category" {...formItemLayout}>
                  <Select placeholder="Select Parent Category" size="large">
                    <Option value="none">None (Top Level)</Option>
                    <Option value="women">Women</Option>
                    <Option value="men">Men</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="displayOrder" label="Display Order" {...formItemLayout}>
                  <Input type="number" placeholder="0" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="description" label="Category Description (Optional)" {...formItemLayout}>
              <TextArea rows={4} placeholder="Brief description for SEO and customer info..." />
            </Form.Item>
            <Form.Item name="status" label="Status" valuePropName="checked" {...formItemLayout}>
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </TabPane>

          {/* TAB 2: BANNER */}
          <TabPane tab="2. Banner & Hero" key="2">
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#111827', fontSize: '18px' }}>Hero Banner Configuration</h3>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="bannerDesktop" label="Desktop Banner Image" {...formItemLayout}>
                  <Upload listType="picture-card" maxCount={1}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="bannerMobile" label="Mobile Banner Image" {...formItemLayout}>
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
              <Col span={8}>
                <Form.Item name="tagLabel" label="Tag/Label Text" {...formItemLayout}>
                  <Input placeholder="e.g., NEW SEASON" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="mainHeading" label="Main Heading" {...formItemLayout}>
                  <Input placeholder="e.g., WESTERN" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="subHeading" label="Highlighted Word" {...formItemLayout}>
                  <Input placeholder="e.g., WEAR" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="ctaText" label="CTA Button Text" {...formItemLayout}>
                  <Input placeholder="e.g., SHOP NOW" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="ctaLink" label="CTA Button Link" {...formItemLayout}>
                  <Input placeholder="e.g., /collections/western" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="overlayColor" label="Overlay Color" {...formItemLayout}>
                  <ColorPicker defaultValue="#000000" />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>

          {/* TAB 3: BREADCRUMBS & SEO */}
          <TabPane tab="3. SEO & Breadcrumbs" key="3">
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#111827', fontSize: '18px' }}>SEO Optimization</h3>
            <Form.Item name="metaTitle" label="Meta Title" {...formItemLayout}>
              <Input placeholder="e.g., Shop Western Wear for Women | BrandName" size="large" />
            </Form.Item>
            <Form.Item name="metaDesc" label="Meta Description" {...formItemLayout}>
              <TextArea rows={3} placeholder="Write a compelling meta description..." />
            </Form.Item>
            <Form.Item name="canonicalUrl" label="Canonical URL" {...formItemLayout}>
              <Input placeholder="https://..." size="large" />
            </Form.Item>
            <h3 style={{ marginTop: '32px', marginBottom: '24px', color: '#111827', fontSize: '18px' }}>Breadcrumbs</h3>
            <Form.Item name="breadcrumbOverride" label="Breadcrumb Override (Optional)" {...formItemLayout}>
              <Input placeholder="e.g., Home / Women / Western" size="large" />
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Leave blank to auto-generate from parent hierarchy.</div>
            </Form.Item>
          </TabPane>

          {/* TAB 4: LISTING & CARDS */}
          <TabPane tab="4. Listing Settings" key="4">
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#111827', fontSize: '18px' }}>Product Listing Rules</h3>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="defaultSort" label="Default Sort Option" {...formItemLayout}>
                  <Select size="large">
                    <Option value="popularity">Popularity</Option>
                    <Option value="newest">New Arrivals</Option>
                    <Option value="price_asc">Price: Low to High</Option>
                    <Option value="discount">Highest Discount</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="productsPerPage" label="Products Per Page" {...formItemLayout}>
                  <Select size="large">
                    <Option value="20">20</Option>
                    <Option value="40">40</Option>
                    <Option value="60">60</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <h3 style={{ marginTop: '24px', marginBottom: '16px', color: '#111827', fontSize: '16px' }}>Card Display Toggles</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="showBadges" label="Show Badges (NEW/BESTSELLER)" valuePropName="checked" {...formItemLayout}>
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item name="showWishlist" label="Show Wishlist Heart" valuePropName="checked" {...formItemLayout}>
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item name="showRating" label="Show Ratings & Reviews" valuePropName="checked" {...formItemLayout}>
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item name="showAddCart" label="Show 'Add to Cart' Quick Action" valuePropName="checked" {...formItemLayout}>
                <Switch defaultChecked />
              </Form.Item>
            </div>
          </TabPane>

          {/* TAB 5: FILTER CONFIGURATION */}
          <TabPane tab="5. Filter Config" key="5">
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#111827', fontSize: '18px' }}>Sidebar Filters (Refine Results)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Form.Item name="filter_price" label="Price Range Slider" valuePropName="checked" style={{ marginBottom: 0 }}>
                  <Switch defaultChecked />
                </Form.Item>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Automatically calculates min-max price from mapped products.</div>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Form.Item name="filter_discount" label="Discount Ranges (10%, 20%...)" valuePropName="checked" style={{ marginBottom: 0 }}>
                  <Switch defaultChecked />
                </Form.Item>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Form.Item name="filter_fabric" label="Fabric Attribute List" valuePropName="checked" style={{ marginBottom: 0 }}>
                  <Switch defaultChecked />
                </Form.Item>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Form.Item name="filter_size" label="Size Attribute Chips" valuePropName="checked" style={{ marginBottom: 0 }}>
                  <Switch defaultChecked />
                </Form.Item>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Form.Item name="filter_color" label="Color Swatches" valuePropName="checked" style={{ marginBottom: 0 }}>
                  <Switch defaultChecked />
                </Form.Item>
              </div>

            </div>
          </TabPane>

        </Tabs>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
