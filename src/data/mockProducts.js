import kurtiImg from '../assets/images/kurti.png';
import kurthi2Img from '../assets/images/kurthi2.png';
import kurthi3Img from '../assets/images/kurthi3.png';
import kurthi4Img from '../assets/images/kurthi4.png';
import kurthi5Img from '../assets/images/kurthi5.png';

import westren2Img from '../assets/images/westren2.png';
import westren3Img from '../assets/images/westren3.png';
import westren4Img from '../assets/images/westren4.png';
import westren5Img from '../assets/images/westren5.png';

import mens1Img from '../assets/images/mens1.png';
import mens2Img from '../assets/images/mens2.png';
import mens3Img from '../assets/images/mens3.png';
import mens4Img from '../assets/images/mens4.png';
import mens5Img from '../assets/images/mens5.png';

export const GLOBAL_PRODUCTS = [
  // WOMEN - KURTIS
  {
    id: 201, category: 'Women', type: 'Kurti', title: 'Olive Green Rayon Kurti', fabric: 'Rayon', style: 'A-Line',
    price: 999, originalPrice: 1499, rating: 4.5, reviews: 320,
    colors: [
      { name: 'Olive Green', hex: '#556B2F', inStock: true, image: kurthi2Img },
      { name: 'Black', hex: '#1C1C1C', inStock: false, image: kurthi3Img },
      { name: 'Navy Blue', hex: '#000080', inStock: true, image: kurthi4Img }
    ]
  },
  {
    id: 202, category: 'Women', type: 'Kurti', title: 'Mustard Yellow Anarkali Kurti', fabric: 'Cotton', style: 'Anarkali',
    price: 1299, originalPrice: 1999, rating: 4.8, reviews: 850,
    colors: [
      { name: 'Mustard', hex: '#FFDB58', inStock: true, image: kurthi5Img },
      { name: 'Maroon', hex: '#800000', inStock: true, image: kurtiImg }
    ]
  },
  {
    id: 203, category: 'Women', type: 'Kurti', title: 'Black Rayon Straight Kurti', fabric: 'Rayon', style: 'Straight',
    price: 899, originalPrice: 1299, rating: 4.6, reviews: 410,
    colors: [
      { name: 'Black', hex: '#1C1C1C', inStock: true, image: kurthi3Img },
      { name: 'White', hex: '#FFFFFF', inStock: true, image: kurthi4Img }
    ]
  },
  {
    id: 204, category: 'Women', type: 'Kurti', title: 'Floral Embroidered Kurti', fabric: 'Georgette', style: 'A-Line',
    price: 1499, originalPrice: 2499, rating: 4.7, reviews: 620,
    colors: [
      { name: 'Pink', hex: '#FFC0CB', inStock: true, image: kurtiImg },
      { name: 'Olive Green', hex: '#556B2F', inStock: true, image: kurthi2Img }
    ]
  },
  {
    id: 205, category: 'Women', type: 'Kurti', title: 'Beige Silk Kurti', fabric: 'Silk', style: 'Straight',
    price: 1999, originalPrice: 2999, rating: 4.9, reviews: 1050,
    colors: [
      { name: 'Beige', hex: '#F5F5DC', inStock: false, image: kurthi4Img },
      { name: 'Gold', hex: '#FFD700', inStock: true, image: kurthi5Img }
    ]
  },

  // WOMEN - WESTERN DRESSES
  {
    id: 301, category: 'Women', type: 'Dress', title: 'Floral Maxi Dress', fabric: 'Georgette', style: 'Maxi',
    price: 1299, originalPrice: 1899, rating: 4.4, reviews: 250,
    colors: [
      { name: 'Floral Red', hex: '#FF0000', inStock: true, image: westren2Img },
      { name: 'Navy Blue', hex: '#000080', inStock: true, image: westren3Img }
    ]
  },
  {
    id: 302, category: 'Women', type: 'Dress', title: 'Black Bodycon Dress', fabric: 'Spandex', style: 'Bodycon',
    price: 999, originalPrice: 1499, rating: 4.8, reviews: 920,
    colors: [
      { name: 'Black', hex: '#1C1C1C', inStock: true, image: westren3Img },
      { name: 'Olive Green', hex: '#556B2F', inStock: true, image: westren4Img }
    ]
  },
  {
    id: 303, category: 'Women', type: 'Dress', title: 'Off-Shoulder Summer Dress', fabric: 'Cotton', style: 'A-Line',
    price: 899, originalPrice: 1299, rating: 4.5, reviews: 400,
    colors: [
      { name: 'Yellow', hex: '#FFFF00', inStock: false, image: westren4Img },
      { name: 'White', hex: '#FFFFFF', inStock: true, image: westren5Img }
    ]
  },
  {
    id: 304, category: 'Women', type: 'Dress', title: 'Western Wrap Dress', fabric: 'Rayon', style: 'Wrap',
    price: 1099, originalPrice: 1599, rating: 4.6, reviews: 310,
    colors: [
      { name: 'Wine Red', hex: '#722F37', inStock: true, image: westren5Img },
      { name: 'Black', hex: '#1C1C1C', inStock: true, image: westren2Img }
    ]
  },

  // MEN - CASUAL SHIRTS
  {
    id: 401, category: 'Men', type: 'Casual Shirt', title: 'Navy Blue Casual Shirt', fabric: 'Cotton', style: 'Slim Fit',
    price: 899, originalPrice: 1499, rating: 4.5, reviews: 650,
    colors: [
      { name: 'Navy Blue', hex: '#000080', inStock: true, image: mens1Img },
      { name: 'Black', hex: '#1C1C1C', inStock: false, image: mens2Img },
      { name: 'White', hex: '#FFFFFF', inStock: true, image: mens3Img }
    ]
  },
  {
    id: 402, category: 'Men', type: 'Casual Shirt', title: 'Olive Green Checked Shirt', fabric: 'Flannel', style: 'Regular Fit',
    price: 999, originalPrice: 1599, rating: 4.6, reviews: 420,
    colors: [
      { name: 'Olive Green', hex: '#556B2F', inStock: true, image: mens2Img },
      { name: 'Grey', hex: '#808080', inStock: true, image: mens4Img }
    ]
  },
  {
    id: 403, category: 'Men', type: 'Casual Shirt', title: 'Grey Casual Check Shirt', fabric: 'Cotton', style: 'Slim Fit',
    price: 799, originalPrice: 1299, rating: 4.4, reviews: 310,
    colors: [
      { name: 'Grey', hex: '#808080', inStock: true, image: mens3Img },
      { name: 'Black', hex: '#1C1C1C', inStock: true, image: mens5Img }
    ]
  },
  {
    id: 404, category: 'Men', type: 'Casual Shirt', title: 'White Solid Denim Shirt', fabric: 'Denim', style: 'Regular Fit',
    price: 1199, originalPrice: 1899, rating: 4.8, reviews: 850,
    colors: [
      { name: 'White', hex: '#FFFFFF', inStock: false, image: mens4Img },
      { name: 'Blue Denim', hex: '#4682B4', inStock: true, image: mens1Img }
    ]
  },
  {
    id: 405, category: 'Men', type: 'Casual Shirt', title: 'Black Printed Casual Shirt', fabric: 'Linen', style: 'Slim Fit',
    price: 1099, originalPrice: 1799, rating: 4.7, reviews: 500,
    colors: [
      { name: 'Black', hex: '#1C1C1C', inStock: true, image: mens5Img },
      { name: 'Navy Blue', hex: '#000080', inStock: true, image: mens2Img }
    ]
  },
  
  // MEN - T-SHIRTS
  {
    id: 501, category: 'Men', type: 'T-Shirt', title: 'Classic Polo T-Shirt', fabric: 'Cotton', style: 'Polo',
    price: 599, originalPrice: 999, rating: 4.5, reviews: 1200,
    colors: [
      { name: 'Black', hex: '#1C1C1C', inStock: true, image: mens2Img },
      { name: 'White', hex: '#FFFFFF', inStock: true, image: mens1Img }
    ]
  }
];

// Helper to determine the category and type of the current active product
export const determineProductCategory = (product) => {
  if (!product) return { category: 'Women', type: 'Kurti' };

  const title = product.title?.toLowerCase() || '';
  const link = product.categoryLink?.toLowerCase() || '';
  
  if (title.includes('shirt') && !title.includes('t-shirt') && !title.includes('polo')) {
    return { category: 'Men', type: 'Casual Shirt' };
  }
  if (title.includes('t-shirt') || title.includes('polo')) {
    return { category: 'Men', type: 'T-Shirt' };
  }
  if (title.includes('men') || link.includes('mens')) {
    return { category: 'Men', type: 'Casual Shirt' };
  }
  if (title.includes('dress') || title.includes('jumpsuit') || link.includes('western')) {
    return { category: 'Women', type: 'Dress' };
  }
  if (title.includes('saree')) {
    return { category: 'Women', type: 'Saree' };
  }
  if (title.includes('jeans') || title.includes('denim')) {
    return { category: 'Men', type: 'Jeans' }; 
  }
  
  return { category: 'Women', type: 'Kurti' };
};

// Recommendation Engine
export const getSimilarProducts = (currentProduct) => {
  const { category, type } = determineProductCategory(currentProduct);
  const currentPrice = parseInt(currentProduct?.price?.toString().replace(/[^0-9]/g, '') || '999');

  // Filter 1: Same Category & Same Type (Mandatory)
  let matchingProducts = GLOBAL_PRODUCTS.filter(p => p.category === category && p.type === type && p.id !== currentProduct?.id);

  // Score the matching products
  const scoredProducts = matchingProducts.map(product => {
    let score = 0;
    if (currentProduct?.title?.toLowerCase().includes((product.fabric || '').toLowerCase())) score += 5;
    if (product.price >= currentPrice * 0.8 && product.price <= currentPrice * 1.2) score += 3;
    score += product.rating;
    return { ...product, matchScore: score };
  });

  scoredProducts.sort((a, b) => b.matchScore - a.matchScore);
  return scoredProducts.slice(0, 8);
};
