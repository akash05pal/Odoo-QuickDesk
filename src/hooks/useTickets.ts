import { useState, useEffect } from 'react';
import { Ticket, Reply, FilterOptions } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTickets = () => {
    const storedTickets = JSON.parse(localStorage.getItem('quickdesk_tickets') || '[]');
    const storedReplies = JSON.parse(localStorage.getItem('quickdesk_replies') || '[]');
    
    setTickets(storedTickets);
    setReplies(storedReplies);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const getFilteredTickets = (filters: FilterOptions = {}) => {
    let filteredTickets = [...tickets];

    // Role-based filtering
    if (user?.role === 'end_user') {
      filteredTickets = filteredTickets.filter(ticket => ticket.createdBy === user.id);
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === filters.status);
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.categoryId === filters.category);
    }

    // Search filter
    if (filters.search) {
      filteredTickets = filteredTickets.filter(ticket =>
        ticket.subject.toLowerCase().includes(filters.search!.toLowerCase()) ||
        ticket.description.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'recent':
        filteredTickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'replies':
        filteredTickets.sort((a, b) => {
          const aReplies = replies.filter(reply => reply.ticketId === a.id).length;
          const bReplies = replies.filter(reply => reply.ticketId === b.id).length;
          return bReplies - aReplies;
        });
        break;
      default:
        filteredTickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filteredTickets;
  };

  const getMyAssignedTickets = () => {
    return tickets.filter(ticket => ticket.assignedTo === user?.id);
  };

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    localStorage.setItem('quickdesk_tickets', JSON.stringify(updatedTickets));
    
    return newTicket;
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );
    
    setTickets(updatedTickets);
    localStorage.setItem('quickdesk_tickets', JSON.stringify(updatedTickets));
  };

  const addReply = (ticketId: string, message: string) => {
    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      ticketId,
      userId: user!.id,
      message,
      createdAt: new Date().toISOString()
    };

    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    localStorage.setItem('quickdesk_replies', JSON.stringify(updatedReplies));

    // Update ticket's updatedAt
    updateTicket(ticketId, {});
    
    return newReply;
  };

  const getTicketReplies = (ticketId: string) => {
    return replies.filter(reply => reply.ticketId === ticketId);
  };

  return {
    tickets,
    replies,
    loading,
    getFilteredTickets,
    getMyAssignedTickets,
    createTicket,
    updateTicket,
    addReply,
    getTicketReplies,
    loadTickets
  };
};