import React from 'react';
import { Undo, Redo, RotateCcw, Download, Save, ZoomIn, ZoomOut, FolderOpen } from 'lucide-react';

const CanvasToolbar = ({ onUndo, onRedo, canUndo, canRedo, onReset, onDownload, onSave, onOpenSaved }) => {
  return (
    <div className="ob-toolbar">
      <button className="ob-tool-btn" onClick={onUndo} disabled={!canUndo} title="Undo"><Undo size={18} /></button>
      <button className="ob-tool-btn" onClick={onRedo} disabled={!canRedo} title="Redo"><Redo size={18} /></button>
      <div style={{ width: '1px', background: '#ddd', height: '20px', margin: 'auto 5px' }}></div>
      <button className="ob-tool-btn" onClick={onReset} title="Reset Canvas"><RotateCcw size={18} /></button>
      <button className="ob-tool-btn" onClick={onDownload} title="Download Outfit"><Download size={18} /></button>
      <button className="ob-tool-btn" onClick={onSave} title="Save Outfit"><Save size={18} /></button>
      <button className="ob-tool-btn" onClick={onOpenSaved} title="Open Saved Outfits"><FolderOpen size={18} /></button>
    </div>
  );
};
export default CanvasToolbar;
