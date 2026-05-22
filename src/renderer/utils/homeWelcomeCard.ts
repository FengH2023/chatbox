export type WelcomeCardMode = 'guide' | 'copilots' | 'none'

export function getHomeWelcomeCardMode(_params: {
  providerCount: number
  isLoggedIn: boolean
  hasLicense: boolean
}): WelcomeCardMode {
  return 'none'
}
