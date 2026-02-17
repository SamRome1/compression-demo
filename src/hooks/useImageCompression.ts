import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { CompressionResult } from '../types';
import { compressionOptions, calculateReduction } from '../lib/compression';

export function useImageCompression() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const compressImage = useCallback(async (file: File): Promise<CompressionResult | null> => {
    setIsCompressing(true);
    setProgress(0);
    setError(null);

    const startTime = performance.now();

    try {
      const compressedFile = await imageCompression(file, {
        ...compressionOptions,
        onProgress: (percent) => setProgress(percent),
      });

      const endTime = performance.now();
      const compressionTime = Math.round(endTime - startTime);

      const compressedPreview = await imageCompression.getDataUrlFromFile(compressedFile);

      const result: CompressionResult = {
        compressedFile,
        compressedPreview,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        reductionPercentage: calculateReduction(file.size, compressedFile.size),
        compressionTime,
      };

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compression failed');
      return null;
    } finally {
      setIsCompressing(false);
      setProgress(0);
    }
  }, []);

  return { compressImage, isCompressing, progress, error };
}
