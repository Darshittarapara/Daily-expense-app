import React, { InputHTMLAttributes, forwardRef } from 'react';

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="date"
          ref={ref}
          className={`input input-bordered w-full ${error ? 'input-error' : ''} ${className}`}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';
