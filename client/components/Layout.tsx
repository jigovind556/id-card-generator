import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  FileSpreadsheet, 
  Eye, 
  Printer,
  UserPlus,
  Upload
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Student Management',
      icon: GraduationCap,
      subItems: [
        { name: 'Add Single Student', href: '/students/add', icon: UserPlus },
        { name: 'Upload Students Excel', href: '/students/upload', icon: Upload },
        { name: 'Preview & Print Cards', href: '/students/preview', icon: Eye },
      ]
    },
    {
      name: 'Teacher Management', 
      icon: Users,
      subItems: [
        { name: 'Add Single Teacher', href: '/teachers/add', icon: UserPlus },
        { name: 'Upload Teachers Excel', href: '/teachers/upload', icon: Upload },
        { name: 'Preview & Print Cards', href: '/teachers/preview', icon: Eye },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">School ID Card System</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            ASTVS District CM SOE Ranchi
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  {item.subItems ? (
                    <div>
                      <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </div>
                      <ul className="ml-6 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.href}
                              className={cn(
                                'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
                                location.pathname === subItem.href
                                  ? 'bg-blue-100 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              )}
                            >
                              <subItem.icon className="mr-3 h-4 w-4" />
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        location.pathname === item.href
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
