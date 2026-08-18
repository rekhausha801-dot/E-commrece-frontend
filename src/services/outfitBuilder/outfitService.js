export const outfitService = {
    getProductsByCategory: async (category) => {
        // Mocking API delay for existing hardcoded structure
        return new Promise(resolve => setTimeout(() => resolve([]), 500));
    },
    
    searchProducts: async (query, category) => {
        return new Promise(resolve => setTimeout(() => resolve([]), 500));
    }
};
