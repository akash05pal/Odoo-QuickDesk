import Reply from '../models/Reply.js';
import Ticket from '../models/Ticket.js';

// @desc    Get replies for a ticket
// @route   GET /api/tickets/:ticketId/replies
// @access  Private
export const getReplies = async (req, res) => {
  try {
    const replies = await Reply.find({ ticketId: req.params.ticketId })
      .populate('userId', 'name email role')
      .sort({ createdAt: 1 });
    
    res.json({
      success: true,
      data: replies
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add reply to ticket
// @route   POST /api/tickets/:ticketId/replies
// @access  Private
export const addReply = async (req, res) => {
  try {
    const { message, isInternal = false } = req.body;
    
    // Check if ticket exists
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Check permissions
    if (req.user.role === 'end_user' && ticket.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const reply = await Reply.create({
      ticketId: req.params.ticketId,
      userId: req.user._id,
      message,
      isInternal
    });
    
    const populatedReply = await Reply.findById(reply._id)
      .populate('userId', 'name email role');
    
    res.status(201).json({
      success: true,
      data: populatedReply
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update reply
// @route   PUT /api/replies/:id
// @access  Private
export const updateReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    
    // Check permissions - only the author can edit
    if (reply.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { message } = req.body;
    reply.message = message;
    
    const updatedReply = await reply.save();
    
    const populatedReply = await Reply.findById(updatedReply._id)
      .populate('userId', 'name email role');
    
    res.json({
      success: true,
      data: populatedReply
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete reply
// @route   DELETE /api/replies/:id
// @access  Private
export const deleteReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    
    // Check permissions - only the author or admin can delete
    if (reply.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await reply.deleteOne();
    
    res.json({ success: true, message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 