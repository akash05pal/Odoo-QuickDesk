import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, HelpCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'end_user':
        return 'End User';
      case 'support_agent':
        return 'Support Agent';
      case 'admin':
        return 'Administrator';
      default:
        return role;
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">QuickDesk</span>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-gray-500">{getRoleDisplay(user?.role || '')}</div>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;