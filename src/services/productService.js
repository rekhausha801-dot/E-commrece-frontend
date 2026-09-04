// src/services/productService.js
import { fetchProducts, fetchProductById as apiFetchProductById, fetchProductsByCategory, createProductApi, updateProductApi, deleteProductApi } from './api';

export const getProducts = async (params = {}) => {
  try {
    let res;
    if (params.category && params.category.length > 0) {
      // If category is provided, fetch by category
      // Note: Backend might need to handle arrays or we just use the first category
      const categoryId = Array.isArray(params.category) ? params.category[0] : params.category;
      res = await fetchProductsByCategory(categoryId);
    } else {
      res = await fetchProducts();
    }

    // We should map the backend data structure to our frontend structure if needed
    // Assuming backend returns { success: true, count: X, data: [...] }
    if (res.data && res.data.success) {
      let filtered = res.data.data.map(p => {
        const basePrice = typeof p.price === 'number' ? p.price : 0;
        let salePrice = basePrice;
        let discountLabel = null;

        if (p.discount > 0) {
          if (p.discountType === 'Fixed') {
            salePrice = basePrice - p.discount;
            discountLabel = `${p.discount} OFF`;
          } else {
            salePrice = Math.round(basePrice - (basePrice * p.discount / 100));
            discountLabel = `${p.discount}% OFF`;
          }
        }

        return {
          ...p,
          id: p._id || p.id,
          title: p.name || p.title,
          price: `₹${salePrice}`,
          originalPrice: `₹${basePrice}`,
          image: (Array.isArray(p.images) && p.images.length > 0) ? (p.images[0]?.url || (typeof p.images[0] === 'string' ? p.images[0] : null)) : (typeof p.images === 'string' ? p.images : (p.image || "https://pngimg.com/uploads/box/box_PNG8.png")),
          rating: p.rating || 0,
          reviews: p.numReviews || p.reviews || 0,
          colors: p.colors || [],
          sizes: p.sizes || [],
          category: p.category?.name || p.category || 'Uncategorized',
          categoryId: p.category?._id || p.category?.id || p.category,
          badge: discountLabel || (p.badge || null),
          discount: discountLabel,
          _backendData: p
        };
      });
      // Apply client-side filters until backend query params are fully supported
      if (params.minPrice !== undefined) {
        filtered = filtered.filter(p => parseInt(p.price?.toString().replace('₹', '') || '0') >= parseInt(params.minPrice));
      }
      if (params.maxPrice !== undefined) {
        filtered = filtered.filter(p => parseInt(p.price?.toString().replace('₹', '') || '0') <= parseInt(params.maxPrice));
      }

      return {
        success: true,
        message: "Products fetched successfully",
        data: {
          products: filtered,
          pagination: { page: 1, limit: filtered.length, totalProducts: filtered.length, totalPages: 1 }
        }
      };
    }
    return { success: false, message: 'Failed to fetch products' };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: 'Error fetching products' };
  }
};

export const getProductById = async (id) => {
  try {
    const res = await apiFetchProductById(id);
    if (res.data && res.data.success) {
      const p = res.data.data;

      const basePrice = typeof p.price === 'number' ? p.price : 0;
      let salePrice = basePrice;
      let discountLabel = null;

      if (p.discount > 0) {
        if (p.discountType === 'Fixed') {
          salePrice = basePrice - p.discount;
          discountLabel = `${p.discount} OFF`;
        } else {
          salePrice = Math.round(basePrice - (basePrice * p.discount / 100));
          discountLabel = `${p.discount}% OFF`;
        }
      }

      const mapped = {
        ...p,
        id: p._id || p.id,
        title: p.name || p.title,
        price: `₹${salePrice}`,
        originalPrice: `₹${basePrice}`,
          image: (p.images && p.images.length > 0) ? (p.images[0].url || p.images[0]) : p.image,
        gallery: p.images ? p.images.map(img => img.url || img) : (p.gallery || []),
        rating: p.rating || 0,
        reviews: p.numReviews || p.reviews || 0,
        colors: p.colors || [],
        sizes: p.sizes || [],
        category: p.category?.name || p.category || 'Uncategorized',
        categoryId: p.category?._id || p.category?.id || p.category,
        badge: discountLabel || (p.badge || null),
        discount: discountLabel,
        _backendData: p
      };
      return { success: true, data: mapped };
    }
    return { success: false, message: 'Product not found' };
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, message: 'Product not found on server' };
    }
    console.error("Error fetching product by ID:", error);
    return { success: false, message: 'Error fetching product' };
  }
};

const mapToBackendFormat = (data) => {
  const formData = new FormData();

  if (data.name || data.title) formData.append('name', data.name || data.title);
  if (data.cat || data.category) {
    const cat = data.cat || data.category;
    if (cat !== 'Uncategorized') formData.append('category', cat);
  }
  if (data.brand) formData.append('brand', data.brand);
  if (data.status) formData.append('status', data.status === 'In Stock' ? 'Active' : data.status);

  if (data.countInStock !== undefined) formData.append('countInStock', data.countInStock);
  else if (data.stock !== undefined) formData.append('countInStock', Number(data.stock));

  if (data.price !== undefined) formData.append('price', Number(data.price.toString().replace(/[^0-9.]/g, '')));
  if (data.discount !== undefined) formData.append('discount', Number(data.discount.toString().replace(/[^0-9]/g, '')));
  if (data.costPrice !== undefined) formData.append('costPrice', Number(data.costPrice.toString().replace(/[^0-9.]/g, '')));
  if (data.lowStockAlert !== undefined) formData.append('lowStockAlert', Number(data.lowStockAlert));
  if (data.gstRate !== undefined) formData.append('gstRate', Number(data.gstRate));
  if (data.gstIncludedInPrice !== undefined) formData.append('gstIncludedInPrice', Boolean(data.gstIncludedInPrice));
  if (data.customizable !== undefined) formData.append('customizable', data.customizable);
  if (data.discountType) formData.append('discountType', data.discountType);
  if (data.deliveryText) formData.append('deliveryText', data.deliveryText);
  if (data.returnText) formData.append('returnText', data.returnText);
  if (data.warrantyText) formData.append('warrantyText', data.warrantyText);
  if (data.seoTitle) formData.append('seoTitle', data.seoTitle);
  if (data.seoDesc) formData.append('seoDesc', data.seoDesc);
  if (data.seoKeywords) formData.append('seoKeywords', data.seoKeywords);

  const desc = data.description || data.fullDesc || data.shortDesc;
  if (desc) formData.append('description', desc);

  if (data.sku && data.sku.trim() !== '') {
    formData.append('sku', data.sku);
  }

  // Handle arrays & JSON objects
  const arraysToAppend = {
    colors: data.colors || [],
    sizes: data.sizes || [],
    tags: data.tags || [],
    specs: data.specs || [],
    sizeGuide: data.sizeGuide || [],
    faqs: data.faqs || [],
    relatedProducts: data.relatedProducts || [],
    designs: data.designs || []
  };

  Object.entries(arraysToAppend).forEach(([key, val]) => {
    formData.append(key, JSON.stringify(val));
  });

  // Handle Images
  const existingImages = [];

  // Cover Image
  if (data.imgFile instanceof File) {
    formData.append('coverImage', data.imgFile);
  } else if (data.existingImgUrl) {
    existingImages.push({
      url: data.existingImgUrl,
      public_id: data.existingCoverImagePublicId,
      alt: 'Main'
    });
  }

  // Gallery Images
  if (data.gallery) {
    Object.values(data.gallery).forEach((item) => {
      if (item instanceof File) {
        formData.append('galleryImages', item);
      } else if (typeof item === 'string' && item !== '') {
        // Find existing public_id if it exists
        const oldImg = data.existingImages?.find(img => img.url === item);
        existingImages.push({
          url: item,
          public_id: oldImg ? oldImg.public_id : null,
          alt: 'Gallery'
        });
      }
    });
  }

  formData.append('images', JSON.stringify(existingImages));

  if (data.homeSection) {
    formData.append('homeSection', data.homeSection);
  }
  if (data.isLimitedOffer !== undefined) {
    formData.append('isLimitedOffer', data.isLimitedOffer);
  }
  if (data.limitedOfferEndDate) {
    formData.append('limitedOfferEndDate', data.limitedOfferEndDate);
  }
  if (data.limitedOfferDetails) {
    formData.append('limitedOfferDetails', JSON.stringify(data.limitedOfferDetails));
  }

  return formData;
};

export const createProduct = async (productData) => {
  try {
    const formattedData = mapToBackendFormat(productData);
    console.log("Sending to backend:", formattedData);
    const res = await createProductApi(formattedData);
    if (res.data && res.data.success) {
      return { success: true, data: res.data.data, message: 'Product created successfully' };
    }
    return { success: false, message: 'Failed to create product' };
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error);
    const errMsg = error.response?.data?.error || error.response?.data?.message || 'Error creating product';
    return { success: false, message: errMsg };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const formattedData = mapToBackendFormat(productData);
    const res = await updateProductApi(id, formattedData);
    if (res.data && res.data.success) {
      return { success: true, data: res.data.data, message: 'Product updated successfully' };
    }
    return { success: false, message: 'Failed to update product' };
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error);
    const errMsg = error.response?.data?.error || error.response?.data?.message || 'Error updating product';
    return { success: false, message: errMsg };
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await deleteProductApi(id);
    if (res.data && res.data.success) {
      return { success: true, message: 'Product deleted successfully' };
    }
    return { success: false, message: 'Failed to delete product' };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: 'Error deleting product' };
  }
};

export const addToCartAPI = async (productId, quantity, customization = null) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: 'Added to cart' }), 300);
  });
};

export const toggleWishlistAPI = async (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, message: 'Wishlist updated' }), 300);
  });
};
