import React from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  const stats = [
    { label: 'Certificates Verified', value: '2.4M+', color: 'text-blue-600' },
    { label: 'Fraud Detected', value: '15.2K+', color: 'text-red-600' },
    { label: 'Partner Institutions', value: '5,000+', color: 'text-green-600' },
    { label: 'Response Time', value: '<30s', color: 'text-purple-600' }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Instant Verification',
      description: 'Get results in under 30 seconds with AI-powered analysis',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Shield,
      title: 'Advanced Fraud Detection',
      description: 'Detect tampered documents, fake seals, and forged signatures',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Assessment',
      description: 'Comprehensive risk scoring with detailed analysis reports',
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stop Certificate Fraud with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> AI Verification</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Protect your organization from fake degrees and forged certificates. Our advanced AI system 
            provides instant, accurate verification with comprehensive fraud detection.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-200">
              <div className={`w-12 h-12 rounded-lg ${benefit.color} flex items-center justify-center mb-4`}>
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Upload Certificate', desc: 'Scan or upload PDF/image files' },
              { step: '2', title: 'AI Analysis', desc: 'OCR extraction and forgery detection' },
              { step: '3', title: 'Database Check', desc: 'Cross-reference with institution records' },
              { step: '4', title: 'Get Results', desc: 'Instant verification with detailed report' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};