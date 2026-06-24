import { db } from '#/db'
import { fileTable } from '#/db/schema'
import { env } from '#/lib/env.server'
import { errorMsg } from '#/lib/message'
import { ensureUploadsDirExists } from '#/lib/utils.server'
import { requireAuthApiMiddleware } from '#/middleware/require-auth'
import { fileZodSchema } from '#/zod-schema/file'
import { createFileRoute } from '@tanstack/react-router'
import { fileTypeFromBuffer } from 'file-type'
import { nanoid } from 'nanoid'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

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

          const { uploadDir } = await ensureUploadsDirExists()

          const fileName = `${nanoid()}.${detected.ext}`

          const filePath = resolve(uploadDir, fileName)

          await writeFile(filePath, buffer)

          await db.insert(fileTable).values({
            name: fileName,
            mime: detected.mime,
            userId,
            url: new URL(`/api/file/${fileName}`, env.APP_URL).toString(),
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
