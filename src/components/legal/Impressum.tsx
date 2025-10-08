import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Impressum: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="fixed top-4 left-0 right-0 flex justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-6">
              {/* Back Button Pill */}
              <motion.button
                onClick={() => navigate('/')}
                className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2.5 flex items-center space-x-2 text-forest/80 hover:text-forest hover:bg-white/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium text-sm">{t('legal.back')}</span>
              </motion.button>

              {/* Center Title */}
              <h1 className="text-xl font-serif font-medium text-forest/90 px-4">
                {t('legal.impressum.title')}
              </h1>

              {/* Right spacer for balance */}
              <div className="w-[100px]"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <section className="pt-32 pb-20 bg-paper">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">
                {t('legal.impressum.title')}
              </h2>
              <p className="text-xl text-soil/80 max-w-3xl mx-auto leading-relaxed">
                {t('legal.impressum.subtitle')}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20 space-y-8">

              {/* Association Information */}
              <section>
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.impressum.association.title')}
                </h3>
                <div className="space-y-3 text-soil">
                  <p><strong>{t('legal.impressum.association.name')}:</strong> {t('legal.impressum.association.fullName')}</p>
                  <p><strong>{t('legal.impressum.association.legalForm')}:</strong> {t('legal.impressum.association.legalStatus')}</p>
                  <p><strong>{t('legal.impressum.association.registration')}:</strong> {t('legal.impressum.association.registrationDetails')}</p>
                </div>
              </section>

              {/* Address */}
              <section>
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.impressum.address.title')}
                </h3>
                <div className="text-soil">
                  <p>{t('legal.impressum.address.line1')}</p>
                  <p>{t('legal.impressum.address.line2')}</p>
                  <p>{t('legal.impressum.address.country')}</p>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.impressum.contact.title')}
                </h3>
                <div className="space-y-2 text-soil">
                  <p><strong>{t('legal.impressum.contact.email')}:</strong> <a href="mailto:info@dalinsi.org" className="text-leaf hover:underline">info@dalinsi.org</a></p>
                  <p><strong>{t('legal.impressum.contact.phone')}:</strong> {t('legal.impressum.contact.phoneNumber')}</p>
                </div>
              </section>

              {/* Responsible Person */}
              <section>
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.impressum.responsible.title')}
                </h3>
                <div className="text-soil">
                  <p><strong>{t('legal.impressum.responsible.role')}:</strong> {t('legal.impressum.responsible.name')}</p>
                  <p>{t('legal.impressum.responsible.description')}</p>
                </div>
              </section>

              {/* Hosting */}
              <section>
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.impressum.hosting.title')}
                </h3>
                <div className="space-y-2 text-soil">
                  <p><strong>{t('legal.impressum.hosting.provider')}:</strong> Vercel Inc.</p>
                  <p><strong>{t('legal.impressum.hosting.address')}:</strong></p>
                  <p>340 S Lemon Ave #4133</p>
                  <p>Walnut, CA 91789</p>
                  <p>United States</p>
                  <p><strong>Website:</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-leaf hover:underline">vercel.com</a></p>
                </div>
              </section>

              {/* Disclaimer */}
              <section>
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.impressum.disclaimer.title')}
                </h3>
                <div className="text-soil space-y-4">
                  <p>{t('legal.impressum.disclaimer.content')}</p>
                  <p>{t('legal.impressum.disclaimer.liability')}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impressum;