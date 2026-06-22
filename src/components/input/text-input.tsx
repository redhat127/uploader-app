import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { PasswordInput } from '#/components/ui/password-input'
import type { ComponentProps } from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

export const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  textInputProps,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  textInputProps?: ComponentProps<typeof Input>
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {textInputProps?.type === 'password' ? (
              <PasswordInput
                {...textInputProps}
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
            ) : (
              <Input
                {...textInputProps}
                {...field}
                type={textInputProps?.type || 'text'}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
