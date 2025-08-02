import User from '../models/User.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin only)
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create user
// @route   POST /api/users
// @access  Private (Admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'end_user'
    });
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin only)
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { name, email, role, isActive } = req.body;
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;
    
    const updatedUser = await user.save();
    
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Soft delete - set isActive to false
    user.isActive = false;
    await user.save();
    
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 