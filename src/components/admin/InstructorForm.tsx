import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
}

interface InstructorFormProps {
  instructor?: Instructor | null;
  onClose: () => void;
  onSave: (instructorData: Omit<Instructor, 'id'>) => void;
}

const InstructorForm: React.FC<InstructorFormProps> = ({ instructor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: instructor?.name || '',
    role: instructor?.role || '',
    bio: instructor?.bio || '',
    image_url: instructor?.image_url || ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(instructor?.image_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          image_url: `/images/instructors/${file.name}`
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.bio.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sage/20 to-forest/20 border-b border-white/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-forest">
              {instructor ? 'Edit Supporter' : 'Add New Supporter'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/30 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-forest mb-2">
                Supporter Photo
              </label>

              {/* Image Preview */}
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-sage/20 to-forest/10 border border-sage/30">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-sage/20 hover:bg-sage/30 text-sage-800 text-sm rounded-lg transition-colors border border-sage/40"
                  >
                    Choose Photo
                  </button>
                  <p className="text-xs text-forest/60 mt-2">
                    Upload a photo for the supporter (JPG, PNG)
                  </p>
                </div>
              </div>

              {/* Manual Image Path Input */}
              <div>
                <label className="block text-sm font-medium text-forest mb-2">
                  Or enter image path manually
                </label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="/images/instructor-name.jpg"
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-forest mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter supporter's full name"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200"
              />
            </div>

            {/* Role/Title */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-forest mb-2">
                Title/Role *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                placeholder="e.g., Master, QiGong Master, Meditation Teacher"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200"
              />
            </div>

            {/* Bio/Description */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-forest mb-2">
                Biography *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Write a brief description of the supporter's background, experience, and specialties..."
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200 resize-vertical"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-white/30">
              <motion.button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white/60 hover:bg-white/80 text-forest border border-white/40 rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="px-6 py-3 bg-sage/40 hover:bg-sage/50 text-forest border border-sage/60 rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {instructor ? 'Update Supporter' : 'Add Supporter'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InstructorForm;