import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/helpers'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-black-main mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border rounded-lg',
            'bg-white text-black-main',
            'focus:outline-none focus:ring-2 focus:ring-gold-main focus:border-transparent',
            'transition-all duration-200',
            error ? 'border-red-500' : 'border-grey-300',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'