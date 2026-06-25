import { useImageDimensions } from '#/hooks/use-image-dimensions'

export const ImageDimension = ({ file }: { file: File }) => {
  const imageDimension = useImageDimensions(file)

  return (
    <p>
      ابعاد عکس :{' '}
      {imageDimension ? (
        <span dir="ltr">
          {imageDimension.width} x {imageDimension.height}
        </span>
      ) : (
        <span className="animate-pulse">صبر کنید...</span>
      )}
    </p>
  )
}
