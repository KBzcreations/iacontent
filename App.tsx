import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AiTool from './components/AiTool';
import ContentView from './components/ContentView';
import UpgradeModal from './components/UpgradeModal';
import LandingPage from './components/LandingPage';
import { CONTENT_TOOLS } from './constants';
import type { ContentTool, HistoryItem, Plan } from './types';
import { DocumentTextIcon, VideoCameraIcon, UsersIcon, PlusCircleIcon } from './components/icons';

// Function to load state from localStorage or return defaults
const loadInitialState = () => {
  try {
    const savedState = localStorage.getItem('aiContentSuiteState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Basic validation
      if (Array.isArray(parsedState.history)) {
        return {
          credits: parsedState.credits ?? 3,
          plan: parsedState.plan ?? 'Free',
          history: parsedState.history,
          hasOnboarded: parsedState.hasOnboarded ?? false,
        };
      }
    }
  } catch (error) {
    console.error("Could not load or parse saved state from localStorage", error);
  }
  // Default state for a new user
  return {
    credits: 3,
    plan: 'Free',
    history: [],
    hasOnboarded: false,
  };
};


const App: React.FC = () => {
  const [initialState] = useState(loadInitialState);
  const [showApp, setShowApp] = useState(initialState.hasOnboarded);
  const [selectedTool, setSelectedTool] = useState<ContentTool>(CONTENT_TOOLS[0]);
  const [credits, setCredits] = useState<number>(initialState.credits);
  const [history, setHistory] = useState<HistoryItem[]>(initialState.history);
  const [activeHistoryItem, setActiveHistoryItem] = useState<HistoryItem | null>(null);
  const [view, setView] = useState<'tool' | 'history'>('tool');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [plan, setPlan] = useState<Plan>(initialState.plan);

  // Effect to save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = JSON.stringify({ credits, plan, history, hasOnboarded: showApp });
      localStorage.setItem('aiContentSuiteState', stateToSave);
    } catch (error) {
      console.error("Could not save state to localStorage", error);
    }
  }, [credits, plan, history, showApp]);


  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  const handleContentGenerated = (input: string, output: string) => {
    if (credits > 0) {
      const newCredits = credits - 1;
      setCredits(newCredits);
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        toolName: selectedTool.name,
        input: input,
        output: output,
      };
      setHistory(prev => [newHistoryItem, ...prev]);
      setActiveHistoryItem(newHistoryItem);
      setView('history');
    }
  };
  
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setActiveHistoryItem(item);
    setView('history');
  }
  
  const handleCreateNew = () => {
    setActiveHistoryItem(null);
    setView('tool');
  }

  const handleUpgrade = () => {
    setPlan('Pro');
    setCredits(prev => prev + 50);
    setIsUpgradeModalOpen(false);
  }

  const toolIcons: { [key: string]: React.ComponentType<{className?: string}> } = {
    "Blog Post": DocumentTextIcon,
    "YouTube Script": VideoCameraIcon,
    "Social Media Campaign": UsersIcon,
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header credits={credits} plan={plan} onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          <div className="lg:col-span-2">
             {view === 'tool' ? (
                <div className="bg-slate-800/50 rounded-lg shadow-lg ring-1 ring-white/10 p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-white mb-3">1. Select a Content Tool</h2>
                    <div className="flex flex-wrap gap-2">
                      {CONTENT_TOOLS.map(tool => {
                        const Icon = toolIcons[tool.name] || DocumentTextIcon;
                        return (
                          <button 
                            key={tool.name} 
                            onClick={() => setSelectedTool(tool)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 text-sm md:text-base ${selectedTool.name === tool.name ? 'bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-300'}`}
                          >
                            <Icon className="w-5 h-5"/>
                            <span>{tool.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <AiTool 
                    key={selectedTool.name}
                    tool={selectedTool}
                    onGenerate={handleContentGenerated}
                    isDisabled={credits <= 0}
                  />
                </div>
             ) : activeHistoryItem ? (
                <ContentView 
                  item={activeHistoryItem} 
                  onCreateNew={handleCreateNew}
                />
             ) : null }
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 rounded-lg shadow-lg ring-1 ring-white/10 p-6 sticky top-8">
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-lg font-semibold text-white">Generated History</h2>
                 <button onClick={handleCreateNew} className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-1" />
                    New
                 </button>
               </div>

               {credits <= 0 && history.length > 0 && (
                 <div className="text-center p-4 mb-4 bg-yellow-900/50 border border-yellow-700 rounded-lg text-yellow-300">
                   <p className="font-semibold">You've run out of credits!</p>
                   <button onClick={() => setIsUpgradeModalOpen(true)} className="mt-2 text-sm font-bold text-yellow-200 hover:underline">Upgrade to Pro to continue.</button>
                 </div>
               )}
               <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                 {history.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm">Your generated content will appear here.</p>
                      <button onClick={handleCreateNew} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors duration-200">
                        Create your first content
                      </button>
                    </div>
                 ) : (
                    history.map(item => (
                      <button 
                        key={item.id}
                        onClick={() => handleSelectHistoryItem(item)}
                        className={`w-full text-left bg-slate-700/50 p-3 rounded-lg transition-all duration-200 hover:bg-slate-700 ${activeHistoryItem?.id === item.id ? 'ring-2 ring-blue-500' : 'ring-1 ring-transparent'}`}
                      >
                        <p className="text-sm font-semibold text-blue-300">{item.toolName}</p>
                        <p className="text-xs text-gray-400 truncate mt-1">Input: {item.input}</p>
                      </button>
                    ))
                 )}
               </div>
            </div>
          </div>

        </main>
      </div>
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default App;