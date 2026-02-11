
import React from 'react';

export const Dashboard: React.FC<{ setView: (v: any) => void }> = ({ setView }) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Agent Status Card */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex items-center gap-6 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
           <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
             <h2 className="text-xl font-bold text-white">Gatekeeper-001</h2>
             <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded">ACTIVE AGENT</span>
          </div>
          <p className="text-sm text-slate-500 italic">"Thought signature: Confidence: 0.98"</p>
          
          <div className="mt-4">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Confidence Level</span>
                <span className="text-[10px] font-bold text-blue-400">98%</span>
             </div>
             <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '98%' }} />
             </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Raw Data" value="1.2M" trend="+12%" trendType="up" />
        <StatCard label="Cleaned" value="850K" trend="+5%" trendType="up" />
        <StatCard label="Safe" value="842K" trend="-1%" trendType="down" />
        <StatCard label="Vaulted" value="125K" trend="+0.5%" trendType="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart Mockup */}
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-lg">
           <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                 <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                 <h3 className="font-bold text-white">Data Flux Activity</h3>
              </div>
              <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Real-time throughput</span>
           </div>
           
           <div className="flex items-end gap-3 h-48 px-2">
              {[35, 60, 45, 55, 75, 40, 65, 85, 70, 45, 50, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-600/20 rounded-t-sm group relative">
                   <div 
                      className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all duration-1000 group-hover:bg-blue-400" 
                      style={{ height: `${h}%` }}
                    />
                </div>
              ))}
           </div>
           <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-1">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>Now</span>
           </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
           <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="font-bold text-white">Recent Audit Logs</h3>
           </div>
           
           <div className="flex-1 space-y-6 overflow-y-auto max-h-64 custom-scrollbar pr-2">
              <LogItem title="Gatekeeper-001" subtitle="Route to Cleaned" status="SUCCESS" time="2m ago" color="emerald" />
              <LogItem title="Auditor-Alpha" subtitle="Vault Verification" status="VERIFIED" time="14m ago" color="emerald" />
              <LogItem title="Cleaner-Bot" subtitle="Noise Removal" status="SUCCESS" time="45m ago" color="emerald" />
           </div>
           
           <button 
             onClick={() => setView('audit')}
             className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] rounded-lg transition-colors"
           >
             View Full Audit Trail
           </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, trendType }: any) => (
  <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-lg">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-4">{label}</p>
    <div className="flex items-end justify-between">
       <span className="text-3xl font-bold text-white">{value}</span>
       <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
         trendType === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
       }`}>
         {trend}
       </span>
    </div>
  </div>
);

const LogItem = ({ title, subtitle, status, time, color }: any) => (
  <div className="flex items-start gap-4">
    <div className={`mt-1 w-6 h-6 rounded-md flex items-center justify-center bg-${color}-500/10 text-${color}-500`}>
       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
       </svg>
    </div>
    <div className="flex-1">
       <div className="flex justify-between items-start">
          <p className="text-xs font-bold text-white">{title}</p>
          <span className="text-[10px] text-slate-600 font-medium">{time}</span>
       </div>
       <p className="text-[10px] text-slate-500 mb-1">{subtitle}</p>
       <span className={`text-[9px] font-black text-${color}-500 uppercase tracking-widest`}>{status}</span>
    </div>
  </div>
);
