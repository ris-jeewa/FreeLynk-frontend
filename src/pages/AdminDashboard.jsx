import React, { useState } from 'react';
import { 
  FaUsers, 
  FaProjectDiagram, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaUserCheck,
  FaUserTimes,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'FREELANCER', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'CLIENT', status: 'active', joinDate: '2024-01-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'FREELANCER', status: 'inactive', joinDate: '2024-02-01' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'CLIENT', status: 'active', joinDate: '2024-02-10' },
  ]);

  const [projects] = useState([
    { id: 1, title: 'E-commerce Website', client: 'Jane Smith', freelancer: 'John Doe', status: 'in-progress', budget: '$5000' },
    { id: 2, title: 'Mobile App Development', client: 'Sarah Wilson', freelancer: 'Mike Johnson', status: 'completed', budget: '$8000' },
    { id: 3, title: 'UI/UX Design', client: 'Jane Smith', freelancer: 'John Doe', status: 'pending', budget: '$2000' },
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalRevenue: '$15000',
    pendingProjects: projects.filter(p => p.status === 'pending').length
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    // Implement user management actions
  };

  const handleProjectAction = (projectId, action) => {
    console.log(`${action} project ${projectId}`);
    // Implement project management actions
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          </div>
          <FaUsers className="text-orange-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Active Users</p>
            <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
          </div>
          <FaUserCheck className="text-green-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Projects</p>
            <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
          </div>
          <FaProjectDiagram className="text-blue-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Completed Projects</p>
            <p className="text-3xl font-bold text-white">{stats.completedProjects}</p>
          </div>
          <FaChartBar className="text-purple-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-white">{stats.totalRevenue}</p>
          </div>
          <FaChartBar className="text-yellow-500 text-3xl" />
        </div>
      </div>
      
      <div className="bg-[#2A2A2A] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Pending Projects</p>
            <p className="text-3xl font-bold text-white">{stats.pendingProjects}</p>
          </div>
          <FaUserTimes className="text-red-500 text-3xl" />
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-[#2A2A2A] rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">User Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-3 text-gray-400">Name</th>
              <th className="pb-3 text-gray-400">Email</th>
              <th className="pb-3 text-gray-400">Role</th>
              <th className="pb-3 text-gray-400">Status</th>
              <th className="pb-3 text-gray-400">Join Date</th>
              <th className="pb-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800">
                <td className="py-3 text-white">{user.name}</td>
                <td className="py-3 text-gray-400">{user.email}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.role === 'FREELANCER' ? 'bg-green-500 text-white' :
                    user.role === 'CLIENT' ? 'bg-blue-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{user.joinDate}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUserAction(user.id, 'view')}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleUserAction(user.id, 'edit')}
                      className="text-yellow-500 hover:text-yellow-400"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleUserAction(user.id, 'delete')}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="bg-[#2A2A2A] rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Project Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-3 text-gray-400">Project</th>
              <th className="pb-3 text-gray-400">Client</th>
              <th className="pb-3 text-gray-400">Freelancer</th>
              <th className="pb-3 text-gray-400">Status</th>
              <th className="pb-3 text-gray-400">Budget</th>
              <th className="pb-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-gray-800">
                <td className="py-3 text-white">{project.title}</td>
                <td className="py-3 text-gray-400">{project.client}</td>
                <td className="py-3 text-gray-400">{project.freelancer}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.status === 'completed' ? 'bg-green-500 text-white' :
                    project.status === 'in-progress' ? 'bg-yellow-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{project.budget}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleProjectAction(project.id, 'view')}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleProjectAction(project.id, 'edit')}
                      className="text-yellow-500 hover:text-yellow-400"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'overview'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaChartBar className="inline-block mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'users'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaUsers className="inline-block mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'projects'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaProjectDiagram className="inline-block mr-2" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'settings'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaCog className="inline-block mr-2" />
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'settings' && (
          <div className="bg-[#2A2A2A] rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">System Settings</h3>
            <p className="text-gray-400">Settings panel coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
