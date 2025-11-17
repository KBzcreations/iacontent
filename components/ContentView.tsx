import React, { useState } from 'react';
import type { HistoryItem } from '../types';
import { ClipboardIcon, PlusCircleIcon } from './icons';

interface ContentViewProps {
    item: HistoryItem;
    onCreateNew: () => void;
}

const ContentView: React.FC<ContentViewProps> = ({ item, onCreateNew }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(item.output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formattedContent = item.output
        .replace(/### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-teal-300">$1</h3>')
        .replace(/## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-3 text-teal-300">$1</h2>')
        .replace(/# (.*$)/gim, '<h1 class="text-2xl font-extrabold mt-6 mb-4 text-teal-300">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[Visual: (.*?)\]/g, '<span class="text-sm text-cyan-400 bg-cyan-900/50 px-2 py-1 rounded">Visual: $1</span>')
        .replace(/\n/g, '<br />');

    return (
        <div className="bg-slate-800/50 rounded-lg shadow-lg ring-1 ring-white/10 p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Generated: <span className="text-blue-400">{item.toolName}</span></h2>
                    <p className="text-sm text-gray-400 mt-1">Based on your input: "{item.input}"</p>
                </div>
                 <button onClick={onCreateNew} className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0 ml-4">
                    <PlusCircleIcon className="w-5 h-5 mr-1" />
                    Create New
                 </button>
            </div>
            <div className="relative bg-gray-900 border border-slate-700 rounded-lg p-4 text-gray-300 text-sm prose prose-invert prose-p:my-2 prose-strong:text-white max-h-[60vh] overflow-y-auto">
                <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-gray-400 transition z-10" title="Copy to clipboard">
                    {copied ? <span className="text-xs px-1">Copied!</span> : <ClipboardIcon className="w-5 h-5"/>}
                </button>
                <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
        </div>
    );
};

export default ContentView;