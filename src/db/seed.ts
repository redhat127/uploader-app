import { redisClient } from '#/lib/redis.server'
import { flushAppRedisKeys } from '#/lib/utils.server'
import { rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { db } from '.'
import { fileTable, userTable, verificationTable } from './schema'

if (process.env.NODE_ENV === 'production') {
  console.error('refusing to run seed script in production.')
  process.exit(1)
}

const readlineInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
})

try {
  if (redisClient.status !== 'ready') {
    await new Promise((res) => redisClient.once('ready', res))
  }

  const wipeFileTableAndRemoveUploadsDir = (
    await readlineInterface.question(
      'wipe file table and remove uploads/ dir? (y/n) ',
    )
  )
    .trim()
    .toLowerCase()

  if (wipeFileTableAndRemoveUploadsDir === 'y') {
    console.log('removing uploads/ dir...')

    await rm(resolve(process.cwd(), 'uploads'), {
      force: true,
      recursive: true,
    })

    console.log('uploads/ dir removed.')

    console.log('wiping file table...')

    await db.delete(fileTable)

    console.log('file table wiped.')
  }

  const continueAnswer = (
    await readlineInterface.question(
      'continue to remove other stuff and seed tables? (y/n) ',
    )
  )
    .trim()
    .toLowerCase()

  if (continueAnswer !== 'y') {
    process.exit(0)
  }

  console.log('removing log/email_links.log...')

  await rm(join(process.cwd(), 'log', 'email_links.log'), { force: true })

  console.log('log/email_links.log removed.')

  await flushAppRedisKeys()

  console.log('wiping verification and user tables...')

  await Promise.all([db.delete(verificationTable), db.delete(userTable)])

  console.log('tables wiped.')

  const [newUser] = await db
    .insert(userTable)
    .values({ name: 'علی', email: 'ali@example.com', emailVerified: true })
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
} finally {
  readlineInterface.close()
}
