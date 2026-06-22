import { MAGIC_LINK_EXPIRES_IN_MINUTES } from '#/lib/const'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from 'react-email'
import { Logo } from '../logo'

const title = 'ایمیل حاوی لینک ثبت نام یا ورود'

export default function AuthMail({
  magicLink,
  APP_URL,
}: {
  magicLink: string
  APP_URL: string
}) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            fontFamily: {
              sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
            },
          },
        },
      }}
    >
      <Html lang="fa-IR" dir="rtl">
        <Head>
          <title>{title}</title>
          <style>{`
            @font-face {
              font-family: 'Vazirmatn';
              font-style: normal;
              font-weight: 400;
              src: url('https://cdn.jsdelivr.net/fontsource/fonts/vazirmatn@latest/arabic-400-normal.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Vazirmatn';
              font-style: normal;
              font-weight: 700;
              src: url('https://cdn.jsdelivr.net/fontsource/fonts/vazirmatn@latest/arabic-700-normal.woff2') format('woff2');
            }
          `}</style>
        </Head>
        <Body
          className="bg-gray-100 p-8 font-sans"
          style={{ direction: 'rtl' }}
        >
          <Container className="mx-auto my-10 max-w-120 rounded-xl border border-gray-300 bg-white p-10">
            <Button
              href={APP_URL}
              target="_blank"
              className="m-0 mb-6 text-inherit!"
            >
              <Logo />
            </Button>

            <Heading
              as="h1"
              className="m-0 mb-6 text-xl font-bold text-gray-900"
            >
              {title}
            </Heading>

            <Text className="m-0 mb-2 text-gray-700">با سلام</Text>

            <Text className="m-0 mb-6 text-gray-700">
              برای ثبت نام یا ورود ، روی دکمه ی زیر کلیک کنید.
            </Text>

            <Section className="m-0 mb-6 text-center">
              <Button
                href={magicLink}
                target="_blank"
                className="m-0 rounded-xl bg-sky-600 px-8 py-4 font-bold text-white"
              >
                ثبت نام یا ورود
              </Button>
            </Section>

            <Text className="m-0 text-gray-600">
              این لینک تا {MAGIC_LINK_EXPIRES_IN_MINUTES} دقیقه ی دیگر معتبر
              است. اگر شما این ایمیل را درخواست نکرده اید ، آن را نادیده بگیرید.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
