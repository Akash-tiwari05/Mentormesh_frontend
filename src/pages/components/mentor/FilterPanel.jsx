import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, mentors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const allSkills = [...new Set(mentors.flatMap(m => m.skills))].sort(); // Get unique sorted skills

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center text-gray-600"
        >
          <Filter className="w-4 h-4 mr-2" />
          <ChevronDown className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Skills Filter */}
          <div>
            <select
              value={filters.skill}
              onChange={(e) => onFilterChange({ ...filters, skill: e.target.value })}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <select
              value={filters.rating}
              onChange={(e) => onFilterChange({ ...filters, rating: e.target.value })}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <select
              value={filters.experience}
              onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Experience</option>
              <option value="1-3">1-3 years</option>
              <option value="4-6">4-6 years</option>
              <option value="7+">7+ years</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;