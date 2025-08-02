import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private (Admin only)
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const category = await Category.create({
      name,
      description
    });
    
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const { name, description } = req.body;
    
    if (name) category.name = name;
    if (description) category.description = description;
    
    const updatedCategory = await category.save();
    
    res.json({
      success: true,
      data: updatedCategory
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Soft delete - set isActive to false
    category.isActive = false;
    await category.save();
    
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 