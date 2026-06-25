import { useEffect, useState } from 'react'

export function useImageDimensions(file: File) {
  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    if (!file.type.startsWith('image/')) {
      setDimensions(null)
      return
    }

    let cancelled = false
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      if (!cancelled) {
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight })
      }
      URL.revokeObjectURL(url)
    }

    img.src = url

    return () => {
      cancelled = true
      URL.revokeObjectURL(url)
    }
  }, [file])

  return dimensions
}
