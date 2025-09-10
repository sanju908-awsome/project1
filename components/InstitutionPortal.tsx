import React, { useState } from 'react';
import { Upload, Database, Users, Settings, Plus, Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';

export const InstitutionPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'records' | 'upload' | 'settings'>('dashboard');

  const sampleRecords = [
    { id: '1', name: 'John Smith', roll: '2020CS123', degree: 'B.Tech CS', year: '2024', status: 'active' },
    { id: '2', name: 'Alice Johnson', roll: '2020ME456', degree: 'B.Tech ME', year: '2024', status: 'active' },
    { id: '3', name: 'Bob Wilson', roll: '2019EE789', degree: 'B.Tech EE', year: '2023', status: 'graduated' },
    { id: '4', name: 'Carol Brown', roll: '2020IT101', degree: 'B.Tech IT', year: '2024', status: 'active' },
    { id: '5', name: 'David Lee', roll: '2019CS234', degree: 'B.Tech CS', year: '2023', status: 'graduated' }
  ];

  const stats = [
    { label: 'Total Records', value: '15,234', change: '+234 this month', color: 'text-blue-600' },
    { label: 'Verifications Today', value: '1,456', change: '+12% from yesterday', color: 'text-green-600' },
    { label: 'Active Students', value: '8,923', change: '2,341 graduates this year', color: 'text-purple-600' },
    { label: 'API Requests', value: '45.2K', change: '+5.2% this week', color: 'text-orange-600' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
            <div className="text-xs text-gray-500">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Verification Requests</h3>
          <div className="space-y-3">
            {[
              { name: 'Tech Corp', time: '5 mins ago', type: 'Bulk verification', count: '23 certificates' },
              { name: 'HR Solutions Ltd', time: '15 mins ago', type: 'Single verification', count: '1 certificate' },
              { name: 'Government Agency', time: '1 hour ago', type: 'API request', count: '156 certificates' }
            ].map((request, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{request.name}</div>
                  <div className="text-sm text-gray-600">{request.type} • {request.count}</div>
                </div>
                <div className="text-sm text-gray-500">{request.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <Upload className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">Upload New Records</div>
                <div className="text-sm text-blue-600">Bulk import certificates</div>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <Database className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900">Sync Database</div>
                <div className="text-sm text-green-600">Update institutional records</div>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <Settings className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium text-purple-900">Configure API</div>
                <div className="text-sm text-purple-600">Manage integration settings</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Student Records</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Record</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, roll number, or degree..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{record.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.roll}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.degree}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    record.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Student Records</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload student records in bulk using CSV, Excel, or JSON format. 
          Ensure all required fields are included for successful processing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload File</h3>
            <p className="text-gray-600 mb-4">CSV, Excel, or JSON format</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Choose File
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Required Fields</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Student Name</li>
              <li>• Roll Number</li>
              <li>• Degree Program</li>
              <li>• Year of Graduation</li>
              <li>• Certificate ID</li>
              <li>• Marks/Grade</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Upload Options</h4>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="radio" name="upload-type" className="text-blue-600" defaultChecked />
                <span>Replace existing records</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="upload-type" className="text-blue-600" />
                <span>Append to existing records</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" />
                <span>Validate data before importing</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" defaultChecked />
                <span>Send confirmation email</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Sample Templates</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                Download CSV Template
              </button>
              <button className="w-full text-left p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                Download Excel Template
              </button>
              <button className="w-full text-left p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                View JSON Format
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Institution Settings</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Institution Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                <input type="text" defaultValue="Tech University" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution ID</label>
                <input type="text" defaultValue="TECH001" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input type="email" defaultValue="admin@techuniversity.edu" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" defaultChecked />
                <span>Require API key authentication</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" defaultChecked />
                <span>Enable rate limiting</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" />
                <span>Allow public verification</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <div className="flex space-x-2">
                  <input type="password" defaultValue="sk_live_xxxxxxxxxxxx" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Regenerate</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                <input type="url" placeholder="https://your-domain.com/webhook" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate Limit</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>1000 requests/hour</option>
                  <option>5000 requests/hour</option>
                  <option>10000 requests/hour</option>
                  <option>Unlimited</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" defaultChecked />
                <span>Email alerts for verification requests</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" />
                <span>Daily usage reports</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="text-blue-600" defaultChecked />
                <span>Security alerts</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Settings
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Reset to Default
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Database },
            { id: 'records', label: 'Student Records', icon: Users },
            { id: 'upload', label: 'Upload Records', icon: Upload },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'records' && renderRecords()}
      {activeTab === 'upload' && renderUpload()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  );
};