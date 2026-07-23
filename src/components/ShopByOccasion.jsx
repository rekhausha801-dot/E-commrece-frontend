import React, { useState } from 'react';
import './ShopByOccasion.css';
import { FaHeart, FaRegHeart, FaStar, FaArrowRight } from 'react-icons/fa';
import { Briefcase, Leaf, Martini, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import images (using existing ones that match the vibe)
import officeWearImg from '../assets/images/occasion.png';
import casualWearImg from '../assets/images/occ_casual.png';
import partyWearImg from '../assets/images/party.png';
import weddingImg from '../assets/images/occasion1.png';

const ShopByOccasion = () => {
  const navigate = useNavigate();

  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const occasions = [
    {
      id: 'office',
      title: 'Designer Kurthi',
      image: officeWearImg,
      icon: <Briefcase size={20} color="white" />,
      iconBg: '#c19141',
      price: '₹499',
      originalPrice: '₹999',
      discount: '50% off',
      rating: 4.5,
      reviews: 24,
      timer: '01h : 10m : 14s',
      link: '/western'
    },
    {
      id: 'casual',
      title: 'Floral A-Line Kurti',
      image: casualWearImg,
      icon: <Leaf size={20} color="white" />,
      iconBg: '#c19141',
      price: '₹799',
      originalPrice: '₹999',
      discount: '20% off',
      rating: 4,
      reviews: 18,
      timer: '05h : 12m : 44s',
      link: '/collection'
    },
    {
      id: 'party',
      title: 'Elegant Party Gown',
      image: partyWearImg,
      icon: <Martini size={20} color="white" />,
      iconBg: '#c19141',
      price: '₹1,299',
      originalPrice: '₹1,999',
      discount: '35% off',
      rating: 5,
      reviews: 42,
      timer: '00h : 45m : 12s',
      link: '/collection'
    },
    {
      id: 'wedding',
      title: 'Bridal Anarkali Suit',
      image: weddingImg,
      icon: <Gem size={20} color="white" />,
      iconBg: '#c19141',
      price: '₹2,999',
      originalPrice: '₹4,999',
      discount: '40% off',
      rating: 5,
      reviews: 156,
      timer: '12h : 30m : 00s',
      link: '/category/womenswear'
    }
  ];

  return (
    <section className="shop-by-occasion">
      <div className="occasion-header">
        <h2 className="occasion-title">SHOP BY OCCASION</h2>
        <p className="occasion-subtitle">Find the perfect outfit for every moment</p>
        <div className="occasion-divider">
          <span className="occasion-line" />
          <span className="occasion-icon">✦</span>
          <span className="occasion-line" />
        </div>
      </div>

      <div className="occasion-grid">
        {occasions.map((product) => (
          <div 
            key={product.id} 
            className="unified-product-card"
            onClick={() => navigate(product.link)}
          >
            <div className="unified-card-image-wrap">
              <div 
                className="occasion-top-icon" 
                style={{ backgroundColor: product.iconBg }}
              >
                {product.icon}
              </div>
              <button
                className="unified-wishlist-btn"
                onClick={(e) => toggleLike(e, product.id)}
                aria-label="Add to wishlist"
              >
                {likedIds.includes(product.id) ? <FaHeart color="#ff4d4f" /> : <FaRegHeart color="#555" />}
              </button>
              <img src={product.image} alt={product.title} />
            </div>

            <div className="unified-card-info">
              <h3 className="unified-card-title">
                {product.title}
              </h3>
              
              <div className="unified-card-rating">
                <div className="unified-stars">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <FaStar key={i} size={14} color={i < Math.floor(product.rating) ? "#8f7a5b" : "#e0e0e0"} />
                  ))}
                </div>
                <span className="unified-reviews">({product.reviews})</span>
              </div>

              <div className="unified-card-price">
                <span className="unified-price-new">{product.price}</span>
                {product.originalPrice && <span className="unified-price-old">{product.originalPrice}</span>}
                {product.discount && <span className="unified-price-discount">{product.discount}</span>}
              </div>

              <button 
                className="unified-explore-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(product.link);
                }}
              >
                Explore Collection <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByOccasion;
