import React, { useState, useEffect } from 'react';
import './Support.css';
import { 
  ChevronRight, ChevronDown, Headset, Grid, Package, 
  CreditCard, RotateCcw, Truck, User, Sparkles, MoreHorizontal, X
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getFAQs, contactSupport } from '../../services/api';
import { message } from 'antd';

const Support = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Questions');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
