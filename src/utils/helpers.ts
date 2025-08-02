export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'open':
      return 'bg-blue-100 text-blue-800';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const initializeData = () => {
  // Always reinitialize demo data to ensure correct email addresses
  const demoUsers = [
    {
      id: 'user-1',
      name: 'Akash',
      email: 'akash@gmail.com',
      role: 'end_user',
      createdAt: new Date().toISOString()
    },
    {
      id: 'agent-1',
      name: 'Harshita',
      email: 'harshita@quickdesk.com',
      role: 'support_agent',
      createdAt: new Date().toISOString()
    },
    {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@quickdesk.com',
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ];
  localStorage.setItem('quickdesk_users', JSON.stringify(demoUsers));

  if (!localStorage.getItem('quickdesk_categories')) {
    const demoUsers = [
      {
        id: 'user-1',
        name: 'Akash',
        email: 'akash@gmail.com',
        role: 'end_user',
        createdAt: new Date().toISOString()
      },
      {
        id: 'agent-1',
        name: 'Harshita',
        email: 'harshita@quickdesk.com',
        role: 'support_agent',
        createdAt: new Date().toISOString()
      },
      {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@quickdesk.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('quickdesk_users', JSON.stringify(demoUsers));
    const demoCategories = [
      {
        id: 'cat-1',
        name: 'Technical Support',
        description: 'Hardware and software issues',
        createdAt: new Date().toISOString()
      },
      {
        id: 'cat-2',
        name: 'Account Issues',
        description: 'Login and account related problems',
        createdAt: new Date().toISOString()
      },
      {
        id: 'cat-3',
        name: 'General Inquiry',
        description: 'General questions and information requests',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('quickdesk_categories', JSON.stringify(demoCategories));
  }

  if (!localStorage.getItem('quickdesk_tickets')) {
    const demoTickets = [
      {
        id: 'ticket-1',
        subject: 'Unable to access email',
        description: 'I cannot log into my email account. Getting authentication error.',
        categoryId: 'cat-2',
        status: 'open',
        priority: 'high',
        createdBy: 'user-1',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'ticket-2',
        subject: 'Printer not working',
        description: 'Office printer is showing paper jam error but there is no paper jam.',
        categoryId: 'cat-1',
        status: 'in_progress',
        priority: 'medium',
        createdBy: 'user-1',
        assignedTo: 'agent-1',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    localStorage.setItem('quickdesk_tickets', JSON.stringify(demoTickets));
  }

  if (!localStorage.getItem('quickdesk_replies')) {
    const demoReplies = [
      {
        id: 'reply-1',
        ticketId: 'ticket-2',
        userId: 'agent-1',
        message: 'I have received your ticket and will investigate the printer issue. Please try turning it off and on again.',
        createdAt: new Date(Date.now() - 43200000).toISOString()
      },
      {
        id: 'reply-2',
        ticketId: 'ticket-2',
        userId: 'user-1',
        message: 'I tried restarting the printer but the issue persists.',
        createdAt: new Date(Date.now() - 21600000).toISOString()
      }
    ];
    localStorage.setItem('quickdesk_replies', JSON.stringify(demoReplies));
  }
};