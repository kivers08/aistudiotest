
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { IngestionPortal } from './components/IngestionPortal';
import { analyzeDocument } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

type View = 'dashboard' | 'ingestion' | 'audit' | 'vault';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  // Ingestion State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File | null) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    if (file) setFilePreviewUrl(URL.createObjectURL(file));
  }, [filePreviewUrl]);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const base64Data = await fileToBase64(selectedFile);
      const analysisResult = await analyzeDocument(selectedFile, base64Data);
      if (analysisResult.startsWith('Error:')) {
          setError(analysisResult);
      } else {
          setResult(analysisResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during file processing.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  return (
    <div className="flex h-screen bg-[#0a0f1d] text-slate-300 overflow-hidden font-sans">
      {/* Sidebar - Prototype 1 */}
      <Sidebar currentView={currentView} setView={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Prototype 2 */}
        <header className="px-8 py-6 border-b border-slate-800/50 flex justify-between items-center bg-[#0d1425]/50 backdrop-blur-md">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {currentView === 'dashboard' ? 'Financial Command Center' : 'Ingestion Portal'}
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Restoration AI Team</p>
          </div>
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-emerald-500 uppercase">System: Operational</span>
          </div>
        </header>

        {/* View Switcher */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {currentView === 'dashboard' && <Dashboard setView={setCurrentView} />}
          {currentView === 'ingestion' && (
            <IngestionPortal 
              selectedFile={selectedFile}
              filePreviewUrl={filePreviewUrl}
              isLoading={isLoading}
              result={result}
              error={error}
              handleFileChange={handleFileChange}
              handleAnalyze={handleAnalyze}
            />
          )}
          {(currentView === 'audit' || currentView === 'vault') && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
               <div className="p-12 border border-slate-800 rounded-2xl bg-slate-900/50">
                  <p className="text-lg font-medium">Accessing Secure Module: {currentView.toUpperCase()}</p>
                  <p className="text-sm mt-2 opacity-60">Authentication verification in progress...</p>
               </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default App;
