import React, { useState, useRef, useEffect } from 'react'; // HMR trigger
import {
  ArrowRight, Search, Plus, Image as ImageIcon,
  Lightbulb, Bold, Italic, Underline, List, Link,
  Check, X, Upload, Copy, Eye, Save, CloudUpload,
  Truck, Settings, Wallet, ArrowLeftRight, Home, Star, Info, ChevronDown,
  Hash, Shirt, Calendar, Trash2, Ruler, Puzzle, Tag, Package,
  Mountain, Feather, Flame, Leaf, Rocket, Compass, Send, Headphones, Palmtree, Flower2, MonitorPlay, Timer
} from 'lucide-react';
import { fetchCategories, fetchNextSku } from '../../services/api';

const CustomSelect = ({ value, onChange, options, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine display value
  let displayValue = placeholder;
  if (value !== undefined && value !== null && value !== '') {
    const selectedOpt = options.find(opt => (typeof opt === 'object' ? opt.value === value : opt === value));
    displayValue = selectedOpt ? (typeof selectedOpt === 'object' ? selectedOpt.label : selectedOpt) : value;
  }

  return (
    <div className="custom-select-container" ref={selectRef} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: disabled ? 'default' : 'pointer', width: '100%', fontSize: '14px', color: value ? '#111827' : '#6b7280', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#fff' }}
      >
        {displayValue}
        <ChevronDown size={14} style={{ color: '#6b7280' }} />
      </div>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e0d5c1', borderRadius: '8px', marginTop: '4px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {options.map((opt) => {
            const isObj = typeof opt === 'object';
            const optValue = isObj ? opt.value : opt;
            const optLabel = isObj ? opt.label : opt;
            return (
              <div
                key={optValue}
                className="custom-select-option"
                onClick={() => { if (onChange) onChange(optValue); setIsOpen(false); }}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AddNewProduct = ({ editingProduct, onSave, onCancel }) => {
  const [productName, setProductName] = useState(editingProduct?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [price, setPrice] = useState(editingProduct?.originalPrice?.replace(/[^0-9.]/g, '') || '');
  const [sku, setSku] = useState(editingProduct?.sku || '');
  const [category, setCategory] = useState(editingProduct?.categoryId || editingProduct?.category || '');
  const [brand, setBrand] = useState(editingProduct?.brand || '');
  const [stock, setStock] = useState(editingProduct?.stock || '');
  const [status, setStatus] = useState(editingProduct?.status || 'Active');
  const [discount, setDiscount] = useState(editingProduct?.discount?.replace(/[^0-9]/g, '') || '');
  const [discountType, setDiscountType] = useState(editingProduct?.discountType || 'Percentage');
  const [costPrice, setCostPrice] = useState(editingProduct?.costPrice || '');
  const [lowStockAlert, setLowStockAlert] = useState(editingProduct?.lowStockAlert || '');

  const [gstRate, setGstRate] = useState(editingProduct?.gstRate || 0);
  const [isCustomGst, setIsCustomGst] = useState(editingProduct && ![0, 5, 12, 18, 28].includes(editingProduct.gstRate) ? true : false);
  const [customGstRate, setCustomGstRate] = useState(editingProduct && ![0, 5, 12, 18, 28].includes(editingProduct.gstRate) ? editingProduct.gstRate : '');
  const [gstIncludedInPrice, setGstIncludedInPrice] = useState(editingProduct?.gstIncludedInPrice || false);

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    fetchCategories().then(res => {
      if (res.data && res.data.success) {
        const catOpts = res.data.data.map(c => ({ label: c.name, value: c._id }));
        setCategoryOptions(catOpts);
        if (!editingProduct?.cat && catOpts.length > 0) {
          setCategory(catOpts[0].value);
        }
      }
    }).catch(err => console.error("Error fetching categories:", err));
  }, [editingProduct]);

  useEffect(() => {
    // Only generate SKU if NOT editing, or if editing but SKU is empty
    if (!editingProduct || !editingProduct.sku) {
      fetchNextSku(category).then(res => {
        if (res.data && res.data.success) {
          setSku(res.data.sku);
        }
      }).catch(err => console.error("Error fetching next SKU:", err));
    }
  }, [category, editingProduct]);
  const [activePage, setActivePage] = useState(1);
  const [coverImage, setCoverImage] = useState(editingProduct?.img || null);
  const [galleryImages, setGalleryImages] = useState(() => {
    const init = { 1: null, 2: null, 3: null, 4: null };
    if (editingProduct?.gallery) {
      editingProduct.gallery.forEach((url, index) => {
        if (index < 4) init[index + 1] = url;
      });
    }
    return init;
  });
  const [isCustomizable, setIsCustomizable] = useState(editingProduct?.customizable || false);
  const [deliveryText, setDeliveryText] = useState(editingProduct?.deliveryText || 'Free Delivery on orders above ₹499');
  const [returnText, setReturnText] = useState(editingProduct?.returnText || '7 days return policy');
  const [warrantyText, setWarrantyText] = useState(editingProduct?.warrantyText || '100% secure checkout');
  const [initialRating, setInitialRating] = useState(editingProduct?.rating ?? 4.8);
  const [initialReviews, setInitialReviews] = useState(editingProduct?.reviews ?? 2547);
  const [badgeLabel, setBadgeLabel] = useState(editingProduct?.badge ?? 'PREMIUM COLLECTION');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [customDesigns, setCustomDesigns] = useState(editingProduct?.designs || []);
  const [newDesignName, setNewDesignName] = useState('');
  const [newDesignIcon, setNewDesignIcon] = useState('');
  const [newDesignColor, setNewDesignColor] = useState('#333333');

  const [seoTitle, setSeoTitle] = useState(editingProduct?.seoTitle || '');
  const [seoDesc, setSeoDesc] = useState(editingProduct?.seoDesc || '');
  const [seoKeywords, setSeoKeywords] = useState(editingProduct?.seoKeywords || '');
  const [description, setDescription] = useState(editingProduct?.description || '');
  const [tags, setTags] = useState(editingProduct?.tags || []);
  const [faqs, setFaqs] = useState(editingProduct?.faqs || []);
  const [relatedProducts, setRelatedProducts] = useState(editingProduct?.relatedProducts || []);
  const [relatedInput, setRelatedInput] = useState('');

  const [homeSection, setHomeSection] = useState(editingProduct?.homeSection || 'None');
  const [isLimitedOffer, setIsLimitedOffer] = useState(editingProduct?.isLimitedOffer || false);
  const [limitedOfferDetails, setLimitedOfferDetails] = useState({
    offerPrice: editingProduct?.limitedOfferDetails?.offerPrice || '',
    startDate: editingProduct?.limitedOfferDetails?.startDate ? new Date(editingProduct.limitedOfferDetails.startDate).toISOString().slice(0, 16) : '',
    endDate: editingProduct?.limitedOfferDetails?.endDate ? new Date(editingProduct.limitedOfferDetails.endDate).toISOString().slice(0, 16) : '',
    stockLimit: editingProduct?.limitedOfferDetails?.stockLimit || ''
  });

  // Variants
  const [selectedSizes, setSelectedSizes] = useState(editingProduct?.sizes || []);
  const [selectedColors, setSelectedColors] = useState(editingProduct?.colors || []);

  const initialSpecs = [
    { spec: 'Fabric', val: '' },
    { spec: 'Fit', val: '' },
    { spec: 'Sleeve', val: '' },
    { spec: 'Occasion', val: '' }
  ];
  const [specs, setSpecs] = useState(editingProduct?.specs?.length > 0 ? editingProduct.specs : initialSpecs);

  const initialSizeGuide = [
    { size: 'S', bust: '', waist: '', length: '' },
    { size: 'M', bust: '', waist: '', length: '' },
    { size: 'L', bust: '', waist: '', length: '' },
    { size: 'XL', bust: '', waist: '', length: '' }
  ];
  const [sizeGuide, setSizeGuide] = useState(editingProduct?.sizeGuide?.length > 0 ? editingProduct.sizeGuide : initialSizeGuide);

  useEffect(() => {
    if (editingProduct) {
      if (editingProduct.specs && editingProduct.specs.length > 0) {
        setSpecs(editingProduct.specs);
      }
      if (editingProduct.sizeGuide && editingProduct.sizeGuide.length > 0) {
        setSizeGuide(editingProduct.sizeGuide);
      }
    }
  }, [editingProduct]);

  useEffect(() => {
    // Standard measurements for auto-generation
    const STANDARD_MEASUREMENTS = {
      'XS': { bust: '32', waist: '26', length: '37' },
      'S': { bust: '34', waist: '28', length: '38' },
      'M': { bust: '36', waist: '30', length: '39' },
      'L': { bust: '38', waist: '32', length: '40' },
      'XL': { bust: '40', waist: '34', length: '41' },
      'XXL': { bust: '42', waist: '36', length: '42' },
      '3XL': { bust: '44', waist: '38', length: '43' },
      '4XL': { bust: '46', waist: '40', length: '44' },
      '5XL': { bust: '48', waist: '42', length: '45' }
    };

    // Sync sizeGuide with selectedSizes automatically
    setSizeGuide(prev => {
      const existing = new Map();
      prev.forEach(sg => existing.set(sg.size, sg));

      const newGuide = [];
      const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

      // Add all selected sizes
      selectedSizes.forEach(size => {
        if (existing.has(size)) {
          newGuide.push(existing.get(size));
          existing.delete(size);
        } else {
          // Pre-fill standard measurements if available
          const std = STANDARD_MEASUREMENTS[size] || { bust: '', waist: '', length: '' };
          newGuide.push({ size, bust: std.bust, waist: std.waist, length: std.length });
        }
      });

      // Add remaining existing sizes that are NOT in SIZES_LIST (custom added rows)
      existing.forEach((sg, size) => {
        if (!SIZES_LIST.includes(size) || size === '') {
          newGuide.push(sg);
        }
      });

      // Return initial size guide if nothing is selected and it's a new product, to avoid empty table
      if (newGuide.length === 0 && !editingProduct) {
        return [
          { size: 'S', ...STANDARD_MEASUREMENTS['S'] },
          { size: 'M', ...STANDARD_MEASUREMENTS['M'] },
          { size: 'L', ...STANDARD_MEASUREMENTS['L'] },
          { size: 'XL', ...STANDARD_MEASUREMENTS['XL'] }
        ];
      }
      return newGuide;
    });
  }, [selectedSizes, editingProduct]);

  const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];
  const COLORS_LIST = [
    { name: "Black", hex: "#000" },
    { name: "White", hex: "#fff" },
    { name: "Blue", hex: "#2563eb" },
    { name: "Red", hex: "#dc2626" },
    { name: "Green", hex: "#16a34a" },
    { name: "Yellow", hex: "#eab308" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Grey", hex: "#6b7280" }
  ];

  const toggleArrayItem = (arr, setArr, value) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };


  const handleSaveClick = async () => {
    if (isSaving) return;
    if (!productName || !productName.trim()) {
      alert("Product name is required.");
      return;
    }
    if (!sku || !sku.trim()) {
      alert("SKU is required.");
      return;
    }
    if (!category) {
      alert("Category is required.");
      return;
    }

    const p = Number(price);
    const d = Number(discount);
    if (!isNaN(p) && !isNaN(d) && d > 0) {
      if (discountType === 'Percentage' && d > 100) {
        alert('Percentage discount cannot exceed 100%');
        return;
      }
      if (discountType === 'Fixed' && d > p) {
        alert('Fixed discount cannot exceed the base price');
        return;
      }
    }

    setIsSaving(true);
    try {
      const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      let compressedCoverImage = null;
      if (coverImage instanceof File) {
        try {
          compressedCoverImage = await imageCompression(coverImage, options);
        } catch (error) {
          console.error("Cover image compression error:", error);
          compressedCoverImage = coverImage;
        }
      }

      const galleryList = Array.isArray(galleryImages) 
        ? galleryImages 
        : (galleryImages ? Object.values(galleryImages).filter(Boolean) : []);

      const compressedGalleryImages = await Promise.all(
        galleryList.map(async (img) => {
          if (img instanceof File) {
            try {
              return await imageCompression(img, options);
            } catch (error) {
              console.error("Gallery image compression error:", error);
              return img;
            }
          }
          return img;
        })
      );

      const productToSave = {
        id: editingProduct?.id || Date.now(),
        name: productName,
        price: !isNaN(Number(price)) ? Number(price) : 0,
        sku: sku,
        category: category,
        brand: brand || 'Generic',
        countInStock: parseInt(stock) || 0,
        description: description || "Default product description",
        status: status,
        discount: !isNaN(Number(discount)) ? Number(discount) : 0,
        oldPrice: `₹${price}`,
        imgFile: compressedCoverImage,
        existingImgUrl: !(coverImage instanceof File) ? (coverImage || editingProduct?.img || null) : null,
        existingCoverImagePublicId: !(coverImage instanceof File) && editingProduct?.images?.[0]?.public_id ? editingProduct.images[0].public_id : null,
        gallery: compressedGalleryImages, // this now contains Files and strings
        existingImages: editingProduct?.images || [], // pass the old images array so we know the public_ids
        customizable: isCustomizable,
        designs: customDesigns,
        discountType,
        costPrice: !isNaN(Number(costPrice)) ? Number(costPrice) : 0,
        lowStockAlert: parseInt(lowStockAlert) || 10,
        gstRate: isCustomGst ? Number(customGstRate) : Number(gstRate),
        gstIncludedInPrice,
        deliveryText,
        returnText,
        warrantyText,
        seoTitle,
        seoDesc,
        seoKeywords,
        faqs,
        relatedProducts,
        rating: initialRating,
        numReviews: initialReviews,
        badge: badgeLabel,
        sizes: selectedSizes,
        colors: selectedColors,
        tags: tags,
        specs: specs,
        sizeGuide: sizeGuide,
        homeSection: homeSection,
        limitedOfferDetails: (isLimitedOffer || homeSection === 'Limited Offers') ? limitedOfferDetails : null,
        isLimitedOffer: isLimitedOffer || homeSection === 'Limited Offers',
        limitedOfferEndDate: (isLimitedOffer || homeSection === 'Limited Offers') && limitedOfferDetails.endDate ? new Date(limitedOfferDetails.endDate).toISOString() : null
      };

      await onSave(productToSave);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const displaySectionOptions = [
    'None', 'Trending', 'Limited Offers', 'New Arrivals', 'Best Sellers', 'Featured', 'Kurti Collection', 'Shirt Collection',
    'Home - Hero Section', 'Home - Middle Section', 'Home - Bottom Section', 'Category Page', 'Product Page (All)',
    ...categoryOptions.flatMap(cat => [
      { label: `Category Page - ${cat.label}`, value: `Category Page - ${cat.label.toLowerCase().replace(/\s+/g, '-')}` },
      { label: `Product Page - ${cat.label}`, value: `Product Page - ${cat.label.toLowerCase().replace(/\s+/g, '-')}` }
    ]),
    'Product Page - Kurti', 'Product Page - T-Shirt', 'Product Page - Shirt', 'Product Page - Suit',
    'Checkout Page', 'Coupon Page'
  ];

  return (
    <div className="add-product-page" style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #f0f0f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '100%', flex: 1, overflowY: 'auto' }}>
      {/* Header */}
      <div className="add-product-header" style={{ marginBottom: '24px' }}>
        <div className="header-breadcrumbs" style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
          <span>Dashboard</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span>Products</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#a66c24', fontWeight: 'bold' }}>Add New Product</span>
        </div>
        <div className="header-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0', fontFamily: 'serif' }}>Add New Product</h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#4b5563' }}>Fill in the details below to add a new product to your store.</p>
          </div>
          <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-cancel" onClick={onCancel} style={{ padding: '8px 16px', border: '1px solid #d1d5db', background: '#fff', color: '#111827', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }} disabled={isSaving}>Cancel</button>
            <button className="btn-save" onClick={handleSaveClick} disabled={isSaving} style={{ padding: '8px 16px', border: 'none', background: isSaving ? '#d1d5db' : '#a66c24', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>{isSaving ? 'Saving...' : <>Save Product <Save size={16} /></>}</button>
          </div>
        </div>
      </div>

      <div className="add-product-container-full">
        {/* MAIN GRID */}
        <div className="main-grid-area">
          {activePage === 1 && (
            <>
              {/* Card 1: Basic Information */}
              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header">
                  <span className="card-badge" style={{ background: '#a66c24' }}>1</span>
                  <h3>Basic Information</h3>
                </div>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Name <span className="req">*</span></label>
                      <input type="text" placeholder="Enter product name" value={productName} onChange={e => setProductName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>SKU <span className="req">*</span></label>
                      <input type="text" placeholder="Enter SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category <span className="req">*</span></label>
                      <CustomSelect
                        value={category}
                        onChange={setCategory}
                        options={categoryOptions.length > 0 ? categoryOptions : ['Uncategorized']}
                        placeholder="Select category"
                      />
                    </div>
                    <div className="form-group">
                      <label>Brand <span className="req">*</span></label>
                      <CustomSelect
                        value={brand}
                        onChange={setBrand}
                        options={['Roadster', 'Nike', 'Fastrack', 'Adidas', 'Ray-Ban']}
                        placeholder="Select brand"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Tags</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      {tags.map((tag, i) => (
                        <span key={i} style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          {tag} <X size={12} style={{ cursor: 'pointer' }} onClick={() => setTags(tags.filter(t => t !== tag))} />
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter tags and press Enter"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          e.preventDefault();
                          if (!tags.includes(e.target.value.trim())) {
                            setTags([...tags, e.target.value.trim()]);
                          }
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Full Description <span className="req">*</span></label>
                    <div className="rich-text-editor">
                      <div className="editor-toolbar">
                        <select className="format-select"><option>Paragraph</option></select>
                        <button><Bold size={14} /></button>
                        <button><Italic size={14} /></button>
                        <button><Underline size={14} /></button>
                        <button><List size={14} /></button>
                        <button><Link size={14} /></button>
                      </div>
                      <textarea placeholder="Write full description here..." rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                      <div className="char-count">{description.length} / 2000</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Product Images */}
              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header">
                  <span className="card-badge" style={{ background: '#a66c24' }}>2</span>
                  <h3>Product Images</h3>
                </div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px', marginBottom: '24px' }}>
                    {/* Cover Image */}
                    <div className="cover-image-upload">
                      <label style={{ fontSize: '12px', fontWeight: '700', marginBottom: '12px', display: 'block', color: '#111827' }}>Cover Image <span className="req" style={{ color: '#dc2626' }}>*</span></label>
                      <div style={{
                        border: '1px dashed #d1d5db',
                        borderRadius: '8px',
                        padding: '32px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#fcfcfc',
                        cursor: 'pointer',
                        position: 'relative',
                        minHeight: '160px'
                      }} onClick={() => document.getElementById('cover-upload').click()}>
                        <input
                          id="cover-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) setCoverImage(file);
                          }}
                          style={{ display: 'none' }}
                        />
                        {coverImage ? (
                          <img src={typeof coverImage === 'string' ? coverImage : URL.createObjectURL(coverImage)} alt="Cover preview" style={{ width: '100%', height: '160px', objectFit: 'contain', borderRadius: '4px' }} />
                        ) : (
                          <>
                            <CloudUpload size={36} color="#6b7280" strokeWidth={1.5} style={{ marginBottom: '16px' }} />
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Drag & drop or click to upload</span>
                            <span style={{ fontSize: '11px', color: '#9ca3af' }}>JPG, PNG or WEBP (Max 2MB)</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="gallery-images-upload">
                      <label style={{ fontSize: '12px', fontWeight: '700', marginBottom: '12px', display: 'block', color: '#111827' }}>Gallery Images</label>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} style={{
                            width: '80px',
                            height: '80px',
                            border: '1px dashed #d1d5db',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#fcfcfc',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                          }} onClick={() => document.getElementById(`gallery-upload-${i}`).click()}>
                            <input
                              id={`gallery-upload-${i}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) setGalleryImages(prev => ({ ...prev, [i]: file }));
                              }}
                              style={{ display: 'none' }}
                            />
                            {galleryImages[i] ? (
                              <img src={typeof galleryImages[i] === 'string' ? galleryImages[i] : URL.createObjectURL(galleryImages[i])} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <Plus size={20} color="#6b7280" />
                            )}
                          </div>
                        ))}
                      </div>
                      <button style={{
                        padding: '8px 16px',
                        border: '1px solid #fde68a',
                        background: '#fff',
                        color: '#d97706',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Plus size={14} /> Add More Images
                      </button>
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px dashed #e5e7eb', margin: '24px 0' }} />

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MonitorPlay size={18} color="#a66c24" />
                      Home Page Visibility
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'end' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#374151' }}>Select Display Section</label>
                        <CustomSelect
                          value={homeSection}
                          onChange={setHomeSection}
                          options={displaySectionOptions}
                          placeholder="Select section"
                        />
                      </div>

                      <div style={{ paddingBottom: '10px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={homeSection === 'Limited Offers' || isLimitedOffer}
                            onChange={(e) => setIsLimitedOffer(e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: '#a66c24', cursor: 'pointer' }}
                          />
                          Set as Limited Offer (with Countdown Timer)
                        </label>
                      </div>
                    </div>

                    {(isLimitedOffer || homeSection === 'Limited Offers') && (
                      <div style={{ padding: '20px', marginTop: '20px', background: '#fdfbf7', borderRadius: '8px', border: '1px solid #f9eedc' }}>
                        <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#a66c24', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Timer size={16} />
                          Limited Offer Configuration
                        </h5>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div className="form-group" style={{ margin: 0, flex: 1, minWidth: 0 }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>Start Time</label>
                            <input
                              type="datetime-local"
                              value={limitedOfferDetails.startDate}
                              onChange={(e) => setLimitedOfferDetails({ ...limitedOfferDetails, startDate: e.target.value })}
                              style={{ width: '100%', padding: '8px 12px', fontSize: '13px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }}
                            />
                          </div>
                          <div className="form-group" style={{ margin: 0, flex: 1, minWidth: 0 }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>End Time</label>
                            <input
                              type="datetime-local"
                              value={limitedOfferDetails.endDate}
                              onChange={(e) => setLimitedOfferDetails({ ...limitedOfferDetails, endDate: e.target.value })}
                              style={{ width: '100%', padding: '8px 12px', fontSize: '13px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 3: Pricing & Inventory */}
              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="card-badge" style={{ background: '#a66c24' }}>3</span>
                    <h3>Pricing & Inventory</h3>
                  </div>
                  <Tag size={20} color="#a66c24" />
                </div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Base Price (₹)</label>
                      <input type="text" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Discount Type</label>
                      <select value={discountType} onChange={e => setDiscountType(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }}><option>Percentage</option><option>Fixed</option></select>
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Discount (%)</label>
                      <input type="text" placeholder="Enter discount" value={discount} onChange={e => setDiscount(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Cost Price (₹)</label>
                      <input type="text" placeholder="Enter cost price" value={costPrice} onChange={e => setCostPrice(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Stock Quantity <span className="req" style={{ color: '#dc2626' }}>*</span></label>
                      <input type="text" placeholder="Enter stock" value={stock} onChange={e => setStock(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Low Stock Alert</label>
                      <input type="text" placeholder="Enter alert quantity" value={lowStockAlert} onChange={e => setLowStockAlert(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Sale Price (₹)</label>
                      <input
                        type="text"
                        placeholder="Auto calculated"
                        value={(() => {
                          const p = Number(price);
                          const d = Number(discount);
                          if (isNaN(p) || isNaN(d) || p === 0) return price || '';
                          if (discountType === 'Fixed') {
                            return Math.max(0, p - d);
                          }
                          return Math.max(0, Math.round(p - (p * d / 100)));
                        })()}
                        disabled
                        style={{ width: '100%', boxSizing: 'border-box', background: '#f5f5f5', color: '#888' }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Product Status <span className="req" style={{ color: '#dc2626' }}>*</span></label>
                      <CustomSelect
                        value={status}
                        onChange={setStatus}
                        options={['Active', 'Draft', 'Out of Stock']}
                        placeholder="Select status"
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Rating (0-5)</label>
                      <input type="number" step="0.1" min="0" max="5" placeholder="e.g. 4.5" value={initialRating} onChange={e => setInitialRating(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Number of Reviews</label>
                      <input type="number" min="0" placeholder="e.g. 18" value={initialReviews} onChange={e => setInitialReviews(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <label style={{ fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', cursor: 'pointer' }}>
                        <input type="checkbox" checked={isCustomizable} onChange={(e) => setIsCustomizable(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                        Customizable Form
                      </label>
                      {isCustomizable ? (
                        <button onClick={() => setIsDesignModalOpen(true)} style={{ marginTop: '8px', marginLeft: '24px', padding: '6px 12px', background: '#fdfbf7', border: '1px dashed #a66c24', color: '#a66c24', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', width: 'fit-content' }}>Manage Designs</button>
                      ) : (
                        <p style={{ margin: '4px 0 0 24px', fontSize: '11px', color: '#6b7280' }}>Enable custom designs.</p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px', padding: '16px', background: '#fdfbf7', borderRadius: '8px', border: '1px solid #f9eedc' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>GST Rate</label>
                      <CustomSelect
                        value={isCustomGst ? 'Custom' : gstRate}
                        onChange={(val) => {
                          if (val === 'Custom') {
                            setIsCustomGst(true);
                          } else {
                            setIsCustomGst(false);
                            setGstRate(Number(val));
                          }
                        }}
                        options={[
                          { label: '0%', value: 0 },
                          { label: '5%', value: 5 },
                          { label: '12%', value: 12 },
                          { label: '18%', value: 18 },
                          { label: '28%', value: 28 },
                          { label: 'Custom', value: 'Custom' }
                        ]}
                        placeholder="Select GST Rate"
                      />
                    </div>
                    {isCustomGst && (
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Custom GST Rate (%)</label>
                        <input type="number" min="0" max="100" placeholder="e.g. 18" value={customGstRate} onChange={e => setCustomGstRate(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                      </div>
                    )}
                    <div className="form-group" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <label style={{ fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', cursor: 'pointer' }}>
                        <input type="checkbox" checked={gstIncludedInPrice} onChange={(e) => setGstIncludedInPrice(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                        Price Includes GST (Inclusive)
                      </label>
                      <p style={{ margin: '4px 0 0 24px', fontSize: '11px', color: '#6b7280' }}>If unchecked, GST is added at checkout.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Product Variants */}
              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="card-badge" style={{ background: '#a66c24' }}>4</span>
                    <h3>Product Variants</h3>
                  </div>
                  <Package size={20} color="#a66c24" />
                </div>
                <div className="card-body">
                  <div className="variant-row" style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', margin: 0, fontWeight: 700, fontSize: '13px', color: '#111827', marginBottom: '16px' }}>Size</label>
                    <div className="variant-options" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {SIZES_LIST.map(size => {
                        const isActive = selectedSizes.includes(size);
                        return (
                          <div
                            key={size}
                            onClick={() => toggleArrayItem(selectedSizes, setSelectedSizes, size)}
                            className="variant-pill"
                            style={{
                              border: isActive ? '1px solid #a66c24' : '1px solid #e5e7eb',
                              padding: '10px 18px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: isActive ? '#a66c24' : '#374151',
                              cursor: 'pointer',
                              background: isActive ? '#fff9f0' : '#fcfcfc',
                              minWidth: '40px',
                              textAlign: 'center',
                              position: 'relative'
                            }}
                          >
                            {size}
                            {isActive && (
                              <div style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#a66c24', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Check size={10} strokeWidth={4} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Specifications */}
              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="card-badge" style={{ background: '#a66c24' }}>5</span>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}><Puzzle size={18} color="#111827" /></div> Specifications</h3>
                </div>
                <div className="card-body p-0">
                  <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#fdfbf7' }}>
                      <tr>
                        <th style={{ fontSize: '12px', padding: '16px', color: '#111827', textAlign: 'left', fontWeight: 'bold' }}>Specification</th>
                        <th style={{ fontSize: '12px', padding: '16px', color: '#111827', textAlign: 'left', fontWeight: 'bold' }}>Value</th>
                        <th style={{ width: '40px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {specs.map((s, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: '#fdfbf7', padding: '6px', borderRadius: '6px' }}><Hash size={14} color="#111827" /></div>
                            <input
                              type="text"
                              value={s.spec}
                              onChange={(e) => { const newSpecs = [...specs]; newSpecs[index].spec = e.target.value; setSpecs(newSpecs); }}
                              placeholder="e.g. Fabric"
                              style={{ fontSize: '12px', width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', background: 'transparent' }}
                            />
                          </td>
                          <td style={{ padding: '16px' }}>
                            <input
                              type="text"
                              value={s.val}
                              onChange={(e) => { const newSpecs = [...specs]; newSpecs[index].val = e.target.value; setSpecs(newSpecs); }}
                              placeholder="Enter value"
                              style={{ fontSize: '12px', width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }}
                            />
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            <button onClick={() => setSpecs(specs.filter((_, i) => i !== index))} style={{ background: 'transparent', border: '1px solid #fee2e2', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-3" style={{ padding: '16px' }}>
                    <button onClick={() => setSpecs([...specs, { spec: '', val: '' }])} className="btn-outline-orange" style={{ padding: '8px 16px', borderRadius: '6px', border: '1px dashed #d3a763', color: '#a66c24', background: '#fdfbf7', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Plus size={14} color="#a66c24" /> Add Row</button>
                  </div>
                </div>
              </div>

              {/* Card 6: Size Guide */}
              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="card-badge" style={{ background: '#a66c24' }}>6</span>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}><Ruler size={18} color="#111827" /></div> Size Guide</h3>
                </div>
                <div className="card-body p-0">
                  <table className="spec-table center-text" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#fdfbf7' }}>
                      <tr>
                        <th style={{ fontSize: '12px', padding: '16px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Size</th>
                        <th style={{ fontSize: '12px', padding: '16px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Bust (in)</th>
                        <th style={{ fontSize: '12px', padding: '16px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Waist (in)</th>
                        <th style={{ fontSize: '12px', padding: '16px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map((sg, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <button onClick={() => setSizeGuide(sizeGuide.filter((_, i) => i !== index))} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', padding: '2px' }}><Trash2 size={12} /></button>
                            <input type="text" value={sg.size} onChange={e => { const newSg = [...sizeGuide]; newSg[index].size = e.target.value; setSizeGuide(newSg); }} placeholder="Size" style={{ width: '40px', background: '#fdfbf7', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', color: '#111827', border: '1px solid #e5e7eb', textAlign: 'center' }} />
                          </td>
                          <td style={{ padding: '16px' }}><input type="text" value={sg.bust} onChange={e => { const newSg = [...sizeGuide]; newSg[index].bust = e.target.value; setSizeGuide(newSg); }} placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" value={sg.waist} onChange={e => { const newSg = [...sizeGuide]; newSg[index].waist = e.target.value; setSizeGuide(newSg); }} placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" value={sg.length} onChange={e => { const newSg = [...sizeGuide]; newSg[index].length = e.target.value; setSizeGuide(newSg); }} placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-3" style={{ padding: '16px' }}>
                    <button onClick={() => setSizeGuide([...sizeGuide, { size: '', bust: '', waist: '', length: '' }])} className="btn-outline-orange" style={{ padding: '8px 16px', borderRadius: '6px', border: '1px dashed #d3a763', color: '#a66c24', background: '#fdfbf7', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Plus size={14} color="#a66c24" /> Add Row</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activePage === 2 && (
            <>
              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span className="card-badge" style={{ background: '#a66c24', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>7</span>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>SEO (Optional)</h3>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Optimize your product for search engines and improve visibility.</p>
                    </div>
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fdfbf7', border: '1px solid #f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Search size={18} color="#a66c24" />
                  </div>
                </div>
                <div className="card-body" style={{ padding: '0 24px 24px 24px' }}>
                  <div className="form-group mb-4">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '4px', display: 'block' }}>Meta Title</label>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>This will be the title shown in search engine results.</p>
                    <div style={{ position: 'relative' }}>
                      <input type="text" placeholder="Enter meta title" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
                      <div className="char-count" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#9ca3af' }}>{seoTitle.length} / 60</div>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '4px', display: 'block' }}>Meta Description</label>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>This will be the description shown in search engine results.</p>
                    <div style={{ position: 'relative' }}>
                      <textarea placeholder="Enter meta description" rows="4" value={seoDesc} onChange={e => setSeoDesc(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
                      <div className="char-count" style={{ position: 'absolute', right: '16px', bottom: '12px', fontSize: '12px', color: '#9ca3af' }}>{seoDesc.length} / 160</div>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '4px', display: 'block' }}>Keywords</label>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>Enter relevant keywords separated by commas.</p>
                    <input type="text" placeholder="Enter keywords (comma separated)" value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>

                  <div style={{ background: '#fdfbf7', border: '1px solid #f9eedc', borderRadius: '8px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Lightbulb size={20} color="#a66c24" />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '700', color: '#a66c24' }}>SEO Tip</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>Use relevant keywords in your title, description and<br />keywords to improve your product ranking.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="new-card" style={{ flex: 1, margin: 0 }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span className="card-badge" style={{ background: '#a66c24', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>8</span>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Frequently Asked Questions (FAQs)</h3>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Help customers find answers to common questions.</p>
                    </div>
                  </div>
                  <button onClick={() => setFaqs([...faqs, { question: '', answer: '', status: 'Active' }])} style={{ background: '#fff', border: '1px solid #f9eedc', color: '#a66c24', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', whiteSpace: 'nowrap' }}><Plus size={14} color="#a66c24" /> Add FAQ</button>
                </div>
                <div className="card-body" style={{ padding: '0 24px 24px 24px' }}>
                  <div style={{ border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden' }}>
                    <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#fdfbf7' }}>
                          <th style={{ width: '40%', textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #f0f0f0' }}>Question</th>
                          <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #f0f0f0' }}>Answer</th>
                          <th style={{ width: '70px', borderBottom: '1px solid #f0f0f0' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {faqs.map((faq, index) => (
                          <tr key={index}>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#374151', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', fontWeight: '600' }}>
                              <input type="text" value={faq.question} onChange={e => { const newFaqs = [...faqs]; newFaqs[index].question = e.target.value; setFaqs(newFaqs); }} placeholder="Enter Question" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </td>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#6b7280', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', lineHeight: '1.6' }}>
                              <input type="text" value={faq.answer} onChange={e => { const newFaqs = [...faqs]; newFaqs[index].answer = e.target.value; setFaqs(newFaqs); }} placeholder="Enter Answer" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </td>
                            <td style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                              <button onClick={() => setFaqs(faqs.filter((_, i) => i !== index))} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #f9eedc', background: 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Trash2 size={14} color="#ef4444" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {faqs.length === 0 && <p style={{ fontSize: '12px', color: '#888', margin: '16px 0 0 0', textAlign: 'center' }}>No FAQs added yet.</p>}
                </div>
              </div>



            </>
          )}

          {/* Pagination Buttons */}
          <div style={{ gridColumn: '1 / -1', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 24px 0', marginTop: '0' }}>
            <div>
              {activePage === 2 ? (
                <button type="button" style={{ border: '1px solid #d1d5db', background: '#fff', color: '#111827', padding: '12px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setActivePage(1)} disabled={isSaving}><span style={{ color: '#111827' }}>&larr;</span> Previous Page</button>
              ) : (
                <button type="button" style={{ border: '1px solid #d1d5db', background: '#fff', color: '#111827', padding: '12px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', margin: 0 }} onClick={onCancel} disabled={isSaving}>Cancel</button>
              )}
            </div>

            <div className="pagination-dots" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: activePage === 1 ? '#a66c24' : '#fff', border: activePage === 1 ? 'none' : '1px solid #d1d5db', color: activePage === 1 ? '#fff' : '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActivePage(1)}>1</span>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: activePage === 2 ? '#a66c24' : '#fff', border: activePage === 2 ? 'none' : '1px solid #d1d5db', color: activePage === 2 ? '#fff' : '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActivePage(2)}>2</span>
            </div>

            <div>
              {activePage === 1 ? (
                <button type="button" style={{ background: '#a66c24', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setActivePage(2)} disabled={isSaving}>Next Page <ArrowRight size={16} /></button>
              ) : (
                <button type="button" style={{ background: isSaving ? '#d1d5db' : '#a66c24', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSaveClick} disabled={isSaving}>{isSaving ? 'Saving...' : <>Save Product <Save size={16} /></>}</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Design Modal */}
      {isDesignModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Manage Custom Designs</h3>
              <button onClick={() => setIsDesignModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {customDesigns.map((design, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', border: '1px solid #eee', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {design.icon ? (
                        <img src={design.icon} alt={design.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                      ) : design.iconName ? (
                        (() => {
                          const IconComp = {
                            Flower2, Mountain, Feather, Flame, Leaf, Rocket, Compass, Send, Headphones, Palmtree
                          }[design.iconName];
                          return IconComp ? <IconComp size={20} color={design.iconColor || '#333'} strokeWidth={1.5} /> : <ImageIcon size={20} />;
                        })()
                      ) : (
                        <ImageIcon size={20} />
                      )}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{design.name}</span>
                  </div>
                  <button onClick={() => setCustomDesigns(customDesigns.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              ))}
              {customDesigns.length === 0 && <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>No designs added yet.</p>}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px' }}>Add New Design</h4>
                <button onClick={() => {
                  const defaultDesigns = [
                    { id: 101, name: 'Adventure', iconName: 'Mountain' },
                    { id: 102, name: 'Believe', iconName: 'Feather' },
                    { id: 103, name: 'Lion', iconName: 'Flame' },
                    { id: 104, name: 'Nature', iconName: 'Leaf' },
                    { id: 105, name: 'Astronaut', iconName: 'Rocket' }
                  ];
                  setCustomDesigns(defaultDesigns);
                }} style={{ background: '#fdfbf7', border: '1px dashed #a66c24', color: '#a66c24', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                  Load Predefined Designs
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                <input value={newDesignName} onChange={e => setNewDesignName(e.target.value)} type="text" placeholder="Design Name" style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />

                <input type="color" value={newDesignColor} onChange={e => setNewDesignColor(e.target.value)} style={{ width: '40px', height: '36px', padding: '0', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }} title="Design Color" />

                <input
                  type="file"
                  id="adminDesignUpload"
                  accept="image/svg+xml, image/png, image/jpeg, image/webp"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (uploadEvent) => {
                        setNewDesignIcon(uploadEvent.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <button
                  onClick={() => document.getElementById('adminDesignUpload').click()}
                  style={{ background: '#f5f5f5', color: '#333', padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                >
                  <Upload size={14} /> {newDesignIcon && !newDesignIcon.startsWith('http') && !['Mountain', 'Feather', 'Flame', 'Leaf', 'Rocket'].includes(newDesignIcon) ? 'SVG / Image Selected' : 'Upload SVG / Image'}
                </button>
              </div>

              {newDesignIcon && !['Mountain', 'Feather', 'Flame', 'Leaf', 'Rocket', 'Compass', 'Send', 'Headphones', 'Palmtree', 'Flower2'].includes(newDesignIcon) && (
                <div style={{ marginBottom: '12px', padding: '8px', border: '1px dashed #ddd', borderRadius: '4px', display: 'inline-block' }}>
                  <img src={newDesignIcon} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                </div>
              )}

              <button
                onClick={() => {
                  if (newDesignName.trim() && newDesignIcon) {
                    const isIconName = ['Mountain', 'Feather', 'Flame', 'Leaf', 'Rocket', 'Compass', 'Send', 'Headphones', 'Palmtree', 'Flower2'].includes(newDesignIcon);
                    setCustomDesigns([...customDesigns, { id: Date.now(), name: newDesignName, [isIconName ? 'iconName' : 'icon']: newDesignIcon, iconColor: newDesignColor, category: isIconName ? 'Predefined' : 'Uploaded' }]);
                    setNewDesignName('');
                    setNewDesignIcon('');
                    setNewDesignColor('#333333');
                    if (document.getElementById('adminDesignUpload')) {
                      document.getElementById('adminDesignUpload').value = '';
                    }
                  } else {
                    alert('Please enter a Design Name and Upload an Image');
                  }
                }}
                style={{ background: '#111827', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add Design
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewProduct;
