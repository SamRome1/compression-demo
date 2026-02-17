export interface ImageData {
  file: File;
  preview: string;
  size: number;
  name: string;
}

export interface CompressionResult {
  compressedFile: File;
  compressedPreview: string;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  compressionTime: number;
}

export interface SupabaseUploadResult {
  url: string;
  path: string;
  size: number;
}
