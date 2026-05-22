import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/stores/settingsStore'
import platform from '@/platform'

export function useI18nEffect() {
  const language = useLanguage()
  const { i18n } = useTranslation()
  useEffect(() => {
    ;(async () => {
      i18n.changeLanguage(platform.type === 'mobile' ? 'zh-Hans' : language)
    })()
  }, [language])
}
