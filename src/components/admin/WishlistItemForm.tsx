import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WishlistItem } from '../../types/wishlist';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import AnimatedButton from '../AnimatedButton';

interface WishlistItemFormProps {
  item?: WishlistItem | null;
  onClose: () => void;
  onSave: (itemData?: any) => void;
}

const WishlistItemForm: React.FC<WishlistItemFormProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<{
    title: string;
    short_description: string;
    full_description: string;
    why_we_need_it: string;
    purchase_link: string;
    category: string;
    price: number;
    inventory: number;
    priority: number;
    status: 'needed' | 'in_progress' | 'purchased' | 'funded';
  }>({
    title: '',
    short_description: '',
    full_description: '',
    why_we_need_it: '',
    purchase_link: '',
    category: 'meditation',
    price: 0,
    inventory: 1,
    priority: 5,
    status: 'needed',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        short_description: item.short_description,
        full_description: item.full_description,
        why_we_need_it: item.why_we_need_it,
        purchase_link: item.purchase_link || '',
        category: item.category,
        price: item.price || 0,
        inventory: item.inventory,
        priority: item.priority,
        status: item.status,
      });
      setImagePreview(item.image_url || null);
    }
  }, [item]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setUploading(true);
    try {
      if (!isSupabaseConfigured) {
        // Mock image upload for demo mode
        const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`;
        setUploading(false);
        return mockUrl;
      }

      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error } = await supabase.storage
        .from('wishlist-images')
        .upload(fileName, imageFile);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('wishlist-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = item?.image_url || null;

      // Upload new image if one was selected
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          setSaving(false);
          return; // Stop if image upload failed
        }
      }

      const itemData = {
        ...formData,
        image_url: imageUrl,
        inventory_remaining: formData.inventory,
        is_featured: false,
        is_urgent: false,
        funding_raised: 0,
      };

      if (!isSupabaseConfigured) {
        // Mock save for demo mode
        console.log('Demo mode: Item saved', itemData);
        
        // In demo mode, pass the item data back to the parent
        setTimeout(() => {
          onSave(itemData);
        }, 1000);
        return;
      }

      if (item) {
        // Update existing item
        const { error } = await supabase
          .from('wishlist_items')
          .update(itemData)
          .eq('id', item.id);

        if (error) throw error;
      } else {
        // Create new item
        const { error } = await supabase
          .from('wishlist_items')
          .insert([itemData]);

        if (error) throw error;
      }

      onSave();
    } catch (error: any) {
      console.error('Error saving item:', error);
      setError(error.message || 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/50"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 46, 25, 0.25), 0 20px 25px -5px rgba(181, 226, 136, 0.1)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sage/30 bg-white/50">
          <h2 className="text-2xl font-serif text-forest">
            {item ? 'Edit Wishlist Item' : 'Add New Wishlist Item'}
          </h2>
          <motion.button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center text-forest hover:bg-white/80 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
                placeholder="e.g., Meditation Cushions"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Short Description *</label>
              <textarea
                required
                rows={2}
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 resize-none"
                placeholder="Brief description for the card view"
              />
            </div>

            {/* Priority and Status */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Priority (1-5) *</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
                >
                  <option value={1}>1 - Highest Priority</option>
                  <option value={2}>2 - High Priority</option>
                  <option value={3}>3 - Medium Priority</option>
                  <option value={4}>4 - Low Priority</option>
                  <option value={5}>5 - Lowest Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
                >
                  <option value="needed">🎯 Needed</option>
                  <option value="in_progress">⏳ In Progress</option>
                  <option value="purchased">✅ Purchased</option>
                </select>
              </div>
            </div>

            {/* Category, Price, and Inventory */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
                >
                  <option value="meditation">🧘 Meditation</option>
                  <option value="ceremony">🕯️ Ceremony</option>
                  <option value="maintenance">🔧 Maintenance</option>
                  <option value="kitchen">🍽️ Kitchen</option>
                  <option value="furniture">🪑 Furniture</option>
                  <option value="technology">💻 Technology</option>
                  <option value="books">📚 Books</option>
                  <option value="other">📦 Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-2">Price *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-2">Inventory *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.inventory}
                  onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
                  placeholder="1"
                />
              </div>
            </div>

            {/* Purchase Link */}
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Purchase Link *</label>
              <input
                type="url"
                required
                value={formData.purchase_link}
                onChange={(e) => setFormData({ ...formData, purchase_link: e.target.value })}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
                placeholder="https://example.com/product"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 text-forest"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-sm h-48 object-cover rounded-lg border border-white/30"
                  />
                </div>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Full Description *</label>
              <textarea
                required
                rows={4}
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 resize-none"
                placeholder="Detailed description for the modal view"
              />
            </div>

            {/* Why We Need It */}
            <div>
              <label className="block text-sm font-medium text-forest mb-2">Why We Need This *</label>
              <textarea
                required
                rows={3}
                value={formData.why_we_need_it}
                onChange={(e) => setFormData({ ...formData, why_we_need_it: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 resize-none"
                placeholder="Explain why this item is important for the temple"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <motion.button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 text-forest/70 hover:text-forest border border-forest/20 hover:border-forest/40 rounded-xl transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={saving || uploading}
                className="flex-1 px-6 py-3 bg-sage/40 backdrop-blur-sm border border-sage/60 rounded-xl text-forest hover:bg-sage/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ scale: saving || uploading ? 1 : 1.02 }}
                whileTap={{ scale: saving || uploading ? 1 : 0.98 }}
              >
                {saving ? 'Saving...' : uploading ? 'Uploading...' : item ? 'Update Item' : 'Add Item'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WishlistItemForm;