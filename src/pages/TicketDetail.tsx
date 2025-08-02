import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../hooks/useTickets';
import { useCategories } from '../hooks/useCategories';
import { formatDate } from '../utils/helpers';
import { ArrowLeft, Send, Clock, User } from 'lucide-react';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Toast from '../components/UI/Toast';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getFilteredTickets, getTicketReplies, addReply, updateTicket } = useTickets();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const [replyMessage, setReplyMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const tickets = getFilteredTickets();
  const ticket = tickets.find(t => t.id === id);
  const replies = getTicketReplies(id || '');
  const users = JSON.parse(localStorage.getItem('quickdesk_users') || '[]');

  if (!ticket) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Not Found</h1>
          <p className="text-gray-600 mb-4">The ticket you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/tickets')} variant="primary">
            Back to Tickets
          </Button>
        </div>
      </div>
    );
  }

  const creator = users.find((u: any) => u.id === ticket.createdBy);
  const assignee = users.find((u: any) => u.id === ticket.assignedTo);
  const category = categories.find(c => c.id === ticket.categoryId);

  const canReply = user?.role === 'support_agent' || user?.role === 'admin' || 
                   (user?.role === 'end_user' && ticket.createdBy === user.id);

  const canManage = user?.role === 'support_agent' || user?.role === 'admin';

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    addReply(ticket.id, replyMessage);
    setReplyMessage('');
    setToastMessage('Reply added successfully!');
    setShowToast(true);
  };

  const handleAssign = () => {
    if (user) {
      updateTicket(ticket.id, { assignedTo: user.id });
      setToastMessage('Ticket assigned to you!');
      setShowToast(true);
    }
  };

  const handleStatusChange = (status: string) => {
    updateTicket(ticket.id, { status: status as any });
    setToastMessage(`Ticket status changed to ${status.replace('_', ' ')}!`);
    setShowToast(true);
  };

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
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/tickets')}
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
            <p className="text-gray-600 mt-1">Ticket #{ticket.id}</p>
          </div>
        </div>

        {/* Actions */}
        {canManage && (
          <div className="flex items-center space-x-2">
            {!ticket.assignedTo && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAssign}
              >
                Assign to Me
              </Button>
            )}
            
            {ticket.status !== 'closed' && (
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant={getStatusVariant(ticket.status)}>
                {ticket.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <Badge variant={getPriorityVariant(ticket.priority)}>
                {ticket.priority.toUpperCase()} PRIORITY
              </Badge>
              {category && (
                <span className="text-sm text-gray-500">#{category.name}</span>
              )}
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Conversation</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {/* Original Ticket */}
              <div className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{creator?.name || 'Unknown'}</span>
                      <span className="text-sm text-gray-500">created ticket</span>
                      <span className="text-sm text-gray-500">{formatDate(ticket.createdAt)}</span>
                    </div>
                    <p className="text-gray-700">{ticket.description}</p>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {replies.map((reply) => {
                const replyUser = users.find((u: any) => u.id === reply.userId);
                return (
                  <div key={reply.id} className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{replyUser?.name || 'Unknown'}</span>
                          <span className="text-sm text-gray-500">{formatDate(reply.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{reply.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Form */}
            {canReply && ticket.status !== 'closed' && (
              <div className="p-6 border-t border-gray-200">
                <form onSubmit={handleReply}>
                  <div className="mb-4">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      icon={Send}
                      disabled={!replyMessage.trim()}
                    >
                      Send Reply
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Information</h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Created by</span>
                <p className="text-sm text-gray-900">{creator?.name || 'Unknown'}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Created on</span>
                <p className="text-sm text-gray-900">{formatDate(ticket.createdAt)}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Last updated</span>
                <p className="text-sm text-gray-900">{formatDate(ticket.updatedAt)}</p>
              </div>
              
              {assignee && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Assigned to</span>
                  <p className="text-sm text-gray-900">{assignee.name}</p>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-500">Category</span>
                <p className="text-sm text-gray-900">{category?.name || 'Unknown'}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Priority</span>
                <p className="text-sm text-gray-900">{ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default TicketDetail;