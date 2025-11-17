import React from 'react';
import type { Plan } from '../types';
import { SparklesIcon } from './icons';

interface HeaderProps {
  credits: number;
  plan: Plan;
  onUpgradeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ credits, plan, onUpgradeClick }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-slate-700">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          AI Content Suite
        </h1>
        <p className="mt-2 text-md text-gray-400">
          Your on-demand content generation engine.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-white">{credits} Credits Remaining</p>
          <p className={`text-xs font-semibold ${plan === 'Pro' ? 'text-teal-400' : 'text-gray-400'}`}>{plan} Plan</p>
        </div>
        {plan === 'Free' && (
          <button 
            onClick={onUpgradeClick}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors duration-200"
          >
            Upgrade Plan
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
