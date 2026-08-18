import React, { createContext, useState, useCallback, useMemo } from 'react';

export const OutfitBuilderContext = createContext();

export const OutfitBuilderProvider = ({ children }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tops');
    const [outfitName, setOutfitName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectItem = useCallback((category, product) => {
        if (!product || !product.id || product.price === undefined) {
            setError('Invalid product selected. Must have id and price.');
            return;
        }

        setSelectedItems(prev => {
            const exists = prev.find(item => item.category === category);
            if (exists) {
                return prev.map(item => item.category === category ? { category, product } : item);
            } else {
                return [...prev, { category, product }];
            }
        });
        setError(null);
    }, []);

    const replaceItem = useCallback((category, product) => {
        selectItem(category, product);
    }, [selectItem]);

    const removeItem = useCallback((category) => {
        setSelectedItems(prev => prev.filter(item => item.category !== category));
    }, []);

    const clearOutfit = useCallback(() => {
        setSelectedItems([]);
    }, []);

    const totalPrice = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + (Number(item.product.price) || 0), 0);
    }, [selectedItems]);

    return (
        <OutfitBuilderContext.Provider value={{
            selectedItems,
            selectedCategory, setSelectedCategory,
            outfitName, setOutfitName,
            totalPrice,
            loading, setLoading,
            error, setError,
            selectItem,
            replaceItem,
            removeItem,
            clearOutfit
        }}>
            {children}
        </OutfitBuilderContext.Provider>
    );
};
