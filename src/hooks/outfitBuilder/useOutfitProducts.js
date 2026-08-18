import { useState, useCallback } from 'react';
import { outfitService } from '../../services/outfitBuilder/outfitService';

export const useOutfitProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProductsByCategory = useCallback(async (category) => {
        setLoading(true);
        setError(null);
        try {
            const data = await outfitService.getProductsByCategory(category);
            setProducts(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    const searchProducts = useCallback(async (query, category) => {
        setLoading(true);
        setError(null);
        try {
            const data = await outfitService.searchProducts(query, category);
            setProducts(data);
        } catch (err) {
            setError(err.message || 'Failed to search products');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        products,
        loading,
        error,
        fetchProductsByCategory,
        searchProducts
    };
};
