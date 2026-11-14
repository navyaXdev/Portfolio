import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Preloader } from './components/Preloader/Preloader';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { Floating3DBackground } from './components/Three/Floating3DBackground';
import { AmbientBackground } from './components/UI/AmbientBackground';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { GitHubActivity } from './components/GitHubActivity/GitHubActivity';
import { Experience } from './components/Experience/Experience';
import { Achievements } from './components/Achievements/Achievements';
import { Roadmap } from './components/Roadmap/Roadmap';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-void-950 text-cyber-silver selection:bg-emerald-glow selection:text-void-950 transition-colors duration-300">
        {/* Preloader */}
        <Preloader />

        {/* Luxury Custom Cursor (desktop only, disabled on touch/reduced motion) */}
        <CustomCursor />

        {/* Section-Aware Floating 3D Background Engine */}
        <Floating3DBackground />

        {/* Ambient atmospheric lighting & grid */}
        <AmbientBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <GitHubActivity />
          <Experience />
          <Achievements />
          <Roadmap />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
