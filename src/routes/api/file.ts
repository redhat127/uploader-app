import { db } from '#/db'
import { fileTable } from '#/db/schema'
import { env } from '#/lib/env.server'
import { errorMsg } from '#/lib/message'
import { saveFile } from '#/lib/storage.server'
import { requireAuthApiMiddleware } from '#/middleware/require-auth'
import { fileZodSchema } from '#/zod-schema/file'
import { createFileRoute } from '@tanstack/react-router'
import { fileTypeFromBuffer } from 'file-type'
import { imageSize } from 'image-size'
import { nanoid } from 'nanoid'
import sanitize from 'sanitize-filename'

export const Route = createFileRoute('/api/file')({
  server: {
    middleware: [requireAuthApiMiddleware],
    handlers: {
      async POST({
        request,
        context: {
          user: { id: userId },
        },
      }) {
        try {
          const formData = await request.formData()

          const { error, data: file } = fileZodSchema.safeParse(
            formData.get('file'),
          )

          if (error) {
            return Response.json(
              { error: error.issues[0].message },
              { status: 400 },
            )
          }

          const buffer = Buffer.from(await file.arrayBuffer())

          const detected = await fileTypeFromBuffer(buffer)

          if (!detected) {
            return Response.json(
              { error: 'فرمت فایل مجاز نیست.' },
              { status: 400 },
            )
          }

          const imageDimensions = detected.mime.startsWith('image/')
            ? imageSize(buffer)
            : null

          const fileName = `${nanoid()}.${detected.ext}`

          await saveFile(fileName, buffer)

          await db.insert(fileTable).values({
            originalName: sanitize(file.name) || fileName,
            name: fileName,
            mime: detected.mime,
            storage: env.STORAGE_NAME,
            userId,
            imageDimension: imageDimensions
              ? { width: imageDimensions.width, height: imageDimensions.height }
              : null,
            sizeBytes: BigInt(file.size),
          })

          return Response.json({}, { status: 201 })
        } catch {
          return Response.json({ error: errorMsg['generic'] }, { status: 500 })
        }
      },
    },
  },
})
