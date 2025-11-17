export interface ContentTool {
  name: string;
  description: string;
  inputLabel: string;
  buttonText: string;
  basePrompt: (userInput: string) => string;
}

export interface HistoryItem {
  id: number;
  toolName: string;
  input: string;
  output: string;
}

export type Plan = 'Free' | 'Pro';
