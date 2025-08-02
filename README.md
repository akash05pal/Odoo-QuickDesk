# QuickDesk - Help Desk Management System

A modern, responsive help desk management system built with React and TypeScript. QuickDesk provides a comprehensive solution for managing customer support tickets with role-based access control for end users, support agents, and administrators.

## 🚀 Features

### Core Functionality
- **Multi-Role Access Control**: Three distinct user roles with different permissions
  - **End Users**: Create and track their own support tickets
  - **Support Agents**: Manage assigned tickets, respond to customers, update ticket status
  - **Administrators**: Full system access including user and category management

### Ticket Management
- Create, view, and update support tickets
- Real-time ticket status tracking (Open, In Progress, Resolved, Closed)
- Priority levels (Low, Medium, High) with color-coded indicators
- Category-based ticket organization
- Advanced filtering and search capabilities
- Ticket assignment system for support agents

### User Experience
- **Responsive Design**: Modern UI that works seamlessly on desktop and mobile devices
- **Real-time Dashboard**: Role-specific statistics and recent activity overview
- **Intuitive Navigation**: Clean sidebar navigation for agents and admins
- **Toast Notifications**: User-friendly feedback for all actions
- **Modern UI Components**: Built with Tailwind CSS for consistent styling

### Administrative Features
- **User Management**: Add, edit, and manage user accounts
- **Category Management**: Create and organize ticket categories
- **System Overview**: Comprehensive dashboard with system-wide statistics
- **Data Persistence**: Local storage-based data management

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development with strict type checking
- **Vite 5.4.2** - Fast build tool and development server
- **React Router DOM 7.7.1** - Client-side routing and navigation

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid UI development
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **PostCSS 8.4.35** - CSS processing and optimization
- **Autoprefixer 10.4.18** - Automatic vendor prefixing

### Development Tools
- **ESLint 9.9.1** - Code linting and quality assurance
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting rules
- **React Hooks ESLint Plugin** - Enforce React hooks rules

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Odoo-QuickDesk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🔐 Login Credentials

The application comes with pre-configured demo accounts for testing different user roles:

### End User Account
- **Email**: `akash@gmail.com`
- **Role**: End User
- **Permissions**: Create and manage personal tickets

### Support Agent Account
- **Email**: `harshita@quickdesk.com`
- **Role**: Support Agent
- **Permissions**: Manage assigned tickets, respond to customers, update ticket status

### Administrator Account
- **Email**: `admin@quickdesk.com`
- **Role**: Administrator
- **Permissions**: Full system access, user management, category management

> **Note**: For all demo accounts, you can use any password. The authentication system is configured to accept any password for these demo accounts.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Navigation and layout components
│   ├── Tickets/        # Ticket-specific components
│   └── UI/            # Generic UI components (Button, Input, etc.)
├── contexts/           # React contexts for state management
├── hooks/             # Custom React hooks
├── pages/             # Main application pages
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and helpers
└── main.tsx          # Application entry point
```

## 🎯 Key Features by Role

### End User Experience
- Create new support tickets with detailed descriptions
- Track ticket status and priority
- View ticket history and responses
- Filter and search personal tickets
- Real-time dashboard with personal statistics

### Support Agent Experience
- View and manage assigned tickets
- Respond to customer inquiries
- Update ticket status and priority
- Access comprehensive ticket filtering
- Dashboard with assigned ticket statistics

### Administrator Experience
- Full system overview and management
- User account management
- Category creation and organization
- System-wide ticket monitoring
- Advanced administrative controls

## 🔧 Technical Implementation

### State Management
- React Context API for authentication state
- Local storage for data persistence
- Custom hooks for data fetching and management

### Data Structure
- **Users**: Role-based access with email authentication
- **Tickets**: Comprehensive ticket management with status tracking
- **Categories**: Organized ticket categorization system
- **Replies**: Thread-based ticket communication

### Security Features
- Role-based route protection
- Authentication state management
- Protected routes for different user roles

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, professional interface with consistent styling
- **Responsive Layout**: Optimized for all device sizes
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: User-friendly error messages and validation

## 🚀 Performance Features

- **Fast Development**: Vite-powered hot module replacement
- **Optimized Builds**: Production-ready builds with code splitting
- **Type Safety**: Full TypeScript implementation for better development experience
- **Code Quality**: ESLint configuration for consistent code style

## 📝 Development Notes

- The application uses localStorage for data persistence in this demo version
- All demo data is automatically initialized on application startup
- The authentication system is simplified for demo purposes
- The UI is built with a mobile-first responsive approach

## 🤝 Contributing

This is a demo project showcasing modern React development practices. For production use, consider implementing:

- Backend API integration
- Database persistence
- Real authentication system
- File upload capabilities
- Email notifications
- Advanced reporting features

---

**QuickDesk** - A modern help desk solution for efficient customer support management. 