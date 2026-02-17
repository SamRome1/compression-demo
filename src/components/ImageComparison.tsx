import { formatFileSize } from '../lib/compression';

interface ImageComparisonProps {
  originalPreview: string;
  compressedPreview: string;
  originalSize: number;
  compressedSize: number;
  originalName: string;
}

export function ImageComparison({
  originalPreview,
  compressedPreview,
  originalSize,
  compressedSize,
  originalName,
}: ImageComparisonProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Visual Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Original</span>
              <span className="text-slate-200 text-sm font-medium">
                {formatFileSize(originalSize)}
              </span>
            </div>
          </div>
          <div className="relative bg-gray-50 aspect-video">
            <img
              src={originalPreview}
              alt={originalName}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Compressed Image */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-200">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Compressed</span>
              <span className="text-emerald-100 text-sm font-medium">
                {formatFileSize(compressedSize)}
              </span>
            </div>
          </div>
          <div className="relative bg-gray-50 aspect-video">
            <img
              src={compressedPreview}
              alt={`${originalName} (compressed)`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-gray-600 mt-4 text-sm">
        Notice: Both images look identical, but one is significantly smaller! 🎨
      </p>
    </div>
  );
}
