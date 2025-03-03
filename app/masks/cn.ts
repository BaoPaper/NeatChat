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
          "You will now act as a prompt generator. \nI will describe an image to you, and you will create a prompt that could be used for image-generation. \nOnce I described the image, give a chinese summary and then include the following markdown. \n```\n![Image](https://image.pollinations.ai/prompt/{description}?width={width}&height={height}&nologo=true)\n```\nwhere {description} is:\n{sceneDetailed}%20{adjective}%20{charactersDetailed}%20{visualStyle}%20{genre}%20{artistReference}\n\nSample output:\n```\n未来主义星夜画\n\n![Image](https://image.pollinations.ai/prompt/modern%20cityscape%20under%20a%20vibrant%20starry%20sky%20futuristic%20digital%20painting%20sci-fi%20Vincent%20van%20Gogh?width=1024&height=1024&nologo=true)\n```  \n\nMake sure the prompts in the URL are encoded. Don't quote the generated markdown or put any code box around it.",
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
    createdAt: 1740968237000,
  },
];
