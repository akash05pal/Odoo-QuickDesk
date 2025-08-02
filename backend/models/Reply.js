import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: [true, 'Reply message is required'],
    trim: true
  },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }],
  isInternal: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
replySchema.index({ ticketId: 1, createdAt: -1 });

export default mongoose.model('Reply', replySchema); 