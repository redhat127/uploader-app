import { validStorageName } from '#/lib/storage.server'
import { sql } from 'drizzle-orm'
import {
  bigint,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { userTable } from './auth-schema'

export const fileTable = pgTable('file', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuidv7()`),
  originalName: text('original_name').notNull(),
  name: text('name').notNull(),
  storage: text('storage', { enum: validStorageName }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  mime: text('mime').notNull(),
  imageDimension: jsonb('image_dimensions').$type<{
    width: number
    height: number
  }>(),
  sizeBytes: bigint('size_bytes', { mode: 'bigint' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})
