import Redis from 'ioredis'
import { APP_NAME_EN } from './const'
import { env } from './env.server'

declare global {
  var redis: Redis | undefined
}

export const keyPrefix = `${APP_NAME_EN}:`

const getRedisClient = () => {
  if (!globalThis.redis) {
    globalThis.redis = new Redis(env.REDIS_URL, {
      keyPrefix,
      lazyConnect: false,
      enableReadyCheck: true,
      enableOfflineQueue: true,
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        return Math.min(times * 200, 2000)
      },
    })

    globalThis.redis.on('connect', () => console.log('[Redis] connected.'))
    globalThis.redis.on('ready', () => console.log('[Redis] ready.'))
    globalThis.redis.on('error', (error) =>
      console.error('[Redis] error:', error),
    )
  }

  return globalThis.redis
}

export const redisClient = getRedisClient()
