import { relations } from 'drizzle-orm'
import { accountTable, sessionTable, userTable } from './auth-schema'
import { fileTable } from './file-schema'

export * from './auth-schema'
export * from './file-schema'

export const userRelations = relations(userTable, ({ many }) => ({
  sessions: many(sessionTable),
  accounts: many(accountTable),
  files: many(fileTable),
}))

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}))

export const accountRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}))

export const fileRelation = relations(fileTable, ({ one }) => ({
  user: one(userTable, {
    fields: [fileTable.userId],
    references: [userTable.id],
  }),
}))
