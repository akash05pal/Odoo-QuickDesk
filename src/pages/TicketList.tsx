import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../hooks/useTickets';
import { useCategories } from '../hooks/useCategories';
import { FilterOptions } from '../types';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import TicketCard from '../components/Tickets/TicketCard';
import TicketFilters from '../components/Tickets/TicketFilters';

interface TicketListProps {
  assigned?: boolean;
}

const TicketList: React.FC<TicketListProps> = ({ assigned = false }) => {
  const { user } = useAuth();
  const { getFilteredTickets, getMyAssignedTickets, updateTicket, getTicketReplies } = useTickets();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    category: 'all',
    search: '',
    sortBy: 'recent'
  });

  // Get users from localStorage for display
  const users = JSON.parse(localStorage.getItem('quickdesk_users') || '[]');

  const tickets = assigned ? getMyAssignedTickets() : getFilteredTickets(filters);

  const handleAssignTicket = (ticketId: string) => {
    if (user) {
      updateTicket(ticketId, { assignedTo: user.id });
    }
  };

  const handleStatusChange = (ticketId: string, status: string) => {
    updateTicket(ticketId, { status: status as any });
  };

  const getPageTitle = () => {
    if (assigned) return 'My Assigned Tickets';
    if (user?.role === 'end_user') return 'My Tickets';
    return 'All Tickets';
  };

  const showActions = user?.role === 'support_agent' || user?.role === 'admin';

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-gray-600 mt-1">
            {assigned 
              ? 'Tickets assigned to you'
              : user?.role === 'end_user' 
                ? 'View and manage your support requests'
                : 'Manage all customer support tickets'
            }
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

      {/* Filters */}
      {!assigned && (
        <TicketFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
        />
      )}

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-500">
              <h3 className="text-lg font-medium mb-2">No tickets found</h3>
              <p className="mb-4">
                {assigned 
                  ? "You don't have any assigned tickets yet."
                  : user?.role === 'end_user'
                    ? "You haven't created any tickets yet."
                    : "No tickets match your current filters."
                }
              </p>
              {user?.role === 'end_user' && (
                <Button
                  onClick={() => navigate('/tickets/new')}
                  icon={Plus}
                  variant="primary"
                >
                  Create Your First Ticket
                </Button>
              )}
            </div>
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              users={users}
              categories={categories}
              replyCount={getTicketReplies(ticket.id).length}
              showActions={showActions}
              onAssign={handleAssignTicket}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {/* Pagination Placeholder */}
      {tickets.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" disabled>
              Previous
            </Button>
            <span className="px-3 py-1 text-sm text-gray-700">Page 1 of 1</span>
            <Button variant="secondary" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;