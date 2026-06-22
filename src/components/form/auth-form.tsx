import { TextInput } from '#/components/input/text-input'
import { FieldGroup } from '#/components/ui/field'
import { authClient } from '#/lib/auth-client'
import { errorMsg, successMsg  } from '#/lib/message'
import type {ERROR_MSG_KEYS} from '#/lib/message';
import { emailZodSchema } from '#/zod-schema/email'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { SubmitBtn } from '../submit-btn'

export const AuthForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: emailZodSchema,
      }),
    ),
    defaultValues: {
      email: '',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const { error } = await authClient.signIn.magicLink({
            ...data,
            errorCallbackURL: '/auth',
            newUserCallbackURL: '/?success=newUserWelcome',
            callbackURL: '/?success=loggedIn',
          })

          if (error) {
            toast.error(
              (error.code && errorMsg[error.code as ERROR_MSG_KEYS]) ||
                error.message ||
                errorMsg['generic'],
            )

            return
          }

          form.reset()

          toast.success(successMsg['magicLinkSent'])
        } catch {
          toast.error(errorMsg['generic'])
        }
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="email"
          label="ایمیل شما"
          textInputProps={{ type: 'email', autoComplete: 'on' }}
        />
        <SubmitBtn disabled={isSubmitting}>ارسال ایمیل</SubmitBtn>
      </FieldGroup>
    </form>
  )
}
