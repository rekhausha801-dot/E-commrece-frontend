import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Grid, CheckCircle2, EyeOff, Trash2, Edit2, Star, ChevronDown, ChevronLeft, ChevronRight, X, Upload } from 'lucide-react';

const initialCategoryData = [
  { id: 1, name: 'Women', desc: 'Trendy clothing and accessories for women', products: 320, status: 'Active', featured: true, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100' },
  { id: 2, name: 'Men', desc: 'Stylish apparel and accessories for men', products: 278, status: 'Active', featured: true, img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=100' },
  { id: 3, name: 'Kids', desc: 'Fashion and essentials for kids', products: 156, status: 'Active', featured: true, img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=100' },
  { id: 4, name: 'Accessories', desc: 'Bags, watches, jewelry and more', products: 189, status: 'Active', featured: true, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100' },
  { id: 5, name: 'Footwear', desc: 'Footwear for men, women and kids', products: 212, status: 'Active', featured: true, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { id: 6, name: 'Ethnic Wear', desc: 'Traditional and ethnic collections', products: 98, status: 'Active', featured: false, img: 'https://images.unsplash.com/photo-1583391733959-f1830687f8aa?w=100' },
  { id: 7, name: 'Beauty & Personal Care', desc: 'Beauty, skincare and personal care products', products: 134, status: 'Active', featured: false, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100' },
  { id: 8, name: 'Home & Living', desc: 'Home decor, furniture and living essentials', products: 112, status: 'Active', featured: false, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100' },
];

const CategoryManagement = () => {
  const [categories, setCategories] = useState(initialCategoryData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const initialFormState = { name: '', img: '', desc: '', parent: 'Select category', order: '01', status: 'Active', featured: 'OFF' };
  const [formData, setFormData] = useState(initialFormState);

  // Computed values
  const filteredCategories = useMemo(() => {
    return categories.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [categories, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = {
    total: categories.length,
    active: categories.filter(c => c.status === 'Active').length,
    hidden: categories.filter(c => c.status === 'Hidden').length,
    deleted: 0
  };

  // Handlers
  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setFormData({
        name: category.name,
        desc: category.desc,
        img: category.img,
        parent: category.parent || 'Select category',
        order: category.order || '01',
        status: category.status,
        featured: category.featured ? 'ON' : 'OFF'
      });
    } else {
      setEditingId(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return alert('Category Name is required');
    
    const isFeatured = formData.featured === 'ON';

    if (editingId) {
      setCategories(prev => prev.map(c => 
        c.id === editingId ? { ...c, ...formData, featured: isFeatured } : c
      ));
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        featured: isFeatured,
        products: 0,
        img: formData.img || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100' // Placeholder
      };
      setCategories(prev => [newCategory, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
      // Adjust pagination if needed
      if (paginatedCategories.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh', borderRadius: '32px', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', fontFamily: '"Playfair Display", serif', color: '#111', margin: '0 0 8px 0' }}>Categories</h2>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Manage and organize your store categories</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          style={{ 
            backgroundColor: '#b88645', color: '#fff', border: 'none', padding: '12px 24px', 
            borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px',
            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid #f0ead6', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fdf9f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b88645' }}>
            <Grid size={24} />
          </div>
          <div>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px 0' }}>Total Categories</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#111' }}>{stats.total}</h3>
            <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>All Categories</p>
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid #f0ead6', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px 0' }}>Active Categories</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#111' }}>{stats.active}</h3>
            <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>Currently Active</p>
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid #f0ead6', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
            <EyeOff size={24} />
          </div>
          <div>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px 0' }}>Hidden Categories</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#111' }}>{stats.hidden}</h3>
            <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>Not Visible</p>
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid #f0ead6', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
            <Trash2 size={24} />
          </div>
          <div>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px 0' }}>Deleted Categories</p>
            <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#111' }}>{stats.deleted}</h3>
            <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>In Trash</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#999" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              style={{ padding: '10px 16px 10px 44px', border: '1px solid #e5e5e5', borderRadius: '8px', width: '280px', outline: 'none', fontSize: '14px' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              style={{ padding: '10px 36px 10px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', appearance: 'none', outline: 'none', backgroundColor: '#fff', fontSize: '14px', width: '160px', color: '#333', cursor: 'pointer' }}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Hidden</option>
            </select>
            <ChevronDown size={16} color="#666" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #f0ead6', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#fcfaf7', borderBottom: '1px solid #f0ead6' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Description</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Products</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Featured</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#888' }}>No categories found.</td>
              </tr>
            ) : (
              paginatedCategories.map((cat, index) => (
                <tr key={cat.id} style={{ borderBottom: index === paginatedCategories.length - 1 ? 'none' : '1px solid #f0ead6', backgroundColor: '#fff', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img src={cat.img} alt={cat.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <span style={{ fontWeight: '600', color: '#111', fontSize: '14px', fontFamily: '"Playfair Display", serif' }}>{cat.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#666', fontSize: '13px' }}>{cat.desc}</td>
                  <td style={{ padding: '16px 24px', color: '#666', fontSize: '14px' }}>{cat.products}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '6px 12px', 
                      backgroundColor: cat.status === 'Active' ? '#f0fdf4' : '#fff7ed', 
                      color: cat.status === 'Active' ? '#16a34a' : '#ea580c', 
                      borderRadius: '50px', fontSize: '12px', fontWeight: '500' 
                    }}>
                      {cat.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', 
                      backgroundColor: cat.featured ? '#fffbf0' : '#f9f9f9', 
                      color: cat.featured ? '#b88645' : '#888', 
                      borderRadius: '50px', fontSize: '12px', fontWeight: '500' 
                    }}>
                      <Star size={12} fill={cat.featured ? '#b88645' : 'transparent'} stroke={cat.featured ? '#b88645' : '#888'} />
                      {cat.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenModal(cat)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #f0ead6', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666', transition: 'all 0.2s' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #fee2e2', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', transition: 'all 0.2s' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e5e5', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#ccc' : '#666' }}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{ 
                  width: '32px', height: '32px', borderRadius: '8px', 
                  border: currentPage === i + 1 ? 'none' : '1px solid #e5e5e5', 
                  backgroundColor: currentPage === i + 1 ? '#b88645' : '#fff', 
                  color: currentPage === i + 1 ? '#fff' : '#666', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  cursor: 'pointer', fontWeight: '500', fontSize: '14px' 
                }}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e5e5', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#ccc' : '#666' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(17, 27, 66, 0.4)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', width: '540px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '0', boxShadow: '0 32px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(201,160,91,0.1)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid #f0ead6', position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)', zIndex: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', fontFamily: '"Playfair Display", serif', color: '#111' }}>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>{editingId ? 'Update your category details' : 'Create and organize your product category'}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#fcfaf7', border: '1px solid #f0ead6', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888', transition: 'all 0.2s ease' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Category Name <span style={{color: '#ef4444'}}>*</span></label>
                <input 
                  type="text" 
                  placeholder="Enter category name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e5e5', borderRadius: '10px', outline: 'none', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#fafafa', color: '#111' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Category Image <span style={{color: '#ef4444'}}>*</span></label>
                <div style={{ border: '2px dashed #eaddce', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', backgroundColor: '#fcfaf7', transition: 'all 0.2s ease' }}>
                  <div style={{ width: '64px', height: '64px', border: '1px solid #eaddce', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(201,160,91,0.08)' }}>
                    {formData.img ? (
                      <img src={formData.img} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <Upload size={20} color="#b88645" style={{ marginBottom: '4px' }} />
                        <span style={{ fontSize: '10px', fontWeight: '600', color: '#b88645' }}>Upload</span>
                      </>
                    )}
                  </div>
                  <div>
                    <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600', color: '#111' }}>JPG, PNG, WEBP</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Max 5 MB. Recommended: 800x800px</p>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Description</label>
                <textarea 
                  placeholder="Enter short category description..." 
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e5e5', borderRadius: '10px', outline: 'none', fontSize: '14px', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box', backgroundColor: '#fafafa', color: '#111' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Parent Category</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      value={formData.parent}
                      onChange={(e) => setFormData({...formData, parent: e.target.value})}
                      style={{ width: '100%', padding: '14px 40px 14px 16px', border: '1px solid #e5e5e5', borderRadius: '10px', outline: 'none', fontSize: '14px', backgroundColor: '#fafafa', color: '#111', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option>Select category</option>
                      <option>Women</option>
                      <option>Men</option>
                      <option>Kids</option>
                    </select>
                    <ChevronDown size={16} color="#666" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Display Order</label>
                  <input 
                    type="number" 
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: e.target.value})}
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e5e5', borderRadius: '10px', outline: 'none', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#fafafa', color: '#111' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Status</label>
                  <div 
                    onClick={() => setFormData({...formData, status: formData.status === 'Active' ? 'Hidden' : 'Active'})}
                    style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', backgroundColor: formData.status === 'Active' ? '#f0fdf4' : '#fff7ed', border: `1px solid ${formData.status === 'Active' ? '#bbf7d0' : '#fed7aa'}`, borderRadius: '10px', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: formData.status === 'Active' ? '#16a34a' : '#ea580c' }}></div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: formData.status === 'Active' ? '#166534' : '#9a3412' }}>{formData.status}</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Featured</label>
                  <div 
                    onClick={() => setFormData({...formData, featured: formData.featured === 'ON' ? 'OFF' : 'ON'})}
                    style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', backgroundColor: formData.featured === 'ON' ? '#fffbf0' : '#f9f9f9', border: `1px solid ${formData.featured === 'ON' ? '#fef08a' : '#e5e5e5'}`, borderRadius: '10px', gap: '8px', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Star size={16} fill={formData.featured === 'ON' ? '#b88645' : 'transparent'} color={formData.featured === 'ON' ? '#b88645' : '#888'} />
                      <span style={{ fontSize: '14px', fontWeight: '600', color: formData.featured === 'ON' ? '#854d0e' : '#666' }}>{formData.featured}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', padding: '24px 32px', borderTop: '1px solid #f0ead6', backgroundColor: '#fcfaf7', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #e5e5e5', backgroundColor: '#fff', color: '#555', fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s ease' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                style={{ padding: '12px 32px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #c9a05b 0%, #b88645 100%)', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 12px rgba(201,160,91,0.25)', transition: 'all 0.2s ease' }}
              >
                {editingId ? 'Update Category' : 'Save Category'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
