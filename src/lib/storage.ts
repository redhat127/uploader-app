export function buildContentDisposition(originalName: string) {
  const asciiFallback = originalName.replace(/[^\x20-\x7E]/g, '_') || 'file'
  const encoded = encodeURIComponent(originalName)

  return `inline; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`
}

export const fileMimePersianTranslation = (mime: string) => {
  if (mime.startsWith('image/')) return 'عکس'

  return 'نامعلوم'
}
