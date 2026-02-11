
import React from 'react';
import { FileUpload } from './FileUpload';
import { ResultDisplay } from './ResultDisplay';

interface IngestionPortalProps {
  selectedFile: File | null;
  filePreviewUrl: string | null;
  isLoading: boolean;
  result: string | null;
  error: string | null;
  handleFileChange: (file: File | null) => void;
  handleAnalyze: () => void;
}

export const IngestionPortal: React.FC<IngestionPortalProps> = ({
  selectedFile,
  filePreviewUrl,
  isLoading,
  result,
  error,
  handleFileChange,
  handleAnalyze
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full max-w-7xl mx-auto">
      <div className="h-full">
        <FileUpload
          onFileChange={handleFileChange}
          onAnalyze={handleAnalyze}
          filePreview={filePreviewUrl}
          isLoading={isLoading}
          selectedFile={selectedFile}
        />
      </div>
      <div className="h-full">
        <ResultDisplay result={result} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};
