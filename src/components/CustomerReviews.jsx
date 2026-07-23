import React, { useState } from 'react'; // fix encoding
import { 
  Star, Camera, ThumbsUp, ThumbsDown, CheckCircle2, 
  HelpCircle, Gift, X, ChevronRight, Tag, ShieldCheck, 
  Smile, Award, MessageSquare, ChevronLeft, Image as ImageIcon
} from 'lucide-react';
import './CustomerReviews.css';

// Sample assets from the project for authentic visuals
import mens1 from '../assets/images/mens1.png';
import mens2 from '../assets/images/mens2.png';
import shirtImg from '../assets/images/shirt.jpeg';
import tShirtImg from '../assets/images/t-shirt.png';
import dressImg from '../assets/images/dress.jpg';
import poloImg from '../assets/images/polo.jpg';
import cargoImg from '../assets/images/cargo.jpg';
import sneakerImg from '../assets/images/sneaker.jpg';

// Upscaled Original Images
import hdMens1 from '../assets/images/hd_mens1.png';
import hdShirt from '../assets/images/hd_shirt.png';
import hdDress from '../assets/images/hd_dress.png';

export default function CustomerReviews() {
  // --- States ---
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('Most Recent');
  
  // Interactive Write Review State
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Gallery Modal Lightbox
  const [activePhotoModal, setActivePhotoModal] = useState(null); // index or null
  const [showQAModal, setShowQAModal] = useState(false);

  // Initial Customer Photos array matching screenshot
  const customerPhotos = [
    { id: 1, url: hdMens1, caption: 'Perfect fit for gym and casual wear', user: 'Rajesh K.' },
    { id: 2, url: hdShirt, caption: 'Top tier fabric and finish', user: 'Arun P.' },
    { id: 3, url: mens2, caption: 'Looks super stylish in person', user: 'Suresh B.' },
    { id: 4, url: poloImg, caption: 'Bag material is thick and durable', user: 'Vikas M.' },
    { id: 5, url: tShirtImg, caption: 'Value for money product', user: 'Priya S.' },
    { id: 6, url: dressImg, caption: 'Colors look exact as shown', user: 'Ananya R.' },
    { id: 7, url: cargoImg, caption: 'Stitching is very clean', user: 'Karthik N.' },
    { id: 8, url: sneakerImg, caption: 'Great overall build quality', user: 'Deepak V.' }
  ];

  // Reviews Data List matching exact names & content from screenshot + extra
  const [reviews, setReviews] = useState([
    {
      id: 4,
      name: 'Priya Sharma',
      verified: true,
      timeAgo: '3 months ago',
      rating: 5,
      title: 'Absolutely love it!',
      text: 'The color and stitching are top notch. Received so many compliments. Highly recommended!',
      photo: hdDress,
      helpfulUp: 15,
      helpfulDown: 0,
      userVoted: null,
      tags: ['Good Quality', 'Worth the Price']
    },
    {
      id: 2,
      name: 'Arun Prakash',
      verified: true,
      timeAgo: '1 week ago',
      rating: 5,
      title: 'Good Product',
      text: 'Good fit and material. Delivery was fast. Overall a good experience.',
      photo: hdShirt,
      helpfulUp: 8,
      helpfulDown: 0,
      userVoted: null,
      tags: ['Fast Delivery', 'Great Fit']
    }
  ]);

  // Questions for Q&A Modal
  const questionsList = [
    {
      q: 'Is this true to size?',
      a: 'Yes, most customers find it fits true to size. If you prefer a relaxed fit, order one size up.'
    },
    {
      q: 'What is the return policy?',
      a: 'We offer a hassle-free 7-day return and exchange policy from the date of delivery.'
    },
    {
      q: 'How should I care for this garment?',
      a: 'Machine wash cold with like colors. Do not bleach. Tumble dry low or line dry.'
    },
    {
      q: 'Is Cash on Delivery available?',
      a: 'Yes, Cash on Delivery (COD) is available for all pincodes across India.'
    }
  ];

  // Rating distribution counts
  const ratingDistribution = [
    { star: 5, count: 1890, pct: '77%' },
    { star: 4, count: 420,  pct: '17%' },
    { star: 3, count: 100,  pct: '4%' },
    { star: 2, count: 25,   pct: '1%' },
    { star: 1, count: 15,   pct: '1%' },
  ];

  // Highlight tag pills
  const reviewHighlights = [
    { label: 'Good Quality', count: 820 },
    { label: 'Comfortable', count: 620 },
    { label: 'Great Fit', count: 510 },
    { label: 'Fast Delivery', count: 430 },
    { label: 'Worth the Price', count: 345 }
  ];

  // Handle Photo Upload in Review Form
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newUrls = files.map(file => URL.createObjectURL(file));
      setUploadedPhotos(prev => [...prev, ...newUrls]);
    }
  };

  // Handle Review Submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newRev = {
      id: Date.now(),
      name: reviewerName.trim() || 'Valued Customer',
      verified: true,
      timeAgo: 'Just now',
      rating: newRating,
      title: reviewTitle.trim() || (newRating >= 4 ? 'Great Experience!' : 'Feedback'),
      text: reviewText,
      photo: uploadedPhotos.length > 0 ? uploadedPhotos[0] : null,
      helpfulUp: 0,
      helpfulDown: 0,
      userVoted: null,
      tags: ['Verified Purchase']
    };

    setReviews([newRev, ...reviews]);
    setReviewText('');
    setReviewerName('');
    setReviewTitle('');
    setUploadedPhotos([]);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  // Handle Helpful Up/Down Vote
  const handleVote = (id, type) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        let newUp = rev.helpfulUp;
        let newDown = rev.helpfulDown;
        let newVote = type;

        if (rev.userVoted === type) {
          // Toggle off
          newVote = null;
          if (type === 'up') newUp -= 1;
          if (type === 'down') newDown -= 1;
        } else {
          if (rev.userVoted === 'up') newUp -= 1;
          if (rev.userVoted === 'down') newDown -= 1;

          if (type === 'up') newUp += 1;
          if (type === 'down') newDown += 1;
        }

        return { ...rev, helpfulUp: newUp, helpfulDown: newDown, userVoted: newVote };
      }
      return rev;
    }));
  };

  // Handle Delete Review
  const handleDeleteReview = (id) => {
    setReviews(prev => prev.filter(rev => rev.id !== id));
  };

  // Scroll to Review Form
  const scrollToReviewForm = () => {
    const el = document.getElementById('write-review-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted Reviews
  const filteredReviews = reviews.filter(rev => {
    if (selectedTag === 'All') return true;
    return rev.tags.includes(selectedTag);
  }).sort((a, b) => {
    if (sortBy === 'Highest Rating') return b.rating - a.rating;
    if (sortBy === 'Lowest Rating') return a.rating - b.rating;
    if (sortBy === 'Most Helpful') return b.helpfulUp - a.helpfulUp;
    return b.id - a.id; // Most Recent
  });

  return (
    <div className="cr-wrapper">
      
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="cr-toast-banner">
          <CheckCircle2 size={20} color="#10b981" />
          <span>Thank you! Your review has been submitted successfully and 50 reward points added to your account!</span>
          <button onClick={() => setShowSuccessToast(false)} className="cr-toast-close"><X size={16} /></button>
        </div>
      )}

      {/* Main Container */}
      <div className="cr-container">
        
        {/* Header Title */}
        <div className="cr-header">
          <h2 className="cr-title">Customer Reviews</h2>
          <p className="cr-subtitle">Real reviews from real customers.</p>
        </div>

        {/* Top Summary Block: 4.8 Rating & Breakdown + Customer Photos (145) */}
        <div className="cr-top-summary-grid">
          
          {/* Left: Overall Score + Star Distribution */}
          <div className="cr-score-card">
            <div className="cr-score-left">
              <div className="cr-score-big">4.8</div>
              <div className="cr-stars-row">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={18} fill="#8f7a5b" color="#8f7a5b" />
                ))}
              </div>
              <div className="cr-based-text">Based on 2,450 reviews</div>
            </div>

            <div className="cr-bars-right">
              {ratingDistribution.map(item => (
                <div className="cr-bar-row" key={item.star}>
                  <span className="cr-bar-star-num">{item.star} <Star size={12} fill="#8f7a5b" color="#8f7a5b" /></span>
                  <div className="cr-bar-track">
                    <div className="cr-bar-fill" style={{ width: item.pct }}></div>
                  </div>
                  <span className="cr-bar-count">{item.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Customer Photos (145) */}
          <div className="cr-photos-card">
            <div className="cr-photos-header">
              <span className="cr-photos-title">Customer Photos <span>(145)</span></span>
            </div>
            
            <div className="cr-photos-grid">
              {customerPhotos.slice(0, 4).map((item, idx) => (
                <div 
                  key={item.id} 
                  className="cr-photo-thumb"
                  onClick={() => setActivePhotoModal(idx)}
                >
                  <img src={item.url} alt={item.caption} />
                </div>
              ))}
            </div>

            <div className="cr-photos-footer">
              <button className="cr-view-all-photos-btn" onClick={() => setActivePhotoModal(0)}>
                View all photos &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* Write a Review Section */}
        <div className="cr-write-section" id="write-review-form-section">
          <div className="cr-write-header">
            <div>
              <h3 className="cr-write-title">Write a Review</h3>
              <p className="cr-write-subtitle">Share your experience with this product</p>
            </div>
            {/* Interactive Rating Stars */}
            <div className="cr-star-picker">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={26}
                  className="cr-star-interactive"
                  fill={(hoverRating || newRating) >= star ? "#8f7a5b" : "none"}
                  color={(hoverRating || newRating) >= star ? "#8f7a5b" : "#d1d5db"}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmitReview} className="cr-write-form">
            <div className="cr-form-inputs-row">
              <input
                type="text"
                className="cr-input-text"
                placeholder="Your Name (Optional)"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
              />
              <input
                type="text"
                className="cr-input-text"
                placeholder="Review Headline (e.g. Excellent Quality!)"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />
            </div>

            <textarea
              className="cr-textarea"
              rows={4}
              placeholder="What did you like or dislike? Tell us more..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />

            {/* Uploaded Thumbnails Preview */}
            {uploadedPhotos.length > 0 && (
              <div className="cr-uploaded-preview-row">
                {uploadedPhotos.map((url, i) => (
                  <div key={i} className="cr-upload-thumb">
                    <img src={url} alt={`Upload ${i}`} />
                    <button type="button" onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, idx) => idx !== i))}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="cr-form-actions">
              <label className="cr-add-photo-btn">
                <Camera size={18} color="#b58349" />
                <span>Add Photo or Video (Optional)</span>
                <span className="cr-photo-hint">.JPG, PNG up to 5MB</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  style={{ display: 'none' }} 
                  onChange={handlePhotoUpload} 
                />
              </label>

              <button type="submit" className="cr-submit-review-btn">
                Submit Review
              </button>
            </div>
          </form>
        </div>

        {/* Main Content Split: Left (All Reviews) & Right (Sidebar Stats) */}
        <div className="cr-content-split">
          
          {/* Left Column: All Reviews */}
          <div className="cr-reviews-main-col">
            
            {/* Control Bar: Title & Sort */}
            <div className="cr-reviews-bar">
              <div className="cr-all-reviews-title">
                All Reviews <span>({reviews.length.toLocaleString()})</span>
              </div>
              
              <div className="cr-sort-wrapper">
                <span className="cr-sort-label">Sort by:</span>
                <select 
                  className="cr-sort-select" 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Most Recent">Most Recent</option>
                  <option value="Highest Rating">Highest Rating</option>
                  <option value="Lowest Rating">Lowest Rating</option>
                  <option value="Most Helpful">Most Helpful</option>
                </select>
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="cr-reviews-list">
              {filteredReviews.map(rev => (
                <div className="cr-review-card" key={rev.id}>
                  
                  {/* User Profile Header */}
                  <div className="cr-user-header">
                    <div className="cr-avatar-circle">
                      {rev.name.charAt(0)}
                      {rev.verified && (
                        <div className="cr-verified-badge-icon" title="Verified Buyer">
                          <CheckCircle2 size={12} fill="#10b981" color="#ffffff" />
                        </div>
                      )}
                    </div>

                    <div className="cr-user-meta">
                      <div className="cr-user-name-row">
                        <span className="cr-user-name">{rev.name}</span>
                        {rev.verified && (
                          <span className="cr-verified-pill">Verified Buyer</span>
                        )}
                        <span className="cr-time-ago">{rev.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars & Review Title */}
                  <div className="cr-card-rating-row">
                    <div className="cr-card-stars">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star 
                          key={s} 
                          size={16} 
                          fill={s <= rev.rating ? "#8f7a5b" : "none"} 
                          color={s <= rev.rating ? "#8f7a5b" : "#d1d5db"} 
                        />
                      ))}
                    </div>
                    <span className="cr-card-review-title">{rev.title}</span>
                  </div>

                  {/* Review Text */}
                  <p className="cr-card-text">{rev.text}</p>

                  {/* Customer Attached Photo if any */}
                  {rev.photo && (
                    <div className="cr-card-photo-attachment" onClick={() => setActivePhotoModal(0)}>
                      <img src={rev.photo} alt="Customer attached" />
                    </div>
                  )}

                  {/* Helpful Footer */}
                  <div className="cr-card-footer">
                    <div className="cr-helpful-controls">
                      <span className="cr-helpful-text">Was this helpful?</span>
                      <button 
                        className={`cr-helpful-btn ${rev.userVoted === 'up' ? 'active' : ''}`}
                        onClick={() => handleVote(rev.id, 'up')}
                      >
                        <ThumbsUp size={14} /> {rev.helpfulUp}
                      </button>
                      <button 
                        className={`cr-helpful-btn ${rev.userVoted === 'down' ? 'active' : ''}`}
                        onClick={() => handleVote(rev.id, 'down')}
                      >
                        <ThumbsDown size={14} /> {rev.helpfulDown}
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="cr-report-btn" onClick={() => handleDeleteReview(rev.id)}>Delete</button>
                      <button className="cr-report-btn">Report</button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Sidebar */}
          <div className="cr-sidebar-col">
            
            {/* Sidebar Card 1: Rating Breakdown */}
            <div className="cr-sidebar-card">
              <h4 className="cr-sidebar-title">Rating Breakdown</h4>
              
              <div className="cr-breakdown-list">
                
                <div className="cr-breakdown-item">
                  <div className="cr-breakdown-label-row">
                    <span className="cr-breakdown-label">
                      <Star size={15} color="#8f7a5b" className="cr-sidebar-icon" /> Quality
                    </span>
                    <span className="cr-breakdown-val">4.8</span>
                  </div>
                  <div className="cr-breakdown-track">
                    <div className="cr-breakdown-fill" style={{ width: '96%' }}></div>
                  </div>
                </div>

                <div className="cr-breakdown-item">
                  <div className="cr-breakdown-label-row">
                    <span className="cr-breakdown-label">
                      <Tag size={15} color="#8f7a5b" className="cr-sidebar-icon" /> Value for Money
                    </span>
                    <span className="cr-breakdown-val">4.4</span>
                  </div>
                  <div className="cr-breakdown-track">
                    <div className="cr-breakdown-fill" style={{ width: '88%' }}></div>
                  </div>
                </div>

                <div className="cr-breakdown-item">
                  <div className="cr-breakdown-label-row">
                    <span className="cr-breakdown-label">
                      <Smile size={15} color="#8f7a5b" className="cr-sidebar-icon" /> Comfort
                    </span>
                    <span className="cr-breakdown-val">4.7</span>
                  </div>
                  <div className="cr-breakdown-track">
                    <div className="cr-breakdown-fill" style={{ width: '94%' }}></div>
                  </div>
                </div>

                <div className="cr-breakdown-item">
                  <div className="cr-breakdown-label-row">
                    <span className="cr-breakdown-label">
                      <ShieldCheck size={15} color="#8f7a5b" className="cr-sidebar-icon" /> Durability
                    </span>
                    <span className="cr-breakdown-val">4.6</span>
                  </div>
                  <div className="cr-breakdown-track">
                    <div className="cr-breakdown-fill" style={{ width: '92%' }}></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Sidebar Card 2: Review Highlights */}
            <div className="cr-sidebar-card">
              <h4 className="cr-sidebar-title">Review Highlights</h4>
              <div className="cr-highlights-tags">
                {reviewHighlights.map((hl, idx) => (
                  <button 
                    key={idx}
                    className={`cr-highlight-pill ${selectedTag === hl.label ? 'active' : ''}`}
                    onClick={() => setSelectedTag(selectedTag === hl.label ? 'All' : hl.label)}
                  >
                    {hl.label} <span>({hl.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Card 3: Have a question? */}
            <div className="cr-sidebar-card cr-qa-card">
              <h4 className="cr-sidebar-title">Have a question?</h4>
              <p className="cr-qa-subtitle">Find answers in product info, Q&amp;A, reviews.</p>
              <button className="cr-view-qa-btn" onClick={() => setShowQAModal(true)}>
                <MessageSquare size={16} /> View Questions
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Banner: Reward Notification */}
        <div className="cr-reward-banner">
          <div className="cr-reward-left">
            <div className="cr-reward-icon-circle">
              <Gift size={24} color="#ffffff" />
            </div>
            <div>
              <h4 className="cr-reward-title">Share your experience and get rewarded!</h4>
              <p className="cr-reward-desc">Write a review and earn <strong>50 points</strong> for your next purchase.</p>
            </div>
          </div>

          <button className="cr-reward-cta-btn" onClick={scrollToReviewForm}>
            Write a Review
          </button>
        </div>

      </div>

      {/* --- MODAL 1: Customer Photos Gallery Lightbox --- */}
      {activePhotoModal !== null && (
        <div className="cr-modal-overlay" onClick={() => setActivePhotoModal(null)}>
          <div className="cr-photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cr-modal-close-btn" onClick={() => setActivePhotoModal(null)}>
              <X size={24} />
            </button>

            <div className="cr-lightbox-body">
              <button 
                className="cr-lightbox-nav left"
                onClick={() => setActivePhotoModal((activePhotoModal - 1 + customerPhotos.length) % customerPhotos.length)}
              >
                <ChevronLeft size={28} />
              </button>

              <div className="cr-lightbox-img-wrapper">
                <img src={customerPhotos[activePhotoModal].url} alt={customerPhotos[activePhotoModal].caption} />
                <div className="cr-lightbox-caption">
                  <span>{customerPhotos[activePhotoModal].user}</span> &bull; {customerPhotos[activePhotoModal].caption}
                </div>
              </div>

              <button 
                className="cr-lightbox-nav right"
                onClick={() => setActivePhotoModal((activePhotoModal + 1) % customerPhotos.length)}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Thumbnail Strip inside Modal */}
            <div className="cr-modal-thumbs-strip">
              {customerPhotos.map((p, idx) => (
                <div 
                  key={p.id}
                  className={`cr-strip-thumb ${idx === activePhotoModal ? 'active' : ''}`}
                  onClick={() => setActivePhotoModal(idx)}
                >
                  <img src={p.url} alt="thumb" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: View Questions & Answers --- */}
      {showQAModal && (
        <div className="cr-modal-overlay" onClick={() => setShowQAModal(false)}>
          <div className="cr-qa-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cr-qa-modal-header">
              <h3>Frequently Asked Questions</h3>
              <button className="cr-modal-close-btn" onClick={() => setShowQAModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cr-qa-modal-body">
              {questionsList.map((item, idx) => (
                <div className="cr-qa-item" key={idx}>
                  <div className="cr-qa-question">
                    <HelpCircle size={18} color="#b58349" />
                    <strong>{item.q}</strong>
                  </div>
                  <div className="cr-qa-answer">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
