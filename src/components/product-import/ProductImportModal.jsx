import React, { useState } from 'react';
import { X } from 'lucide-react';
import ProductFileUpload from './ProductFileUpload';
import ProductImportPreview from './ProductImportPreview';
import ProductImportResult from './ProductImportResult';

const ProductImportModal = ({ isOpen, onClose, onImportSuccess }) => {
  const [step, setStep] = useState('UPLOAD'); // UPLOAD, PREVIEW, RESULT
  const [previewData, setPreviewData] = useState(null);
  const [resultData, setResultData] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('UPLOAD');
    setPreviewData(null);
    setResultData(null);
    onClose();
  };

  const handlePreviewSuccess = (data) => {
    setPreviewData(data);
    setStep('PREVIEW');
  };

  const handleImportSuccess = (result) => {
    setResultData(result);
    setStep('RESULT');
    if (onImportSuccess) {
      onImportSuccess();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px', width: step === 'PREVIEW' ? '90%' : '500px',
        maxWidth: '1200px', maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>
            {step === 'UPLOAD' && 'Import Products'}
            {step === 'PREVIEW' && 'Import Preview'}
            {step === 'RESULT' && 'Import Completed'}
          </h2>
          <button onClick={handleClose} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280'
          }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {step === 'UPLOAD' && (
            <ProductFileUpload onPreviewSuccess={handlePreviewSuccess} onCancel={handleClose} />
          )}
          {step === 'PREVIEW' && (
            <ProductImportPreview data={previewData} onCancel={handleClose} onImportSuccess={handleImportSuccess} />
          )}
          {step === 'RESULT' && (
            <ProductImportResult data={resultData} onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImportModal;
