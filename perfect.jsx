import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductManagement.css';
import { 
  Plus, 
  Download, 
  Image as ImageIcon,
  Grid,
  Box,
  Tag,
  List,
  Layout,
  Globe,
  Star,
  HelpCircle,
  FileText,
  Save,
  Pencil,
  Trash2,
  Eye,
  Share2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CloudUpload,
  Info,
  Check,
  X,
  ChevronDown,
  ShoppingBag,
  ClipboardList,
  ChevronUp,
  Filter,
  Upload,
  Search,
  Bell,
  Bold,
  Italic,
  Underline,
  ListOrdered,
  AlignLeft,
  ChevronsUpDown,
  UploadCloud,
  Link,
  Lightbulb,
  Camera,
  Package,
  FileSpreadsheet,
  ArrowRight


} from 'lucide-react';


const mockProducts = [
  { id: 1, name: "Classic Black T-Shirt", sku: "TSHIRT001", cat: "Men Clothing", brand: "Roadster", price: "₹699", oldPrice: "₹999", discount: "30% OFF", stock: 120, status: "In Stock", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=90" },
  { id: 2, name: "Blue Hoodie", sku: "HOODIE002", cat: "Men Clothing", brand: "Nike", price: "₹1,499", oldPrice: "₹1,999", discount: "25% OFF", stock: 35, status: "Low Stock", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=90" },
  { id: 3, name: "Women Rose Watch", sku: "WATCH003", cat: "Accessories", brand: "Fastrack", price: "₹2,399", oldPrice: "₹2,999", discount: "20% OFF", stock: 18, status: "Low Stock", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=90" },
  { id: 4, name: "Running Shoes", sku: "SHOE004", cat: "Footwear", brand: "Adidas", price: "₹2,999", oldPrice: "₹3,499", discount: "15% OFF", stock: 50, status: "In Stock", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=90" },
  { id: 5, name: "Polarized Sunglasses", sku: "SUNG005", cat: "Accessories", brand: "Ray-Ban", price: "₹1,199", oldPrice: "₹1,599", discount: "25% OFF", stock: 0, status: "Out of Stock", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=90" }
];

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const importFileInputRef = useRef(null);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  const initialFormState = {
    name: '', sku: '', cat: '', brand: '',
    shortDesc: '', fullDesc: '',
    price: '', discount: '', salePrice: '', stock: '', lowStock: '10', status: 'Active',
    seoTitle: '', seoDesc: '', seoKeywords: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  
  const initialSpecs = [
    { spec: 'Fabric', val: '' },
    { spec: 'Fit', val: '' },
    { spec: 'Sleeve', val: '' },
    { spec: 'Occasion', val: '' }
  ];
  const [specs, setSpecs] = useState(initialSpecs);

  const [missingDetails, setMissingDetails] = useState([
    { question: "Does this product have a size chart?", answer: "" },
    { question: "Is Cash on Delivery available?", answer: "" },
    { question: "Can I exchange the product if size doesn't fit?", answer: "" },
    { question: "Is this product available in other colors?", answer: "" },
    { question: "Is this product suitable for summer?", answer: "" }
  ]);
  const [answeringIndex, setAnsweringIndex] = useState(null);
  const [tempAnswer, setTempAnswer] = useState("");

  const [adminReviewRating, setAdminReviewRating] = useState(0);
  const [adminReviewHover, setAdminReviewHover] = useState(0);
  const [adminReviewTitle, setAdminReviewTitle] = useState('');
  const [adminReviewText, setAdminReviewText] = useState('');
  const [adminReviewPhotos, setAdminReviewPhotos] = useState([]);
  const adminReviewFileRef = useRef(null);

  const handleAdminReviewPhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newUrls = files.map(f => URL.createObjectURL(f));
      setAdminReviewPhotos(prev => [...prev, ...newUrls]);
    }
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { spec: '', val: '' }]);
  };

  const handleRemoveSpec = (idx) => {
    setSpecs(specs.filter((_, i) => i !== idx));
  };

  const initialSizeGuide = [
    { size: 'S', bust: '', waist: '', length: '' },
    { size: 'M', bust: '', waist: '', length: '' },
    { size: 'L', bust: '', waist: '', length: '' },
    { size: 'XL', bust: '', waist: '', length: '' }
  ];
  const [sizeGuide, setSizeGuide] = useState(initialSizeGuide);

  const handleSizeGuideChange = (index, field, value) => {
    const newGuide = [...sizeGuide];
    newGuide[index][field] = value;
    setSizeGuide(newGuide);
  };

  const handleAddSizeGuide = () => {
    setSizeGuide([...sizeGuide, { size: '', bust: '', waist: '', length: '' }]);
  };

  const handleRemoveSizeGuide = (idx) => {
    setSizeGuide(sizeGuide.filter((_, i) => i !== idx));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [galleryImages, setGalleryImages] = useState([]);
  const galleryInputRef = useRef(null);

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newUrls = files.map(f => URL.createObjectURL(f));
    setGalleryImages(prev => [...prev, ...newUrls]);
  };

  const removeGalleryImage = (idx) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== idx));
  };
  
  const [faqs, setFaqs] = useState([]);

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '', status: 'Active' }]);
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };
  
  const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL', 'XXL']);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [colors, setColors] = useState([
    { name: 'Black', hex: '#000' },
    { name: 'White', hex: '#fff' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Grey', hex: '#9ca3af' },
    { name: 'Red', hex: '#ef4444' }
  ]);
  const [selectedColors, setSelectedColors] = useState([]);

  const toggleSize = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
  };

  const handleAddSize = () => {
    const size = prompt("Enter new size (e.g., 3XL):");
    if (size && !sizes.includes(size.toUpperCase())) {
      setSizes([...sizes, size.toUpperCase()]);
    }
  };

  const handleAddColor = () => {
    const name = prompt("Enter color name (e.g., Purple):");
    if (!name) return;
    const hex = prompt("Enter color hex code (e.g., #8b5cf6):", "#000000");
    if (name && hex) {
      setColors([...colors, { name, hex }]);
    }
  };
  
  const handleRemoveColor = (nameToRemove) => {
    setColors(colors.filter(c => c.name !== nameToRemove));
  };
  
  const currentProducts = currentPage === 1 ? products : [];
  
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setCoverImagePreview(null);
    setFormData({
      name: product.name || '',
      sku: product.sku || '',
      cat: product.cat || '',
      brand: product.brand || '',
      shortDesc: product.shortDesc || '',
      fullDesc: product.fullDesc || '',
      price: product.oldPrice?.replace(/[^0-9.]/g, '') || '',
      discount: product.discount?.replace(/[^0-9.]/g, '') || '',
      salePrice: product.price?.replace(/[^0-9.]/g, '') || '',
      stock: product.stock ?? '',
      lowStock: product.lowStock || '10',
      status: product.status || 'Active',
      seoTitle: product.seoTitle || '',
      seoDesc: product.seoDesc || '',
      seoKeywords: product.seoKeywords || ''
    });
    setSpecs(product.specs || initialSpecs);
    setSizeGuide(product.sizeGuide || initialSizeGuide);
    setSelectedSizes(product.sizes || []);
    setSelectedColors(product.colors || []);
    setGalleryImages(product.gallery || []);
    setFaqs(product.faqs || []);
    
    setAdminReviewRating(product.adminReview?.rating || 0);
    setAdminReviewTitle(product.adminReview?.title || '');
    setAdminReviewText(product.adminReview?.text || '');
    setAdminReviewPhotos(product.adminReview?.photos || []);

    setIsEditing(true);
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };
  
  const handleAddNew = () => {
    setEditingProduct(null);
    setCoverImagePreview(null);
    setFormData(initialFormState);
    setSpecs(initialSpecs);
    setSizeGuide(initialSizeGuide);
    setSelectedSizes([]);
    setSelectedColors([]);
    setGalleryImages([]);
    setFaqs([]);
    
    setAdminReviewRating(0);
    setAdminReviewTitle('');
    setAdminReviewText('');
    setAdminReviewPhotos([]);

    setIsEditing(true);
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.sku || !formData.price || !formData.cat) {
      alert("Please fill in all the required fields (Name, SKU, Category, and Price) before saving.");
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name,
      sku: formData.sku,
      cat: formData.cat,
      brand: formData.brand,
      shortDesc: formData.shortDesc,
      fullDesc: formData.fullDesc,
      price: `₹${formData.salePrice || formData.price}`,
      oldPrice: `₹${formData.price}`,
      discount: formData.discount ? `${formData.discount}% OFF` : '',
      stock: parseInt(formData.stock) || 0,
      lowStock: parseInt(formData.lowStock) || 10,
      status: formData.status,
      seoTitle: formData.seoTitle,
      seoDesc: formData.seoDesc,
      seoKeywords: formData.seoKeywords,
      sizes: selectedSizes,
      colors: selectedColors,
      specs: specs,
      sizeGuide: sizeGuide,
      img: coverImagePreview || (editingProduct ? editingProduct.img : ''),
      gallery: galleryImages,
      faqs: faqs,
      adminReview: {
        rating: adminReviewRating,
        title: adminReviewTitle,
        text: adminReviewText,
        photos: adminReviewPhotos
      }
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    } else {
      setProducts([updatedProduct, ...products]);
    }
    
    setIsEditing(false);
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setCoverImagePreview(null);
    setGalleryImages([]);
    setFormData(initialFormState);
    setSpecs(initialSpecs);
    setSizeGuide(initialSizeGuide);
    setSelectedSizes([]);
    setSelectedColors([]);
    
    setAdminReviewRating(0);
    setAdminReviewTitle('');
    setAdminReviewText('');
    setAdminReviewPhotos([]);

    setIsEditing(false);
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };
  
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };
  
  return (
    <div className="product-management-page">
      
      {/* List View */}
      {!isEditing && (
        <div className="list-view-container">
          <div className="list-view-header">
            <h2 className="page-title">
              Product List <span className="title-badge">125 Products</span>
            </h2>
            <div className="header-actions" style={{ alignItems: 'center' }}>
              <button className="btn-outline" style={{ border: '1px dashed #d37920', color: '#d37920' }} onClick={() => setIsImportModalOpen(true)}><Upload size={14} /> Import</button>
              <button className="btn-outline" style={{ borderColor: '#d37920', color: '#d37920' }}><Download size={14} /> Export</button>
              <button className="btn-outline"><Filter size={14} /> Filter</button>
              <div className="dropdown-wrapper" style={{ width: 'auto' }}>
                <button className="btn-outline" style={{ borderColor: '#d37920', color: '#d37920', display: 'flex', alignItems: 'center', gap: '6px' }}>Bulk Actions <ChevronDown size={14} /></button>
              </div>
              <button className="btn-solid-orange" onClick={handleAddNew}><Plus size={14} /> Add Product</button>
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-dropdowns">
              <div className="dropdown-wrapper">
                <select className="form-input custom-select">
                  <option>All Categories</option>
                </select>
                <ChevronDown size={14} className="select-icon" />
              </div>
              <div className="dropdown-wrapper">
                <select className="form-input custom-select">
                  <option>All Brands</option>
                </select>
                <ChevronDown size={14} className="select-icon" />
              </div>
              <div className="dropdown-wrapper">
                <select className="form-input custom-select">
                  <option>All Status</option>
                </select>
                <ChevronDown size={14} className="select-icon" />
              </div>
            </div>
            <div className="filter-actions">
              <button className="btn-search"><Search size={14} /> Search</button>
              <button className="btn-reset">Reset</button>
            </div>
          </div>

          <div className="product-table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', paddingLeft: '16px' }}><input type="checkbox" className="custom-checkbox" /></th>
                  <th colSpan="2">Product <ChevronsUpDown size={12} color="#ccc" style={{ marginLeft: '4px', verticalAlign: 'middle' }} /></th>
                  <th>Category <ChevronsUpDown size={12} color="#ccc" style={{ marginLeft: '4px', verticalAlign: 'middle' }} /></th>
                  <th>Brand <ChevronsUpDown size={12} color="#ccc" style={{ marginLeft: '4px', verticalAlign: 'middle' }} /></th>
                  <th>Price <ChevronsUpDown size={12} color="#ccc" style={{ marginLeft: '4px', verticalAlign: 'middle' }} /></th>
                  <th>Stock <ChevronsUpDown size={12} color="#ccc" style={{ marginLeft: '4px', verticalAlign: 'middle' }} /></th>
                  <th>Status <ChevronsUpDown size={12} color="#ccc" style={{ marginLeft: '4px', verticalAlign: 'middle' }} /></th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? currentProducts.map((p) => (
                  <tr key={p.id}>
                    <td style={{ paddingLeft: '16px' }}><input type="checkbox" className="custom-checkbox" /></td>
                    <td style={{ width: '48px', paddingRight: 0 }}>
                      <img src={p.img} alt={p.name} className="table-img-placeholder" style={{ objectFit: 'cover' }} />
                    </td>
                    <td>
                      <div className="table-product-name">{p.name}</div>
                      <div className="table-sku">SKU: {p.sku}</div>
                    </td>
                    <td>{p.cat}</td>
                    <td>{p.brand}</td>
                    <td>
                      <div className="table-price">
                        <strong>{p.price}</strong> <span className="old-price">{p.oldPrice}</span>
                      </div>
                      <div className="table-discount">{p.discount}</div>
                    </td>
                    <td><span className={`stock-text ${p.stock > 0 ? (p.stock > 40 ? 'text-green' : 'text-orange') : 'text-red'}`}>{p.stock}</span></td>
                    <td>
                      <span className={`status-badge ${p.status === 'In Stock' ? 'success' : p.status === 'Low Stock' ? 'warning' : 'danger'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions action-menu-wrapper">
                        <button className="btn-three-dot" onClick={() => toggleDropdown(p.id)}>
                          <MoreVertical size={16} />
                        </button>
                        {activeDropdown === p.id && (
                          <div className="action-menu-dropdown">
                            <button className="action-btn-text" onClick={() => { setActiveDropdown(null); navigate(`/product/${p.id}`); }}><Eye size={12} /> View Product</button>
                            <button className="action-btn-text" onClick={() => { handleEditClick(p); setActiveDropdown(null); }}><Pencil size={12} /> Edit Product</button>
                            <button className="action-btn-text" onClick={() => { 
                              navigator.clipboard.writeText(`${window.location.origin}/product/${p.id}`);
                              alert('Product link copied to clipboard!');
                              setActiveDropdown(null); 
                            }}><Share2 size={12} /> Share Product</button>
                            <button className="action-btn-text danger" onClick={() => { handleDeleteProduct(p.id); setActiveDropdown(null); }}><Trash2 size={12} /> Delete Product</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '60px 20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#fcf8f2', padding: '16px', borderRadius: '50%' }}>
                          <ShoppingBag size={48} color="#d3a763" />
                        </div>
                        <h4 style={{ margin: '8px 0 0 0', color: '#333', fontSize: '16px' }}>No products found</h4>
                        <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>Your product list is currently empty.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <div className="pagination-wrapper">
              <span className="pagination-info">Showing {currentPage === 1 ? "1 to 5" : "0"} of 125 products</span>
              <div className="pagination-controls-right">
                <div className="pagination-controls">
                  <button className="page-btn" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}><ChevronLeft size={14} /></button>
                  <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
                  <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
                  <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
                  <span className="page-dots">...</span>
                  <button className="page-btn">25</button>
                  <button className="page-btn" onClick={() => setCurrentPage(Math.min(25, currentPage + 1))}><ChevronRight size={14} /></button>
                </div>
                <div className="items-per-page">
                  <select className="form-input custom-select small-select">
                    <option>5 / page</option>
                    <option>10 / page</option>
                    <option>20 / page</option>
                  </select>
                  <ChevronDown size={14} className="select-icon" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions at the bottom */}
          <div className="quick-actions-section">
            <h4 className="section-title">Quick Actions</h4>
            <div className="quick-actions-grid">
              <button className="quick-action-card" onClick={handleAddNew}>
                <div className="icon-circle"><Plus size={18} /></div>
                <span>Add Product</span>
              </button>
              <button className="quick-action-card">
                <div className="icon-circle"><Grid size={18} /></div>
                <span>Add Category</span>
              </button>
              <button className="quick-action-card">
                <div className="icon-circle"><Tag size={18} /></div>
                <span>Add Brand</span>
              </button>
              <button className="quick-action-card">
                <div className="icon-circle"><Bell size={18} /></div>
                <span>Stock Alert</span>
              </button>
              <button className="quick-action-card" onClick={() => setIsImportModalOpen(true)}>
                <div className="icon-circle"><Upload size={18} /></div>
                <span>Import Products</span>
              </button>
              <button className="quick-action-card">
                <div className="icon-circle"><Download size={18} /></div>
                <span>Export Products</span>
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Edit View */}
      {isEditing && (
        <div className="dashboard-add-product">
          <div className="dash-header-simple">
            <div className="breadcrumb">Dashboard &gt; <span>Add New Product</span></div>
          </div>
          <div className="dash-title-section-flex">
            <div>
              <h2>Add New Product</h2>
              <p>Fill in the details below to add a new product to your store.</p>
            </div>
            <div className="dash-header-actions">
              <button className="btn-dash-cancel" onClick={handleCancel}>Cancel</button>
              <button className="btn-dash-save" onClick={handleSaveProduct}><Save size={16} /> Save Product</button>
            </div>
          </div>

          <div className="dashboard-grid">
            {currentStep === 1 && (
              <>
            {/* Card 1: Basic Information */}
            <div className="dash-card card-span-2">
              <div className="dash-card-header">
                <span className="step-number">1</span>
                <h3>Basic Information</h3>
              </div>
              <div className="dash-card-content">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Product Name <span>*</span></label>
                    <input type="text" name="name" className="form-input" placeholder="Enter product name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>SKU <span>*</span></label>
                    <input type="text" name="sku" className="form-input" placeholder="Enter SKU" value={formData.sku} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Category <span>*</span></label>
                    <div className="dropdown-wrapper">
                      <select name="cat" className="form-input custom-select" value={formData.cat} onChange={handleInputChange}>
                        <option value="">Select category</option>
                        <option value="Men Clothing">Men Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Footwear">Footwear</option>
                      </select>
                      <ChevronDown size={14} className="select-icon" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Brand <span>*</span></label>
                    <div className="dropdown-wrapper">
                      <select name="brand" className="form-input custom-select" value={formData.brand} onChange={handleInputChange}>
                        <option value="">Select brand</option>
                        <option value="Roadster">Roadster</option>
                        <option value="Nike">Nike</option>
                        <option value="Fastrack">Fastrack</option>
                        <option value="Adidas">Adidas</option>
                        <option value="Ray-Ban">Ray-Ban</option>
                      </select>
                      <ChevronDown size={14} className="select-icon" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Short Description</label>
                  <div className="input-with-count">
                    <input type="text" name="shortDesc" className="form-input" placeholder="Enter short description" value={formData.shortDesc} onChange={handleInputChange} />
                    <span className="char-count">0/150</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Full Description</label>
                  <div className="rte-container">
                    <div className="rte-toolbar">
                      <div className="rte-group"><span className="rte-text">Paragraph</span><ChevronDown size={12} /></div>
                      <div className="rte-divider"></div>
                      <button className="rte-btn"><Bold size={14} /></button>
                      <button className="rte-btn"><Italic size={14} /></button>
                      <button className="rte-btn"><Underline size={14} /></button>
                      <div className="rte-divider"></div>
                      <button className="rte-btn"><List size={14} /></button>
                      <button className="rte-btn"><ListOrdered size={14} /></button>
                      <div className="rte-divider"></div>
                      <button className="rte-btn"><AlignLeft size={14} /></button>
                      <button className="rte-btn"><Link size={14} /></button>
                      <button className="rte-btn"><ImageIcon size={14} /></button>
                    </div>
                    <div className="textarea-wrapper">
                      <textarea name="fullDesc" className="form-input rte-textarea" rows="4" placeholder="Write full description here..." value={formData.fullDesc} onChange={handleInputChange}></textarea>
                      <span className="char-count-bottom">0/2000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Product Images */}
            <div className="dash-card card-span-1">
              <div className="dash-card-header">
                <span className="step-number">2</span>
                <h3>Product Images</h3>
              </div>
              <div className="dash-card-content">
                <div className="image-upload-layout">
                  <div className={`cover-upload ${coverImagePreview || editingProduct?.img ? 'has-image' : ''}`} onClick={() => fileInputRef.current?.click()}>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
                    {(coverImagePreview || editingProduct?.img) ? (
                      <>
                        <img src={coverImagePreview || editingProduct.img} alt="Cover" className="cover-img-preview" />
                        <div className="cover-img-overlay">
                          <Pencil size={18} color="white" />
                          <span>Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <CloudUpload size={32} color="#c28833" />
                        <div className="upload-text">Upload Cover Image</div>
                        <div className="upload-hint">JPG, PNG or WEBP<br/>(Max 2MB)</div>
                      </>
                    )}
                  </div>
                  <div className="gallery-upload">
                    <div className="gallery-title">Gallery Images</div>
                    <div className="gallery-grid">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className="gallery-box" style={{ position: 'relative' }}>
                          <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} alt="Gallery" />
                          <div style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: 'white', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 10 }} onClick={() => removeGalleryImage(idx)}>✕</div>
                        </div>
                      ))}
                      {Array.from({ length: Math.max(0, 5 - galleryImages.length) }).map((_, i) => (
                        <div key={`empty-${i}`} className="gallery-box"><Plus size={20} color="#ccc" /></div>
                      ))}
                    </div>
                    <input type="file" multiple ref={galleryInputRef} onChange={handleGalleryUpload} style={{ display: 'none' }} accept="image/*" />
                    <button className="btn-add-more-img" onClick={() => galleryInputRef.current?.click()}><Plus size={14}/> Add More Images</button>
                  </div>
                </div>
                <div className="tips-box">
                  <Lightbulb size={20} color="#d97706" />
                  <div>
                    <strong>Tips</strong>
                    <p>Upload high quality images for better customer experience.<br/>Recommended size: 800 × 1000 px</p>
                  </div>
                </div>
              </div>
            </div>

              </>
            )}
            {currentStep === 2 && (
              <>
            {/* Card 3: Pricing & Inventory */}
            <div className="dash-card card-span-2">
              <div className="dash-card-header">
                <span className="step-number">3</span>
                <h3>Pricing & Inventory</h3>
              </div>
              <div className="dash-card-content">
                <div className="form-row-3">
                  <div className="form-group">
                    <label>Price (₹) <span>*</span></label>
                    <input type="text" name="price" className="form-input" placeholder="Enter price" value={formData.price} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Discount (%)</label>
                    <input type="text" name="discount" className="form-input" placeholder="Enter discount" value={formData.discount} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Sale Price (₹)</label>
                    <input type="text" name="salePrice" className="form-input bg-gray" placeholder="Auto calculated" readOnly value={formData.salePrice} />
                  </div>
                </div>
                <div className="form-row-3">
                  <div className="form-group">
                    <label>Stock Quantity <span>*</span></label>
                    <input type="text" name="stock" className="form-input" placeholder="Enter stock" value={formData.stock} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Low Stock Alert</label>
                    <input type="text" name="lowStock" className="form-input" placeholder="Enter alert quantity" value={formData.lowStock} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Product Status <span>*</span></label>
                    <div className="dropdown-wrapper">
                      <select name="status" className="form-input custom-select" value={formData.status} onChange={handleInputChange}>
                        <option value="Active">Active</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                      <ChevronDown size={14} className="select-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Product Variants */}
            <div className="dash-card card-span-1">
              <div className="dash-card-header">
                <span className="step-number">4</span>
                <h3>Product Variants</h3>
              </div>
              <div className="dash-card-content">
                <div className="form-group">
                  <label>Size</label>
                  <div className="variant-boxes">
                    {sizes.map(sz => (
                      <div key={sz} className={`v-box ${selectedSizes.includes(sz) ? 'active' : ''}`} onClick={() => toggleSize(sz)}>{sz}</div>
                    ))}
                    <button className="btn-add-variant-dash" onClick={handleAddSize}><Plus size={12}/> Add Size</button>
                  </div>
                </div>
                <div className="form-group mt-16">
                  <label>Color</label>
                  <div className="color-boxes">
                    {colors.map(c => (
                      <div key={c.name} className={`c-box ${selectedColors.includes(c.name) ? 'active' : ''}`} onClick={() => toggleColor(c.name)}>
                        <span className="c-dot" style={{ backgroundColor: c.hex }}></span> {c.name}
                      </div>
                    ))}
                    <button className="btn-add-variant-dash" onClick={handleAddColor}><Plus size={12}/> Add Color</button>
                  </div>
                </div>
              </div>
            </div>

              </>
            )}
            {currentStep === 3 && (
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '20px' }}>
            {/* Card 5: Specifications */}
            <div className="dash-card" style={{ flex: 1, margin: 0 }}>
              <div className="dash-card-header">
                <span className="step-number">5</span>
                <h3>Specifications</h3>
              </div>
              <div className="dash-card-content">
                <table className="dash-table">
                  <thead>
                    <tr><th>Specification</th><th>Value</th><th style={{width: '40px'}}></th></tr>
                  </thead>
                  <tbody>
                    {specs.map((s, idx) => (
                      <tr key={idx}>
                        <td>
                          <input type="text" className="table-input" placeholder="e.g. Fabric" value={s.spec} onChange={(e) => handleSpecChange(idx, 'spec', e.target.value)} />
                        </td>
                        <td>
                          <input type="text" className="table-input" placeholder="Enter value" value={s.val} onChange={(e) => handleSpecChange(idx, 'val', e.target.value)} />
                        </td>
                        <td>
                          <button className="btn-three-dot danger" style={{ padding: '6px' }} onClick={() => handleRemoveSpec(idx)} title="Remove Row"><Trash2 size={14}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn-add-row" onClick={handleAddSpec}><Plus size={12}/> Add Row</button>
              </div>
            </div>

            {/* Card 6: Size Guide */}
            <div className="dash-card" style={{ flex: 1, margin: 0 }}>
              <div className="dash-card-header">
                <span className="step-number">6</span>
                <h3>Size Guide</h3>
                <button className="btn-add-row-small" onClick={handleAddSizeGuide}><Plus size={12}/> Add Row</button>
              </div>
              <div className="dash-card-content">
                <table className="dash-table center-text">
                  <thead>
                    <tr><th>Size</th><th>Bust (in)</th><th>Waist (in)</th><th>Length (in)</th><th style={{width: '40px'}}></th></tr>
                  </thead>
                  <tbody>
                    {sizeGuide.map((sg, idx) => (
                      <tr key={idx}>
                        <td><input type="text" className="table-input center" placeholder="Size" value={sg.size} onChange={(e) => handleSizeGuideChange(idx, 'size', e.target.value)} /></td>
                        <td><input type="text" className="table-input center" placeholder="Enter" value={sg.bust} onChange={(e) => handleSizeGuideChange(idx, 'bust', e.target.value)} /></td>
                        <td><input type="text" className="table-input center" placeholder="Enter" value={sg.waist} onChange={(e) => handleSizeGuideChange(idx, 'waist', e.target.value)} /></td>
                        <td><input type="text" className="table-input center" placeholder="Enter" value={sg.length} onChange={(e) => handleSizeGuideChange(idx, 'length', e.target.value)} /></td>
                        <td>
                          <button className="btn-three-dot danger" style={{ padding: '6px' }} onClick={() => handleRemoveSizeGuide(idx)} title="Remove Row"><Trash2 size={14}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

              </div>
            )}
            {currentStep === 4 && (
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '20px' }}>
            {/* Card 7: SEO */}
            <div className="dash-card" style={{ flex: 1, margin: 0 }}>
              <div className="dash-card-header">
                <span className="step-number">7</span>
                <h3>SEO (Optional)</h3>
              </div>
              <div className="dash-card-content">
                <div className="form-group">
                  <label>Meta Title</label>
                  <input type="text" name="seoTitle" className="form-input" placeholder="Enter meta title" value={formData.seoTitle} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Meta Description</label>
                  <div className="input-with-count">
                    <textarea name="seoDesc" className="form-input" rows="3" placeholder="Enter meta description" value={formData.seoDesc} onChange={handleInputChange}></textarea>
                    <span className="char-count-bottom">0/160</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Keywords</label>
                  <input type="text" name="seoKeywords" className="form-input" placeholder="Enter keywords (comma separated)" value={formData.seoKeywords} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Card 8: FAQs */}
            <div className="dash-card" style={{ flex: 1, margin: 0 }}>
              <div className="dash-card-header">
                <span className="step-number">8</span>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <button className="btn-add-row-small" onClick={handleAddFaq}><Plus size={12}/> Add FAQ</button>
              </div>
              <div className="dash-card-content">
                <table className="dash-table">
                  <thead>
                    <tr><th>Question</th><th>Answer</th><th style={{width: '40px'}}></th></tr>
                  </thead>
                  <tbody>
                    {faqs.map((faq, idx) => (
                      <tr key={idx}>
                        <td><input type="text" className="table-input" placeholder="Question?" value={faq.question} onChange={e => handleFaqChange(idx, 'question', e.target.value)} /></td>
                        <td><input type="text" className="table-input" placeholder="Answer..." value={faq.answer} onChange={e => handleFaqChange(idx, 'answer', e.target.value)} /></td>
                        <td>
                          <button className="btn-three-dot danger" style={{ padding: '6px' }} onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}><Trash2 size={14}/></button>
                        </td>
                      </tr>
                    ))}
                    {faqs.length === 0 && (
                      <tr><td colSpan="3" style={{ textAlign: 'center', color: '#999' }}>No FAQs added. Click Add FAQ above.</td></tr>
                    )}
                  </tbody>
                </table>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <a href="#" style={{ color: '#C89953', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>View All FAQs &rarr;</a>
                </div>
              </div>
            </div>

              </div>
            )}
            {currentStep === 5 && (
              <>
            {/* Card 9: What Customers Are Asking */}
            <div className="dash-card card-span-2">
              <div className="dash-card-header">
                <span className="step-number">9</span>
                <h3>What Customers Are Asking (Missing Details)</h3>
              </div>
              <div className="dash-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <HelpCircle size={24} color="#C89953" />
                  </div>
                  <p style={{ fontSize: '13px', color: '#555', margin: 0, maxWidth: '200px' }}>These are the important details customers want to know but are not clearly mentioned in the product.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {missingDetails.map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>• {item.question}</span>
                        {!item.answer && answeringIndex !== i && (
                          <button onClick={() => { setAnsweringIndex(i); setTempAnswer(""); }} className="btn-add-row-small" style={{ border: 'none', background: 'transparent', color: '#C89953', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12} /> Add Answer</button>
                        )}
                        {item.answer && answeringIndex !== i && (
                          <button onClick={() => { setAnsweringIndex(i); setTempAnswer(item.answer); }} className="btn-add-row-small" style={{ border: 'none', background: 'transparent', color: '#C89953', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Pencil size={12} /> Edit</button>
                        )}
                      </div>
                      {answeringIndex === i && (
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                          <input type="text" value={tempAnswer} onChange={(e) => setTempAnswer(e.target.value)} style={{ flex: 1, padding: '8px 12px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none' }} placeholder="Type answer here..." />
                          <button onClick={() => { 
                            const newDetails = [...missingDetails];
                            newDetails[i].answer = tempAnswer;
                            setMissingDetails(newDetails);
                            setAnsweringIndex(null);
                          }} style={{ padding: '8px 16px', background: '#C89953', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>Save</button>
                        </div>
                      )}
                      {item.answer && answeringIndex !== i && (
                        <div style={{ marginTop: '6px', paddingLeft: '12px', fontSize: '12px', color: '#666', borderLeft: '2px solid #C89953' }}>
                          <strong style={{color:'#444'}}>A:</strong> {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', marginTop: '8px' }}>
                    <a href="#" style={{ color: '#C89953', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>View All Missing Details &rarr;</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 10: Next Customer Write a Review */}
            <div className="dash-card card-span-1">
              <div className="dash-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="step-number">10</span>
                  <h3 style={{ margin: 0 }}>Write a Review</h3>
                </div>
                <button type="button" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f5f5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronUp size={16} color="#555" />
                </button>
              </div>
              <div className="dash-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>Overall Rating</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star 
                        key={s} 
                        size={28} 
                        style={{ cursor: 'pointer' }}
                        fill={(adminReviewHover || adminReviewRating) >= s ? "#ccc" : "transparent"}
                        color="#ccc" 
                        onMouseEnter={() => setAdminReviewHover(s)}
                        onMouseLeave={() => setAdminReviewHover(0)}
                        onClick={() => setAdminReviewRating(s)}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>Review Title</label>
                  <input type="text" value={adminReviewTitle} onChange={(e) => setAdminReviewTitle(e.target.value)} placeholder="Summary of your experience" style={{ width: '100%', padding: '14px', background: '#f9f9f9', border: 'none', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                </div>
                
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>Your Review</label>
                  <textarea rows="4" value={adminReviewText} onChange={(e) => setAdminReviewText(e.target.value)} placeholder="Tell us what you liked or disliked..." style={{ width: '100%', padding: '14px', background: '#f9f9f9', border: 'none', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical' }}></textarea>
                </div>
                
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#444', display: 'block', marginBottom: '8px' }}>Add a Photo</label>
                  <input type="file" multiple accept="image/*" ref={adminReviewFileRef} onChange={handleAdminReviewPhotoUpload} style={{ display: 'none' }} />
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {adminReviewPhotos.map((url, i) => (
                      <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={url} alt={`Upload ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button type="button" onClick={() => setAdminReviewPhotos(adminReviewPhotos.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}>
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    <div onClick={() => adminReviewFileRef.current?.click()} style={{ flex: 1, minWidth: '150px', padding: '32px', border: '2px dashed #eaeaea', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', color: '#666', cursor: 'pointer' }}>
                      <Camera size={24} style={{ marginBottom: '12px' }} color="#888" />
                      <span style={{ fontSize: '14px' }}>Click to upload image</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
          
          <div className="dash-footer-actions" style={{ justifyContent: 'space-between' }}>
            {currentStep === 1 ? (
              <button className="btn-dash-cancel" onClick={handleCancel}>Cancel</button>
            ) : (
              <button className="btn-dash-cancel" onClick={prevStep}><ChevronLeft size={16} /> Previous</button>
            )}
            
            {currentStep < 5 ? (
              <button className="btn-dash-save" onClick={nextStep}>Next Step <ChevronRight size={16} /></button>
            ) : (
              <button className="btn-dash-save" onClick={handleSaveProduct}><Save size={16} /> Save Product</button>
            )}
          </div>
        </div>
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={() => setIsImportModalOpen(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '95%', maxWidth: '550px', maxHeight: '95vh', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#666' }} onClick={() => setIsImportModalOpen(false)}>
              <X size={20} />
            </button>
            
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#111' }}>Import Products</h2>
              <p style={{ margin: 0, color: '#555', fontSize: '13px' }}>Upload an Excel file (.xls or .xlsx) to import products in bulk.</p>
            </div>

            {/* Stepper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '0 10px', margin: '4px 0' }}>
              <div style={{ position: 'absolute', top: '16px', left: '30px', right: '30px', height: '2px', background: '#eaeaea', zIndex: 1 }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#d37920', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>1</div>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#d37920' }}>Upload File</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f5f5', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>2</div>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#888' }}>Map Columns</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f5f5', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>3</div>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#888' }}>Preview Data</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f5f5', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>4</div>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#888' }}>Import</span>
              </div>
            </div>

            {/* Drag and Drop Area */}
            <div style={{ border: '2px dashed #eaeaea', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#fafafa' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#e0f3e6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <FileSpreadsheet size={24} color="#2e7d32" />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 8px 0', color: '#111' }}>Drag and drop your Excel file here</h3>
              <p style={{ margin: '0 0 12px 0', color: '#888', fontSize: '12px' }}>or</p>
              <input type="file" accept=".xls,.xlsx" ref={importFileInputRef} style={{ display: 'none' }} />
              <button style={{ background: '#d37920', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', marginBottom: '16px' }} onClick={() => importFileInputRef.current?.click()}>Choose File</button>
              <p style={{ margin: '0 0 4px 0', color: '#555', fontSize: '12px' }}>Only Excel files (.xls, .xlsx) are supported</p>
              <p style={{ margin: 0, color: '#888', fontSize: '11px' }}>Maximum file size: 10MB</p>
            </div>

            {/* Download Sample */}
            <div style={{ background: '#f0f9f4', border: '1px solid #dcf0e3', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileSpreadsheet size={20} color="#2e7d32" />
                <div>
                  <h4 style={{ margin: '0 0 2px 0', color: '#2e7d32', fontSize: '13px', fontWeight: '600' }}>Download Sample File</h4>
                  <p style={{ margin: 0, color: '#4a8e57', fontSize: '12px' }}>Get the example format to prepare your Excel file</p>
                </div>
              </div>
              <Download size={18} color="#2e7d32" />
            </div>

            {/* Important Notes */}
            <div style={{ background: '#fff9f0', border: '1px solid #f9eedf', borderRadius: '8px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#b26112', fontSize: '13px', fontWeight: 'bold' }}>Important Notes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#d37920" />
                  <span style={{ fontSize: '12px', color: '#555' }}>First row of your file should contain column headers.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#d37920" />
                  <span style={{ fontSize: '12px', color: '#555' }}>Make sure your file follows the sample format.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#d37920" />
                  <span style={{ fontSize: '12px', color: '#555' }}>Image URLs in Excel will be used for product images.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#d37920" />
                  <span style={{ fontSize: '12px', color: '#555' }}>Duplicate products (by SKU) will be skipped.</span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <button style={{ padding: '10px 24px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', fontWeight: '600', fontSize: '13px', color: '#555', cursor: 'pointer' }} onClick={() => setIsImportModalOpen(false)}>Cancel</button>
              <button style={{ padding: '10px 24px', background: '#d37920', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>Next <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductManagement;

