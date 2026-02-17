interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const getStatusText = () => {
    if (progress < 30) return 'Analyzing image...';
    if (progress < 70) return 'Compressing...';
    if (progress < 100) return 'Almost done...';
    return 'Complete!';
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {getStatusText()}
        </span>
        <span className="text-sm font-medium text-blue-600">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
