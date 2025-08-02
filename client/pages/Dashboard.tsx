import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { 
  GraduationCap, 
  Users, 
  UserPlus, 
  Upload, 
  Eye, 
  TrendingUp 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { students, teachers } = useData();

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: GraduationCap,
      color: 'bg-blue-500',
      href: '/students/preview'
    },
    {
      title: 'Total Teachers',
      value: teachers.length,
      icon: Users,
      color: 'bg-green-500',
      href: '/teachers/preview'
    },
    {
      title: 'ID Cards Generated',
      value: students.length + teachers.length,
      icon: TrendingUp,
      color: 'bg-purple-500',
      href: '#'
    }
  ];

  const quickActions = [
    {
      title: 'Add Single Student',
      description: 'Add a new student to the system',
      icon: UserPlus,
      href: '/students/add',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Upload Students Excel',
      description: 'Bulk upload students from Excel file',
      icon: Upload,
      href: '/students/upload',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Add Single Teacher',
      description: 'Add a new teacher to the system',
      icon: UserPlus,
      href: '/teachers/add',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Upload Teachers Excel',
      description: 'Bulk upload teachers from Excel file',
      icon: Upload,
      href: '/teachers/upload',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Preview Student Cards',
      description: 'View and print student ID cards',
      icon: Eye,
      href: '/students/preview',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Preview Teacher Cards',
      description: 'View and print teacher ID cards',
      icon: Eye,
      href: '/teachers/preview',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the ASTVS District CM SOE Ranchi ID Card Management System
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-3">
                <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">System Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">School Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>ASTVS DISTRICT CM SOE RANCHI</li>
                <li>CBSE Affiliation No: 3420111</li>
                <li>School No: 68061</li>
                <li>UDISE No: 20140120009</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">ID Card Specifications</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Print Size: 324px × 204px</li>
                <li>Students: 1 card per row</li>
                <li>Teachers: 2 cards per row</li>
                <li>Format: High-quality print ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
