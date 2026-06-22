import { Button } from '#/components/ui/button'
import { LoadingSwap } from '#/components/ui/loading-swap'
import type { ComponentProps } from 'react'

export const SubmitBtn = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props} type="submit">
      <LoadingSwap isLoading={Boolean(props.disabled)}>
        {props.children}
      </LoadingSwap>
    </Button>
  )
}
