import { db } from '#/db'
import { fileTable } from '#/db/schema'
import { errorMsg } from '#/lib/message'
import { buildContentDisposition } from '#/lib/storage'
import { readStoredFile } from '#/lib/storage.server'
import { filenameSchema } from '#/zod-schema/fileName'
import { createFileRoute } from '@tanstack/react-router'
import { eq } from 'drizzle-orm'

export const Route = createFileRoute('/api/file_/$fileName')({
  server: {
    handlers: {
      async GET({ params }) {
        try {
          const { error, data: fileName } = filenameSchema.safeParse(
            params.fileName,
          )

          if (error) {
            return Response.json({ error: 'فایل یافت نشد.' }, { status: 404 })
          }

          const file = await db.query.fileTable.findFirst({
            where: eq(fileTable.name, fileName),
          })

          if (!file) {
            return Response.json({ error: 'فایل یافت نشد.' }, { status: 404 })
          }

          const buffer = await readStoredFile(file.name)

          if (!buffer) {
            return Response.json({ error: 'فایل یافت نشد.' }, { status: 404 })
          }

          return new Response(new Uint8Array(buffer), {
            headers: {
              'content-type': file.mime,
              'content-disposition': buildContentDisposition(file.originalName),
            },
          })
        } catch {
          return Response.json({ error: errorMsg['generic'] }, { status: 500 })
        }
      },
    },
  },
})
