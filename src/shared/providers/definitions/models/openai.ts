import { createOpenAI } from '@ai-sdk/openai'
import { extractReasoningMiddleware, wrapLanguageModel } from 'ai'
import AbstractAISDKModel from '../../../models/abstract-ai-sdk'
import { fetchRemoteModels } from '../../../models/openai-compatible'
import type { CallChatCompletionOptions } from '../../../models/types'
import { createFetchWithProxy } from '../../../models/utils/fetch-proxy'
import type { ProviderModelInfo, StreamTextResult } from '../../../types'
import type { ModelDependencies } from '../../../types/adapters'
import { normalizeOpenAIApiHostAndPath } from '../../../utils/llm_utils'
import type { ModelMessage } from 'ai'

interface Options {
  apiKey: string
  apiHost: string
  model: ProviderModelInfo
  dalleStyle: 'vivid' | 'natural'
  temperature?: number
  topP?: number
  maxOutputTokens?: number
  injectDefaultMetadata: boolean
  useProxy: boolean
  stream?: boolean
}

export default class OpenAI extends AbstractAISDKModel {
  public name = 'OpenAI'
  public options: Options

  constructor(options: Options, dependencies: ModelDependencies) {
    super(options, dependencies)
    const { apiHost } =
      options.model.modelId === 'gpt-image-2'
        ? { apiHost: 'https://api.ridge148.dpdns.org/v1' }
        : normalizeOpenAIApiHostAndPath(options)
    this.options = { ...options, apiHost }
  }

  static isSupportTextEmbedding() {
    return true
  }

  protected getProvider() {
    const apiKey =
      this.options.model.modelId === 'gpt-image-2'
        ? 'sk-95a97c824f16ce365fb1553c29989cac82cabfedfada47d5'
        : this.options.apiKey
    return createOpenAI({
      apiKey,
      baseURL: this.options.apiHost,
      fetch: createFetchWithProxy(this.options.useProxy, this.dependencies),
      headers: this.options.apiHost.includes('openrouter.ai')
        ? {
            'HTTP-Referer': 'https://chatboxai.app',
            'X-Title': 'Chatbox AI',
          }
        : undefined,
    })
  }

  protected getChatModel() {
    const provider = this.getProvider()
    return wrapLanguageModel({
      model: provider.chat(this.options.model.modelId),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    })
  }

  public async chat(messages: ModelMessage[], options: CallChatCompletionOptions): Promise<StreamTextResult> {
    if (this.options.apiHost.includes('sub2api.molezi.de')) {
      return this.chatWithNativeRequest(messages, options)
    }
    return super.chat(messages, options)
  }

  private toOpenAIMessages(messages: ModelMessage[]) {
    return messages.map((message) => {
      const content = Array.isArray(message.content)
        ? message.content
            .map((part: any) => {
              if (part.type === 'text') {
                return part.text
              }
              return ''
            })
            .filter(Boolean)
            .join('\n')
        : message.content
      return {
        role: message.role,
        content: content || '',
      }
    })
  }

  private async chatWithNativeRequest(
    messages: ModelMessage[],
    options: CallChatCompletionOptions
  ): Promise<StreamTextResult> {
    console.debug('[OpenAI] using native request for sub2api chat completions')
    const response = await this.dependencies.request.apiRequest({
      url: `${this.options.apiHost}/chat/completions`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.options.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.options.model.modelId,
        messages: this.toOpenAIMessages(messages),
        temperature: this.options.temperature,
        top_p: this.options.topP,
        max_tokens: this.options.maxOutputTokens,
        stream: false,
      }),
      useProxy: false,
      signal: options.signal,
    })
    const json = await response.json()
    const text = json?.choices?.[0]?.message?.content || ''
    const result: StreamTextResult = {
      contentParts: [{ type: 'text', text }],
      usage: json?.usage
        ? {
            inputTokens: json.usage.prompt_tokens,
            outputTokens: json.usage.completion_tokens,
            totalTokens: json.usage.total_tokens,
          }
        : undefined,
      finishReason: json?.choices?.[0]?.finish_reason,
    }
    options.onResultChange?.({
      contentParts: result.contentParts,
      tokenCount: result.usage?.outputTokens,
      tokensUsed: result.usage?.totalTokens,
    })
    return result
  }

  protected getImageModel(modelId?: string) {
    const provider = this.getProvider()
    const imageModelId = modelId || this.options.model.modelId || 'gpt-image-1'
    return provider.image(imageModelId)
  }

  protected getCallSettings(options: CallChatCompletionOptions) {
    const isModelSupportReasoning = this.isSupportReasoning()
    let providerOptions = {}
    if (isModelSupportReasoning) {
      providerOptions = {
        openai: options.providerOptions?.openai || {},
      }
    }

    return {
      temperature: this.options.temperature,
      topP: this.options.topP,
      maxOutputTokens: this.options.maxOutputTokens,
      stream: false,
      providerOptions,
    }
  }

  public listModels() {
    return fetchRemoteModels(
      {
        apiHost: this.options.apiHost,
        apiKey: this.options.apiKey,
        useProxy: this.options.useProxy,
      },
      this.dependencies
    )
  }
}
