export interface User {
  id: string;
  name: string;
  email: string;
  role: 'end_user' | 'support_agent' | 'admin';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  categoryId: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
}

export interface Reply {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  createdAt: string;
  attachments?: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface FilterOptions {
  status?: string;
  category?: string;
  search?: string;
  sortBy?: 'recent' | 'replies' | 'status';
}