import React from 'react';
import { Search, History, Download, ThumbsUp, ThumbsDown, ArrowUpRight, Filter, Sparkles } from 'lucide-react';
import { QUERY_RESULTS } from '../constants';

const QueryHistoryView: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      
      {/* Sidebar List */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col h-full z-10">
        <div className="p-6 border-b border-slate-100">
           <h2 className="text-xl font-bold text-slate-900 mb-4">Query History</h2>
           <button className="w-full bg-primary-700 hover:bg-primary-800 text-white py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
              <span className="text-lg">+</span>
              New Query
           </button>
        </div>
        
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
              type="text" 
              placeholder="Filter queries..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
             />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">Pinned</h3>
            <div className="space-y-1">
               <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-600">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium truncate">Show me failing grades (Math)</span>
               </div>
               <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-600">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium truncate">Attendance &lt; 80% last month</span>
               </div>
            </div>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Today</h3>
             <div className="space-y-1">
               <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 text-primary-700 cursor-pointer border-l-4 border-primary-700">
                  <History className="w-4 h-4" />
                  <span className="text-sm font-medium truncate">Students with birthday today</span>
               </div>
               <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-600">
                  <History className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium truncate">Grade distribution for Science</span>
               </div>
               <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-600">
                  <History className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium truncate">Export Senior class list to CSV</span>
               </div>
            </div>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Yesterday</h3>
             <div className="space-y-1">
               <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-600">
                  <History className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium truncate">List all active seniors</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-hidden">
        <header className="px-8 py-6 bg-white border-b border-slate-200 flex justify-between items-center">
           <h1 className="text-xl font-bold text-slate-900">Query Results</h1>
           <div className="flex gap-4">
              <History className="w-5 h-5 text-slate-400" />
              <div className="relative">
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="material-icons">notifications</span>
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
           {/* Insight Card */}
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-start justify-between">
              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <Sparkles className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm text-slate-500 mb-1">Generated result for</p>
                    <h2 className="text-2xl font-bold text-slate-900">"Students with birthday today"</h2>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                 </button>
                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                    <ThumbsDown className="w-5 h-5" />
                 </button>
              </div>
           </div>

           {/* Table Card */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    4 Students Found
                 </h3>
                 <button className="text-primary-600 text-sm font-medium hover:text-primary-800">Export CSV</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/30">ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/30">Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/30">Grade</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/30">Age Turning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {QUERY_RESULTS.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500 font-mono">{row.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">{row.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{row.grade}</td>
                        <td className="px-6 py-4">
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                             {row.age}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default QueryHistoryView;