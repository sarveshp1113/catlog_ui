import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import QueryHistoryView from './components/QueryHistoryView';
import ChatView from './components/ChatView';
import { ViewState, QueryItem } from './types';
import { INITIAL_QUERIES } from './constants';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [queries, setQueries] = useState<QueryItem[]>(INITIAL_QUERIES);
  
  // triggerQuery is an object to ensure even identical query strings trigger a re-run
  const [triggerQuery, setTriggerQuery] = useState<{ text: string; ts: number } | null>(null);

  const handleDeleteQuery = (id: string) => {
    setQueries(prev => prev.filter(q => q.id !== id));
  };

  const handleEditQuery = (id: string) => {
    const queryToEdit = queries.find(q => q.id === id);
    if (queryToEdit) {
      const newText = prompt("Edit query:", queryToEdit.text);
      if (newText) {
        setQueries(prev => prev.map(q => q.id === id ? { ...q, text: newText } : q));
      }
    }
  };

  const handleToggleFavorite = (id: string) => {
    setQueries(prev => prev.map(q => 
      q.id === id ? { ...q, isFavorite: !q.isFavorite } : q
    ));
  };

  const handleRunQuery = (text: string) => {
    setActiveView('dashboard');
    setTriggerQuery({ text, ts: Date.now() });
    // In mobile, close menu if open
    setIsMobileMenuOpen(false);
  };

  // Render the appropriate view based on state
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} triggerQuery={triggerQuery} />;
      case 'history':
        return <QueryHistoryView />;
      case 'chat':
        return <ChatView />;
      default:
        return <Dashboard setActiveView={setActiveView} triggerQuery={triggerQuery} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar (Desktop) */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        queries={queries}
        onDeleteQuery={handleDeleteQuery}
        onEditQuery={handleEditQuery}
        onToggleFavorite={handleToggleFavorite}
        onRunQuery={handleRunQuery}
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden px-4 py-3 bg-white border-b border-slate-200 flex justify-between items-center z-20">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img src="https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif" alt="Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <span className="font-bold text-slate-900">StudentCat</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <Menu className="w-6 h-6 text-slate-600" />
           </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[57px] left-0 w-full bg-white border-b border-slate-200 z-30 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
             <button onClick={() => {setActiveView('dashboard'); setIsMobileMenuOpen(false)}} className="p-3 text-left font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Dashboard</button>
             <button onClick={() => {setActiveView('history'); setIsMobileMenuOpen(false)}} className="p-3 text-left font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Query History</button>
          </div>
        )}

        {/* Content View */}
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;