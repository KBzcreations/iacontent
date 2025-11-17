import type { ContentTool } from './types';

export const CONTENT_TOOLS: ContentTool[] = [
  {
    name: 'Blog Post',
    description: 'Generate a complete, SEO-optimized blog article from a single topic or title.',
    inputLabel: 'Enter a topic or a specific article title (e.g., "5 benefits of remote work")',
    buttonText: 'Generate Blog Post',
    basePrompt: (userInput: string) => `
      You are an expert content creator and SEO specialist. Your task is to write a 600-word, SEO-optimized blog article for the given title or topic. The article must be engaging, informative, and structured with:
      - An introduction that hooks the reader.
      - At least three distinct sections with clear subheadings (H2 tags).
      - A concluding summary that reinforces the main points.
      - Use professional yet accessible language.
      
      Format your response in well-structured markdown.
      
      User's Request: "${userInput}"
    `,
  },
  {
    name: 'YouTube Script',
    description: 'Create an engaging script for a "faceless" YouTube video, complete with sections for visuals.',
    inputLabel: 'Enter a video topic (e.g., "The history of video games")',
    buttonText: 'Generate YouTube Script',
    basePrompt: (userInput: string) => `
      You are a professional scriptwriter for engaging YouTube videos. Create a script for a 5-7 minute "faceless" video on the given topic. The script should be conversational and easy to follow.
      
      Structure the script with the following elements:
      1.  **Hook (Intro):** A captivating opening (15-20 seconds) to grab the viewer's attention.
      2.  **Main Body:** Break the topic into 3-4 logical segments. For each segment, provide the narration text.
      3.  **Visual Cues:** After each narration paragraph, suggest visuals in brackets, e.g., [Visual: Archival footage of early computers].
      4.  **Outro:** A clear call to action (e.g., "subscribe," "watch next") and a summary.
      
      Topic: "${userInput}"
      
      Format the entire output in markdown.
    `,
  },
  {
    name: 'Social Media Campaign',
    description: 'Generate a mini-campaign for Twitter, LinkedIn, and Instagram from one topic.',
    inputLabel: 'Enter a campaign topic (e.g., "The launch of our new productivity app")',
    buttonText: 'Generate Campaign',
    basePrompt: (userInput: string) => `
      You are an expert social media manager. Based on the user's topic, create a cohesive mini-campaign for three platforms: Twitter, LinkedIn, and Instagram.

      1.  **Twitter Thread (3 tweets):** Create a short, punchy thread designed to get engagement. Use relevant hashtags.
      2.  **LinkedIn Post:** Write a professional, slightly longer post suitable for a business audience. Use professional hashtags.
      3.  **Instagram Caption:** Write an engaging caption. Suggest relevant emojis and hashtags for discoverability.
      
      Format the entire response in well-structured markdown, using H2 headings for each platform (e.g., ## Twitter Thread).
      
      User's Topic: "${userInput}"
    `,
  },
];