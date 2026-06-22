import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Textarea } from '#/components/ui/textarea'
import type { ComponentProps } from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

export const TextareaInput = <T extends FieldValues>({
  control,
  name,
  label,
  textareaInputProps,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  textareaInputProps?: ComponentProps<typeof Textarea>
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Textarea
              {...textareaInputProps}
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
