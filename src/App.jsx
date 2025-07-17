// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Software from './components/Software';
import Experience from './components/Experience';
import QuickLook from './components/QuickLook';
import Works from './components/Works';
import TrustedBy from './components/TrustedBy';
import Footer from './components/Footer';

// Import your page components
import EventsPage from './pages/EventsPage';
import ReelsPage from './pages/ReelsPage';
import ShowcasePage from './pages/ShowcasePage';

import styles from './styles/App.module.css';

function App() {
  return (
    <Router basename="/pexa">
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <About />
              <Software />
              <Experience />
              <QuickLook />
              <Works />
              <TrustedBy />
              <Footer />
            </>
          } />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
