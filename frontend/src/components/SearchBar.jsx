import React, { useState } from 'react'

const SearchBar = ({ 
  placeholder = 'Search...', 
  onSearch, 
  className = '' 
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch && query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form className={`search-bar ${className}`} onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  )
}

export default SearchBar
