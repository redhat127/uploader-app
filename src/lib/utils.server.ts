import { keyPrefix, redisClient } from './redis.server'

export const flushAppRedisKeys = async () => {
  if (redisClient.status !== 'ready') {
    await new Promise((resolve) => redisClient.once('ready', resolve))
  }

  console.log(`[Redis] scanning for keys with prefix "${keyPrefix}"...`)

  const keys = await redisClient.keys(`${keyPrefix}*`)

  if (keys.length < 1) {
    console.log(
      `[Redis] no keys found with prefix "${keyPrefix}". nothing to delete.`,
    )
    return
  }

  // keys() returns raw keys already including the prefix,
  // but del() re-applies keyPrefix itself — so we must strip it first
  // to avoid double-prefixing (a known ioredis behavior).
  const strippedKeys = keys.map((k) => k.slice(keyPrefix.length))

  console.log(
    `[Redis] found ${strippedKeys.length} key(s) to delete:`,
    strippedKeys,
  )

  const deletedKeysCount = await redisClient.del(...strippedKeys)

  console.log(`[Redis] deleted ${deletedKeysCount} key(s).`)
}
