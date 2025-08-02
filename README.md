# QuickDesk - Full-Stack Help Desk Management System

A modern, responsive full-stack help desk management system built with React, TypeScript, Node.js, and MongoDB. QuickDesk provides a comprehensive solution for managing customer support tickets with role-based access control for end users, support agents, and administrators.

## 🚀 Live Demo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

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

## 🛠️ Complete Tech Stack

### Frontend Technologies
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development with strict type checking
- **Vite 5.4.2** - Fast build tool and development server
- **React Router DOM 7.7.1** - Client-side routing and navigation

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0.3** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcryptjs 2.4.3** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing
- **Helmet 7.1.0** - Security middleware
- **Express Rate Limit 7.1.5** - API rate limiting

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid UI development
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **PostCSS 8.4.35** - CSS processing and optimization
- **Autoprefixer 10.4.18** - Automatic vendor prefixing

### Development Tools
- **ESLint 9.9.1** - Code linting and quality assurance
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting rules
- **React Hooks ESLint Plugin** - Enforce React hooks rules
- **Nodemon 3.0.2** - Development server with auto-restart

## 📦 Complete Installation & Setup

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or cloud instance)

### MongoDB Installation

#### **Windows:**
1. Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. Create data directory: `mkdir C:\data\db`
4. Start service: `net start MongoDB`

#### **macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### **Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Project Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Odoo-QuickDesk
   ```

2. **Set up the Backend**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install backend dependencies
   npm install
   
   # Verify environment configuration
   # Check that config.env exists with:
   # PORT=5000
   # MONGODB_URI=mongodb://localhost:27017/quickdesk
   # JWT_SECRET=quickdesk-secret-key-2024
   # NODE_ENV=development
   ```

3. **Start the Backend Server**
   ```bash
   # Start MongoDB (if not already running)
   # Windows: net start MongoDB
   # macOS: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   
   # Start the backend server
   npm run dev
   ```

4. **Set up the Frontend**
   ```bash
   # Open a new terminal and navigate to project root
   cd ..
   
   # Install frontend dependencies
   npm install
   
   # Start the frontend development server
   npm run dev
   ```

5. **Verify Installation**
   - Backend API: http://localhost:5000
   - Frontend App: http://localhost:5173
   - API Health Check: http://localhost:5000/api/health

### Available Scripts

#### **Frontend Scripts:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

#### **Backend Scripts:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🔐 Demo Login Credentials

The application comes with pre-configured demo accounts for testing different user roles:

### End User Account
- **Email**: `akash@gmail.com`
- **Password**: `password123`
- **Role**: End User
- **Permissions**: Create and manage personal tickets

### Support Agent Account
- **Email**: `harshita@quickdesk.com`
- **Password**: `password123`
- **Role**: Support Agent
- **Permissions**: Manage assigned tickets, respond to customers, update ticket status

### Administrator Account
- **Email**: `admin@quickdesk.com`
- **Password**: `password123`
- **Role**: Administrator
- **Permissions**: Full system access, user management, category management

> **Note**: These demo accounts are automatically created when the backend server starts for the first time.

## 🏗️ Complete Project Structure

```
Odoo-QuickDesk/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── Layout/        # Navigation and layout components
│   │   ├── Tickets/       # Ticket-specific components
│   │   └── UI/           # Generic UI components (Button, Input, etc.)
│   ├── contexts/          # React contexts for state management
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Main application pages
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions and helpers
│   └── main.tsx         # Application entry point
├── backend/               # Backend Node.js/Express API
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── config.env       # Environment variables
│   ├── package.json     # Backend dependencies
│   └── server.js        # Main server file
├── package.json          # Frontend dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md            # Project documentation
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

### Frontend Architecture
- **React Context API** for authentication state management
- **Custom Hooks** for data fetching and API communication
- **TypeScript** for type safety and better development experience
- **React Router** for client-side routing and navigation
- **Responsive Design** with Tailwind CSS

### Backend Architecture
- **RESTful API** with Express.js
- **MongoDB** with Mongoose ODM for data persistence
- **JWT Authentication** with bcryptjs password hashing
- **Role-based Access Control** for different user permissions
- **Security Middleware** (Helmet, CORS, Rate Limiting)

### Database Schema
- **Users**: Authentication, roles, and user management
- **Tickets**: Support ticket management with status tracking
- **Categories**: Ticket categorization system
- **Replies**: Thread-based ticket communication

### Security Features
- **JWT Token Authentication** with expiration
- **Password Hashing** using bcryptjs
- **Role-based Route Protection** for different user roles
- **CORS Protection** for secure cross-origin requests
- **Rate Limiting** to prevent API abuse
- **Input Validation** and sanitization

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

- **Full-Stack Application** with separate frontend and backend
- **MongoDB Database** for persistent data storage
- **JWT Authentication** for secure user sessions
- **Role-based Access Control** for different user permissions
- **Responsive Design** built with mobile-first approach
- **TypeScript** for type safety and better development experience
- **Modern React** with hooks and functional components
- **Production-ready** with proper error handling and security measures

## 🚀 API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Ticket Endpoints
- `GET /api/tickets` - Get all tickets (with filtering)
- `GET /api/tickets/:id` - Get single ticket with replies
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket (admin only)

### Reply Endpoints
- `GET /api/replies/tickets/:ticketId/replies` - Get ticket replies
- `POST /api/replies/tickets/:ticketId/replies` - Add reply to ticket
- `PUT /api/replies/:id` - Update reply
- `DELETE /api/replies/:id` - Delete reply

### Category Endpoints
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### User Management Endpoints
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get single user (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Health Check
- `GET /api/health` - API health status

## 🚨 Troubleshooting

### Common Issues & Solutions

#### **MongoDB Connection Issues:**
```bash
# Check if MongoDB is running
# Windows: net start MongoDB
# macOS: brew services list | grep mongodb
# Linux: sudo systemctl status mongod

# Restart MongoDB if needed
# Windows: net stop MongoDB && net start MongoDB
# macOS: brew services restart mongodb-community
# Linux: sudo systemctl restart mongod
```

#### **Backend Issues:**
```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

# Check environment variables
cat config.env

# Check if port 5000 is available
netstat -an | grep 5000
```

#### **Frontend Issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check if port 5173 is available
netstat -an | grep 5173
```

#### **Database Issues:**
```bash
# Connect to MongoDB shell
mongosh

# Check databases
show dbs

# Use quickdesk database
use quickdesk

# Check collections
show collections

# Check users
db.users.find()
```

### Environment Variables

#### **Backend (.env file):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickdesk
JWT_SECRET=quickdesk-secret-key-2024
NODE_ENV=development
```

## 🤝 Contributing

This is a demo project showcasing modern full-stack development practices. For production use, consider implementing:

- **File Upload**: Add file attachment capabilities
- **Email Notifications**: Send email alerts for ticket updates
- **Real-time Features**: WebSocket for live updates
- **Advanced Search**: Elasticsearch integration
- **Reporting**: Analytics and reporting dashboard
- **API Documentation**: Swagger/OpenAPI documentation
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline
- **Monitoring**: Application performance monitoring
- **Backup**: Database backup and recovery

## 📚 Additional Resources

- **Backend Documentation**: [backend/README.md](backend/README.md)
- **MongoDB Documentation**: [https://docs.mongodb.com/](https://docs.mongodb.com/)
- **Express.js Documentation**: [https://expressjs.com/](https://expressjs.com/)
- **React Documentation**: [https://react.dev/](https://react.dev/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)

---

**QuickDesk** - A modern full-stack help desk solution for efficient customer support management.

*Built with ❤️ using React, TypeScript, Node.js, Express, and MongoDB* 