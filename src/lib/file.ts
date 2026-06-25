export const persianFileType = (mime: string): string => {
  // Images
  if (mime.startsWith('image/')) return 'عکس'

  // Video
  if (mime.startsWith('video/')) return 'ویدیو'

  // Audio
  if (mime.startsWith('audio/')) return 'صدا'

  // Text
  if (mime === 'text/plain') return 'متنی'
  if (mime === 'text/csv') return 'CSV'
  if (mime === 'text/html') return 'HTML'
  if (mime.startsWith('text/')) return 'متنی'

  // PDF
  if (mime === 'application/pdf') return 'PDF'

  // Microsoft Word
  if (
    mime === 'application/msword' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'WORD'

  // Microsoft Excel
  if (
    mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
    return 'اکسل'

  // Microsoft PowerPoint
  if (
    mime === 'application/vnd.ms-powerpoint' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
    return 'پاورپوینت'

  // Executables
  if (
    mime === 'application/x-msdownload' ||
    mime === 'application/x-msdos-program' ||
    mime === 'application/vnd.microsoft.portable-executable' ||
    mime === 'application/exe' ||
    mime === 'application/x-exe'
  )
    return 'اجرایی'

  // Archives
  if (
    mime === 'application/zip' ||
    mime === 'application/x-zip-compressed' ||
    mime === 'application/x-rar-compressed' ||
    mime === 'application/x-7z-compressed' ||
    mime === 'application/x-tar' ||
    mime === 'application/gzip'
  )
    return 'فشرده'

  // JSON / XML
  if (mime === 'application/json') return 'JSON'
  if (mime === 'application/xml' || mime === 'text/xml') return 'XML'

  // Fonts
  if (mime.startsWith('font/') || mime.includes('font')) return 'فونت'

  // Fallback
  return 'نامعلوم'
}

export const persianFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 بایت'

  const units = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت']
  const k = 1024

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    units.length - 1,
  )

  const value = bytes / Math.pow(k, exponent)

  const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)

  return `${formatted} ${units[exponent]}`
}

export const persianFileDate = (fileDate: number | Date): string => {
  const date = new Date(fileDate)

  return `${date.toLocaleDateString('fa-IR')} ، ${date.toLocaleTimeString('fa-IR')}`
}
