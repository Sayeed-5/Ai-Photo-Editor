
import React from 'react';

const Loader = () => {
  return (
    <div className="absolute inset-0 bg-slate-800 bg-opacity-75 flex flex-col items-center justify-center z-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      <p className="mt-4 text-slate-300 font-semibold">AI is working its magic...</p>
    </div>
  );
};

export default Loader;
