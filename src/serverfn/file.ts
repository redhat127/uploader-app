import { db } from '#/db'
import { fileTable } from '#/db/schema'
import { requireAuthMiddleware } from '#/middleware/require-auth'
import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'

export const getMyFilesServerFn = createServerFn({ method: 'GET' })
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { user } }) => {
    if (!user) return

    const { id: userId } = user

    const files = await db.query.fileTable.findMany({
      where: eq(fileTable.userId, userId),
      orderBy: desc(fileTable.createdAt),
    })

    return files
  })

export type File = NonNullable<
  Awaited<ReturnType<typeof getMyFilesServerFn>>
>[number]
