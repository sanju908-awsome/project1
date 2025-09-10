import React, { useState } from 'react';
import { Download, FileText, BarChart3, Calendar, Filter, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const reports = [
    {
      title: 'Verification Summary Report',
      description: 'Complete overview of all verification activities',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Fraud Detection Analysis',
      description: 'Detailed analysis of detected fraud patterns',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50'
    },
    {
      title: 'Institution Performance',
      description: 'Performance metrics for partner institutions',
      icon: BarChart3,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'API Usage Analytics',
      description: 'Comprehensive API usage and performance data',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const recentReports = [
    { name: 'Monthly Verification Report - December 2024', date: '2024-12-01', size: '2.4 MB', type: 'PDF' },
    { name: 'Fraud Detection Summary - Q4 2024', date: '2024-12-01', size: '1.8 MB', type: 'PDF' },
    { name: 'Institution Analytics - November 2024', date: '2024-11-30', size: '3.1 MB', type: 'Excel' },
    { name: 'API Usage Report - November 2024', date: '2024-11-30', size: '892 KB', type: 'PDF' }
  ];

  const stats = [
    { label: 'Total Verifications', value: '156,789', change: '+12.3%', trend: 'up' },
    { label: 'Fraud Detected', value: '2,341', change: '-5.7%', trend: 'down' },
    { label: 'Success Rate', value: '98.5%', change: '+0.3%', trend: 'up' },
    { label: 'Avg. Response Time', value: '24.3s', change: '-8.2%', trend: 'down' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Generate and download verification reports</p>
        </div>
        
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Generate New Report</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reports.map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center mb-4`}>
                <report.icon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">{report.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Recent Reports</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentReports.map((report, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{report.type}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Verification Trends</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Verifications</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Fraud Detection</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Response Time</button>
          </div>
        </div>
        
        {/* Simulated Chart */}
        <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <div className="text-lg font-medium text-gray-600">Interactive Chart</div>
            <div className="text-sm text-gray-500">Verification trends over time</div>
          </div>
        </div>
      </div>
    </div>
  );
};