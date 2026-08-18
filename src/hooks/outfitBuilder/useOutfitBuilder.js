import { useContext } from 'react';
import { OutfitBuilderContext } from '../../context/OutfitBuilderContext';

export const useOutfitBuilder = () => {
    const context = useContext(OutfitBuilderContext);
    if (!context) {
        throw new Error('useOutfitBuilder must be used within an OutfitBuilderProvider');
    }
    return context;
};
