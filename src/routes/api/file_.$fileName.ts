import { db } from '#/db'
import { fileTable } from '#/db/schema'
import { errorMsg } from '#/lib/message'
import { buildContentDisposition } from '#/lib/storage'
import { deleteStoredFile, readStoredFile } from '#/lib/storage.server'
import { requireAuthApiMiddleware } from '#/middleware/require-auth'
import { filenameSchema } from '#/zod-schema/fileName'
import { createFileRoute } from '@tanstack/react-router'
import { and, eq } from 'drizzle-orm'

export const Route = createFileRoute('/api/file_/$fileName')({
  server: {
    handlers({ createHandlers }) {
      return createHandlers({
        async GET({ params, request }) {
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

            const wantsDownload = new URL(request.url).searchParams.has(
              'download',
            )

            return new Response(new Uint8Array(buffer), {
              headers: {
                'content-type': file.mime,
                'content-disposition': buildContentDisposition(
                  file.originalName,
                  wantsDownload ? 'attachment' : 'inline',
                ),
              },
            })
          } catch {
            return Response.json(
              { error: errorMsg['generic'] },
              { status: 500 },
            )
          }
        },
        DELETE: {
          middleware: [requireAuthApiMiddleware],
          async handler({
            params,
            context: {
              user: { id: userId },
            },
          }) {
            try {
              const { error, data: fileName } = filenameSchema.safeParse(
                params.fileName,
              )

              if (error) {
                return Response.json(
                  { error: 'فایل یافت نشد.' },
                  { status: 404 },
                )
              }

              const whereClause = and(
                eq(fileTable.name, fileName),
                eq(fileTable.userId, userId),
              )

              const file = await db.query.fileTable.findFirst({
                where: whereClause,
              })

              if (!file) {
                return Response.json(
                  { error: 'فایل یافت نشد.' },
                  { status: 404 },
                )
              }

              await deleteStoredFile(fileName)

              await db.delete(fileTable).where(whereClause)

              return new Response(undefined, { status: 204 })
            } catch {
              return Response.json(
                { error: errorMsg['generic'] },
                { status: 500 },
              )
            }
          },
        },
      })
    },
  },
})
