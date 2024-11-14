import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Developers from './components/Developers';
import Browsejob from './components/Browsejob';
import Competitor from './components/Competitor';
import { DarkModeProvider } from './DarkModeContext';

const App = () => {
  return (
    <DarkModeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero title="Welcome to My Site" subtitle="Learn more about what we do" />
                  <Developers />
                  <Browsejob />
                </>
              }
            />
            <Route path="/competitor" element={<Competitor />} />
          </Routes>
          <section className="m-auto max-w-lg my-10 px-6">
            <a
              href="jobs.html"
              className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            >
              View All Jobs
            </a>
          </section>
        </div>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
