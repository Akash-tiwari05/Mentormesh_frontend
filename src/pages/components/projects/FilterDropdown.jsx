import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; // Only import necessary icons

const FilterDropdown = React.memo(({ label, value, onChange, options, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative"
  >
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <select
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-8 py-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none text-gray-800"
      >
        <option value="">All {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  </motion.div>
));

export default FilterDropdown;