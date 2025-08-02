import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, User, Category } from '../../types';
import { formatDate, getStatusColor, getPriorityColor } from '../../utils/helpers';
import { MessageCircle, Clock, User as UserIcon } from 'lucide-react';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

interface TicketCardProps {
  ticket: Ticket;
  users: User[];
  categories: Category[];
  replyCount?: number;
  showActions?: boolean;
  onAssign?: (ticketId: string) => void;
  onStatusChange?: (ticketId: string, status: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  users,
  categories,
  replyCount = 0,
  showActions = false,
  onAssign,
  onStatusChange
}) => {
  const navigate = useNavigate();
  
  const creator = users.find(u => u.id === ticket.createdBy);
  const assignee = users.find(u => u.id === ticket.assignedTo);
  const category = categories.find(c => c.id === ticket.categoryId);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'open': return 'info';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant={getStatusVariant(ticket.status)}>
              {ticket.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge variant={getPriorityVariant(ticket.priority)}>
              {ticket.priority.toUpperCase()}
            </Badge>
            {category && (
              <span className="text-sm text-gray-500">#{category.name}</span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {ticket.subject}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {ticket.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <UserIcon className="h-4 w-4" />
              <span>{creator?.name || 'Unknown'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(ticket.updatedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{replyCount} replies</span>
            </div>
            {assignee && (
              <div className="flex items-center space-x-1">
                <UserIcon className="h-4 w-4" />
                <span>Assigned to {assignee.name}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 ml-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/tickets/${ticket.id}`)}
          >
            View Details
          </Button>
          
          {showActions && (
            <>
              {!ticket.assignedTo && onAssign && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onAssign(ticket.id)}
                >
                  Assign to Me
                </Button>
              )}
              
              {onStatusChange && ticket.status !== 'closed' && (
                <select
                  value={ticket.status}
                  onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                  className="px-2 py-1 text-xs border border-gray-300 rounded"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;