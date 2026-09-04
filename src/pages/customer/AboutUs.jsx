import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Heart, Truck, Award, Users } from 'lucide-react';
import '../customer/Support.css'; // Reusing Support.css for basic layout consistency

const AboutUs = () => {
  return (
    <div className="faq-page-wrapper">
      {/* Hero Section */}
      <div className="faq-hero-section" style={{ background: 'linear-gradient(135deg, #fdfbf7 0%, #f4eee1 100%)' }}>
        <div className="faq-breadcrumb">
          <Link to="/">Home</Link> <ChevronRight size={14} /> 
          <span className="current">About Us</span>
        </div>
        
        <div className="faq-hero-content">
          <div className="faq-hero-text">
            <h1 style={{ color: '#111827', fontSize: '2.5rem', marginBottom: '16px' }}>Our Story</h1>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px' }}>
              Welcome to <strong>Relietech</strong>, your ultimate destination for premium fashion and lifestyle products. We believe in bringing you the best in class, straight to your doorstep.
            </p>
          </div>
          
          <div className="faq-hero-graphics">
            <div className="graphic-bubble blue-bubble" style={{ background: '#fff', border: '2px solid #C89953' }}>
              <Heart size={32} color="#C89953" />
            </div>
            <div className="graphic-bubble small-dot" style={{ background: '#C89953' }}></div>
            <div className="graphic-bubble dots-bubble">
              <span style={{ color: '#C89953' }}>...</span>
            </div>
            <div className="graphic-bubble yellow-bubble" style={{ background: '#fef3c7' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="faq-main-container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2rem', color: '#111827', marginBottom: '20px' }}>Who We Are</h2>
          <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            At <strong>Relietech</strong>, we are passionate about curating a diverse collection of high-quality products that cater to your everyday needs and desires. Established with a vision to redefine online shopping, we focus on blending modern trends with timeless elegance. Our dedicated team works tirelessly to source the finest materials and partner with top-tier artisans and brands.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#FDF7ED', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Award size={28} color="#C89953" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#111827' }}>Premium Quality</h3>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>We never compromise on quality. Every product is strictly vetted to ensure it meets our high standards.</p>
          </div>

          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#FDF7ED', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Users size={28} color="#C89953" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#111827' }}>Customer First</h3>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>Your satisfaction is our priority. We offer dedicated support to ensure a seamless shopping experience.</p>
          </div>

          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#FDF7ED', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <ShieldCheck size={28} color="#C89953" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#111827' }}>Secure Shopping</h3>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>Shop with confidence knowing that your data and transactions are protected with industry-leading security.</p>
          </div>
        </div>

        {/* Vision Statement */}
        <div style={{ background: '#111827', color: '#fff', padding: '50px', borderRadius: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(200,153,83,0.2) 0%, rgba(200,153,83,0) 70%)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(200,153,83,0.2) 0%, rgba(200,153,83,0) 70%)', borderRadius: '50%' }}></div>
          
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', position: 'relative', zIndex: 1 }}>Our Vision</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto', color: '#d1d5db', position: 'relative', zIndex: 1 }}>
            To become the most trusted and loved fashion destination in India, empowering individuals to express their unique style through our curated collections, while setting new standards for quality and customer service.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
