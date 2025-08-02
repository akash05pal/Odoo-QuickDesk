import Ticket from '../models/Ticket.js';
import Reply from '../models/Reply.js';

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
export const getTickets = async (req, res) => {
  try {
    const { status, category, search, sortBy = 'recent', page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    // Filter by user role
    if (req.user.role === 'end_user') {
      query.createdBy = req.user._id;
    } else if (req.user.role === 'support_agent') {
      // Support agents can see all tickets or just assigned ones
      if (req.query.assigned === 'true') {
        query.assignedTo = req.user._id;
      }
    }
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Filter by category
    if (category && category !== 'all') {
      query.categoryId = category;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'recent':
        sort = { createdAt: -1 };
        break;
      case 'priority':
        sort = { priority: -1, createdAt: -1 };
        break;
      case 'status':
        sort = { status: 1, createdAt: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }
    
    const skip = (page - 1) * limit;
    
    const tickets = await Ticket.find(query)
      .populate('categoryId', 'name')
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Ticket.countDocuments(query);
    
    res.json({
      success: true,
      data: tickets,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('categoryId', 'name description')
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Check permissions
    if (req.user.role === 'end_user' && ticket.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Get replies
    const replies = await Reply.find({ ticketId: req.params.id })
      .populate('userId', 'name email role')
      .sort({ createdAt: 1 });
    
    res.json({
      success: true,
      data: {
        ticket,
        replies
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create ticket
// @route   POST /api/tickets
// @access  Private
export const createTicket = async (req, res) => {
  try {
    const { subject, description, categoryId, priority } = req.body;
    
    const ticket = await Ticket.create({
      subject,
      description,
      categoryId,
      priority: priority || 'medium',
      createdBy: req.user._id
    });
    
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('categoryId', 'name')
      .populate('createdBy', 'name email');
    
    res.status(201).json({
      success: true,
      data: populatedTicket
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Check permissions
    if (req.user.role === 'end_user' && ticket.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { subject, description, categoryId, status, priority, assignedTo } = req.body;
    
    if (subject) ticket.subject = subject;
    if (description) ticket.description = description;
    if (categoryId) ticket.categoryId = categoryId;
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (assignedTo) ticket.assignedTo = assignedTo;
    
    const updatedTicket = await ticket.save();
    
    const populatedTicket = await Ticket.findById(updatedTicket._id)
      .populate('categoryId', 'name')
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');
    
    res.json({
      success: true,
      data: populatedTicket
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private (Admin only)
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Only admin can delete tickets
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await Reply.deleteMany({ ticketId: req.params.id });
    await ticket.deleteOne();
    
    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 