import React from 'react';
import { 
  Home, 
  MessageSquare, 
  Bookmark, 
  Calendar, 
  Users, 
  Bell, 
  Search,
  ArrowRight,
  Plus,
  Zap,
  BookOpen
} from 'lucide-react';

const ChatView: React.FC = () => {
  return (
    <div className="flex h-full bg-slate-50">
      
      {/* Sub Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-4 gap-2">
         <div className="flex items-center gap-3 px-3 py-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <img src="https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif" className="w-full h-full object-cover scale-110" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 leading-tight">StudentCat</h2>
              <p className="text-xs text-slate-500">Your Study Buddy</p>
            </div>
         </div>

         <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
               <Home className="w-5 h-5" />
               <span className="text-sm font-medium">Home</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg transition-colors">
               <MessageSquare className="w-5 h-5" />
               <span className="text-sm font-medium">Chat History</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
               <Bookmark className="w-5 h-5" />
               <span className="text-sm font-medium">Saved Advice</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
               <Calendar className="w-5 h-5" />
               <span className="text-sm font-medium">Study Plan</span>
            </button>
             <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
               <Users className="w-5 h-5" />
               <span className="text-sm font-medium">Community</span>
            </button>
         </div>

         <div className="mt-auto bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-900 text-sm mb-1">Pro Plan</h3>
            <p className="text-xs text-blue-700 mb-3">Get unlimited hints and detailed analytics.</p>
            <button className="w-full py-1.5 bg-white text-blue-700 font-semibold text-xs rounded-lg border border-blue-200 shadow-sm hover:bg-blue-50">
              Upgrade
            </button>
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
         {/* Header */}
         <div className="px-8 py-4 bg-white border-b border-slate-200 flex justify-between items-center z-10">
            <div className="relative w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Search for subjects, notes, or advice..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="relative p-2 hover:bg-slate-100 rounded-full text-slate-500">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
               </button>
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">Alex Morgan</p>
                  <p className="text-xs text-slate-500">Grade 11 • Science</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqam6aIck9n7Z-dHFqsMRajpSxj4U1wUTt3_Hv5KmpWLOmmnGJLHQJAfF9O3LFiU_HSQOPhm2gqVINAj8lZui0J5Q3WK9dRUywM6KxRSNNKQzs3pu8G0PszLedwqZwoX5h1OtzlrsXjc9VcSX37KjBlR8Nb0ZmIbobB0ghb49qCWAQSLmPR6O6mnj7hwNULVTTs67pL621NAwgtp6y0WP0hIg78fXeF70o2MeT3tpGhviNQrilaWlKipMzDvw2oHajkradmHym" alt="User" />
               </div>
            </div>
         </div>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-8">
               
               {/* Chat Bubble */}
               <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-white p-1 border border-slate-200 shadow-sm shrink-0 relative">
                     <img src="https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif" className="w-full h-full rounded-full object-cover" />
                     <div className="absolute bottom-0 right-0 bg-green-500 text-[9px] text-white px-1.5 rounded-full border border-white">Online</div>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-6 shadow-sm border border-slate-100 flex-1">
                     <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-slate-900">Here’s some advice. Thanks!</h2>
                        <div className="flex gap-2">
                          <Bookmark className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-500" />
                          <MessageSquare className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-500" />
                        </div>
                     </div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">AI Analysis • Today, 10:42 AM</p>
                     <p className="text-slate-700 leading-relaxed text-lg mb-6">
                        I've analyzed your recent quiz scores. You're doing great in <span className="font-bold text-blue-600">Algebra</span> but might need a quick refresher on <span className="font-bold text-orange-500">Geometry proofs</span>. Based on your schedule, I recommend fitting in a 15-minute practice session before Thursday.
                     </p>
                     <div className="flex gap-3">
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-all">
                           <MessageSquare className="w-4 h-4" />
                           Ask another question
                        </button>
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all">
                           <Calendar className="w-4 h-4" />
                           Add to Calendar
                        </button>
                     </div>
                  </div>
               </div>

               {/* Stats Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
                     <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Current Streak</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-black text-slate-900">12 Days</span>
                           <span className="text-xs font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">+2</span>
                        </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                        <Zap className="w-5 h-5 fill-current" />
                     </div>
                  </div>
                   <div className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
                     <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Focus Score</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-black text-slate-900">85/100</span>
                           <span className="text-xs font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">+5%</span>
                        </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Users className="w-5 h-5" />
                     </div>
                  </div>
                   <div className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
                     <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Topic Mastery</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-black text-slate-900">B+</span>
                           <span className="text-xs font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Rising</span>
                        </div>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                        <BookOpen className="w-5 h-5" />
                     </div>
                  </div>
               </div>

               {/* Recommendations */}
               <div>
                  <div className="flex justify-between items-end mb-4">
                     <h3 className="text-lg font-bold text-slate-900">Recommended for you</h3>
                     <button className="text-blue-600 text-sm font-medium hover:underline">View all</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-full md:w-32 bg-teal-800 h-32 md:h-auto relative overflow-hidden">
                           <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                           <div className="absolute inset-0 flex items-center justify-center">
                              {/* Abstract shapes simulation */}
                              <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"></div>
                           </div>
                        </div>
                        <div className="p-5 flex-1">
                           <div className="flex gap-2 mb-2 text-xs">
                              <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">PRIORITY</span>
                              <span className="text-slate-500">Calculus I • Unit 3</span>
                           </div>
                           <h4 className="font-bold text-slate-900 mb-2">Review Derivatives</h4>
                           <p className="text-sm text-slate-500 mb-4 line-clamp-2">Master the power rule and chain rule to ace your next exam. 15 min refresher.</p>
                           <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                              Start Practice <ArrowRight className="w-4 h-4" />
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-full md:w-32 bg-indigo-800 h-32 md:h-auto relative overflow-hidden">
                            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-purple-500 to-blue-500"></div>
                        </div>
                        <div className="p-5 flex-1">
                           <div className="flex gap-2 mb-2 text-xs">
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">NEW</span>
                              <span className="text-slate-500">Physics • Lab 4</span>
                           </div>
                           <h4 className="font-bold text-slate-900 mb-2">Lab Report Guide</h4>
                           <p className="text-sm text-slate-500 mb-4 line-clamp-2">Step-by-step AI assistance to structure your physics lab report...</p>
                           <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                              Open Guide <ArrowRight className="w-4 h-4" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};

export default ChatView;