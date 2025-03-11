import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { ModelType } from "../store";

import ClaudeIcon from "../icons/claude-color.svg";
import DallEIcon from "../icons/dalle-color.svg";
import GeminiIcon from "../icons/gemini-color.svg";
import DouBaoIcon from "../icons/doubao-color.svg";
import HunYuanIcon from "../icons/hunyuan-color.svg";
import MetaIcon from "../icons/meta-color.svg";
import CohereIcon from "../icons/cohere-color.svg";
import DeepseekIcon from "../icons/deepseek-color.svg";
import MoonShotIcon from "../icons/moonshot.svg";
import GlmIcon from "../icons/qingyan-color.svg";
import GrokIcon from "../icons/grok.svg";
import Gpt35Icon from "../icons/openai-3.5.svg";
import QwenIcon from "../icons/qwen-color.svg";
import OpenAIIcon from "../icons/openai.svg";
import WenXinIcon from "../icons/wenxin-color.svg";
import NeatIcon from "../icons/neat.svg";

import "../styles/model-avatar.scss";

// 添加默认系统类别匹配规则常量
const DEFAULT_SYSTEM_CATEGORY_PATTERNS: Record<string, string> = {
  Claude: "claude",
  "DALL-E": "dall",
  DeepSeek: "deepseek",
  Grok: "grok",
  Gemini: "gemini",
  MoonShot: "moonshot|kimi",
  WenXin: "wenxin|ernie",
  DouBao: "doubao",
  HunYuan: "hunyuan",
  Cohere: "command",
  GLM: "glm",
  Llama: "llama",
  Qwen: "qwen|qwq|qvq",
  ChatGPT: "gpt|o1|o3",
};

// 添加一个本地存储键，用于保存系统类别匹配规则
const SYSTEM_CATEGORIES_STORAGE_KEY = "chat-next-web-system-categories";

// 获取模型类别的函数
export function getModelCategory(modelId: string): string {
  const lowerModelId = modelId.toLowerCase();

  try {
    // 尝试从本地存储获取自定义规则
    const storedPatterns = localStorage.getItem(SYSTEM_CATEGORIES_STORAGE_KEY);
    const categoryPatterns = storedPatterns
      ? JSON.parse(storedPatterns)
      : DEFAULT_SYSTEM_CATEGORY_PATTERNS;

    // 检查系统类别
    for (const [category, pattern] of Object.entries(categoryPatterns)) {
      const patterns = (pattern as string).split("|");
      for (const p of patterns) {
        if (lowerModelId.includes(p.toLowerCase())) {
          return category;
        }
      }
    }
  } catch (error) {
    console.error("从本地存储加载系统类别匹配规则失败:", error);

    // 如果出错，使用默认规则
    for (const [category, pattern] of Object.entries(
      DEFAULT_SYSTEM_CATEGORY_PATTERNS,
    )) {
      const patterns = (pattern as string).split("|");
      for (const p of patterns) {
        if (lowerModelId.includes(p.toLowerCase())) {
          return category;
        }
      }
    }
  }

  return "Other";
}

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  // Whoever owns this Content Delivery Network (CDN), I am using your CDN to serve emojis
  // Old CDN broken, so I had to switch to this one
  // Author: https://github.com/H0llyW00dzZ
  return `https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      width={"100%"}
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: {
  model?: ModelType;
  avatar?: string;
  provider?: string;
}) {
  if (props.model) {
    return (
      <div className="no-dark">
        {(() => {
          const model = props.model?.toLowerCase() || "";
          const provider = props.provider?.toLowerCase() || "";

          // 如果提供了 provider，优先根据 provider 显示头像
          if (provider) {
            if (provider.includes("anthropic")) {
              return (
                <ClaudeIcon className="user-avatar model-avatar" alt="Claude" />
              );
            }

            if (provider.includes("openai")) {
              // 对于 OpenAI 的模型，区分 GPT-3.5 和其他模型
              if (model.includes("gpt-3.5") || model.includes("gpt3")) {
                return (
                  <Gpt35Icon
                    className="user-avatar model-avatar"
                    alt="GPT-3.5"
                  />
                );
              }
              return (
                <OpenAIIcon className="user-avatar model-avatar" alt="OpenAI" />
              );
            }

            if (provider.includes("google")) {
              return (
                <GeminiIcon className="user-avatar model-avatar" alt="Gemini" />
              );
            }

            if (provider.includes("bytedance")) {
              return (
                <DouBaoIcon className="user-avatar model-avatar" alt="DouBao" />
              );
            }

            if (provider.includes("baidu")) {
              return (
                <WenXinIcon className="user-avatar model-avatar" alt="WenXin" />
              );
            }

            if (provider.includes("tencent")) {
              return (
                <HunYuanIcon
                  className="user-avatar model-avatar"
                  alt="HunYuan"
                />
              );
            }

            if (provider.includes("meta")) {
              return (
                <MetaIcon className="user-avatar model-avatar" alt="Meta" />
              );
            }

            if (provider.includes("cohere")) {
              return (
                <CohereIcon className="user-avatar model-avatar" alt="Cohere" />
              );
            }

            if (provider.includes("deepseek")) {
              return <DeepseekIcon className="user-avatar model-avatar" />;
            }

            if (provider.includes("moonshot")) {
              return (
                <MoonShotIcon
                  className="user-avatar model-avatar"
                  alt="MoonShot"
                />
              );
            }

            if (provider.includes("zhipu")) {
              return <GlmIcon className="user-avatar model-avatar" alt="GLM" />;
            }

            if (provider.includes("xai")) {
              return (
                <GrokIcon className="user-avatar model-avatar" alt="Grok" />
              );
            }

            if (provider.includes("aliyun")) {
              return (
                <QwenIcon className="user-avatar model-avatar" alt="Qwen" />
              );
            }
          }

          // 使用统一的模型类别匹配逻辑
          const category = getModelCategory(model);

          // 根据类别返回对应的图标
          switch (category) {
            case "Claude":
              return (
                <ClaudeIcon className="user-avatar model-avatar" alt="Claude" />
              );
            case "DALL-E":
              return (
                <DallEIcon className="user-avatar model-avatar" alt="DALL-E" />
              );
            case "WenXin":
              return (
                <WenXinIcon className="user-avatar model-avatar" alt="WenXin" />
              );
            case "DouBao":
              return (
                <DouBaoIcon className="user-avatar model-avatar" alt="DouBao" />
              );
            case "HunYuan":
              return (
                <HunYuanIcon
                  className="user-avatar model-avatar"
                  alt="HunYuan"
                />
              );
            case "Gemini":
              return (
                <GeminiIcon className="user-avatar model-avatar" alt="Gemini" />
              );
            case "Llama":
              return (
                <MetaIcon className="user-avatar model-avatar" alt="Meta" />
              );
            case "ChatGPT":
              // 特殊处理GPT-3.5
              if (model.includes("gpt-3.5") || model.includes("gpt3")) {
                return (
                  <Gpt35Icon
                    className="user-avatar model-avatar"
                    alt="GPT-3.5"
                  />
                );
              }
              return (
                <OpenAIIcon className="user-avatar model-avatar" alt="OpenAI" />
              );
            case "Cohere":
              return (
                <CohereIcon className="user-avatar model-avatar" alt="Cohere" />
              );
            case "DeepSeek":
              return <DeepseekIcon className="user-avatar model-avatar" />;
            case "MoonShot":
              return (
                <MoonShotIcon
                  className="user-avatar model-avatar"
                  alt="MoonShot"
                />
              );
            case "GLM":
              return <GlmIcon className="user-avatar model-avatar" alt="GLM" />;
            case "Grok":
              return (
                <GrokIcon className="user-avatar model-avatar" alt="Grok" />
              );
            case "Qwen":
              return (
                <QwenIcon className="user-avatar model-avatar" alt="Qwen" />
              );
            default:
              return (
                <NeatIcon className="user-avatar model-avatar" alt="Logo" />
              );
          }
        })()}
      </div>
    );
  }

  return (
    <div className="user-avatar">
      {props.avatar && <EmojiAvatar avatar={props.avatar} />}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}
