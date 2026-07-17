import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import l1 from '../../assets/banners/l1.jpeg';
import j1 from '../../assets/banners/j1.jpeg';
import b1 from '../../assets/banners/b1.jpeg';
import OfferCarousel from '../../components/OfferCarousel';
import Cards from '../../components/Cards';
import TrendyCollection from '../../components/TrendyCollection';

const Home = () => {

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
      <OfferCarousel />
      <Cards />
      <TrendyCollection />
    </div>
  );
};

export default Home;
