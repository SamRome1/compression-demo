import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageUploader } from './components/ImageUploader';
import { ProgressBar } from './components/ProgressBar';
import { CompressionStats } from './components/CompressionStats';
import { ImageComparison } from './components/ImageComparison';
import { SupabaseUpload } from './components/SupabaseUpload';
import { useImageCompression } from './hooks/useImageCompression';
import { ImageData, CompressionResult } from './types';
import { Layers } from 'lucide-react';

function App() {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const { compressImage, isCompressing, progress } = useImageCompression();

  const handleImageSelect = async (file: File, preview: string) => {
    // Set original image
    const imageData: ImageData = {
      file,
      preview,
      size: file.size,
      name: file.name,
    };
    setOriginalImage(imageData);
    setCompressionResult(null);

    // Start compression
    const result = await compressImage(file);
    if (result) {
      setCompressionResult(result);
    }
  };

  const handleReset = () => {
    if (originalImage?.preview) {
      URL.revokeObjectURL(originalImage.preview);
    }
    setOriginalImage(null);
    setCompressionResult(null);
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (originalImage?.preview) {
        URL.revokeObjectURL(originalImage.preview);
      }
    };
  }, [originalImage]);

  return (
    <div className="min-h-screen py-12 px-4">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Image Compression Demo
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compress images by up to 85% while maintaining visual quality.
          See how much more you can store in Supabase! 🚀
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Image Uploader */}
        {!originalImage && !isCompressing && (
          <ImageUploader onImageSelect={handleImageSelect} />
        )}

        {/* Progress Bar */}
        {isCompressing && <ProgressBar progress={progress} />}

        {/* Compression Stats */}
        {compressionResult && (
          <>
            <CompressionStats
              originalSize={compressionResult.originalSize}
              compressedSize={compressionResult.compressedSize}
              reductionPercentage={compressionResult.reductionPercentage}
              compressionTime={compressionResult.compressionTime}
            />

            {/* Image Comparison */}
            {originalImage && (
              <ImageComparison
                originalPreview={originalImage.preview}
                compressedPreview={compressionResult.compressedPreview}
                originalSize={compressionResult.originalSize}
                compressedSize={compressionResult.compressedSize}
                originalName={originalImage.name}
              />
            )}

            {/* Supabase Upload */}
            <SupabaseUpload
              compressedFile={compressionResult.compressedFile}
              compressedSize={compressionResult.compressedSize}
            />

            {/* Reset Button */}
            <div className="text-center pt-8">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Another Image
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-16 text-center text-gray-500 text-sm">
        <p>
          Built with React, Vite, TypeScript, and Tailwind CSS
        </p>
        <p className="mt-1">
          Powered by{' '}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Supabase
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
