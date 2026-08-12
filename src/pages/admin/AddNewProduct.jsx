import React, { useState } from 'react';
import { 
  ArrowRight, Search, Plus, Image as ImageIcon, 
  Lightbulb, Bold, Italic, Underline, List, Link,
  Check, X, Upload, Copy, Eye, Save,
  Truck, Settings, Wallet, ArrowLeftRight, Home, Star, Info, ChevronDown,
  Hash, Shirt, Calendar, Trash2, Ruler, Puzzle, Tag, Package
} from 'lucide-react';

const AddNewProduct = ({ editingProduct, onSave, onCancel }) => {
  const [productName, setProductName] = useState(editingProduct?.name || '');
  const [price, setPrice] = useState(editingProduct?.price?.replace(/[^0-9.]/g, '') || '');
  const [sku, setSku] = useState(editingProduct?.sku || '');
  const [category, setCategory] = useState(editingProduct?.cat || '');
  const [brand, setBrand] = useState(editingProduct?.brand || '');
  const [stock, setStock] = useState(editingProduct?.stock || '');
  const [status, setStatus] = useState(editingProduct?.status || 'In Stock');
  const [discount, setDiscount] = useState(editingProduct?.discount?.replace(/[^0-9]/g, '') || '');
  const [activePage, setActivePage] = useState(1);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState({ 1: null, 2: null, 3: null, 4: null });


  const handleSaveClick = () => {
    onSave({
      id: editingProduct?.id || Date.now(),
      name: productName,
      price: `₹${price}`,
      sku: sku || 'SKU-001',
      cat: category || 'Uncategorized',
      brand: brand || 'Generic',
      stock: parseInt(stock) || 0,
      status: status,
      discount: discount ? `${discount}% OFF` : '',
      oldPrice: `₹${price}`,
      img: coverImage || editingProduct?.img || "https://pngimg.com/uploads/box/box_PNG8.png",
      gallery: galleryImages
    });
  };

  return (
    <div className="add-product-page" style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #f0f0f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
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
            <button className="btn-cancel" onClick={onCancel} style={{ padding: '8px 16px', border: '1px solid #d1d5db', background: '#fff', color: '#111827', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
            <button className="btn-save" onClick={handleSaveClick} style={{ padding: '8px 16px', border: 'none', background: '#a66c24', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>Save Product <Save size={16} /></button>
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
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                          <option value="">Select category</option>
                          <option value="Men Clothing">Men Clothing</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Footwear">Footwear</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Brand <span className="req">*</span></label>
                        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                          <option value="">Select brand</option>
                          <option value="Roadster">Roadster</option>
                          <option value="Nike">Nike</option>
                          <option value="Fastrack">Fastrack</option>
                          <option value="Adidas">Adidas</option>
                          <option value="Ray-Ban">Ray-Ban</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <input type="text" placeholder="Enter tags and press Enter" />
                    </div>
                    <div className="form-group">
                      <label>Full Description <span className="req">*</span></label>
                      <div className="rich-text-editor">
                        <div className="editor-toolbar">
                          <select className="format-select"><option>Paragraph</option></select>
                          <button><Bold size={14}/></button>
                          <button><Italic size={14}/></button>
                          <button><Underline size={14}/></button>
                          <button><List size={14}/></button>
                          <button><Link size={14}/></button>
                        </div>
                        <textarea placeholder="Write full description here..." rows="4"></textarea>
                        <div className="char-count">0 / 2000</div>
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
                    <div className="cover-image-upload" style={{ marginBottom: '24px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Cover Image <span className="req" style={{ color: '#dc2626' }}>*</span></label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setCoverImage(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                          style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
                        />
                        {coverImage && (
                          <div style={{ width: '160px', height: '160px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', position: 'relative' }}>
                            <img src={coverImage} alt="Cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="gallery-images-upload" style={{ marginBottom: '24px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Gallery Images</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files).slice(0, 4);
                            
                            files.forEach((file, index) => {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setGalleryImages(prev => ({ ...prev, [index + 1]: reader.result }));
                              };
                              reader.readAsDataURL(file);
                            });
                          }} 
                          style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }}
                        />
                        <div className="gallery-grid" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {[1, 2, 3, 4].map(i => galleryImages[i] && (
                            <div key={i} style={{ width: '70px', height: '70px', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                              <img src={galleryImages[i]} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ))}
                        </div>
                      </div>
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
                        <select style={{ width: '100%', boxSizing: 'border-box' }}><option>Percentage</option></select>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Discount (%)</label>
                        <input type="text" placeholder="Enter discount" value={discount} onChange={e => setDiscount(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Cost Price (₹)</label>
                        <input type="text" placeholder="Enter cost price" style={{ width: '100%', boxSizing: 'border-box' }} />
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Stock Quantity <span className="req" style={{ color: '#dc2626' }}>*</span></label>
                        <input type="text" placeholder="Enter stock" value={stock} onChange={e => setStock(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }} />
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Low Stock Alert</label>
                        <input type="text" placeholder="Enter alert quantity" style={{ width: '100%', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                      <div className="form-group">
                        <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Sale Price (₹)</label>
                        <input type="text" placeholder="Auto calculated" value={discount && price ? price - (price * (discount / 100)) : price} disabled style={{ width: '100%', boxSizing: 'border-box', background: '#f5f5f5', color: '#888' }} />
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '11px', fontWeight: '700', marginBottom: '8px', display: 'block', color: '#111827' }}>Product Status <span className="req" style={{ color: '#dc2626' }}>*</span></label>
                        <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }}>
                          <option value="In Stock">In Stock</option>
                          <option value="Low Stock">Low Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                          <option value="Draft">Draft</option>
                        </select>
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
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'].map(size => (
                          <div key={size} className="variant-pill" style={{ border: '1px solid #e5e7eb', padding: '10px 18px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer', background: '#fcfcfc', minWidth: '40px', textAlign: 'center' }}>{size}</div>
                        ))}
                        <button onClick={() => alert("Add Size functionality will be implemented here!")} style={{ padding: '10px 20px', borderRadius: '6px', border: '1px dashed #d1b48c', color: '#a66c24', background: '#fdfbf7', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Plus size={14} color="#a66c24"/> Add Size</button>
                      </div>
                    </div>
                    
                    <hr style={{ border: 'none', borderTop: '1px dashed #e5e7eb', margin: '24px 0' }} />

                    <div className="variant-row">
                      <label style={{ display: 'block', margin: 0, fontWeight: 700, fontSize: '13px', color: '#111827', marginBottom: '16px' }}>Color</label>
                      <div className="variant-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="color-pill" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#fcfcfc', cursor: 'pointer' }}><span style={{background:'#000', width: '16px', height: '16px', borderRadius: '50%', display: 'inline-block'}}></span>Black</div>
                        <div className="color-pill" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#fcfcfc', cursor: 'pointer' }}><span style={{background:'#fff', border:'1px solid #d1d5db', width: '16px', height: '16px', borderRadius: '50%', display: 'inline-block'}}></span>White</div>
                        <div className="color-pill" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#fcfcfc', cursor: 'pointer' }}><span style={{background:'#2563eb', width: '16px', height: '16px', borderRadius: '50%', display: 'inline-block'}}></span>Blue</div>
                        <div className="color-pill" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#fcfcfc', cursor: 'pointer' }}><span style={{background:'#dc2626', width: '16px', height: '16px', borderRadius: '50%', display: 'inline-block'}}></span>Red</div>
                        <div className="color-pill" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#fcfcfc', cursor: 'pointer' }}><span style={{background:'#16a34a', width: '16px', height: '16px', borderRadius: '50%', display: 'inline-block'}}></span>Green</div>
                        
                        <div className="color-pill" style={{ position: 'relative', border: '1px solid #a66c24', borderRadius: '6px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#a66c24', background: '#fff9f0', cursor: 'pointer' }}>
                          <span style={{background:'#eab308', width: '16px', height: '16px', borderRadius: '50%', display: 'inline-block'}}></span>Yellow
                          <div style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#a66c24', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={10} strokeWidth={4} />
                          </div>
                        </div>

                        <button onClick={() => alert("Add Color functionality will be implemented here!")} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px dashed #d1b48c', color: '#a66c24', background: '#fdfbf7', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <Plus size={14} color="#a66c24"/> Add Color
                        </button>
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
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: '#fdfbf7', padding: '6px', borderRadius: '6px' }}><Hash size={14} color="#111827" /></div> Fabric
                          </td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter value" style={{ fontSize: '12px', width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }} /></td>
                          <td style={{ padding: '16px', textAlign: 'center' }}><button style={{ background: 'transparent', border: '1px solid #fee2e2', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><Trash2 size={14} /></button></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: '#fdfbf7', padding: '6px', borderRadius: '6px' }}><Shirt size={14} color="#111827" /></div> Fit
                          </td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter value" style={{ fontSize: '12px', width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }} /></td>
                          <td style={{ padding: '16px', textAlign: 'center' }}><button style={{ background: 'transparent', border: '1px solid #fee2e2', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><Trash2 size={14} /></button></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: '#fdfbf7', padding: '6px', borderRadius: '6px' }}><Shirt size={14} color="#111827" /></div> Sleeve
                          </td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter value" style={{ fontSize: '12px', width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }} /></td>
                          <td style={{ padding: '16px', textAlign: 'center' }}><button style={{ background: 'transparent', border: '1px solid #fee2e2', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><Trash2 size={14} /></button></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ background: '#fdfbf7', padding: '6px', borderRadius: '6px' }}><Calendar size={14} color="#111827" /></div> Occasion
                          </td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter value" style={{ fontSize: '12px', width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }} /></td>
                          <td style={{ padding: '16px', textAlign: 'center' }}><button style={{ background: 'transparent', border: '1px solid #fee2e2', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><Trash2 size={14} /></button></td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-3" style={{ padding: '16px' }}>
                      <button onClick={() => alert("Add Row functionality will be implemented here!")} className="btn-outline-orange" style={{ padding: '8px 16px', borderRadius: '6px', border: '1px dashed #d3a763', color: '#a66c24', background: '#fdfbf7', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Plus size={14} color="#a66c24"/> Add Row</button>
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
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', textAlign: 'center' }}><div style={{ background: '#fdfbf7', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', fontSize: '12px', fontWeight: 'bold', color: '#111827' }}>S</div></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', textAlign: 'center' }}><div style={{ background: '#fdfbf7', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', fontSize: '12px', fontWeight: 'bold', color: '#111827' }}>M</div></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', textAlign: 'center' }}><div style={{ background: '#fdfbf7', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', fontSize: '12px', fontWeight: 'bold', color: '#111827' }}>L</div></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9eedc' }}>
                          <td style={{ padding: '16px', textAlign: 'center' }}><div style={{ background: '#fdfbf7', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', fontSize: '12px', fontWeight: 'bold', color: '#111827' }}>XL</div></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                          <td style={{ padding: '16px' }}><input type="text" placeholder="Enter" style={{ fontSize: '12px', width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box', textAlign: 'center' }} /></td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-3" style={{ padding: '16px' }}>
                      <button onClick={() => alert("Add Row functionality will be implemented here!")} className="btn-outline-orange" style={{ padding: '8px 16px', borderRadius: '6px', border: '1px dashed #d3a763', color: '#a66c24', background: '#fdfbf7', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Plus size={14} color="#a66c24"/> Add Row</button>
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
                        <input type="text" placeholder="Enter meta title" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
                        <div className="char-count" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#9ca3af' }}>0 / 60</div>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '4px', display: 'block' }}>Meta Description</label>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>This will be the description shown in search engine results.</p>
                      <div style={{ position: 'relative' }}>
                        <textarea placeholder="Enter meta description" rows="4" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
                        <div className="char-count" style={{ position: 'absolute', right: '16px', bottom: '12px', fontSize: '12px', color: '#9ca3af' }}>0 / 160</div>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '4px', display: 'block' }}>Keywords</label>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>Enter relevant keywords separated by commas.</p>
                      <input type="text" placeholder="Enter keywords (comma separated)" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div style={{ background: '#fdfbf7', border: '1px solid #f9eedc', borderRadius: '8px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Lightbulb size={20} color="#a66c24" />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '700', color: '#a66c24' }}>SEO Tip</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>Use relevant keywords in your title, description and<br/>keywords to improve your product ranking.</p>
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
                    <button onClick={() => alert("Add FAQ functionality will be implemented here!")} style={{ background: '#fff', border: '1px solid #f9eedc', color: '#a66c24', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><Plus size={14} color="#a66c24"/> Add FAQ</button>
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
                          <tr>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#374151', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', fontWeight: '600' }}>What is the fabric of this<br/>product?</td>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#6b7280', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', lineHeight: '1.6' }}>This product is made of premium<br/>quality fabric for maximum comfort.</td>
                            <td style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #f9eedc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                 <span style={{ color: '#a66c24', fontWeight: 'bold', letterSpacing: '2px', lineHeight: '0', position: 'relative', top: '-4px' }}>...</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#374151', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', fontWeight: '600' }}>Is this product returnable?</td>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#6b7280', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', lineHeight: '1.6' }}>Yes, you can return this product within<br/>7 days of delivery.</td>
                            <td style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #f9eedc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                 <span style={{ color: '#a66c24', fontWeight: 'bold', letterSpacing: '2px', lineHeight: '0', position: 'relative', top: '-4px' }}>...</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#374151', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', fontWeight: '600' }}>How long does delivery take?</td>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#6b7280', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top', lineHeight: '1.6' }}>Delivery usually takes 3-5 business<br/>days depending on your location.</td>
                            <td style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #f9eedc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                 <span style={{ color: '#a66c24', fontWeight: 'bold', letterSpacing: '2px', lineHeight: '0', position: 'relative', top: '-4px' }}>...</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center" style={{ marginTop: '24px' }}>
                      <button style={{ width: '100%', background: '#fdfbf7', border: '1px solid #f9eedc', borderRadius: '6px', color: '#a66c24', fontSize: '13px', fontWeight: '700', padding: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>View All FAQs &rarr;</button>
                    </div>
                  </div>
                </div>

                <div className="new-card" style={{ flex: 1, margin: 0 }}>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', borderBottom: 'none' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span className="card-badge" style={{ background: '#a66c24', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>9</span>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Customer Reviews</h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>See what customers are saying about your products.</p>
                      </div>
                    </div>
                    <button onClick={() => alert("Add Review functionality will be implemented here!")} style={{ background: '#fff', border: '1px solid #f9eedc', color: '#a66c24', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><Plus size={14} color="#a66c24"/> Add Review</button>
                  </div>
                  <div className="card-body" style={{ padding: '0 24px 24px 24px' }}>
                    <div style={{ border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden' }}>
                      <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ background: '#fdfbf7' }}>
                            <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #f0f0f0' }}>Customer</th>
                            <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #f0f0f0' }}>Rating</th>
                            <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #f0f0f0' }}>Review</th>
                            <th style={{ textAlign: 'right', padding: '16px', fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #f0f0f0' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src="https://i.pravatar.cc/150?u=priya" alt="Priya" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ fontSize: '12px', color: '#374151', fontWeight: '600' }}>Priya Sharma</span>
                              </div>
                            </td>
                            <td style={{ padding: '20px 16px', color: '#a66c24', fontSize: '14px', borderBottom: '1px solid #f0f0f0', letterSpacing: '4px' }}>★★★★★</td>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#4b5563', borderBottom: '1px solid #f0f0f0', lineHeight: '1.6' }}>Excellent quality<br/>and fit!</td>
                            <td style={{ padding: '20px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}><span style={{ color: '#a66c24', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>View</span></td>
                          </tr>
                          <tr>
                            <td style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src="https://i.pravatar.cc/150?u=rahul" alt="Rahul" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ fontSize: '12px', color: '#374151', fontWeight: '600' }}>Rahul Verma</span>
                              </div>
                            </td>
                            <td style={{ padding: '20px 16px', color: '#a66c24', fontSize: '14px', borderBottom: '1px solid #f0f0f0', letterSpacing: '4px' }}>★★★★<span style={{color: '#d1d5db'}}>★</span></td>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#4b5563', borderBottom: '1px solid #f0f0f0', lineHeight: '1.6' }}>Very good product 👍</td>
                            <td style={{ padding: '20px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}><span style={{ color: '#a66c24', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>View</span></td>
                          </tr>
                          <tr>
                            <td style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src="https://i.pravatar.cc/150?u=anjali" alt="Anjali" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ fontSize: '12px', color: '#374151', fontWeight: '600' }}>Anjali Mehta</span>
                              </div>
                            </td>
                            <td style={{ padding: '20px 16px', color: '#a66c24', fontSize: '14px', borderBottom: '1px solid #f0f0f0', letterSpacing: '4px' }}>★★★★★</td>
                            <td style={{ padding: '20px 16px', fontSize: '12px', color: '#4b5563', borderBottom: '1px solid #f0f0f0', lineHeight: '1.6' }}>Worth the price.</td>
                            <td style={{ padding: '20px 16px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}><span style={{ color: '#a66c24', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>View</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center" style={{ marginTop: '24px' }}>
                      <button style={{ width: '100%', background: '#fdfbf7', border: '1px solid #f9eedc', borderRadius: '6px', color: '#a66c24', fontSize: '13px', fontWeight: '700', padding: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>View All Reviews &rarr;</button>
                    </div>
                  </div>
                </div>

                <div className="new-card" style={{ flex: 1, margin: 0 }}>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', borderBottom: 'none' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span className="card-badge" style={{ background: '#a66c24', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>10</span>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Next Customer Write a Review</h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Your feedback helps us and other customers.</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ display: 'flex', gap: '24px', padding: '0 24px 24px 24px' }}>
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fdfbf7', padding: '32px 24px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f9eedc' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff', border: '1px solid #f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><div style={{ color: '#a66c24', fontSize: '20px', transform: 'rotate(-45deg)' }}>✏️</div></div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '700', color: '#111827' }}>Share Your Experience</h4>
                      <p style={{ fontSize: '12px', color: '#4b5563', margin: 0, lineHeight: '1.6' }}>Be the first to review<br/>this product and help<br/>other customers.</p>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div className="form-group mb-4">
                          <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '12px', display: 'block' }}>Your Rating</label>
                          <div style={{ fontSize: '24px', letterSpacing: '8px', color: '#4b5563', fontWeight: '100' }}>☆ ☆ ☆ ☆ ☆</div>
                        </div>
                        <div className="form-group mb-4">
                          <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '12px', display: 'block' }}>Your Review</label>
                          <div style={{ position: 'relative' }}>
                            <textarea placeholder="Write your review about this product..." rows="6" style={{ width: '100%', padding: '16px', fontSize: '13px', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
                            <div style={{ position: 'absolute', right: '16px', bottom: '16px', fontSize: '12px', color: '#9ca3af' }}>0 / 500</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <button style={{ padding: '12px 24px', fontSize: '13px', fontWeight: 'bold', color: '#fff', background: '#a66c24', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Submit Review</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="new-card" style={{ flex: 1, margin: 0 }}>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', borderBottom: 'none' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span className="card-badge" style={{ background: '#a66c24', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>11</span>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Shipping Information</h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Manage shipping details for this product.</p>
                      </div>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #f9eedc', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Truck size={20} color="#a66c24" />
                    </div>
                  </div>
                  <div className="card-body" style={{ padding: '0 24px 24px 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                      <div className="form-group">
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '8px', display: 'block' }}>Shipping Weight (kg) <span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                          <input type="text" placeholder="Enter weight" style={{ flex: 1, padding: '10px 12px', fontSize: '13px', border: 'none', outline: 'none' }} />
                          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', background: '#f9fafb', borderLeft: '1px solid #e5e7eb', fontSize: '13px', color: '#374151', gap: '4px', cursor: 'pointer' }}>
                            kg <ChevronDown size={14} color="#6b7280" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '8px', display: 'block' }}>Shipping Class <span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <select style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none', appearance: 'none', background: '#fff', color: '#4b5563' }}>
                            <option>Select class</option>
                          </select>
                          <ChevronDown size={16} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '10px', pointerEvents: 'none' }} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '8px', display: 'block' }}>Free Shipping</label>
                        <div style={{ position: 'relative' }}>
                          <select style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none', appearance: 'none', background: '#fff', color: '#4b5563' }}>
                            <option>Select</option>
                          </select>
                          <ChevronDown size={16} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '10px', pointerEvents: 'none' }} />
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                      <div className="form-group">
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '8px', display: 'block' }}>Processing Time <span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <select style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none', appearance: 'none', background: '#fff', color: '#4b5563' }}>
                            <option>Select time</option>
                          </select>
                          <ChevronDown size={16} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '10px', pointerEvents: 'none' }} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '8px', display: 'block' }}>Delivery Time <span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <select style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none', appearance: 'none', background: '#fff', color: '#4b5563' }}>
                            <option>Select time</option>
                          </select>
                          <ChevronDown size={16} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '10px', pointerEvents: 'none' }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#fdfbf7', border: '1px solid #f9eedc', borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Info size={16} color="#a66c24" />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '700', color: '#a66c24' }}>Free Shipping</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#4b5563' }}>Select "Yes" to offer free shipping for this product.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="new-card" style={{ flex: 1, margin: 0 }}>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', borderBottom: 'none' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span className="card-badge" style={{ background: '#a66c24', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>12</span>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Additional Options</h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Configure extra options for this product.</p>
                      </div>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #f9eedc', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Settings size={20} color="#a66c24" />
                    </div>
                  </div>
                  <div className="card-body" style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', paddingBottom: '20px', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fdfbf7', border: '1px solid #f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Wallet size={16} color="#a66c24" />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Allow Cash on Delivery</span>
                        </div>
                        <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: '#a66c24', position: 'relative', cursor: 'pointer' }}><div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: '2px' }}></div></div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Require Prescription</span>
                        <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: '#d1d5db', position: 'relative', cursor: 'pointer' }}><div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: '2px' }}></div></div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '20px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fdfbf7', border: '1px solid #f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowLeftRight size={16} color="#a66c24" />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Allow Prepaid Return</span>
                        </div>
                        <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: '#d1d5db', position: 'relative', cursor: 'pointer' }}><div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: '2px' }}></div></div>
                      </div>
                      <div />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '20px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fdfbf7', border: '1px solid #f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Home size={16} color="#a66c24" />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Show on Homepage</span>
                        </div>
                        <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: '#a66c24', position: 'relative', cursor: 'pointer' }}><div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: '2px' }}></div></div>
                      </div>
                      <div />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', paddingTop: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fdfbf7', border: '1px solid #f9eedc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Star size={16} color="#a66c24" />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>Enable Product Reviews</span>
                        </div>
                        <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: '#a66c24', position: 'relative', cursor: 'pointer' }}><div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: '2px' }}></div></div>
                      </div>
                      <div />
                    </div>

                  </div>
                </div>

              {/* Row 4: Full Width */}
              <div className="new-card" style={{ gridColumn: '1 / -1' }}>
                <div className="card-header">
                  <span className="card-badge">13</span>
                  <h3>Related Products</h3>
                </div>
                <div className="card-body">
                  <div className="search-row" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div className="search-input" style={{ flex: 1, position: 'relative' }}>
                      <Search size={14} color="#999" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                      <input type="text" placeholder="Search products..." style={{ paddingLeft: '32px' }} />
                    </div>
                    <button onClick={() => alert("Add Related Product functionality will be implemented here!")} className="btn-text-add" style={{ padding: '8px 16px', border: '1px solid #efe5d4', background: '#fff', color: '#d37920', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>+ Add Product</button>
                  </div>
                  <div className="empty-related" style={{ marginTop: '24px', color: '#888', fontSize: '12px', textAlign: 'center' }}>No related products added</div>
                </div>
              </div>

            </>
          )}

          {/* Pagination Buttons */}
          <div style={{ gridColumn: '1 / -1', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 24px 0', marginTop: '0' }}>
            <div>
              {activePage === 2 ? (
                <button style={{ border: '1px solid #d1d5db', background: '#fff', color: '#111827', padding: '12px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setActivePage(1)}><span style={{ color: '#111827' }}>&larr;</span> Previous Page</button>
              ) : (
                <button style={{ border: '1px solid #d1d5db', background: '#fff', color: '#111827', padding: '12px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', margin: 0 }} onClick={onCancel}>Cancel</button>
              )}
            </div>
            
            <div className="pagination-dots" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: activePage === 1 ? '#a66c24' : '#fff', border: activePage === 1 ? 'none' : '1px solid #d1d5db', color: activePage === 1 ? '#fff' : '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActivePage(1)}>1</span>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: activePage === 2 ? '#a66c24' : '#fff', border: activePage === 2 ? 'none' : '1px solid #d1d5db', color: activePage === 2 ? '#fff' : '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActivePage(2)}>2</span>
            </div>
            
            <div>
              {activePage === 1 ? (
                <button style={{ background: '#a66c24', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setActivePage(2)}>Next Page <ArrowRight size={16}/></button>
              ) : (
                <button style={{ background: '#a66c24', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleSaveClick}>Save Product <Save size={16} /></button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
