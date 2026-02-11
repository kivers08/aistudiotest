
import React from 'react';
import { 
  DashboardIcon, 
  AgentCardIcon, 
  MemoryIcon, 
  ThoughtIcon, 
  FolderIcon, 
  FolderCleanedIcon, 
  FolderSafeIcon, 
  FolderVaultIcon, 
  FolderLogsIcon,
  PowerIcon,
  ShieldCheckIcon,
  InfoIcon
} from './icons';

interface SidebarProps {
  currentView: string;
  setView: (view: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="w-72 bg-[#0d1425] border-r border-slate-800 flex flex-col h-full shrink-0">
      {/* Header Profile */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-blue-400/30">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0d1425]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Gatekeeper-001</h2>
            <p className="text-xs text-slate-500 font-mono">ID: AI-FR-772</p>
          </div>
        </div>

        <div className="bg-[#141d33] border border-slate-700/50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Security Level</span>
            <ShieldCheckIcon className="w-3 h-3 text-blue-400" />
          </div>
          <p className="text-blue-400 font-bold text-sm">Business Standard</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar">
        {/* Main Engine */}
        <div>
          <h3 className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-3">Main Engine</h3>
          <nav className="space-y-1">
            <NavItem active={currentView === 'dashboard'} onClick={() => setView('dashboard')} icon={<DashboardIcon />} label="Dashboard" />
            <NavItem icon={<AgentCardIcon />} label="AgentCard (JSON)" />
            <NavItem icon={<MemoryIcon />} label="Memory (Markdown-KV)" />
            <NavItem icon={<ThoughtIcon />} label="Thought Signatures" />
          </nav>
        </div>

        {/* Data Pipeline */}
        <div>
          <div className="flex items-center justify-between px-4 mb-3">
             <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Data Pipeline</h3>
             <InfoIcon className="w-3 h-3 text-slate-700" />
          </div>
          <nav className="space-y-1">
            <NavItem active={currentView === 'ingestion'} onClick={() => setView('ingestion')} icon={<FolderIcon className="text-amber-500" />} label="00_RAW" />
            <NavItem icon={<FolderCleanedIcon className="text-blue-400" />} label="01_CLEANED" />
            <NavItem icon={<FolderSafeIcon className="text-emerald-400" />} label="02_SAFE" />
            <NavItem active={currentView === 'vault'} onClick={() => setView('vault')} icon={<FolderVaultIcon className="text-purple-400" />} label="03_VAULT" />
            <NavItem active={currentView === 'audit'} onClick={() => setView('audit')} icon={<FolderLogsIcon className="text-slate-400" />} label="04_LOGS" />
          </nav>
        </div>

        {/* System Management */}
        <div>
          <h3 className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-3">System Management</h3>
          <div className="px-4 space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <span className="text-xs font-medium">Rate Limits</span>
                </div>
                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">98%</span>
             </div>
             <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <span className="text-xs font-medium">Rotation Settings</span>
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">System Online</span>
        </div>
        <button className="text-slate-700 hover:text-red-500 transition-colors">
          <PowerIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ active, icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
      active 
      ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
    }`}
  >
    <span className={`transition-colors ${active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
      {icon}
    </span>
    {label}
  </button>
);
