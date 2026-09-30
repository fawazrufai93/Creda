import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[34px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
    lg: 'text-base px-5 py-2.5 gap-2.5 min-h-[46px]',
  };

  const variantStyles = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-900 shadow-sm border border-neutral-800',
    secondary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600 shadow-sm border border-emerald-600',
    outline: 'bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 focus-visible:ring-neutral-400',
    destructive: 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600 shadow-sm border border-rose-600',
    ghost: 'bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-400',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-neutral-200 shadow-xs p-6 ${onClick ? 'cursor-pointer hover:border-neutral-300 transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; helperText?: string }> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2 text-sm text-neutral-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all ${
          error ? 'border-rose-400 focus:ring-rose-400' : 'border-neutral-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-neutral-500">{helperText}</p>}
    </div>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }> = ({
  label,
  error,
  id,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3.5 py-2 text-sm text-neutral-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all ${
          error ? 'border-rose-400' : 'border-neutral-300'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
};

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}> = ({ title, description, actionText, onAction, icon: Icon }) => {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-neutral-300 rounded-xl bg-neutral-50/50">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-500">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-4">{description}</p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}> = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          role="dialog"
          aria-modal="true"
          className={`relative w-full ${maxWidth} bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden transition-all`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/40">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
              {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
