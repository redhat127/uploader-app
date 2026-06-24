import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { userTable } from './auth-schema'

export const fileTable = pgTable('file', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuidv7()`),
  name: text('name').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  mime: text('mime').notNull(),
  sizeKB: text('size_kb').notNull(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})
