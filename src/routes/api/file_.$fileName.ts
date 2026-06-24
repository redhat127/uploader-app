import { ensureUploadsDirExists } from '#/lib/utils.server'
import { filenameSchema } from '#/zod-schema/fileName'
import { createFileRoute } from '@tanstack/react-router'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export const Route = createFileRoute('/api/file_/$fileName')({
  server: {
    handlers: {
      async GET({ params }) {
        try {
          const { error, data: fileName } = filenameSchema.safeParse(
            params.fileName,
          )

          if (error) {
            return Response.json({}, { status: 404 })
          }

          const { uploadDir } = await ensureUploadsDirExists()

          const filePath = resolve(uploadDir, fileName)

          const ext = fileName.split('.').pop()?.toLowerCase()

          if (!ext) {
            return Response.json({}, { status: 404 })
          }

          const buffer = await readFile(filePath)

          return new Response(buffer, {
            headers: {
              'content-type': `image/${ext}`,
            },
          })
        } catch {
          return Response.json({}, { status: 404 })
        }
      },
    },
  },
})
