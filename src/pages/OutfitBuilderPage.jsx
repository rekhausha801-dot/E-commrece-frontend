import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { outfitProducts } from '../data/outfitProducts';
import { useOutfit } from '../hooks/useOutfit';
import { saveOutfit, getSavedOutfits } from '../utils/localStorage';

// Subcomponents
import CategoryFilter from '../components/OutfitBuilder/CategoryFilter';
import ProductCard from '../components/OutfitBuilder/ProductCard';
import CanvasToolbar from '../components/OutfitBuilder/CanvasToolbar';
import OutfitCanvas from '../components/OutfitBuilder/OutfitCanvas';
import OutfitSummary from '../components/OutfitBuilder/OutfitSummary';
import SavedOutfitsModal from '../components/OutfitBuilder/SavedOutfitsModal';
import '../components/OutfitBuilder/OutfitBuilder.css';

const OutfitBuilderPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const canvasRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedOutfits, setSavedOutfits] = useState([]);

  const { items, setItems, addItem, removeItem, updateItem, rotateItem, bringForward, sendBackward, resetCanvas, undo, redo, canUndo, canRedo } = useOutfit();

  const filteredProducts = outfitProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const location = useLocation();

  useEffect(() => {
    setSavedOutfits(getSavedOutfits());

    if (location.state && location.state.addOutfitProduct) {
      const p = location.state.addOutfitProduct;
      const priceNumber = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;

      const formattedProduct = {
        id: p.id.toString(), name: p.title, brand: p.brand || "Exclusive", price: priceNumber,
        rating: p.rating || 5, category: p.category || "Added Item", image: p.image
      };

      setTimeout(() => { addItem(formattedProduct); }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, addItem]);

  const handleDownload = async () => {
    if (!canvasRef.current || items.length === 0) {
      Swal.fire('Canvas Empty', 'Add items to canvas before downloading.', 'info'); return;
    }
    try {
      const canvas = await html2canvas(canvasRef.current, { backgroundColor: '#e9e9e9' });
      const link = document.createElement('a'); link.download = 'my-outfit.png'; link.href = canvas.toDataURL('image/png'); link.click();
      Swal.fire('Success', 'Outfit downloaded successfully!', 'success');
    } catch (err) { Swal.fire('Error', 'Failed to generate image.', 'error'); }
  };

  const handleSave = () => {
    if (items.length === 0) { Swal.fire('Canvas Empty', 'Add items to canvas before saving.', 'info'); return; }
    const saved = saveOutfit({ items });
    if (saved) { setSavedOutfits([saved, ...savedOutfits]); Swal.fire('Saved!', 'Your outfit has been saved.', 'success'); }
  };

  return (
    <div className="ob-wrapper">
      <div className="ob-container">

        {/* Left Panel: Categories & Products */}
        <div className="ob-panel">
          <div className="ob-card">
            <h3 className="ob-section-title">Choose Category</h3>
            <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <div className="ob-card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 className="ob-section-title" style={{ margin: 0 }}>{activeCategory}</h3>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>{filteredProducts.length} Items</span>
            </div>
            <div className="ob-products-grid">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addItem} />)}
            </div>
          </div>
        </div>

        {/* Center Panel: Canvas */}
        <div className="ob-center-panel">
          <div className="ob-studio-header">
            <h2 className="ob-studio-title">AVATAR STUDIO ✨</h2>
            <p className="ob-studio-subtitle">Create your own look</p>
          </div>
          <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 30, background: 'white', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <CanvasToolbar onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo} onReset={resetCanvas} onDownload={handleDownload} onSave={handleSave} onOpenSaved={() => setIsModalOpen(true)} />
          </div>
          <OutfitCanvas items={items} onRemove={removeItem} onUpdate={updateItem} onRotate={rotateItem} onBringForward={bringForward} onSendBackward={sendBackward} canvasRef={canvasRef} />
        </div>

        {/* Right Panel: Customize & Summary */}
        <div className="ob-panel">
          <div className="ob-card">
            <h3 className="ob-section-title">Customize Avatar</h3>

            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Skin Tone</span>
              <div className="ob-custom-row">
                {['#fce2c4', '#f5d0b5', '#d2996c', '#8d5524', '#3c2011'].map(color => (
                  <div key={color} className="ob-color-btn" style={{ background: color }} />
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Hair Color</span>
              <div className="ob-custom-row">
                {['#090806', '#3a2012', '#a56b46', '#e0b875', '#8a0303'].map(color => (
                  <div key={color} className="ob-color-btn" style={{ background: color }} />
                ))}
              </div>
            </div>
          </div>

          <div className="ob-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 className="ob-section-title">Outfit Summary</h3>
            <span style={{ fontSize: '0.75rem', color: '#666', marginBottom: '15px' }}>{items.length} Items Selected</span>

            <OutfitSummary items={items} totalPrice={totalPrice} />

            <div style={{ marginTop: 'auto' }}>
              <div className="ob-total-row">
                <span>Total Price</span>
                <span>₹{totalPrice}</span>
              </div>
              <button className="ob-btn-primary">Add Entire Outfit to Cart</button>
              <div className="ob-action-row">
                <button className="ob-btn-secondary" onClick={handleSave}>Save Outfit</button>
                <button className="ob-btn-secondary" onClick={handleDownload}>Download</button>
              </div>
            </div>
          </div>
        </div>

        <SavedOutfitsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} savedOutfits={savedOutfits} setSavedOutfits={setSavedOutfits} onLoadOutfit={(loadedItems) => { setItems(loadedItems); }} />
      </div>
    </div>
  );
};
export default OutfitBuilderPage;
