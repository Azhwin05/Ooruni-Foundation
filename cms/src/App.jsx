import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Scholarships from './pages/Scholarships';
import Volunteers from './pages/Volunteers';
import VerifyVolunteer from './pages/VerifyVolunteer';
import Donations from './pages/Donations';
import OESManage from './pages/OESManage';
import SupportersManage from './pages/SupportersManage';

import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/news" element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          } />

          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />

          <Route path="/gallery" element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          } />

          <Route path="/scholarships" element={
            <ProtectedRoute>
              <Scholarships />
            </ProtectedRoute>
          } />

          <Route path="/volunteers" element={
            <ProtectedRoute>
              <Volunteers />
            </ProtectedRoute>
          } />

          <Route path="/donations" element={
            <ProtectedRoute>
              <Donations />
            </ProtectedRoute>
          } />

          <Route path="/oes" element={
            <ProtectedRoute>
              <OESManage />
            </ProtectedRoute>
          } />

          <Route path="/verify-volunteer" element={
            <ProtectedRoute>
              <VerifyVolunteer />
            </ProtectedRoute>
          } />

          <Route path="/supporters" element={
            <ProtectedRoute>
              <SupportersManage />
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
