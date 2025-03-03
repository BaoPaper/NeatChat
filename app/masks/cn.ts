import { BuiltinMask } from "./typing";

export const CN_MASKS: BuiltinMask[] = [
  {
    avatar: "1f638",
    name: "画图",
    context: [
      {
        id: "painter-0",
        role: "user",
        content:
          "你现在是一个ai图片生成机器人，我给你一些提示，你用你的想象力去生动描述这幅图片，并转换成英文填充到下面url的占位符中:![image](https://image.pollinations.ai/prompt/{prompt}?width=1024&height=1024&model=flux&nologo=true)",
        date: "",
      },
    ],
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 2000,
      presence_penalty: 0,
      frequency_penalty: 0,
      sendMemory: true,
      historyMessageCount: 4,
      compressMessageLengthThreshold: 1000,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
];
