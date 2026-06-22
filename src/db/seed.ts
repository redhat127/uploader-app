import { flushAppRedisKeys } from '#/lib/utils.server'
import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import { db } from '.'
import { userTable, verificationTable } from './schema'

try {
  console.log('removing log/email_links.log...')

  await rm(join(process.cwd(), 'log', 'email_links.log'), { force: true })

  console.log('log/email_links.log removed.')

  await flushAppRedisKeys()

  console.log('wiping verification and user tables...')

  await Promise.all([db.delete(verificationTable), db.delete(userTable)])

  console.log('tables wiped.')

  const [newUser] = await db
    .insert(userTable)
    .values({ name: 'ali', email: 'ali@example.com', emailVerified: true })
    .returning({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      emailVerified: userTable.emailVerified,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,
    })

  console.log('seed user:', newUser)

  process.exit(0)
} catch (e) {
  console.error(e)
  process.exit(1)
}
