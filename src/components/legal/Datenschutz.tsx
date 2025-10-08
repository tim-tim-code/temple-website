import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Datenschutz: React.FC = () => {
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
                {t('legal.privacy.title')}
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
                {t('legal.privacy.title')}
              </h2>
              <p className="text-xl text-soil/80 max-w-3xl mx-auto leading-relaxed">
                {t('legal.privacy.subtitle')}
              </p>
            </div>

            <div className="space-y-8">

              {/* Data Controller */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.controller.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.privacy.controller.description')}</p>
                  <p><strong>{t('legal.privacy.controller.name')}:</strong> {t('legal.privacy.controller.orgName')}</p>
                  <p><strong>{t('legal.privacy.controller.contact')}:</strong> info@dalinsi.org</p>
                </div>
              </div>

              {/* Data Collection */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.collection.title')}
                </h3>
                <div className="text-soil space-y-4">
                  <p>{t('legal.privacy.collection.intro')}</p>

                  <h4 className="text-lg font-semibold text-forest">{t('legal.privacy.collection.newsletter.title')}</h4>
                  <p>{t('legal.privacy.collection.newsletter.description')}</p>

                  <h4 className="text-lg font-semibold text-forest">{t('legal.privacy.collection.website.title')}</h4>
                  <p>{t('legal.privacy.collection.website.description')}</p>

                  <h4 className="text-lg font-semibold text-forest">{t('legal.privacy.collection.contact.title')}</h4>
                  <p>{t('legal.privacy.collection.contact.description')}</p>
                </div>
              </div>

              {/* Legal Basis */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.basis.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.privacy.basis.description')}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{t('legal.privacy.basis.consent')}</li>
                    <li>{t('legal.privacy.basis.legitimate')}</li>
                    <li>{t('legal.privacy.basis.legal')}</li>
                  </ul>
                </div>
              </div>

              {/* Data Retention */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.retention.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.privacy.retention.description')}</p>
                  <p>{t('legal.privacy.retention.period')}</p>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.rights.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.privacy.rights.intro')}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>{t('legal.privacy.rights.access.title')}:</strong> {t('legal.privacy.rights.access.description')}</li>
                    <li><strong>{t('legal.privacy.rights.rectification.title')}:</strong> {t('legal.privacy.rights.rectification.description')}</li>
                    <li><strong>{t('legal.privacy.rights.erasure.title')}:</strong> {t('legal.privacy.rights.erasure.description')}</li>
                    <li><strong>{t('legal.privacy.rights.portability.title')}:</strong> {t('legal.privacy.rights.portability.description')}</li>
                    <li><strong>{t('legal.privacy.rights.objection.title')}:</strong> {t('legal.privacy.rights.objection.description')}</li>
                    <li><strong>{t('legal.privacy.rights.withdraw.title')}:</strong> {t('legal.privacy.rights.withdraw.description')}</li>
                  </ul>
                  <p className="mt-4">{t('legal.privacy.rights.contact')}</p>
                </div>
              </div>

              {/* Cookies */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.cookies.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.privacy.cookies.description')}</p>
                  <p>{t('legal.privacy.cookies.essential')}</p>
                  <p>{t('legal.privacy.cookies.control')}</p>
                </div>
              </div>

              {/* Third Parties */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.thirdParties.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.privacy.thirdParties.description')}</p>
                  <p><strong>Vercel:</strong> {t('legal.privacy.thirdParties.vercel')}</p>
                  <p><strong>Supabase:</strong> {t('legal.privacy.thirdParties.supabase')}</p>
                </div>
              </div>

              {/* Updates */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.privacy.updates.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.privacy.updates.description')}</p>
                  <p><strong>{t('legal.privacy.updates.lastUpdated')}:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datenschutz;