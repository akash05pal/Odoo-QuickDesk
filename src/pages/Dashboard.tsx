import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../hooks/useTickets';
import { useCategories } from '../hooks/useCategories';
import { Plus, Ticket, Clock, CheckCircle, Users } from 'lucide-react';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getFilteredTickets, getMyAssignedTickets } = useTickets();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const allTickets = getFilteredTickets();
  const myTickets = user?.role === 'end_user' ? allTickets : getMyAssignedTickets();
  
  const openTickets = allTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = allTickets.filter(t => t.status === 'in_progress').length;
  const resolvedTickets = allTickets.filter(t => t.status === 'resolved').length;

  const getDashboardStats = () => {
    switch (user?.role) {
      case 'end_user':
        return [
          { label: 'My Open Tickets', value: allTickets.filter(t => t.status === 'open').length, icon: Ticket, color: 'text-blue-600' },
          { label: 'In Progress', value: allTickets.filter(t => t.status === 'in_progress').length, icon: Clock, color: 'text-yellow-600' },
          { label: 'Resolved', value: allTickets.filter(t => t.status === 'resolved').length, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Total Tickets', value: allTickets.length, icon: Ticket, color: 'text-gray-600' }
        ];
      case 'support_agent':
        return [
          { label: 'Open Tickets', value: openTickets, icon: Ticket, color: 'text-blue-600' },
          { label: 'My Assigned', value: myTickets.length, icon: Users, color: 'text-purple-600' },
          { label: 'In Progress', value: inProgressTickets, icon: Clock, color: 'text-yellow-600' },
          { label: 'Resolved Today', value: resolvedTickets, icon: CheckCircle, color: 'text-green-600' }
        ];
      case 'admin':
        return [
          { label: 'Total Tickets', value: allTickets.length, icon: Ticket, color: 'text-blue-600' },
          { label: 'Open Tickets', value: openTickets, icon: Clock, color: 'text-yellow-600' },
          { label: 'Categories', value: categories.length, icon: Users, color: 'text-purple-600' },
          { label: 'Resolved', value: resolvedTickets, icon: CheckCircle, color: 'text-green-600' }
        ];
      default:
        return [];
    }
  };

  const stats = getDashboardStats();
  const recentTickets = allTickets.slice(0, 5);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'end_user' && 'Manage your support tickets'}
            {user?.role === 'support_agent' && 'Help customers with their requests'}
            {user?.role === 'admin' && 'Oversee the help desk system'}
          </p>
        </div>
        
        {user?.role === 'end_user' && (
          <Button
            onClick={() => navigate('/tickets/new')}
            icon={Plus}
            variant="primary"
          >
            Create Ticket
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {user?.role === 'end_user' ? 'My Recent Tickets' : 'Recent Tickets'}
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/tickets')}
            >
              View All
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentTickets.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No tickets found. 
              {user?.role === 'end_user' && (
                <span className="block mt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/tickets/new')}
                    className="mt-2"
                  >
                    Create your first ticket
                  </Button>
                </span>
              )}
            </div>
          ) : (
            recentTickets.map((ticket) => {
              const category = categories.find(c => c.id === ticket.categoryId);
              return (
                <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant={
                          ticket.status === 'open' ? 'info' :
                          ticket.status === 'in_progress' ? 'warning' :
                          ticket.status === 'resolved' ? 'success' : 'default'
                        }>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {category && (
                          <span className="text-sm text-gray-500">#{category.name}</span>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{ticket.description}</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;