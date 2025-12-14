import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Environment from './pages/Environment';
import EqualOpportunity from './pages/EqualOpportunity';
import FreedomCarnival from './pages/FreedomCarnival';
import WWAA from './pages/WWAA';
import Media from './pages/Media';
import Donate from './pages/Donate';
import OESBoard from './pages/OESBoard';
import Scholarship from './pages/Scholarship';
import Contact from './pages/Contact';
import Volunteer from './pages/Volunteer';
import WorkMenu from './pages/WorkMenu';

import BottomNav from './components/BottomNav';
import CustomCursor from './components/CustomCursor';
import ContentProtector from './components/ContentProtector';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-800">
        <ScrollToTop />
        <CustomCursor />
        <ContentProtector />
        <Navbar />
        <main className="flex-grow pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<WorkMenu />} />
            <Route path="/work/education" element={<Education />} />
            <Route path="/work/environment" element={<Environment />} />
            <Route path="/work/equal-opportunity" element={<EqualOpportunity />} />
            <Route path="/freedom-carnival" element={<FreedomCarnival />} />
            <Route path="/wwaa" element={<WWAA />} />
            <Route path="/media" element={<Media />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/oes" element={<OESBoard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/volunteer" element={<Volunteer />} />
          </Routes>
        </main>
        <BottomNav />
        <Footer />
      </div>
    </Router>
  );
}

// Helper to scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}


export default App;
