import { useContext } from 'react';
import { OutfitContext } from '../context/OutfitContext';

export const useOutfit = () => {
  const context = useContext(OutfitContext);
  
  if (!context) {
    throw new Error('useOutfit must be used within an OutfitProvider');
  }
  
  return context;
};
