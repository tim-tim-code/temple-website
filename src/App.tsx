import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import ScrollNavigation from './components/ScrollNavigation';
import Hero from './components/Hero';
import About from './components/About';
import ForWhom from './components/ForWhom';
import Instructors from './components/Instructors';
import SupportTheTemple from './components/SupportTheTemple';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FloatingMailButton from './components/FloatingMailButton';

function AppContent() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="App w-full max-w-full overflow-x-hidden">
      <Header />
      <LanguageSelector 
        currentLanguage={language} 
        onLanguageChange={setLanguage} 
      />
      <ScrollNavigation />
      <Hero />
      <About />
      <ForWhom />
      <Instructors />
      <SupportTheTemple />
      <Newsletter />
      <Footer />
      <FloatingMailButton />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
