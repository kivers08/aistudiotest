
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, ErrorIcon, DownloadIcon } from './icons';

interface ResultDisplayProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-6 animate-pulse p-4">
        {[...Array(3)].map((_, i) => (
             <div key={i} className="space-y-3">
                <div className="h-2 bg-slate-800 rounded w-1/4"></div>
                <div className="h-2 bg-slate-800 rounded w-full"></div>
                <div className="h-2 bg-slate-800 rounded w-3/4"></div>
                <div className="h-2 bg-slate-800 rounded w-1/2"></div>
             </div>
        ))}
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, error }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (result) {
      setIsCopied(false);
    }
  }, [result]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `extracted_transactions_${timestamp}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }
    if (error) {
      const displayError = error.startsWith('Error: ') ? error.substring(7) : error;
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4 border border-red-500/20">
               <ErrorIcon className="w-8 h-8 text-red-500"/>
            </div>
            <p className="text-sm font-black text-red-500 uppercase tracking-[0.2em] mb-2">Protocol Violation</p>
            <p className="text-xs text-slate-500 max-w-xs">{displayError}</p>
        </div>
      );
    }
    if (result) {
      return (
        <div className="font-mono text-[11px] leading-relaxed text-blue-100/80 p-6 whitespace-pre-wrap selection:bg-blue-600/30">
          {result}
        </div>
      );
    }
    return (
      <div className="text-center text-slate-600 flex flex-col items-center justify-center h-full p-8">
        <div className="w-12 h-12 border-2 border-slate-800 rounded-full flex items-center justify-center mb-4 opacity-30">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Awaiting Data Stream</p>
        <p className="text-[10px] mt-1 opacity-50">Ingest a document to initiate extraction.</p>
      </div>
    );
  };

  return (
    <div className="bg-[#0f172a] rounded-2xl flex flex-col h-full border border-slate-800 shadow-xl overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-slate-800">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">2. EXTRACTED_SCHEMA (KV)</h2>
        {result && !error && (
          <div className="flex gap-2">
             <button
              onClick={handleDownload}
              title="Download Markdown"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-800 hover:bg-slate-700 text-blue-400 py-1.5 px-3 rounded-md transition-colors"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-800 hover:bg-slate-700 text-blue-400 py-1.5 px-3 rounded-md transition-colors"
            >
              {isCopied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Verified' : 'Copy'}</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex-grow bg-[#080d1a] overflow-y-auto custom-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};
