import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductManagement.css';
import AddNewProduct from './AddNewProduct';
import AddNewBrand from './AddNewBrand';
import { Popover, Select, Dropdown, message } from 'antd';
import { 
  Plus, 
  Download, 
  Search, 
  Filter, 
  ChevronDown,
  Upload,
  MoreVertical,
  PlusCircle,
  Grid,
  Tag,
  Bell,
  CloudUpload,
  CloudDownload,
  Check,
  X,
  FileSpreadsheet,
  ChevronsUpDown,
  Pencil,
  Trash2,
  Eye,
  Copy,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';


export const mockProducts = [
  { id: 1, name: "Classic Black T-Shirt", sku: "TSHIRT001", cat: "Men Clothing", brand: "Roadster", price: "₹699", oldPrice: "₹999", discount: "30% OFF", stock: 120, status: "In Stock", img: "https://pngimg.com/uploads/tshirt/tshirt_PNG5448.png" },
  { id: 2, name: "Blue Hoodie", sku: "HOODIE002", cat: "Men Clothing", brand: "Nike", price: "₹1,499", oldPrice: "₹1,999", discount: "25% OFF", stock: 35, status: "Low Stock", img: "/blue-hoodie.jpg" },
  { id: 3, name: "Women Rose Watch", sku: "WATCH003", cat: "Accessories", brand: "Fastrack", price: "₹2,399", oldPrice: "₹2,999", discount: "20% OFF", stock: 18, status: "Low Stock", img: "https://pngimg.com/uploads/watches/watches_PNG9859.png" },
  { id: 4, name: "Running Shoes", sku: "SHOE004", cat: "Footwear", brand: "Adidas", price: "₹2,999", oldPrice: "₹3,499", discount: "15% OFF", stock: 50, status: "In Stock", img: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png" },
  { id: 5, name: "Polarized Sunglasses", sku: "SUNG005", cat: "Accessories", brand: "Ray-Ban", price: "₹1,199", oldPrice: "₹1,599", discount: "25% OFF", stock: 0, status: "Out of Stock", img: "https://pngimg.com/uploads/sunglasses/sunglasses_PNG72.png" }
];

import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';

const ProductManagement = ({ globalSearch = '' }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await getProducts();
      if (res.success) {
        const rawProducts = res.data.products || res.data;
        const mappedProducts = rawProducts.map(p => ({
          ...p,
          name: p.name || p.title || 'Unknown Product',
          sku: p.sku || `SKU-${p.id}`,
          cat: p.cat || p.category || 'Uncategorized',
          brand: p.brand || 'Generic',
          price: typeof p.price === 'number' ? `₹${p.price}` : p.price || '₹0',
          oldPrice: typeof p.originalPrice === 'number' ? `₹${p.originalPrice}` : (p.oldPrice || (typeof p.price === 'number' ? `₹${p.price}` : p.price)),
          discount: p.badge || (p.discount > 0 ? (p.discountType === 'Fixed' ? `₹${p.discount} OFF` : `${p.discount}% OFF`) : ''),
          stock: p.countInStock !== undefined ? p.countInStock : (p.stock !== undefined ? p.stock : 100),
          status: p.status || 'In Stock',
          img: p.image || p.img || (p.colors && p.colors.length > 0 ? p.colors[0].image : "https://pngimg.com/uploads/box/box_PNG8.png")
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
    setIsLoading(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const importFileInputRef = useRef(null);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleDownloadSample = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,SKU,Category,Brand,Price,OldPrice,Stock,Status,ImageURL\nSample Product,SMPL001,Category,Brand,100,150,50,In Stock,https://example.com/image.png";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChooseFile = () => {
    if (importFileInputRef.current) {
      importFileInputRef.current.click();
    }
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
  
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
    setActiveDropdown(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredProducts = products.filter(p => {
    const finalSearchQuery = globalSearch || searchQuery;
    const matchesSearch = (p.name || '').toLowerCase().includes((finalSearchQuery || '').toLowerCase()) || (p.sku || '').toLowerCase().includes((finalSearchQuery || '').toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || p.cat === categoryFilter;
    const matchesBrand = brandFilter === 'All Brands' || p.brand === brandFilter;
    const matchesStatus = statusFilter === 'All Status' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Sort by id descending (works for both MongoDB ObjectIDs and timestamps)
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  });

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDuplicate = (product) => {
    const newProduct = { ...product, id: Date.now(), sku: product.sku + '-COPY', name: product.name + ' (Copy)' };
    setProducts([newProduct, ...products]);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All Categories');
    setBrandFilter('All Brands');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  const handleExport = () => {
    const headers = ["Name", "SKU", "Category", "Brand", "Price", "Stock", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredProducts.map(p => 
        `"${p.name}","${p.sku}","${p.cat}","${p.brand}","${p.price}","${p.stock}","${p.status}"`
      )
    ].join("\n");

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isAddingBrand) {
    return (
      <AddNewBrand 
        onCancel={() => setIsAddingBrand(false)} 
        onSave={(newBrand) => {
          console.log('Saved brand from quick action:', newBrand);
          setIsAddingBrand(false);
        }} 
      />
    );
  }

  return (
    <div className="product-management-page">
      
      {/* List View */}
      {!isEditing && (
        <div className="list-view-container">
          <div className="list-view-header">
            <div className="header-title-section">
              <h2 className="page-title">Product List</h2>
              <span className="title-badge">{filteredProducts.length} Products</span>
            </div>
            <div className="header-actions">
              <button className="btn-solid-brown" onClick={() => setIsImportModalOpen(true)}><Upload size={14} /> Import</button>
              <button className="btn-outline-orange" onClick={handleExport}><Download size={14} /> Export</button>
              <button className={`btn-outline-grey ${isFilterVisible ? 'active' : ''}`} onClick={() => setIsFilterVisible(!isFilterVisible)} style={isFilterVisible ? { background: '#f3f4f6', borderColor: '#d1d5db' } : {}}>
                <Filter size={14} /> Filter
              </button>

              <button className="btn-solid-brown" onClick={handleAddNew}><Plus size={14} /> Add Product</button>
            </div>
          </div>

          {isFilterVisible && (
            <div className="filter-row-container">
              <div className="filters-left" style={{ display: 'flex', gap: '12px' }}>

                <Select 
                  value={categoryFilter} 
                  onChange={(val) => setCategoryFilter(val)}
                  style={{ width: 160, height: 38 }} 
                  options={[{ value: 'All Categories', label: 'All Categories' }, { value: 'Men Clothing', label: 'Men Clothing' }, { value: 'Accessories', label: 'Accessories' }, { value: 'Footwear', label: 'Footwear' }]} 
                />
              <Select 
                value={brandFilter} 
                onChange={(val) => setBrandFilter(val)}
                style={{ width: 160, height: 38 }} 
                options={[{ value: 'All Brands', label: 'All Brands' }, { value: 'Roadster', label: 'Roadster' }, { value: 'Nike', label: 'Nike' }, { value: 'Fastrack', label: 'Fastrack' }, { value: 'Adidas', label: 'Adidas' }, { value: 'Ray-Ban', label: 'Ray-Ban' }]} 
              />
              <Select 
                value={statusFilter} 
                onChange={(val) => setStatusFilter(val)}
                style={{ width: 160, height: 38 }} 
                options={[{ value: 'All Status', label: 'All Status' }, { value: 'In Stock', label: 'In Stock' }, { value: 'Low Stock', label: 'Low Stock' }, { value: 'Out of Stock', label: 'Out of Stock' }]} 
              />
            </div>
            <div className="filters-right">
              <button className="btn-outline-grey" onClick={handleResetFilters}>Reset</button>
            </div>
          </div>
          )}


          <div className="product-table-wrapper">
            <table className="product-table">
              <thead>
                <tr className="table-header-row">
                  <th style={{ width: '40px', paddingLeft: '16px' }}><input type="checkbox" className="custom-checkbox" /></th>
                  <th colSpan="2">Product <ChevronsUpDown size={12} color="#ccc" className="sort-icon" /></th>
                  <th>Category <ChevronsUpDown size={12} color="#ccc" className="sort-icon" /></th>
                  <th>Brand <ChevronsUpDown size={12} color="#ccc" className="sort-icon" /></th>
                  <th>Price <ChevronsUpDown size={12} color="#ccc" className="sort-icon" /></th>
                  <th>Stock <ChevronsUpDown size={12} color="#ccc" className="sort-icon" /></th>
                  <th>Status <ChevronsUpDown size={12} color="#ccc" className="sort-icon" /></th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.length > 0 ? paginatedProducts.map((p, index) => {
                  const actionMenu = {
                    items: [
                      {
                        key: '1',
                        onClick: () => handleEditClick(p),
                        label: (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Eye size={14} color="#6b7280" /> View Product
                          </div>
                        ),
                      },
                      {
                        key: 'edit',
                        onClick: () => handleEditClick(p),
                        label: (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Pencil size={14} color="#6b7280" /> Edit Product
                          </div>
                        ),
                      },
                      {
                        key: '2',
                        onClick: () => handleDuplicate(p),
                        label: (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Copy size={14} color="#6b7280" /> Duplicate
                          </div>
                        ),
                      },
                      {
                        key: '3',
                        danger: true,
                        onClick: () => handleDeleteProduct(p.id),
                        label: (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Trash2 size={14} /> Delete
                          </div>
                        ),
                      },
                    ],
                  };

                  return (
                  <tr key={p.id || index} className="table-body-row">
                    <td style={{ paddingLeft: '16px' }}><input type="checkbox" className="custom-checkbox" /></td>
                    <td style={{ width: '56px', paddingRight: '12px' }}>
                      <img src={p.img} alt={p.name} className="table-img-placeholder" />
                    </td>
                    <td>
                      <div className="table-product-name">{p.name}</div>
                      <div className="table-sku">SKU: {p.sku}</div>
                    </td>
                    <td><span className="table-text-muted">{p.cat}</span></td>
                    <td><span className="table-text-muted">{p.brand}</span></td>
                    <td>
                      <div className="price-container">
                        <div className="price-row">
                          <span className="table-price">{p.price}</span>
                          <span className="old-price">{p.oldPrice || p.price}</span>
                        </div>
                        <span className="table-discount">{p.discount || ''}</span>
                      </div>
                    </td>
                    <td><span className={`stock-text ${p.stock > 0 ? (p.stock > 40 ? 'text-green' : 'text-orange') : 'text-red'}`}>{p.stock}</span></td>
                    <td>
                      <span className={`status-badge ${p.status === 'In Stock' || p.status === 'Active' ? 'success' : p.status === 'Low Stock' ? 'warning' : 'danger'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Dropdown menu={actionMenu} trigger={['click']} placement="bottomRight">
                        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MoreVertical size={16} />
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                )}) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '60px 20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#fcf8f2', padding: '16px', borderRadius: '50%' }}>
                          <Search size={48} color="#d3a763" />
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
              <span className="pagination-info">Showing {filteredProducts.length > 0 ? Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length) : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products</span>
              <div className="pagination-controls-right">
                <div className="pagination-controls">
                  <button className="page-btn" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}><ChevronLeft size={14} /></button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                  ))}
                  <button className="page-btn" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions at the bottom */}
          <div className="quick-actions-section">
            <h4 className="section-title">Quick Actions</h4>
            <div className="quick-actions-grid">
              <button className="quick-action-card" onClick={handleAddNew}>
                <div className="qa-icon-wrapper">
                  <Plus size={24} color="#cd873e" strokeWidth={1.5} />
                </div>
                <span>Add Product</span>
              </button>
              <button className="quick-action-card">
                <Grid size={28} color="#cd873e" strokeWidth={1.5} className="qa-icon" />
                <span>Add Category</span>
              </button>
              <button className="quick-action-card" onClick={() => setIsAddingBrand(true)}>
                <Tag size={28} color="#cd873e" strokeWidth={1.5} className="qa-icon" />
                <span>Add Brand</span>
              </button>
              <button className="quick-action-card">
                <Bell size={28} color="#cd873e" strokeWidth={1.5} className="qa-icon" />
                <span>Stock Alert</span>
              </button>
              <button className="quick-action-card" onClick={() => setIsImportModalOpen(true)}>
                <CloudUpload size={28} color="#cd873e" strokeWidth={1.5} className="qa-icon" />
                <span>Import Products</span>
              </button>
              <button className="quick-action-card">
                <CloudDownload size={28} color="#cd873e" strokeWidth={1.5} className="qa-icon" />
                <span>Export Products</span>
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Edit View */}
      {isEditing && (
        <AddNewProduct editingProduct={editingProduct} onSave={async (updatedProduct) => {
          try {
            if (editingProduct) { 
              const res = await updateProduct(editingProduct.id, updatedProduct);
              if (res.success) {
                await fetchProducts();
                message.success('Product updated successfully!');
                setIsEditing(false);
              } else {
                message.error(res.message || 'Failed to update product');
              }
            } else { 
              const res = await createProduct(updatedProduct);
              if (res.success) {
                await fetchProducts();
                message.success('Product created successfully!');
                setIsEditing(false);
              } else {
                message.error(res.message || 'Failed to create product');
              }
            }
          } catch (err) {
            console.error("Error saving product", err);
            message.error("An error occurred while saving.");
          }
        }} onCancel={() => setIsEditing(false)} />
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="import-modal-overlay">
          <div className="import-modal">
            <div className="import-modal-header">
              <div>
                <h2 className="import-modal-title">Import Products</h2>
                <p className="import-modal-subtitle">Upload an Excel file (.xls or .xlsx) to import products in bulk.</p>
              </div>
              <button className="import-modal-close" onClick={() => setIsImportModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="import-stepper">
              <div className="step active">
                <div className="step-circle">1</div>
                <span>Upload File</span>
              </div>
              <div className="step-line"></div>
              <div className="step">
                <div className="step-circle">2</div>
                <span>Map Columns</span>
              </div>
              <div className="step-line"></div>
              <div className="step">
                <div className="step-circle">3</div>
                <span>Preview Data</span>
              </div>
              <div className="step-line"></div>
              <div className="step">
                <div className="step-circle">4</div>
                <span>Import</span>
              </div>
            </div>

            <div className="import-drag-area">
              <input 
                type="file" 
                ref={importFileInputRef} 
                style={{ display: 'none' }} 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
              />
              <div className="excel-icon-wrapper">
                <FileSpreadsheet size={48} color="#217346" strokeWidth={1.5} />
              </div>
              <p className="drag-title">Drag and drop your Excel file here</p>
              <p className="drag-or">or</p>
              <button className="btn-solid-brown" onClick={handleChooseFile}>Choose File</button>
              <p className="drag-supported">Only Excel files (.xls, .xlsx) are supported</p>
              <p className="drag-size">Maximum file size: 10MB</p>
            </div>

            <div className="import-download-sample" onClick={handleDownloadSample}>
              <div className="sample-icon">
                <FileSpreadsheet size={20} color="#217346" />
              </div>
              <div className="sample-text">
                <h4>Download Sample File</h4>
                <p>Get the example format to prepare your Excel file</p>
              </div>
              <Download size={20} color="#666" style={{ marginLeft: 'auto' }} />
            </div>

            <div className="import-notes">
              <h4>Important Notes</h4>
              <ul>
                <li><Check size={14} color="#d37920" /> First row of your file should contain column headers.</li>
                <li><Check size={14} color="#d37920" /> Make sure your file follows the sample format.</li>
                <li><Check size={14} color="#d37920" /> Image URLs in Excel will be used for product images.</li>
                <li><Check size={14} color="#d37920" /> Duplicate products (by SKU) will be skipped.</li>
              </ul>
            </div>

            <div className="import-modal-footer">
              <button className="btn-outline" onClick={() => setIsImportModalOpen(false)} style={{ padding: '10px 24px', border: '1px solid #d1d5db', background: '#fff', color: '#111827', borderRadius: '6px', fontWeight: 'bold' }}>Cancel</button>
              <button className="btn-solid-brown" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>Next <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;