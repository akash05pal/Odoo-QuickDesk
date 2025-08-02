import { useState, useEffect } from 'react';
import { Category } from '../types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = () => {
    const storedCategories = JSON.parse(localStorage.getItem('quickdesk_categories') || '[]');
    setCategories(storedCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const createCategory = (name: string, description: string) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      description,
      createdAt: new Date().toISOString()
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('quickdesk_categories', JSON.stringify(updatedCategories));
    
    return newCategory;
  };

  const updateCategory = (id: string, name: string, description: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id ? { ...cat, name, description } : cat
    );
    
    setCategories(updatedCategories);
    localStorage.setItem('quickdesk_categories', JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('quickdesk_categories', JSON.stringify(updatedCategories));
  };

  return {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    loadCategories
  };
};