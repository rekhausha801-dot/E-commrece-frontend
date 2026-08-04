import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { deleteSavedOutfit } from '../../utils/localStorage';

const SavedOutfitsModal = ({ isOpen, onClose, savedOutfits, setSavedOutfits, onLoadOutfit }) => {
  if (!isOpen) return null;
  const handleDelete = (id) => {
    deleteSavedOutfit(id);
    setSavedOutfits(savedOutfits.filter(o => o.id !== id));
  };
  return (
    <div className="ob-modal-overlay" onClick={onClose}>
      <div className="ob-modal" onClick={e => e.stopPropagation()}>
        <div className="ob-modal-header">
          <h2 style={{ margin: 0 }}>Saved Outfits</h2>
          <button className="ob-close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        {savedOutfits.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '20px 0' }}>No saved outfits yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {savedOutfits.map(outfit => (
              <div key={outfit.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>Outfit - {new Date(outfit.createdAt).toLocaleDateString()}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{outfit.items.length} items</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="ob-btn outline" style={{ padding: '8px 15px' }} onClick={() => { onLoadOutfit(outfit.items); onClose(); }}>Load</button>
                  <button className="ob-btn outline" style={{ padding: '8px', color: 'red', borderColor: 'red' }} onClick={() => handleDelete(outfit.id)}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SavedOutfitsModal;
