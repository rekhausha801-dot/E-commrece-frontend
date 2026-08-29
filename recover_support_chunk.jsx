  const [ticketData, setTicketData] = useState({
    subject: '',
    category: 'Technical',
    priority: 'low',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await getFAQs();
        const faqData = res.data?.data || res.data?.faqs || (Array.isArray(res.data) ? res.data : []);
        setFaqs(faqData);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleQuestion = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!ticketData.subject || !ticketData.description) {
      return message.warning("Please fill in all required fields.");
    }
    
    try {
      setIsSubmitting(true);
      await contactSupport(ticketData); 
      
      message.success("Support ticket created successfully! Our team will contact you soon.");
      setIsContactModalOpen(false);
      setTicketData({ subject: '', category: 'Technical', priority: 'low', description: '' });
    } catch (error) {
      if (error.response?.status === 401) {
        message.error("Please log in to submit a support ticket.");
        navigate('/login');
      } else {
        const errorMsg = error.response?.data?.message || "Failed to submit ticket. Please try again later.";
        message.error(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-container">
      {/* Hero Section */}
      <div className="support-hero">
        <h1>Help & Support</h1>
        <p>How can we help you today?</p>
        <div className="support-search">
          <input type="text" placeholder="Search for answers (e.g. returns, shipping)..." />
        </div>
      </div>

      {/* Main Content */}
      <div className="support-main">
        {/* Sidebar */}
        <div className="support-sidebar">
          <button 
            className={`support-nav-btn ${activeCategory === 'All Questions' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All Questions')}
          >
            <Grid size={18} /> All Questions
          </button>
          <button 
            className={`support-nav-btn ${activeCategory === 'Orders & Shipping' ? 'active' : ''}`}
            onClick={() => setActiveCategory('Orders & Shipping')}
          >
            <Package size={18} /> Orders & Shipping
          </button>
          <button 
            className={`support-nav-btn ${activeCategory === 'Payments' ? 'active' : ''}`}
            onClick={() => setActiveCategory('Payments')}
          >
            <CreditCard size={18} /> Payments
          </button>
          <button 
            className={`support-nav-btn ${activeCategory === 'Returns & Refunds' ? 'active' : ''}`}
            onClick={() => setActiveCategory('Returns & Refunds')}
          >
            <RotateCcw size={18} /> Returns & Refunds
          </button>
          <button 
            className={`support-nav-btn ${activeCategory === 'Account' ? 'active' : ''}`}
            onClick={() => setActiveCategory('Account')}
          >
            <User size={18} /> Account
          </button>
          <button 
            className={`support-nav-btn ${activeCategory === 'Promotions' ? 'active' : ''}`}
            onClick={() => setActiveCategory('Promotions')}
          >
            <Sparkles size={18} /> Promotions
          </button>
          
          <div className="support-contact-card">
            <Headset size={24} className="support-contact-icon" />
            <h3>Still need help?</h3>
            <p>Our support team is here to assist you.</p>
            <button className="support-contact-btn" onClick={() => setIsContactModalOpen(true)}>Contact Us</button>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="support-content">
          <div className="support-content-header">
            <h2>{activeCategory}</h2>
            <span>{faqs.length} Questions</span>
          </div>

          <div className="faq-list">
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>Loading FAQs...</div>
            ) : faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div key={faq._id || index} className={`faq-item ${expandedQuestion === index ? 'expanded' : ''}`}>
                  <button className="faq-question" onClick={() => toggleQuestion(index)}>
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className="faq-icon" />
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="faq-empty">
                <p>No FAQs available for this category right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Modal Overlay */}
      {isContactModalOpen && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>Create a Support Ticket</h2>
              <button onClick={() => setIsContactModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} color="#6b7280" />
              </button>
            </div>
            
            <form onSubmit={handleTicketSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Subject</label>
                <input 
                  type="text" 
                  required
                  value={ticketData.subject}
                  onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Category</label>
                  <select 
                    value={ticketData.category}
                    onChange={(e) => setTicketData({...ticketData, category: e.target.value})}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', background: '#fff' }}
                  >
                    <option value="Technical">Technical Issue</option>
                    <option value="Account">Account Issue</option>
                    <option value="Order">Order Issue</option>
                    <option value="Payment">Payment Issue</option>
                  </select>