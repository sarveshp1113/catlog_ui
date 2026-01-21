import React from 'react';
import { Search, Star, Clock } from 'lucide-react';
import { QueryItem } from '../types';

interface QueryHistoryPanelProps {
  queries: QueryItem[];
  onSelectQuery: (query: QueryItem) => void;
}

const QueryHistoryPanel: React.FC<QueryHistoryPanelProps> = ({ queries, onSelectQuery }) => {
  // Sort: Favorites first, then by ID (simulating chronological)
  const sortedQueries = [...queries].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 pb-2">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Query History</h2>
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search past queries..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {sortedQueries.map((query) => (
          <button
            key={query.id}
            onClick={() => onSelectQuery(query)}
            className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-left group border border-transparent hover:border-slate-100"
          >
            <div className={`mt-0.5 ${query.isFavorite ? 'text-yellow-400' : 'text-slate-300 group-hover:text-slate-400'}`}>
              {query.isFavorite ? <Star className="w-4 h-4 fill-current" /> : <Clock className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">{query.text}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{query.timestamp}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QueryHistoryPanel;