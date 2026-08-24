import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, CloudUpload, Plus, Save, RotateCcw, FileText, Image as ImageIcon, Contact, Images, ChevronDown, Tag, Barcode, CheckCircle2, LayoutGrid, Edit3 } from 'lucide-react';
import './BrandManagement.css';

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

  return (
    <div className="custom-select-container" ref={selectRef} style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'stretch' }}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: disabled ? 'default' : 'pointer', width: '100%', fontSize: '13px', color: value ? '#374151' : '#6b7280' }}
      >
        {value || placeholder}
        <ChevronDown size={14} style={{ color: '#6b7280' }} />
      </div>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e0d5c1', borderRadius: '8px', marginTop: '4px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {options.map((opt) => (
            <div 
              key={opt}
              className="custom-select-option"
              onClick={() => { onChange(opt); setIsOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddNewBrand = ({ onCancel, onSave, initialData, readOnly }) => {
  const [brandName, setBrandName] = useState(initialData?.name || '');
  const [brandSku, setBrandSku] = useState(initialData?.brandSku || initialData?.sku || '');
  const [status, setStatus] = useState(initialData?.status || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
  
  const [coverImage, setCoverImage] = useState(initialData?.logo || null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  
  const [galleryImages, setGalleryImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [galleryImageFiles, setGalleryImageFiles] = useState({ 1: null, 2: null, 3: null, 4: null });

  const handleReset = () => {
    setBrandName(initialData?.name || '');
    setBrandSku(initialData?.brandSku || initialData?.sku || '');
    setStatus(initialData?.status || '');
    setCategory(initialData?.category || '');
    setDescription(initialData?.description || '');
    setMetaTitle(initialData?.metaTitle || '');
    setMetaDescription(initialData?.metaDescription || '');
    setCoverImage(initialData?.logo || null);
    setCoverImageFile(null);
    setGalleryImages({ 1: null, 2: null, 3: null, 4: null });
    setGalleryImageFiles({ 1: null, 2: null, 3: null, 4: null });
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('brandName', brandName || 'New Brand');
    formData.append('brandSku', brandSku);
    formData.append('status', status || 'Active');
    formData.append('category', category || 'Uncategorized');
    formData.append('description', description);
    formData.append('metaTitle', metaTitle);
    formData.append('metaDescription', metaDescription);
    
    if (coverImageFile) {
      formData.append('brandLogo', coverImageFile);
    }
    
    Object.values(galleryImageFiles).forEach(file => {
      if (file) formData.append('galleryImages', file);
    });

    onSave(formData, initialData?.id);
  };

  return (
    <div className="add-brand-page">
      {/* Header Section */}
      <div className="bm-header-section">
        <div className="bm-breadcrumbs">
          <span className="bm-breadcrumb-item">Dashboard</span>
          <span className="bm-breadcrumb-separator">&gt;</span>
          <span className="bm-breadcrumb-item" onClick={onCancel} style={{ cursor: 'pointer' }}>Brands</span>
          <span className="bm-breadcrumb-separator">&gt;</span>
          <span className="bm-breadcrumb-item active" style={{ color: '#b88645' }}>{initialData ? 'Edit Brand' : 'Add Brand'}</span>
        </div>
        
        <div className="bm-header-title-row">
          <div>
            <h1 className="bm-page-title">{readOnly ? 'View Brand' : (initialData ? 'Edit Brand' : 'Add New Brand')}</h1>
            <div className="bm-ornate-divider" style={{ width: '100px', margin: '0' }}>
               <span className="bm-divider-line"></span>
               <span className="bm-divider-icon">⚜</span>
               <span className="bm-divider-line"></span>
            </div>
            <p className="bm-page-subtitle" style={{ marginTop: '12px' }}>{readOnly ? 'View brand details.' : (initialData ? 'Update brand details.' : 'Create a new brand for your store.')}</p>
          </div>
          <button className="ab-btn-back" onClick={onCancel}>
            <ArrowLeft size={16} /> Back to Brands
          </button>
        </div>
      </div>

      <div className="ab-main-content">
        {/* Brand Information Card */}
        <div className="ab-card">
          <div className="ab-card-header-styled">
            <div className="ab-header-left-border"></div>
            <div className="ab-card-icon-styled">
              <Contact size={20} />
            </div>
            <div className="ab-header-text">
              <h3>Brand Information</h3>
              <p>Enter brand details and basic information</p>
            </div>
            <div className="ab-header-dots">
              {[...Array(9)].map((_, i) => <span key={i} className="ab-dot"></span>)}
            </div>
          </div>
          <div className="ab-card-body">
            <div className="ab-form-row three-col">
              <div className="ab-form-group">
                <label>Brand Name {!readOnly && <span className="req">*</span>}</label>
                <div className="ab-input-with-icon">
                  <div className="ab-input-icon-box"><Tag size={16} /></div>
                  <input type="text" placeholder="Enter brand name" value={brandName} onChange={(e) => setBrandName(e.target.value)} disabled={readOnly} />
                </div>
                <span className="ab-helper-text">Enter the name of the brand</span>
              </div>
              <div className="ab-form-group">
                <label>Brand SKU {!readOnly && <span className="req">*</span>}</label>
                <div className="ab-input-with-icon">
                  <div className="ab-input-icon-box"><Barcode size={16} /></div>
                  <input type="text" placeholder="Enter unique SKU" value={brandSku} onChange={(e) => setBrandSku(e.target.value)} disabled={readOnly} />
                </div>
                <span className="ab-helper-text">Enter a unique SKU for this brand</span>
              </div>
              <div className="ab-form-group">
                <label>Status {!readOnly && <span className="req">*</span>}</label>
                <div className="ab-input-with-icon">
                  <div className="ab-input-icon-box success"><CheckCircle2 size={16} /></div>
                  <CustomSelect 
                    value={status} 
                    onChange={setStatus} 
                    options={['Active', 'Inactive']} 
                    placeholder="Select status" 
                    disabled={readOnly} 
                  />
                </div>
                <span className="ab-helper-text">Choose brand status</span>
              </div>
              
              <div className="ab-form-group">
                <label>Category</label>
                <div className="ab-input-with-icon">
                  <div className="ab-input-icon-box"><LayoutGrid size={16} /></div>
                  <CustomSelect 
                    value={category} 
                    onChange={setCategory} 
                    options={['Sports Wear', 'Footwear', 'Denim', 'Fashion']} 
                    placeholder="Select category" 
                    disabled={readOnly} 
                  />
                </div>
                <span className="ab-helper-text">Select the category for this brand</span>
              </div>
              <div className="ab-form-group ab-col-span-2">
                <label>Description</label>
                <div className="ab-input-with-icon textarea-icon">
                  <div className="ab-input-icon-box"><Edit3 size={16} /></div>
                  <textarea 
                    placeholder="Enter brand description..." 
                    rows="1" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value.substring(0, 250))}
                    disabled={readOnly}
                  ></textarea>
                  <div className="ab-char-count" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>{description.length} / 250</div>
                </div>
                <span className="ab-helper-text">Provide a short description about the brand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="ab-images-grid">
          {/* Brand Logo Card */}
          <div className="ab-card">
          <div className="ab-card-header-styled">
            <div className="ab-header-left-border"></div>
            <div className="ab-card-icon-styled">
              <ImageIcon size={20} />
            </div>
            <div className="ab-header-text">
              <h3>Brand Logo</h3>
              <p>Upload the official brand logo</p>
            </div>
            <div className="ab-header-dots">
              {[...Array(9)].map((_, i) => <span key={i} className="ab-dot"></span>)}
            </div>
          </div>
            <div className="ab-card-body">
              <div className="ab-image-dropzone" onClick={() => !readOnly && document.getElementById('logo-upload').click()}>
                <input 
                  id="logo-upload"
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setCoverImage(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }} 
                  style={{ display: 'none' }}
                />
                {coverImage ? (
                  <img src={coverImage} alt="Logo" style={{ width: '100%', height: '140px', objectFit: 'contain' }} />
                ) : (
                  <>
                    <CloudUpload size={32} color="#6b7280" style={{ marginBottom: '12px' }} />
                    <span className="ab-dropzone-text">Drag & drop your logo here</span>
                    <span className="ab-dropzone-text">or click to browse</span>
                    <span className="ab-dropzone-hint">PNG, JPG or WEBP (Max 2MB)</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Gallery Images Card */}
          <div className="ab-card">
          <div className="ab-card-header-styled">
            <div className="ab-header-left-border"></div>
            <div className="ab-card-icon-styled">
              <Images size={20} />
            </div>
            <div className="ab-header-text">
              <h3>Gallery Images <span className="ab-optional">(Optional)</span></h3>
              <p>Upload additional promotional images</p>
            </div>
            <div className="ab-header-dots">
              {[...Array(9)].map((_, i) => <span key={i} className="ab-dot"></span>)}
            </div>
          </div>
            <div className="ab-card-body">
              <div className="ab-gallery-grid">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="ab-gallery-item" onClick={() => !readOnly && document.getElementById(`gallery-upload-${i}`).click()}>
                    <input 
                      id={`gallery-upload-${i}`}
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setGalleryImages(prev => ({ ...prev, [i]: reader.result }));
                          reader.readAsDataURL(file);
                        }
                      }} 
                      style={{ display: 'none' }}
                    />
                    {galleryImages[i] ? (
                      <img src={galleryImages[i]} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Plus size={20} color="#6b7280" />
                    )}
                  </div>
                ))}
              </div>
              <p className="ab-gallery-hint">You can upload up to 4 images (PNG, JPG or WEBP, Max 2MB each)</p>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="ab-card">
          <div className="ab-card-header-styled">
            <div className="ab-header-left-border"></div>
            <div className="ab-card-icon-styled">
              <FileText size={20} />
            </div>
            <div className="ab-header-text">
              <h3>SEO Settings</h3>
              <p>Configure meta data for search engines</p>
            </div>
            <div className="ab-header-dots">
              {[...Array(9)].map((_, i) => <span key={i} className="ab-dot"></span>)}
            </div>
          </div>
          <div className="ab-card-body">
            <div className="ab-form-row two-col-equal">
              <div className="ab-form-group">
                <label>Meta Title (SEO)</label>
                <input type="text" placeholder="Enter meta title (optional)" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} disabled={readOnly} />
              </div>
              <div className="ab-form-group">
                <label>Meta Description (SEO)</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="Enter meta description (optional)" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value.substring(0, 160))} disabled={readOnly} />
                  <div className="ab-char-count-input">{metaDescription.length} / 160</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Footer Actions */}
      {!readOnly && (
        <div className="ab-footer-actions">
          <button className="ab-btn-reset" onClick={handleReset}>
            <RotateCcw size={16} /> Reset
          </button>
          <button className="ab-btn-save" onClick={handleSave}>
            <Save size={16} /> {initialData ? 'Update Brand' : 'Save Brand'}
          </button>
        </div>
      )}

    </div>
  );
};

export default AddNewBrand;
