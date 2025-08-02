import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Tags, 
  FileText,
  UserCheck
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navigation = [
    ...(user?.role === 'end_user' ? [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'My Tickets', href: '/tickets', icon: Ticket },
    ] : []),
    ...(user?.role === 'support_agent' ? [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'All Tickets', href: '/tickets', icon: Ticket },
      { name: 'My Assigned', href: '/assigned', icon: UserCheck },
    ] : []),
    ...(user?.role === 'admin' ? [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'All Tickets', href: '/tickets', icon: Ticket },
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Categories', href: '/categories', icon: Tags },
      { name: 'Reports', href: '/reports', icon: FileText },
    ] : []),
  ];

  return (
    <div className="w-64 bg-gray-50 min-h-screen border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;