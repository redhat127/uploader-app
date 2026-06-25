import { useImageDimensions } from '#/hooks/use-image-dimensions'

export type ImageDimensionProps =
  | { file: File; imageDimensions?: never }
  | { file?: never; imageDimensions: { width: number; height: number } }

export const ImageDimension = (props: ImageDimensionProps) => {
  const computedDimension = useImageDimensions(props.file)

  const imageDimension = props.imageDimensions ?? computedDimension

  return !imageDimension ? null : (
    <p>
      ابعاد عکس :{' '}
      <span dir="ltr">
        {imageDimension.width} x {imageDimension.height}
      </span>
    </p>
  )
}
