// src/services/customDesignService.js

// Mock local storage key
const STORAGE_KEY = 'mock_custom_designs_v2';

// Initial predefined designs (if local storage is empty)
const DEFAULT_PREDEFINED = [
  { id: '101', name: 'Adventure', icon: 'https://placehold.co/400x400/png?text=Adventure', category: 'Nature' },
  { id: '102', name: 'Lion', icon: 'https://placehold.co/400x400/png?text=Lion', category: 'Animals' },
  { id: '103', name: 'Astronaut', icon: 'https://placehold.co/400x400/png?text=Astro', category: 'Space' }
];

const getStoredDesigns = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREDEFINED));
  return DEFAULT_PREDEFINED;
};

export const getPredefinedDesigns = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getStoredDesigns()), 300);
  });
};

export const uploadDesign = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    
    // Convert to Base64 to safely persist in localStorage across page reloads
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      
      const newDesign = {
        id: `up_${Date.now()}`,
        name: file.name,
        icon: base64String,
        category: 'Uploaded'
      };

      // Save mock state
      const designs = getStoredDesigns();
      designs.push(newDesign);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));

      resolve(newDesign);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

export const deleteDesign = async (id) => {
  return new Promise((resolve) => {
    let designs = getStoredDesigns();
    designs = designs.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
    setTimeout(() => resolve({ success: true }), 300);
  });
};
