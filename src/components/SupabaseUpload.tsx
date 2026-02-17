import { useState } from 'react';
import { Upload, Check, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { SupabaseUploadResult } from '../types';
import { formatFileSize } from '../lib/compression';

interface SupabaseUploadProps {
  compressedFile: File;
  compressedSize: number;
}

export function SupabaseUpload({ compressedFile, compressedSize }: SupabaseUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<SupabaseUploadResult | null>(null);

  const handleUpload = async () => {
    if (!supabase) {
      toast.error('Supabase not configured. Please add your credentials to .env');
      return;
    }

    setIsUploading(true);

    try {
      const fileName = `compressed-${Date.now()}-${compressedFile.name}`;

      const { data, error } = await supabase.storage
        .from('demo-images')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('demo-images')
        .getPublicUrl(data.path);

      const result: SupabaseUploadResult = {
        url: publicUrl,
        path: data.path,
        size: compressedFile.size,
      };

      setUploadResult(result);
      toast.success('Image uploaded to Supabase! 🎉');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (uploadResult) {
      navigator.clipboard.writeText(uploadResult.url);
      toast.success('URL copied to clipboard!');
    }
  };

  if (uploadResult) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-emerald-200">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Upload Successful!
          </h3>
          <p className="text-center text-gray-600 mb-6">
            Your compressed image ({formatFileSize(compressedSize)}) is now stored in Supabase
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-xs text-gray-500 mb-2">Public URL:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm text-gray-700 break-all">
                {uploadResult.url}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Copy URL"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
              <a
                href={uploadResult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <p className="text-center text-sm text-gray-700">
              <span className="font-semibold text-purple-700">
                Storage Path:
              </span>
              {' '}{uploadResult.path}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
          Ready to Upload to Supabase
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Upload your compressed image ({formatFileSize(compressedSize)}) to Supabase Storage
        </p>

        <button
          onClick={handleUpload}
          disabled={isUploading || !supabase}
          className={`
            w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg
            font-semibold text-white transition-all transform
            ${isUploading || !supabase
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95'
            }
          `}
        >
          <Upload className="w-5 h-5" />
          {isUploading ? 'Uploading...' : 'Upload to Supabase'}
        </button>

        {!supabase && (
          <p className="text-center text-sm text-amber-600 mt-4">
            ⚠️ Configure Supabase credentials in .env to enable uploads
          </p>
        )}
      </div>
    </div>
  );
}
