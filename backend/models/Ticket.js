import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Ticket subject is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Ticket description is required'],
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }]
}, {
  timestamps: true
});

// Index for better query performance
ticketSchema.index({ status: 1, priority: 1 });
ticketSchema.index({ createdBy: 1 });
ticketSchema.index({ assignedTo: 1 });

export default mongoose.model('Ticket', ticketSchema); 