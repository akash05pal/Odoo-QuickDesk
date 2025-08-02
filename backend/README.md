# QuickDesk Backend API

A Node.js/Express backend API for the QuickDesk help desk management system.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **RESTful API**: Complete CRUD operations for tickets, users, categories, and replies
- **Security**: Helmet, rate limiting, CORS protection
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error handling middleware
- **Validation**: Input validation and sanitization

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `config.env` and update with your MongoDB connection string
   - Update JWT_SECRET for production

4. **Start MongoDB**
   - Make sure MongoDB is running locally or update the connection string

5. **Start the server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Tickets
- `GET /api/tickets` - Get all tickets (with filtering)
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket (admin only)

### Replies
- `GET /api/replies/tickets/:ticketId/replies` - Get ticket replies
- `POST /api/replies/tickets/:ticketId/replies` - Add reply to ticket
- `PUT /api/replies/:id` - Update reply
- `DELETE /api/replies/:id` - Delete reply

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get single user (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## 🔐 Demo Accounts

The backend automatically creates demo accounts on first run:

- **End User**: `akash@gmail.com` / `password123`
- **Support Agent**: `harshita@quickdesk.com` / `password123`
- **Admin**: `admin@quickdesk.com` / `password123`

## 🏗️ Project Structure

```
backend/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── config.env      # Environment variables
├── package.json    # Dependencies
└── server.js       # Main server file
```

## 🔧 Environment Variables

Create a `config.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickdesk
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## 🚀 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Role-based Access**: Different permissions for different user roles
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Secure cross-origin requests
- **Input Validation**: Request validation and sanitization

## 📊 Database Models

- **User**: Authentication and user management
- **Ticket**: Support ticket management
- **Category**: Ticket categorization
- **Reply**: Ticket responses and communication

## 🔄 API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... } // for list endpoints
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set a strong JWT_SECRET
4. Configure CORS origins
5. Use a process manager like PM2

## 📝 Development Notes

- The API uses ES6 modules
- All routes are protected except auth routes
- Demo data is automatically initialized
- Comprehensive error handling included
- API documentation available via endpoints 