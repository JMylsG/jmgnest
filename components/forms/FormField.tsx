import React from 'react'
import Label from '@/components/ui/Label'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea'
  required?: boolean
  error?: string
  helperText?: string
  placeholder?: string
  value?: string | number
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  min?: string | number
  max?: string | number
  rows?: number
}

export default function FormField({
  label,
  name,
  type = 'text',
  required = false,
  error,
  helperText,
  placeholder,
  value,
  defaultValue,
  onChange,
  min,
  max,
  rows = 5,
}: FormFieldProps) {
  return (
    <div className="w-full">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          id={name}
          name={name}
          required={required}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          value={value as string}
          onChange={onChange}
          rows={rows}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          required={required}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          min={typeof min === 'string' ? min : min?.toString()}
          max={typeof max === 'string' ? max : max?.toString()}
        />
      )}
    </div>
  )
}

