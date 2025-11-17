import React from 'react';
import { DocumentTextIcon, PencilSquareIcon, SparklesIcon, UsersIcon, VideoCameraIcon } from './icons';

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-gray-100">
            <div className="container mx-auto px-4 py-8 md:py-12">
                
                {/* Header */}
                <header className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                        AI Content Suite
                    </h1>
                    <button onClick={onGetStarted} className="px-4 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors duration-200 text-sm">
                        Sign In
                    </button>
                </header>

                {/* Hero Section */}
                <section className="text-center py-20 sm:py-24 lg:py-32">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                        Create High-Quality Content
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">10x Faster with AI</span>
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
                        Stop wasting hours on content creation. Our AI-powered tools help you generate blog posts, video scripts, and social media campaigns in minutes, not days.
                    </p>
                    <div className="mt-8">
                        <button onClick={onGetStarted} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-transform duration-200 transform hover:scale-105 shadow-lg">
                            Start Creating for Free
                        </button>
                        <p className="mt-3 text-sm text-gray-500">3 free credits to get you started. No credit card required.</p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16">
                    <div className="text-center mb-12">
                         <h3 className="text-3xl font-bold text-white">Your All-In-One Content Toolkit</h3>
                         <p className="mt-3 max-w-xl mx-auto text-gray-400">From articles to viral videos, we've got you covered.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<DocumentTextIcon className="w-8 h-8 text-blue-400" />}
                            title="Blog Posts"
                            description="Generate SEO-optimized articles on any topic to attract and engage your audience."
                        />
                        <FeatureCard 
                            icon={<VideoCameraIcon className="w-8 h-8 text-blue-400" />}
                            title="YouTube Scripts"
                            description="Create compelling scripts for 'faceless' videos that keep viewers hooked from start to finish."
                        />
                        <FeatureCard 
                            icon={<UsersIcon className="w-8 h-8 text-blue-400" />}
                            title="Social Media Campaigns"
                            description="Launch cohesive campaigns across Twitter, LinkedIn, and Instagram from a single idea."
                        />
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="py-16">
                    <div className="text-center mb-12">
                         <h3 className="text-3xl font-bold text-white">Effortless Creation in 3 Simple Steps</h3>
                         <p className="mt-3 max-w-xl mx-auto text-gray-400">Go from idea to published content in record time.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <HowItWorksStep
                            icon={<DocumentTextIcon className="w-10 h-10 text-teal-300" />}
                            step="Step 1"
                            title="Select a Tool"
                            description="Choose from our range of specialized content generators."
                        />
                         <HowItWorksStep
                            icon={<PencilSquareIcon className="w-10 h-10 text-teal-300" />}
                            step="Step 2"
                            title="Describe Your Content"
                            description="Provide a simple topic or instruction for the AI."
                        />
                         <HowItWorksStep
                            icon={<SparklesIcon className="w-10 h-10 text-teal-300" />}
                            step="Step 3"
                            title="Generate & Edit"
                            description="Receive your content in seconds, ready to be used or tweaked."
                        />
                    </div>
                </section>

                 {/* CTA Section */}
                <section className="text-center py-20 bg-slate-800/50 rounded-lg">
                    <h2 className="text-3xl font-bold text-white">Ready to Automate Your Content?</h2>
                    <p className="mt-4 max-w-xl mx-auto text-gray-400">
                        Join hundreds of creators and marketers who are saving time and scaling their content output.
                    </p>
                    <div className="mt-8">
                         <button onClick={onGetStarted} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-transform duration-200 transform hover:scale-105 shadow-lg">
                            Get Your 3 Free Credits Now
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-8 mt-16 border-t border-slate-700">
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} AI Content Suite. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg ring-1 ring-white/10">
        <div className="flex items-center justify-center h-16 w-16 bg-slate-700 rounded-full mb-4">
            {icon}
        </div>
        <h4 className="text-xl font-semibold text-white">{title}</h4>
        <p className="mt-2 text-gray-400">{description}</p>
    </div>
);

const HowItWorksStep: React.FC<{icon: React.ReactNode, step: string, title: string, description: string}> = ({ icon, step, title, description }) => (
    <div className="p-4">
        <div className="flex items-center justify-center h-20 w-20 bg-slate-800 rounded-full mb-4 mx-auto ring-1 ring-slate-700">
            {icon}
        </div>
        <p className="text-sm font-semibold text-teal-400">{step}</p>
        <h4 className="text-xl font-semibold text-white mt-1">{title}</h4>
        <p className="mt-2 text-gray-400">{description}</p>
    </div>
);

export default LandingPage;
