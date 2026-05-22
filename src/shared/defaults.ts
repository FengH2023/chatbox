import { v4 as uuidv4 } from 'uuid'
import { type Config, ModelProviderEnum, ModelProviderType, type SessionSettings, type Settings, Theme } from './types'

export const WINDHUB_PROVIDER_ID = 'custom-provider-windhub'

export function settings(): Settings {
  return {
    providers: {
      [ModelProviderEnum.OpenAI]: {
        apiKey: 'sk-abf3b199cd4444d0352683ba4049bca6c2d57830520fa152fb7b221bfa7dbd07',
        apiHost: 'https://sub2api.molezi.de',
        activeAuthMode: 'apikey',
        models: [
          {
            modelId: 'gpt-5.4-mini',
            nickname: 'GPT 5.4 Mini',
            capabilities: ['vision', 'tool_use', 'reasoning'],
            contextWindow: 400000,
            maxOutput: 128000,
          },
          {
            modelId: 'gpt-5.4',
            nickname: 'GPT 5.4',
            capabilities: ['vision', 'tool_use', 'reasoning'],
            contextWindow: 1050000,
            maxOutput: 128000,
          },
          {
            modelId: 'gpt-5.5',
            nickname: 'GPT 5.5',
            capabilities: ['vision', 'tool_use', 'reasoning'],
            contextWindow: 1050000,
            maxOutput: 128000,
          },
          {
            modelId: 'gpt-image-2',
            nickname: 'GPT Image 2',
            capabilities: [],
          },
          {
            modelId: 'gpt-5.3-codex',
            nickname: 'GPT 5.3 Codex',
            capabilities: ['tool_use', 'reasoning'],
            contextWindow: 400000,
            maxOutput: 128000,
          },
        ],
      },
      [WINDHUB_PROVIDER_ID]: {
        apiKey: 'sk-DyXgIT2pAcHoZ5BqoK4TRhcID8HkRBNCYxzqv2hYbRvu90Kr',
        apiHost: 'https://windhub.cc/v1',
        activeAuthMode: 'apikey',
        models: [
          {
            modelId: 'doubao-seed-2-0-pro-260215',
            nickname: '豆包',
            capabilities: ['vision', 'tool_use'],
          },
          {
            modelId: 'deepseek-v3-2-251201',
            nickname: 'deepseek',
            capabilities: ['tool_use'],
          },
        ],
      },
    },
    customProviders: [
      {
        id: WINDHUB_PROVIDER_ID,
        name: 'WindHub',
        type: ModelProviderType.OpenAI,
        isCustom: true,
        defaultSettings: {
          apiHost: 'https://windhub.cc/v1',
          activeAuthMode: 'apikey',
          models: [
            {
              modelId: 'doubao-seed-2-0-pro-260215',
              nickname: '豆包',
              capabilities: ['vision', 'tool_use'],
            },
            {
              modelId: 'deepseek-v3-2-251201',
              nickname: 'deepseek',
              capabilities: ['tool_use'],
            },
          ],
        },
      },
    ],
    defaultChatModel: {
      provider: ModelProviderEnum.OpenAI,
      model: 'gpt-5.5',
    },
    threadNamingModel: {
      provider: ModelProviderEnum.OpenAI,
      model: 'gpt-5.5',
    },
    searchTermConstructionModel: {
      provider: ModelProviderEnum.OpenAI,
      model: 'gpt-5.5',
    },
    // aiProvider: ModelProviderEnum.OpenAI,
    // openaiKey: '',
    // apiHost: 'https://api.openai.com',
    // dalleStyle: 'vivid',
    // imageGenerateNum: 3,
    // openaiUseProxy: false,

    // azureApikey: '',
    // azureDeploymentName: '',
    // azureDeploymentNameOptions: [],
    // azureDalleDeploymentName: 'dall-e-3',
    // azureEndpoint: '',
    // azureApiVersion: '2024-05-01-preview',

    // chatglm6bUrl: '', // deprecated
    // chatglmApiKey: '',
    // chatglmModel: '',

    // model: 'gpt-4o',
    // openaiCustomModelOptions: [],
    // temperature: 0.7,
    // topP: 1,
    // // openaiMaxTokens: 0,
    // // openaiMaxContextTokens: 4000,
    // openaiMaxContextMessageCount: 20,
    // // maxContextSize: "4000",
    // // maxTokens: "2048",

    // claudeApiKey: '',
    // claudeApiHost: 'https://api.anthropic.com/v1',
    // claudeModel: 'claude-3-5-sonnet-20241022',
    // claudeApiKey: '',
    // claudeApiHost: 'https://api.anthropic.com',
    // claudeModel: 'claude-3-5-sonnet-20241022',

    // chatboxAIModel: 'chatboxai-3.5',

    // geminiAPIKey: '',
    // geminiAPIHost: 'https://generativelanguage.googleapis.com',
    // geminiModel: 'gemini-1.5-pro-latest',

    // ollamaHost: 'http://127.0.0.1:11434',
    // ollamaModel: '',

    // groqAPIKey: '',
    // groqModel: 'llama3-70b-8192',

    // deepseekAPIKey: '',
    // deepseekModel: 'deepseek-chat',

    // siliconCloudKey: '',
    // siliconCloudModel: 'Qwen/Qwen2.5-7B-Instruct',

    // lmStudioHost: 'http://127.0.0.1:1234/v1',
    // lmStudioModel: '',

    // perplexityApiKey: '',
    // perplexityModel: 'llama-3.1-sonar-large-128k-online',

    // xAIKey: '',
    // xAIModel: 'grok-beta',

    // customProviders: [],

    showWordCount: false,
    showTokenCount: false,
    showTokenUsed: true,
    showModelName: true,
    showMessageTimestamp: false,
    showFirstTokenLatency: false,
    showAvatar: true,
    // messageLayout: 'left' as const, // 不设置默认值，这样可以通过判断这个值是否为空来判断是否通过了新功能引导
    userAvatarKey: '',
    defaultAssistantAvatarKey: '',
    backgroundImageKey: '',
    theme: Theme.System,
    language: 'zh-Hans',
    fontSize: 14,
    spellCheck: true,

    defaultPrompt: getDefaultPrompt(),

    allowReportingAndTracking: true,

    enableMarkdownRendering: true,
    enableLaTeXRendering: true,
    enableMermaidRendering: true,
    injectDefaultMetadata: true,
    autoPreviewArtifacts: false,
    autoCollapseCodeBlock: true,
    pasteLongTextAsAFile: true,

    autoGenerateTitle: true,

    autoCompaction: true,
    compactionThreshold: 0.6,

    autoLaunch: false,
    autoUpdate: true,
    betaUpdate: false,

    shortcuts: {
      quickToggle: 'Alt+`', // 快速切换窗口显隐的快捷键
      inputBoxFocus: 'mod+i', // 聚焦输入框的快捷键
      inputBoxWebBrowsingMode: 'mod+e', // 切换输入框的 web 浏览模式的快捷键
      newChat: 'mod+n', // 新建聊天的快捷键
      newPictureChat: 'mod+shift+n', // 新建图片会话的快捷键
      sessionListNavNext: 'mod+tab', // 切换到下一个会话的快捷键
      sessionListNavPrev: 'mod+shift+tab', // 切换到上一个会话的快捷键
      sessionListNavTargetIndex: 'mod', // 会话导航的快捷键
      messageListRefreshContext: 'mod+r', // 刷新上下文的快捷键
      dialogOpenSearch: 'mod+k', // 打开搜索对话框的快捷键
      inputBoxSendMessage: 'Enter', // 发送消息的快捷键
      inputBoxSendMessageWithoutResponse: 'Ctrl+Enter', // 发送但不生成回复的快捷键
      optionNavUp: 'up', // 选项导航的快捷键
      optionNavDown: 'down', // 选项导航的快捷键
      optionSelect: 'enter', // 选项导航的快捷键
    },
    extension: {
      webSearch: {
        provider: 'build-in',
        tavilyApiKey: '',
        bochaApiKey: '',
      },
      knowledgeBase: {
        models: {
          embedding: undefined,
          rerank: undefined,
        },
      },
      // documentParser is NOT set here - it uses platform-specific defaults
      // Desktop: 'local', Mobile/Web: 'chatbox-ai'
      // See settingsStore.ts for the platform-aware initialization logic
      documentParser: undefined,
    },
    mcp: {
      servers: [],
      enabledBuiltinServers: [],
    },
    skills: {
      enabledSkillNames: [],
      translationEnabled: true,
    },
  }
}

export function newConfigs(): Config {
  return { uuid: uuidv4() }
}

export function getDefaultPrompt() {
  return '你是一个有帮助的中文 AI 助手。默认使用中文回答，除非用户明确要求使用其他语言。'
}

export function chatSessionSettings(): SessionSettings {
  return {
    provider: ModelProviderEnum.OpenAI,
    modelId: 'gpt-5.5',
    stream: false,
    maxContextMessageCount: Number.MAX_SAFE_INTEGER,
  }
}

export function pictureSessionSettings(): SessionSettings {
  return {
    provider: ModelProviderEnum.OpenAI,
    modelId: 'gpt-image-2',
    imageGenerateNum: 1,
    dalleStyle: 'vivid',
  }
}

// SystemProviders is now generated from the provider registry
// Re-export getSystemProviders as SystemProviders for backward compatibility
export { getSystemProviders as SystemProviders } from './providers/registry'
