export function buildContentDisposition(
  originalName: string,
  disposition: 'inline' | 'attachment' = 'inline',
) {
  const asciiFallback = originalName.replace(/[^\x20-\x7E]/g, '_') || 'file'
  const encoded = encodeURIComponent(originalName)

  return `${disposition}; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`
}
