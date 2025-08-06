import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)

  return (
    <div className={`form-group ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`form-label ${labelClassName}`}
        >
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        className={`form-input ${hasError ? 'error' : ''} ${inputClassName} ${className || ''}`}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${inputId}-error` : 
          helperText ? `${inputId}-helper` : 
          undefined
        }
        {...props}
      />
      
      {error && (
        <span 
          id={`${inputId}-error`}
          className={`error-message ${errorClassName}`}
          role="alert"
        >
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span 
          id={`${inputId}-helper`}
          className="helper-text"
        >
          {helperText}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input