
import React from 'react';
import Loader from './Loader';
import { DownloadIcon } from './icons';

interface ImageDisplayProps {
  originalImage: string | null;
  editedImage: string | null;
  isLoading: boolean;
}

const ImageContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="w-full flex flex-col">
        <h3 className="text-lg font-semibold text-slate-400 mb-2">{title}</h3>
        <div className="relative aspect-video w-full bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            {children}
        </div>
    </div>
);


const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <ImageContainer title="Before">
        {originalImage ? (
          <img src={originalImage} alt="Original" className="object-contain w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 p-4 text-center">
            Upload an image to start
          </div>
        )}
      </ImageContainer>
      
      <ImageContainer title="After">
        {isLoading && <Loader />}
        {editedImage ? (
          <>
            <img src={editedImage} alt="Edited" className="object-contain w-full h-full" />
            <a 
              href={editedImage} 
              download="edited-image.png"
              className="absolute bottom-4 right-4 bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-700 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
              title="Download Image"
            >
              <DownloadIcon className="w-5 h-5" />
            </a>
          </>
        ) : (
          !isLoading && <div className="flex items-center justify-center h-full text-slate-500 p-4 text-center">
            Your edited image will appear here
          </div>
        )}
      </ImageContainer>
    </div>
  );
};

export default ImageDisplay;
