import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  icon = null,
  fullWidth = false
}) => {
  const baseClasses = 'button'
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    danger: 'button-danger',
    outline: 'button-outline',
    ghost: 'button-ghost',
    success: 'button-success',
    warning: 'button-warning'
  }
  const sizeClasses = {
    small: 'button-small',
    medium: 'button-medium',
    large: 'button-large'
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'button-full-width',
    disabled && 'button-disabled',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
