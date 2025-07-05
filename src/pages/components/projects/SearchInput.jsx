import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchInput = React.memo(({ onSearchChange }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="relative mb-6"
  >
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search projects by title or description..."
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-800"
    />
  </motion.div>
));

export default SearchInput;