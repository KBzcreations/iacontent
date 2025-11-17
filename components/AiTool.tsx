import React, { useState } from 'react';
import type { ContentTool } from '../types';
import { generateContent } from '../services/geminiService';
import { SparklesIcon } from './icons';

interface AiToolProps {
  tool: ContentTool;
  onGenerate: (input: string, output: string) => void;
  isDisabled: boolean;
}

const AiTool: React.FC<AiToolProps> = ({ tool, onGenerate, isDisabled }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (isDisabled) {
        setError("You are out of credits. Please upgrade your plan.");
        return;
    }
    if (!userInput.trim()) {
      setError('Please provide some input.');
      return;
    }
    setError('');
    setIsLoading(true);
    
    const prompt = tool.basePrompt(userInput);
    const result = await generateContent(prompt);
    
    onGenerate(userInput, result);
    setIsLoading(false);
    setUserInput(''); // Clear input after generation
  };
  
  return (
    <div className="bg-slate-900/70 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-3">2. Describe Your Content</h2>
      <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
      
      <div className="space-y-4">
        <label htmlFor={`tool-input-${tool.name}`} className="sr-only">
          {tool.inputLabel}
        </label>
        <textarea
          id={`tool-input-${tool.name}`}
          rows={3}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={tool.inputLabel}
          className="w-full bg-gray-800 border border-slate-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          disabled={isLoading || isDisabled}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={isLoading || isDisabled}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            {tool.buttonText} (1 Credit)
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AiTool;