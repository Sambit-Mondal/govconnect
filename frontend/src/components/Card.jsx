import React from 'react'

const Card = ({ 
  children, 
  title, 
  subtitle, 
  footer, 
  className = '',
  onClick,
  icon = null,
  status = null,
  hoverable = false
}) => {
  const cardClasses = [
    'card',
    hoverable && 'card-hoverable',
    onClick && 'card-clickable',
    status && `card-status-${status}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle || icon) && (
        <div className="card-header">
          <div className="card-header-content">
            {icon && <span className="card-icon">{icon}</span>}
            <div className="card-header-text">
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {status && <span className={`card-status-badge card-status-${status}`}>{status}</span>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
