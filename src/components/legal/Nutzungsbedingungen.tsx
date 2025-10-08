import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Nutzungsbedingungen: React.FC = () => {
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
                {t('legal.terms.title')}
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
                {t('legal.terms.title')}
              </h2>
              <p className="text-xl text-soil/80 max-w-3xl mx-auto leading-relaxed">
                {t('legal.terms.subtitle')}
              </p>
            </div>

            <div className="space-y-8">

              {/* Scope */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.scope.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.scope.description')}</p>
                  <p>{t('legal.terms.scope.agreement')}</p>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.services.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.services.description')}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{t('legal.terms.services.information')}</li>
                    <li>{t('legal.terms.services.newsletter')}</li>
                    <li>{t('legal.terms.services.contact')}</li>
                    <li>{t('legal.terms.services.events')}</li>
                  </ul>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.responsibilities.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.responsibilities.intro')}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{t('legal.terms.responsibilities.accurate')}</li>
                    <li>{t('legal.terms.responsibilities.respectful')}</li>
                    <li>{t('legal.terms.responsibilities.lawful')}</li>
                    <li>{t('legal.terms.responsibilities.noHarm')}</li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.intellectual.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.intellectual.description')}</p>
                  <p>{t('legal.terms.intellectual.rights')}</p>
                  <p>{t('legal.terms.intellectual.restrictions')}</p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.liability.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.liability.description')}</p>
                  <p>{t('legal.terms.liability.noWarranty')}</p>
                  <p>{t('legal.terms.liability.limitation')}</p>
                </div>
              </div>

              {/* External Links */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.externalLinks.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.externalLinks.description')}</p>
                  <p>{t('legal.terms.externalLinks.disclaimer')}</p>
                </div>
              </div>

              {/* Termination */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.termination.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.termination.description')}</p>
                  <p>{t('legal.terms.termination.effect')}</p>
                </div>
              </div>

              {/* Governing Law */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.governingLaw.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.governingLaw.description')}</p>
                  <p>{t('legal.terms.governingLaw.jurisdiction')}</p>
                </div>
              </div>

              {/* Changes */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.changes.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.changes.description')}</p>
                  <p>{t('legal.terms.changes.notification')}</p>
                  <p className="mt-4"><strong>{t('legal.terms.changes.lastUpdated')}:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-leaf/20">
                <h3 className="text-2xl font-serif text-forest mb-4 border-b border-leaf/20 pb-2">
                  {t('legal.terms.contact.title')}
                </h3>
                <div className="text-soil space-y-3">
                  <p>{t('legal.terms.contact.description')}</p>
                  <p><strong>{t('legal.terms.contact.email')}:</strong> <a href="mailto:info@dalinsi.org" className="text-leaf hover:underline">info@dalinsi.org</a></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nutzungsbedingungen;