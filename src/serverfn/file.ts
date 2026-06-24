import { db } from '#/db'
import { fileTable } from '#/db/schema'
import { requireAuthMiddleware } from '#/middleware/require-auth'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const getMyFilesServerFn = createServerFn({ method: 'GET' })
  .middleware([requireAuthMiddleware])
  .handler(async ({ context: { user } }) => {
    if (!user) return

    const { id: userId } = user

    const files = await db.query.fileTable.findMany({
      where: eq(fileTable.userId, userId),
    })

    return files
  })
