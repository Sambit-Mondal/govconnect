import React from 'react'

const Table = ({ 
  columns, 
  data, 
  className = '',
  onRowClick = null,
  emptyMessage = 'No data available',
  loading = false
}) => {
  if (loading) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-empty">
          <span className="empty-icon">📭</span>
          <p>{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className}>
                {column.icon && <span className="table-header-icon">{column.icon}</span>}
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={onRowClick ? 'table-row-clickable' : ''}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.className}>
                  {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table