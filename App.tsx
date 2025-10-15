
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptControls from './components/PromptControls';
import ImageDisplay from './components/ImageDisplay';
import { editImageWithPrompt } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<{base64: string; mimeType: string;} | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const { base64, mimeType } = await fileToBase64(file);
      setOriginalImage(`data:${mimeType};base64,${base64}`);
      setOriginalImageFile({ base64, mimeType });
      setEditedImage(null); // Clear previous edit on new upload
      setError(null);
    } catch (err) {
      setError("Failed to read the image file.");
      console.error(err);
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!originalImageFile || !prompt) return;

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithPrompt(
        originalImageFile.base64,
        originalImageFile.mimeType,
        prompt
      );
      setEditedImage(result.imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, prompt]);
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Controls */}
          <div className="lg:w-1/3 flex flex-col space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-slate-300 mb-3">1. Upload Image</h2>
                <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} />
            </div>
            <div>
                <h2 className="text-xl font-semibold text-slate-300 mb-3">2. Describe Your Edit</h2>
                <PromptControls
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleGenerate}
                isLoading={isLoading}
                hasImage={!!originalImage}
                />
            </div>
          </div>

          {/* Right Column: Image Display */}
          <div className="lg:w-2/3 flex flex-col">
            <h2 className="text-xl font-semibold text-slate-300 mb-3">3. See the Magic</h2>
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <ImageDisplay 
              originalImage={originalImage}
              editedImage={editedImage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
