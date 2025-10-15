
import React from 'react';
import { SparklesIcon } from './icons';

const Header = () => {
    return (
        <header className="py-6">
            <div className="container mx-auto px-4 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-cyan-400 mr-3" />
                <h1 className="text-3xl font-bold tracking-tight text-slate-100">
                    AI Photo Editor
                </h1>
            </div>
        </header>
    );
};

export default Header;
