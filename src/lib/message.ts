export const errorMsg = {
  generic: 'خطایی رخ داده!',
  INVALID_TOKEN: 'توکن اشتباه بوده یا منقضی شده است. لینک جدید درخواست کنید.',
}

export type ERROR_MSG_KEYS = keyof typeof errorMsg

export const successMsg = {
  magicLinkSent: 'ایمیل حاوی لینک برای شما ارسال شد.',
  newUserWelcome: 'ثبت نام انجام شد. خوش آمدید!',
  loggedIn: 'شما وارد شدید.',
}

export type SUCCESS_MSG_KEYS = keyof typeof successMsg
