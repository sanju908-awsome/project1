import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CertificateVerification } from './components/CertificateVerification';
import { InstitutionPortal } from './components/InstitutionPortal';
import { Reports } from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('verify');

  const renderContent = () => {
    switch (activeTab) {
      case 'verify':
        return <CertificateVerification />;
      case 'institution':
        return <InstitutionPortal />;
      case 'reports':
        return <Reports />;
      default:
        return <CertificateVerification />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'verify' && <Hero />}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">CertifyGuard</h4>
              <p className="text-gray-300 text-sm">
                AI-powered certificate verification platform protecting organizations from fraud.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Certificate Verification</li>
                <li>Fraud Detection</li>
                <li>API Integration</li>
                <li>Bulk Processing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Help Center</li>
                <li>API Documentation</li>
                <li>Status Page</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 CertifyGuard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;