import AuthMail from '#/components/emails/auth-mail'
import { appendFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { createTransport } from 'nodemailer'
import { render } from 'react-email'
import { APP_NAME_FARSI } from './const'
import { env } from './env.server'

declare global {
  var mailer: ReturnType<typeof createTransport> | undefined
}

const getMailer = () => {
  if (!globalThis.mailer) {
    globalThis.mailer = createTransport(env.SMTP_URL)
  }

  return globalThis.mailer
}

const APP_URL = env.APP_URL

const noreplyFrom = `"${APP_NAME_FARSI}" <no-reply@${new URL(APP_URL).hostname}>`

const LOG_DIR = join(process.cwd(), 'log')
const LOG_FILE = join(LOG_DIR, 'email_links.log')

const logMagicLink = async (to: string, magicLink: string) => {
  await mkdir(LOG_DIR, { recursive: true })

  const entry = `[${new Date().toISOString()}] ${to} -> ${magicLink}\n`

  await appendFile(LOG_FILE, entry, 'utf-8')
}

export const sendAuthMail = async ({
  to,
  magicLink,
}: {
  to: string
  magicLink: string
}) => {
  if (env.NODE_ENV !== 'production') {
    await logMagicLink(to, magicLink)
    return
  }

  const authMail = <AuthMail magicLink={magicLink} APP_URL={APP_URL} />

  const html = await render(authMail)
  const text = await render(authMail, { plainText: true })

  return getMailer().sendMail({
    to,
    subject: 'ایمیل حاوی لینک ثبت نام یا ورود',
    from: noreplyFrom,
    html,
    text,
  })
}
