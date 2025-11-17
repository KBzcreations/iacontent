import React from 'react';
import { CheckBadgeIcon } from './icons';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-xl shadow-2xl ring-1 ring-white/10 w-full max-w-md m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'fade-in-scale 0.3s forwards' }}
            >
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Upgrade to Pro</h2>
                    <p className="mt-2 text-gray-400">Unlock your full content creation potential.</p>
                    
                    <div className="mt-6 bg-slate-900/70 p-6 rounded-lg border border-slate-700">
                        <p className="text-4xl font-extrabold text-white">$10<span className="text-lg font-medium text-gray-400">/month</span></p>
                        <ul className="mt-6 text-left space-y-3">
                            <li className="flex items-center">
                                <CheckBadgeIcon className="w-6 h-6 text-teal-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-300">50 Monthly Credits</span>
                            </li>
                            <li className="flex items-center">
                                <CheckBadgeIcon className="w-6 h-6 text-teal-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-300">Access to all content tools</span>
                            </li>
                             <li className="flex items-center">
                                <CheckBadgeIcon className="w-6 h-6 text-teal-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-300">Full generation history</span>
                            </li>
                        </ul>
                    </div>
                    
                    <button 
                        onClick={onUpgrade}
                        className="w-full mt-8 px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors duration-200"
                    >
                        Upgrade Now & Get 50 Credits
                    </button>
                    <button 
                        onClick={onClose}
                        className="mt-3 text-sm text-gray-400 hover:text-gray-300"
                    >
                        Maybe later
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default UpgradeModal;
