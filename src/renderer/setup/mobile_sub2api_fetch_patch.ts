import platform from '@/platform'
import { handleMobileRequest } from '@/utils/mobile-request'
import { CHATBOX_BUILD_TARGET } from '@/variables'

if ((platform.type === 'mobile' || CHATBOX_BUILD_TARGET === 'mobile_app') && typeof window !== 'undefined') {
  const originalFetch = globalThis.fetch.bind(globalThis)

  const patchedFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' || input instanceof URL ? input.toString() : input.url
    if (url.includes('sub2api.molezi.de')) {
      console.debug('[mobile-fetch-patch] routing sub2api request through native HTTP')
      const request = typeof input === 'string' || input instanceof URL ? undefined : input
      const headers = new Headers(init?.headers || request?.headers)
      return handleMobileRequest(
        url,
        init?.method || request?.method || 'GET',
        headers,
        init?.body || undefined,
        init?.signal || request?.signal || undefined
      )
    }
    return originalFetch(input, init)
  }

  window.fetch = patchedFetch
  globalThis.fetch = patchedFetch
}
