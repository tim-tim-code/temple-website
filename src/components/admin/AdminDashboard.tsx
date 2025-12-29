import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { WishlistItem } from '../../types/wishlist';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import AnimatedButton from '../AnimatedButton';
import WishlistItemForm from './WishlistItemForm';
import InstructorForm from './InstructorForm';
import instructorsData from '../../data/instructors.json';

interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'wishlist' | 'instructors'>('wishlist');
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [editingItem, setEditingItem] = useState<WishlistItem | null>(null);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [mockItems, setMockItems] = useState<WishlistItem[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    needed: 0,
    funded: 0,
    purchased: 0,
    totalValue: 0
  });

  useEffect(() => {
    if (loading) return;

    if (!user || !isAdmin) {
      navigate('/admin/login');
      return;
    }

    loadItems();
    loadInstructors();
  }, [user, isAdmin, loading, navigate]);

  // Check if we're using mock auth (Quick Login)
  const isMockAuth = user?.id === 'mock-admin-id';

  const loadItems = async () => {
    setDashboardLoading(true);
    try {
      // Use mock data if Supabase is not configured OR if using mock auth
      if (!isSupabaseConfigured || isMockAuth) {
        // Initialize mock data if empty
        if (mockItems.length === 0) {
          const initialMockItems: WishlistItem[] = [
          {
            id: '1',
            title: 'Premium Butt Pillows',
            short_description: 'For when sitting on the floor pretending to be enlightened hurts.',
            full_description: 'These "traditional" meditation cushions will finally allow you to sit in lotus position for more than 5 minutes without your legs going completely numb.',
            why_we_need_it: 'Our current cushions are basically pancakes at this point.',
            image_url: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=300&fit=crop&crop=center',
            purchase_link: 'https://example.com/cushions',
            category: 'meditation',
            price: 45.00,
            minimum_price: 30.00,
            inventory: 8,
            inventory_remaining: 6,
            is_featured: true,
            is_urgent: false,
            shipping_notes: 'Delivered directly to temple meditation hall',
            funding_goal: 360.00,
            funding_raised: 180.00,
            priority: 1,
            status: 'needed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Dignity-Preserving Floor Pads',
            short_description: 'Because face-planting during \'graceful\' movements isn\'t zen.',
            full_description: 'These professional mats will cushion your inevitable falls while practicing \'ancient martial arts\'.',
            why_we_need_it: 'Currently we practice on bare concrete, which explains why our \'warrior poses\' look more like \'wounded bird\' poses.',
            image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
            purchase_link: 'https://example.com/mats',
            category: 'training',
            price: 89.99,
            minimum_price: 50.00,
            inventory: 4,
            inventory_remaining: 2,
            is_featured: false,
            is_urgent: true,
            shipping_notes: 'Heavy item - will coordinate delivery',
            funding_goal: undefined,
            funding_raised: 0,
            priority: 2,
            status: 'needed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Mystical Voice Amplifier',
            short_description: 'So everyone can hear our profound wisdom over the air conditioning.',
            full_description: 'This high-tech sound system will make our \'ancient teachings\' audible even when Gerald in the back row is doing his breathing exercises.',
            why_we_need_it: 'Our current \'sound system\' is basically shouting really loud and hoping for the best.',
            image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
            purchase_link: 'https://example.com/sound-system',
            category: 'electronics',
            price: 299.99,
            minimum_price: 200.00,
            inventory: 1,
            inventory_remaining: 1,
            is_featured: true,
            is_urgent: false,
            shipping_notes: 'Professional installation included',
            funding_goal: 299.99,
            funding_raised: 75.00,
            priority: 3,
            status: 'needed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'Zen Weed Whackers',
            short_description: 'For achieving enlightenment through aggressive plant management.',
            full_description: 'These \'sacred\' gardening tools will help us battle the dandelions that have declared war on our \'serene meditation garden\'.',
            why_we_need_it: 'Our current gardening technique involves pulling weeds by hand while pretending it\'s a mindfulness exercise.',
            image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center',
            purchase_link: undefined,
            category: 'garden',
            price: 120.00,
            minimum_price: 80.00,
            inventory: 1,
            inventory_remaining: 0,
            is_featured: false,
            is_urgent: false,
            shipping_notes: undefined,
            funding_goal: undefined,
            funding_raised: 0,
            priority: 4,
            status: 'funded',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '5',
            title: 'Ancient Wisdom Scrolls',
            short_description: 'Definitely not just Wikipedia printouts on enlightenment.',
            full_description: 'These "ancient" texts contain profound wisdom such as "How to Achieve Inner Peace While Still Being Annoyed by Everything".',
            why_we_need_it: 'Our current library consists of one yoga magazine from 2019 and a cookbook.',
            image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
            purchase_link: 'https://example.com/books',
            category: 'books',
            price: 25.00,
            minimum_price: 15.00,
            inventory: 12,
            inventory_remaining: 8,
            is_featured: false,
            is_urgent: false,
            shipping_notes: 'Will be placed strategically to look very wise and unread',
            funding_goal: 300.00,
            funding_raised: 125.00,
            priority: 5,
            status: 'needed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '6',
            title: 'Sacred Cooking Vessels',
            short_description: 'Because apparently regular pots don\'t achieve enlightenment.',
            full_description: 'These mystical kitchen implements will transform our humble gruel into transcendent cuisine.',
            why_we_need_it: 'Our current kitchen setup consists of one slightly bent spoon and a microwave that only works when you hit it just right.',
            image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
            purchase_link: 'https://example.com/kitchen',
            category: 'kitchen',
            price: 75.00,
            minimum_price: 50.00,
            inventory: 6,
            inventory_remaining: 4,
            is_featured: true,
            is_urgent: false,
            shipping_notes: 'Please deliver during our "sacred meal prep hour" (aka lunchtime)',
            funding_goal: 450.00,
            funding_raised: 225.00,
            priority: 4,
            status: 'purchased',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
          setMockItems(initialMockItems);
          setItems(initialMockItems);
          calculateStats(initialMockItems);
        } else {
          // Use existing mock data
          setItems(mockItems);
          calculateStats(mockItems);
        }
      } else {
        const { data, error } = await supabase
          .from('wishlist_items')
          .select('*')
          .order('priority', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;
        const itemsData = data || [];
        setItems(itemsData);
        calculateStats(itemsData);
      }
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const calculateStats = (itemsData: WishlistItem[]) => {
    const stats = {
      total: itemsData.length,
      needed: itemsData.filter(item => item.status === 'needed').length,
      funded: itemsData.filter(item => item.status === 'funded').length,
      purchased: itemsData.filter(item => item.status === 'purchased').length,
      totalValue: itemsData.reduce((sum, item) => sum + (item.price || 0), 0)
    };
    setStats(stats);
  };

  const loadInstructors = async () => {
    try {
      // Use JSON data if Supabase is not configured OR if using mock auth
      if (!isSupabaseConfigured || isMockAuth) {
        setInstructors(instructorsData as any);
        return;
      }

      // Load from Supabase
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInstructors(data || []);
    } catch (error) {
      console.error('Error loading instructors:', error);
      // Fallback to JSON data on error
      setInstructors(instructorsData as any);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleFormSave = (newItemData?: any) => {
    // If we have new item data and we're in demo mode, add it to mock items
    if (newItemData && !isSupabaseConfigured) {
      const newItem: WishlistItem = {
        id: Date.now().toString(),
        ...newItemData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      if (editingItem) {
        // Update existing item
        const updatedMockItems = mockItems.map(item => 
          item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item
        );
        setMockItems(updatedMockItems);
      } else {
        // Add new item
        setMockItems([...mockItems, newItem]);
      }
    }
    
    setShowAddForm(false);
    setEditingItem(null);
    loadItems(); // Refresh the items list
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleInstructorFormClose = () => {
    setShowInstructorForm(false);
    setEditingInstructor(null);
  };

  const handleEditItem = (item: WishlistItem) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleEditInstructor = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setShowInstructorForm(true);
  };

  const handleInstructorSave = async (instructorData: Omit<Instructor, 'id'>) => {
    try {
      // If using mock data (demo mode), update local state
      if (!isSupabaseConfigured || isMockAuth) {
        if (editingInstructor) {
          setInstructors(prev => prev.map(instructor =>
            instructor.id === editingInstructor.id
              ? { ...instructorData, id: editingInstructor.id }
              : instructor
          ));
        } else {
          const newId = (Math.max(...instructors.map(i => parseInt(i.id) || 0), 0) + 1).toString();
          setInstructors(prev => [...prev, { ...instructorData, id: newId }]);
        }
        handleInstructorFormClose();
        return;
      }

      if (editingInstructor) {
        // Update existing instructor in Supabase
        const { error } = await supabase
          .from('instructors')
          .update({
            ...instructorData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingInstructor.id);

        if (error) throw error;
      } else {
        // Insert new instructor into Supabase
        const { error } = await supabase
          .from('instructors')
          .insert([instructorData]);

        if (error) throw error;
      }

      // Refresh instructors list
      await loadInstructors();
      handleInstructorFormClose();
    } catch (error) {
      console.error('Error saving instructor:', error);
      alert('Failed to save instructor. Please try again.');
    }
  };

  const handleDeleteItem = async (itemId: string, itemTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
      return;
    }

    try {
      // If using mock data (demo mode), delete from mockItems
      if (!isSupabaseConfigured || isMockAuth) {
        const updatedMockItems = mockItems.filter(item => item.id !== itemId);
        setMockItems(updatedMockItems);
        setItems(updatedMockItems);
        calculateStats(updatedMockItems);
        return;
      }

      // Delete from Supabase
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      // Refresh the items list
      await loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleDeleteInstructor = async (instructorId: string, instructorName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${instructorName}"?`)) {
      return;
    }

    try {
      // If using mock data (demo mode), delete from local state
      if (!isSupabaseConfigured || isMockAuth) {
        setInstructors(prev => prev.filter(instructor => instructor.id !== instructorId));
        return;
      }

      // Delete from Supabase (soft delete by setting is_active to false)
      const { error } = await supabase
        .from('instructors')
        .update({ is_active: false })
        .eq('id', instructorId);

      if (error) throw error;

      // Refresh instructors list
      await loadInstructors();
    } catch (error) {
      console.error('Error deleting instructor:', error);
      alert('Failed to delete instructor. Please try again.');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'needed':
        return 'bg-amber/20 text-amber-800';
      case 'funded':
        return 'bg-green/20 text-green-800';
      case 'purchased':
        return 'bg-sage/20 text-sage-800';
      default:
        return 'bg-gray/20 text-gray-800';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredInstructors = instructors.filter(instructor => {
    return instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           instructor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
           instructor.bio.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest via-sage/20 to-leaf/10 flex items-center justify-center">
        <div className="text-paper text-xl">Loading...</div>
        <div className="text-paper/70 text-sm mt-2">Auth loading: {loading ? 'true' : 'false'}, User: {user?.email || 'none'}, Admin: {isAdmin ? 'true' : 'false'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest via-forest/80 to-sage/40">
      {/* Glass Header Pill */}
      <div className="fixed top-4 left-0 right-0 flex justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Navigation Pill */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-6">
              
              {/* Back/Home Button Pill */}
              <motion.button
                onClick={() => navigate('/')}
                className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2.5 flex items-center space-x-2 text-forest/80 hover:text-forest hover:bg-white/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
                </svg>
                <span className="font-medium text-sm">Home</span>
              </motion.button>

              {/* Center Title */}
              <h1 className="text-xl font-serif font-medium text-white px-4">
                Admin Dashboard
              </h1>

              {/* View Site Button Pill */}
              <motion.button
                onClick={() => navigate('/wishlist')}
                className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2.5 flex items-center space-x-2 text-forest/80 hover:text-forest hover:bg-white/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium text-sm">View Site</span>
              </motion.button>

              {/* Sign Out Button Pill */}
              <motion.button
                onClick={handleSignOut}
                className="bg-red-500/20 backdrop-blur-2xl border border-red-400/30 rounded-full px-4 py-2.5 flex items-center space-x-2 text-red-700 hover:text-red-600 hover:bg-red-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium text-sm">Sign Out</span>
              </motion.button>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-20 pb-8">
        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/40 shadow-lg mb-8">
          <div className="flex space-x-2">
            <motion.button
              onClick={() => setActiveTab('wishlist')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'wishlist'
                  ? 'bg-sage/40 text-forest border border-sage/60'
                  : 'text-forest/70 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Wishlist Items</span>
              </div>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('instructors')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'instructors'
                  ? 'bg-sage/40 text-forest border border-sage/60'
                  : 'text-forest/70 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Instructors</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards - Only show for wishlist */}
        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-forest/70 text-sm font-medium mb-2">Total Items</h3>
              <p className="text-3xl font-bold text-forest">{stats.total}</p>
            </motion.div>
          
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber/40 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-amber-800 text-sm font-medium mb-2">Needed</h3>
            <p className="text-3xl font-bold text-amber-900">{stats.needed}</p>
          </motion.div>
          
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green/40 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-green-800 text-sm font-medium mb-2">Funded</h3>
            <p className="text-3xl font-bold text-green-900">{stats.funded}</p>
          </motion.div>
          
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-sage/40 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sage-800 text-sm font-medium mb-2">Purchased</h3>
            <p className="text-3xl font-bold text-sage-900">{stats.purchased}</p>
          </motion.div>
          
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-sun/40 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-forest text-sm font-medium mb-2">Total Value</h3>
            <p className="text-3xl font-bold text-forest">€{stats.totalValue.toFixed(0)}</p>
          </motion.div>
          </div>
        )}

        {/* Instructor Stats - Only show for instructors */}
        {activeTab === 'instructors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-forest/70 text-sm font-medium mb-2">Total Instructors</h3>
              <p className="text-3xl font-bold text-forest">{instructors.length}</p>
            </motion.div>

            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-sage/40 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sage-800 text-sm font-medium mb-2">Masters</h3>
              <p className="text-3xl font-bold text-sage-900">
                {instructors.filter(i => i.role.toLowerCase().includes('master')).length}
              </p>
            </motion.div>

            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-forest/40 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-forest text-sm font-medium mb-2">Teachers</h3>
              <p className="text-3xl font-bold text-forest">
                {instructors.filter(i => i.role.toLowerCase().includes('teacher')).length}
              </p>
            </motion.div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200"
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-forest/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Filter - Only show for wishlist */}
              {activeTab === 'wishlist' && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="needed">Needed</option>
                  <option value="funded">Funded</option>
                  <option value="purchased">Purchased</option>
                </select>
              )}
            </div>

            <div className="flex space-x-4">
              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl text-forest hover:bg-white/80 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Refresh Data
              </motion.button>
              <motion.button
                onClick={() => activeTab === 'wishlist' ? setShowAddForm(true) : setShowInstructorForm(true)}
                className="px-6 py-2 bg-sage/40 backdrop-blur-sm border border-sage/60 rounded-xl text-forest hover:bg-sage/50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'wishlist' ? 'Add New Item' : 'Add New Instructor'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Demo Mode Warning */}
        {(!isSupabaseConfigured || isMockAuth) && (
          <motion.div
            className="mb-8 bg-gradient-to-br from-amber/60 via-amber/40 to-sun/50 backdrop-blur-sm rounded-2xl p-6 border border-amber/60 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-amber-800 font-semibold">🔧 Demo mode is activated {isMockAuth && '(Quick Login)'}</h3>
          </motion.div>
        )}

        {/* Content Grid */}
        {dashboardLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 animate-pulse border border-white/40 shadow-lg">
                <div className="bg-gray-300 h-32 rounded-xl mb-4"></div>
                <div className="bg-gray-300 h-6 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-4"></div>
                <div className="bg-gray-300 h-10 rounded"></div>
              </div>
            ))}
          </div>
        ) : activeTab === 'wishlist' ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:bg-white/90 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Item Image */}
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-200 to-gray-300">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-forest font-medium text-lg mb-1">{item.title}</h3>
                    <p className="text-forest/70 text-sm">{item.short_description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-forest/80 font-semibold">
                      {item.price ? `€${item.price.toFixed(2)}` : 'N/A'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-forest/60">
                    <span>Category: {item.category}</span>
                    <span>Priority: {item.priority}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <motion.button
                      onClick={() => handleEditItem(item)}
                      className="flex-1 px-3 py-2 bg-sage/20 hover:bg-sage/30 text-sage-800 text-sm rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteItem(item.id, item.title)}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-800 text-sm rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Instructors Grid */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredInstructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:bg-white/90 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Instructor Image */}
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-200 to-gray-300">
                  {instructor.image_url ? (
                    <img
                      src={instructor.image_url}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Instructor Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-forest font-medium text-lg mb-1">{instructor.name}</h3>
                    <p className="text-sage-800 text-sm font-medium">{instructor.role}</p>
                  </div>

                  <p className="text-forest/70 text-sm line-clamp-3">{instructor.bio}</p>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <motion.button
                      onClick={() => handleEditInstructor(instructor)}
                      className="flex-1 px-3 py-2 bg-sage/20 hover:bg-sage/30 text-sage-800 text-sm rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteInstructor(instructor.id, instructor.name)}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-800 text-sm rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!dashboardLoading && (
          (activeTab === 'wishlist' && filteredItems.length === 0) ||
          (activeTab === 'instructors' && filteredInstructors.length === 0)
        ) && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg className="mx-auto w-12 h-12 text-paper/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {activeTab === 'wishlist' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              )}
            </svg>
            <h3 className="text-paper/80 text-lg font-medium mb-2">
              {activeTab === 'wishlist' ? 'No items found' : 'No instructors found'}
            </h3>
            <p className="text-paper/60">
              {activeTab === 'wishlist'
                ? 'Try adjusting your search or filter criteria.'
                : 'Try adjusting your search criteria.'
              }
            </p>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Item Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <WishlistItemForm
            item={editingItem}
            onClose={handleFormClose}
            onSave={handleFormSave}
          />
        )}
      </AnimatePresence>

      {/* Add/Edit Instructor Form Modal */}
      <AnimatePresence>
        {showInstructorForm && (
          <InstructorForm
            instructor={editingInstructor}
            onClose={handleInstructorFormClose}
            onSave={handleInstructorSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;