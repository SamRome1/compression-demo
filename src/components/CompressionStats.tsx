import { formatFileSize } from '../lib/compression';
import { TrendingDown, FileArchive, Zap } from 'lucide-react';

interface CompressionStatsProps {
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  compressionTime: number;
}

export function CompressionStats({
  originalSize,
  compressedSize,
  reductionPercentage,
  compressionTime,
}: CompressionStatsProps) {
  const storageSaved = originalSize - compressedSize;
  const multiplier = Math.round(originalSize / compressedSize * 10) / 10;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        {/* Main Reduction Percentage */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl mb-4 animate-pulse-slow">
            <div className="text-center">
              <div className="text-5xl font-bold text-white">
                {reductionPercentage}%
              </div>
              <div className="text-sm text-white/90 font-medium">smaller</div>
            </div>
          </div>
          <p className="text-xl text-gray-700 font-medium">
            Compressed successfully! 🎉
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Original Size */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <FileArchive className="w-4 h-4" />
              <span className="text-sm font-medium">Original</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {formatFileSize(originalSize)}
            </div>
          </div>

          {/* Compressed Size */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-700 mb-2">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">Compressed</span>
            </div>
            <div className="text-2xl font-bold text-emerald-800">
              {formatFileSize(compressedSize)}
            </div>
          </div>

          {/* Compression Time */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {(compressionTime / 1000).toFixed(2)}s
            </div>
          </div>
        </div>

        {/* Storage Impact */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <p className="text-center text-gray-700">
            <span className="font-semibold text-purple-700">
              {formatFileSize(storageSaved)}
            </span>
            {' '}saved • Store{' '}
            <span className="font-semibold text-purple-700">
              {multiplier}x more
            </span>
            {' '}images in the same space!
          </p>
        </div>
      </div>
    </div>
  );
}
