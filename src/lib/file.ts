export const persianFileType = (mime: string): string => {
  // Images
  if (mime.startsWith('image/')) return 'عکس'

  // Video
  if (mime.startsWith('video/')) return 'ویدیو'

  // Audio
  if (mime.startsWith('audio/')) return 'صدا'

  // Text
  if (mime === 'text/plain') return 'فایل متنی'
  if (mime === 'text/csv') return 'فایل CSV'
  if (mime === 'text/html') return 'فایل HTML'
  if (mime.startsWith('text/')) return 'فایل متنی'

  // PDF
  if (mime === 'application/pdf') return 'فایل PDF'

  // Microsoft Word
  if (
    mime === 'application/msword' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'فایل ورد'

  // Microsoft Excel
  if (
    mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
    return 'فایل اکسل'

  // Microsoft PowerPoint
  if (
    mime === 'application/vnd.ms-powerpoint' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
    return 'فایل پاورپوینت'

  // Executables
  if (
    mime === 'application/x-msdownload' ||
    mime === 'application/x-msdos-program' ||
    mime === 'application/vnd.microsoft.portable-executable' ||
    mime === 'application/exe' ||
    mime === 'application/x-exe'
  )
    return 'فایل اجرایی'

  // Archives
  if (
    mime === 'application/zip' ||
    mime === 'application/x-zip-compressed' ||
    mime === 'application/x-rar-compressed' ||
    mime === 'application/x-7z-compressed' ||
    mime === 'application/x-tar' ||
    mime === 'application/gzip'
  )
    return 'فایل فشرده'

  // JSON / XML
  if (mime === 'application/json') return 'فایل JSON'
  if (mime === 'application/xml' || mime === 'text/xml') return 'فایل XML'

  // Fonts
  if (mime.startsWith('font/') || mime.includes('font')) return 'فایل فونت'

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

export const persianFileDate = (
  fileDate: number | Date,
  withTime = false,
): string => {
  const date = new Date(fileDate)

  return !withTime
    ? `${date.toLocaleDateString('fa-IR')}`
    : `${date.toLocaleDateString('fa-IR')} ، ${date.toLocaleTimeString('fa-IR')}`
}
