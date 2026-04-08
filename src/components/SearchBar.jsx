import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <Search size={18} className="search-icon" />
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
      />
    </div>
  );
}
