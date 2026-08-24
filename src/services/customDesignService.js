// src/services/customDesignService.js

// Mock local storage key
const STORAGE_KEY = 'mock_custom_designs';

// Initial predefined designs (if local storage is empty)
const DEFAULT_PREDEFINED = [
  { id: '101', name: 'Adventure', icon: 'https://i.ibb.co/3s6t4Fq/adventure.png', category: 'Nature' },
  { id: '102', name: 'Lion', icon: 'https://i.ibb.co/7K2G6K2/lion.png', category: 'Animals' },
  { id: '103', name: 'Astronaut', icon: 'https://i.ibb.co/0y7x2Xz/astro.png', category: 'Space' }
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
    
    // Convert to ObjectURL (in a real app, you'd use FormData and POST to backend)
    const imageUrl = URL.createObjectURL(file);
    
    const newDesign = {
      id: `up_${Date.now()}`,
      name: file.name,
      icon: imageUrl,
      category: 'Uploaded'
    };

    // Save mock state
    const designs = getStoredDesigns();
    designs.push(newDesign);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));

    setTimeout(() => resolve(newDesign), 500);
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
