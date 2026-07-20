import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import l1 from '../../assets/banners/l1.jpeg';
import j1 from '../../assets/banners/j1.jpeg';
import b1 from '../../assets/banners/b1.jpeg';
import OfferCarousel from '../../components/OfferCarousel';
import Cards from '../../components/Cards';
import TrendyCollection from '../../components/TrendyCollection';
import SummerBanner from '../../components/SummerBanner';

const Home = () => {
  const [timeLeft, setTimeLeft] = React.useState({ h: 1, m: 10, s: 30 });
  const [wishlist, setWishlist] = React.useState([]);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) {
          s--;
        } else {
          s = 59;
          if (m > 0) {
            m--;
          } else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (val) => val.toString().padStart(2, '0');

  const categories = [
    { name: 'Dresses', path: '/category/dresses' },
    { name: 'Tops', path: '/category/tops' },
    { name: 'Bottoms', path: '/category/bottoms' },
    { name: 'Outerwear', path: '/category/outerwear' },
    { name: 'Bags', path: '/category/bags' },
    { name: 'Shoes', path: '/category/shoes' },
    { name: 'Jewelry', path: '/category/jewelry' },
    { name: 'Accessories', path: '/category/accessories' },
  ];

  return (
    <div className="home-container">
      <style>
        {`
          .wishlist-btn {
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease !important;
          }
          .wishlist-btn:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 10px rgba(0,0,0,0.15) !important;
          }
          .wishlist-btn:active {
            transform: scale(0.9) !important;
          }
          .heart-icon-anim {
            transition: fill 0.3s ease, color 0.3s ease, transform 0.2s ease !important;
          }
          .wishlist-btn:hover .heart-icon-anim {
            transform: scale(1.1);
          }
        `}
      </style>
      <OfferCarousel />
      <Cards />
      <TrendyCollection />
      <SummerBanner />
    </div>
  );
};

export default Home;
