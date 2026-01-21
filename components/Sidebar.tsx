import React from 'react';
import { 
  LayoutGrid, 
  LogOut, 
  Trash2,
  Star,
  MessageSquare
} from 'lucide-react';
import { ViewState, QueryItem } from '../types';
import { BRAND_LOGO } from '../constants';

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
  queries: QueryItem[];
  onDeleteQuery: (id: string) => void;
  onEditQuery: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onRunQuery: (text: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  setActiveView, 
  queries, 
  onDeleteQuery,
  onToggleFavorite,
  onRunQuery
}) => {
  // Sort queries: Favorites first, then chronological (assuming existing order is chrono-ish, or just rely on array order)
  const sortedQueries = [...queries].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 bg-white h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
      
      {/* 1. Brand Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          {/* Logo Removed */}
          <div className="flex flex-col">
            <h1 className="text-slate-900 text-lg font-black leading-tight tracking-tight">Student<span className="text-slate-400">.</span>Cat</h1>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Admin Console</p>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation (Just Dashboard now) */}
      <div className="px-4 flex flex-col gap-1 mb-6">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
              activeView === 'dashboard'
                ? 'bg-slate-900 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className={`w-5 h-5 ${activeView === 'dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="text-sm font-semibold">Dashboard</span>
          </button>
      </div>

      {/* 3. Query History List Section */}
      <div className="flex-1 flex flex-col min-h-0 border-t border-slate-100 bg-white">
        <div className="px-6 py-5 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Query History</h3>
          <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{queries.length}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 no-scrollbar">
          {sortedQueries.map((query) => (
            <div 
              key={query.id}
              onClick={() => onRunQuery(query.text)}
              className={`group flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer relative ${
                query.isFavorite 
                  ? 'bg-slate-900 border-slate-900 shadow-md' 
                  : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Star / Favorite Toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(query.id); }}
                className={`shrink-0 transition-transform active:scale-90 ${query.isFavorite ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}
              >
                 <Star className={`w-4 h-4 ${query.isFavorite ? 'fill-current' : ''}`} />
              </button>

              {/* Text */}
              <p className={`text-sm font-medium leading-snug line-clamp-2 pr-6 ${query.isFavorite ? 'text-white' : 'text-slate-600'}`}>
                {query.text}
              </p>
              
              {/* Delete Action (Top right or Right aligned) */}
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteQuery(query.id); }}
                className={`absolute right-2 top-2 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                  query.isFavorite 
                    ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                    : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                }`}
                title="Delete Query"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          
          {queries.length === 0 && (
            <div className="text-center py-12 px-4 flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                 <MessageSquare className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-xs text-slate-400 font-medium">No query history yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. User Footer */}
      <div className="flex items-center gap-3 px-4 py-4 border-t border-slate-200 bg-white">
        <div className="w-9 h-9 rounded-full bg-orange-100 border border-slate-200 shadow-sm overflow-hidden shrink-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqam6aIck9n7Z-dHFqsMRajpSxj4U1wUTt3_Hv5KmpWLOmmnGJLHQJAfF9O3LFiU_HSQOPhm2gqVINAj8lZui0J5Q3WK9dRUywM6KxRSNNKQzs3pu8G0PszLedwqZwoX5h1OtzlrsXjc9VcSX37KjBlR8Nb0ZmIbobB0ghb49qCWAQSLmPR6O6mnj7hwNULVTTs67pL621NAwgtp6y0WP0hIg78fXeF70o2MeT3tpGhviNQrilaWlKipMzDvw2oHajkradmHym" alt="Admin" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">Alex Admin</p>
          <p className="text-xs text-slate-400 truncate">alex@studentcat.edu</p>
        </div>
        <button className="ml-auto p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;