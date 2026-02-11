
import React, { useCallback } from 'react';
import { UploadIcon, AnalyzeIcon, LoadingSpinner } from './icons';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
  filePreview: string | null;
  isLoading: boolean;
  selectedFile: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, onAnalyze, filePreview, isLoading, selectedFile }) => {

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;
    onFileChange(file);
  }, [onFileChange]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="bg-[#0f172a] rounded-2xl p-6 flex flex-col h-full border border-slate-800 shadow-xl">
      <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">1. INGESTION_SOURCE (RAW)</h2>
      <div className="flex-grow flex flex-col">
        <label
          htmlFor="file-upload"
          className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-600/5 transition-all"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input id="file-upload" type="file" className="sr-only" onChange={handleFileSelect} accept="image/png, image/jpeg, image/webp, application/pdf" />
          {filePreview ? (
            <div className="relative group">
               <img src={filePreview} alt="File preview" className="max-h-64 w-auto rounded-lg object-contain shadow-2xl border border-slate-700" />
               <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full border border-slate-700">Change File</span>
               </div>
            </div>
          ) : (
            <div className="group">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-700 transition-colors">
                <UploadIcon className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 font-bold text-sm">Drop Ingestibles Here</p>
              <p className="text-xs text-slate-600 mt-1">PNG, JPG, WEBP, PDF supported</p>
            </div>
          )}
        </label>
        {selectedFile && (
          <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600/10 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
               </div>
               <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}</p>
               </div>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onAnalyze}
        disabled={!selectedFile || isLoading}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] py-4 px-4 rounded-xl hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/10"
      >
        {isLoading ? (
          <>
            <LoadingSpinner className="w-4 h-4" />
            <span>Processing Pulse...</span>
          </>
        ) : (
          <>
            <AnalyzeIcon className="w-4 h-4" />
            <span>Execute Analysis</span>
          </>
        )}
      </button>
    </div>
  );
};
