import type { Language } from '../../shared/types'

export const languageNameMap: Record<Language, string> = {
  en: '英语',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁体中文',
  ja: '日语',
  ko: '韩语',
  ru: '俄语',
  de: '德语',
  fr: '法语',
  'pt-PT': '葡萄牙语',
  es: '西班牙语',
  ar: '阿拉伯语',
  'it-IT': '意大利语',
  sv: '瑞典语',
  'nb-NO': '挪威语',
}

export const languages = Array.from(Object.keys(languageNameMap)) as Language[]
