import React from 'react';
import { FilterOptions } from '../../types';
import { Search } from 'lucide-react';
import Select from '../UI/Select';
import Input from '../UI/Input';

interface TicketFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: Array<{ id: string; name: string }>;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  filters,
  onFiltersChange,
  categories
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat.id, label: cat.name }))
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Updated' },
    { value: 'replies', label: 'Most Replies' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={filters.search || ''}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <Select
          value={filters.status || 'all'}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
          options={statusOptions}
        />
        
        <Select
          value={filters.category || 'all'}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
          options={categoryOptions}
        />
        
        <Select
          value={filters.sortBy || 'recent'}
          onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as any })}
          options={sortOptions}
        />
      </div>
    </div>
  );
};

export default TicketFilters;