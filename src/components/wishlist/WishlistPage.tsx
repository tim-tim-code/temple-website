import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { WishlistItem } from '../../types/wishlist';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import WishlistCard from './WishlistCard';
import WishlistItemModal from './WishlistItemModal';
import SubpageNavbar from '../SubpageNavbar';

const WishlistPage: React.FC = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Load items from Supabase
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      if (!isSupabaseConfigured) {
        // Use mock data when Supabase is not configured
        const mockItems: WishlistItem[] = [
          {
            id: '1',
            title: 'Premium Butt Pillows',
            short_description: 'For when sitting on the floor pretending to be enlightened hurts.',
            full_description: 'These "traditional" meditation cushions will finally allow you to sit in lotus position for more than 5 minutes without your legs going completely numb. Made with organic buckwheat hulls because regular stuffing isn\'t spiritual enough.',
            why_we_need_it: 'Our current cushions are basically pancakes at this point. Half our students spend meditation time shifting around trying to find a position that doesn\'t cause permanent spinal damage.',
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
            full_description: 'These professional mats will cushion your inevitable falls while practicing \'ancient martial arts\' that mostly involve flailing around and calling it \'flowing like water\'. Features advanced grip technology to prevent embarrassing slips.',
            why_we_need_it: 'Currently we practice on bare concrete, which explains why our \'warrior poses\' look more like \'wounded bird\' poses. These mats will help us fail more gracefully.',
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
            full_description: 'This high-tech sound system will make our \'ancient teachings\' audible even when Gerald in the back row is doing his breathing exercises that sound like a broken vacuum cleaner. Includes wireless mics for dramatic effect.',
            why_we_need_it: 'Our current \'sound system\' is basically shouting really loud and hoping for the best. Half the students think we\'re teaching in a foreign language (we\'re not).',
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
            full_description: 'These \'sacred\' gardening tools will help us battle the dandelions that have declared war on our \'serene meditation garden\' (aka the patch of dirt behind the building). Includes pruning shears for therapeutic plant violence.',
            why_we_need_it: 'Our current gardening technique involves pulling weeds by hand while pretending it\'s a mindfulness exercise. The weeds are winning and frankly, it\'s embarrassing.',
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
            full_description: 'These "ancient" texts contain profound wisdom such as "How to Achieve Inner Peace While Still Being Annoyed by Everything" and "The Art of Pretending to Meditate While Actually Planning Your Grocery List".',
            why_we_need_it: 'Our current library consists of one yoga magazine from 2019 and a cookbook. We need something to make our philosophical discussions sound more impressive than they actually are.',
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
            full_description: 'These mystical kitchen implements will transform our humble gruel into transcendent cuisine. Features include: ability to make instant ramen taste like it was prepared by Buddha himself, and special non-stick coating blessed by monks.',
            why_we_need_it: 'Our current kitchen setup consists of one slightly bent spoon and a microwave that only works when you hit it just right. We need proper equipment to prepare "mindful meals" (fancy name for regular food).',
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
            status: 'needed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
        setItems(mockItems);
      } else {
        const { data, error } = await supabase
          .from('wishlist_items')
          .select('*')
          .order('priority', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading wishlist items:', error);
          setItems([]);
        } else {
          setItems(data || []);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item: WishlistItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {/* Subpage Navbar with Back Button */}
      <SubpageNavbar backTo="/#support" backLabel="Home" title={t('wishlist.title')} />

      {/* Main Page */}
      <div className="min-h-screen bg-gradient-to-br from-paper via-sage/5 to-sun/5 pt-24">

        {/* Content */}
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xl text-soil/80 max-w-3xl mx-auto leading-relaxed">
              {t('wishlist.subtitle')}
            </p>
            
            {!isSupabaseConfigured && (
              <motion.div
                className="mt-6 max-w-2xl mx-auto bg-gradient-to-br from-amber/20 via-amber/10 to-sun/10 backdrop-blur-sm rounded-2xl p-4 border border-amber/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-amber-800 font-medium">
                  {t('wishlist.demoMode')}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                  <div className="bg-gray-300 h-6 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-4"></div>
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-sage/20 to-forest/10 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-forest mb-3">
                  {t('wishlist.emptyState.title') || 'No Items Yet'}
                </h3>
                <p className="text-soil/70 leading-relaxed mb-6">
                  {t('wishlist.emptyState.description') || 'No wishlist items have been added at the moment. Check back soon!'}
                </p>
              </div>
            </motion.div>
          ) : (
            /* Items Grid */
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {items.map((item, index) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onClick={() => handleItemClick(item)}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <WishlistItemModal
            item={selectedItem}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WishlistPage;