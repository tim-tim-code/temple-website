import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import ForWhom from './components/ForWhom';
import WhatWillYouFind from './components/WhatWillYouFind';
import Support from './components/Support';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <ForWhom />
      <WhatWillYouFind />
      <Support />
    </div>
  );
}

export default App;