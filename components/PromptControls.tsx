
import React from 'react';
import { MagicWandIcon } from './icons';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  hasImage: boolean;
}

const quickActions = [
  "Enhance quality and sharpness",
  "Remove the background",
  "Change background to a futuristic cityscape",
  "Add a small, friendly robot",
  "Remove the person on the left",
];

const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onSubmit, isLoading, hasImage }) => {
  return (
    <div className="flex flex-col space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., 'Make the sky look like a sunset'"
        className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out placeholder-slate-500 disabled:cursor-not-allowed disabled:bg-slate-800/50"
        rows={4}
        disabled={!hasImage || isLoading}
      />
      
      <div className="flex flex-col gap-2">
          <p className="text-sm text-slate-400 mb-1">Or try a quick action:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
                <button
                    key={action}
                    onClick={() => setPrompt(action)}
                    disabled={!hasImage || isLoading}
                    className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-full hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition"
                >
                    {action}
                </button>
            ))}
          </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!hasImage || !prompt || isLoading}
        className="w-full flex items-center justify-center py-3 px-4 font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        <MagicWandIcon className="w-5 h-5 mr-2" />
        {isLoading ? 'Generating...' : 'Generate Edit'}
      </button>
    </div>
  );
};

export default PromptControls;
