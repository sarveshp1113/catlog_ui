import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Calendar, 
  CheckCircle,
  MoreHorizontal,
  ArrowRight,
  Maximize2,
  Search,
  Sparkles,
  ArrowUpRight,
  X,
  Phone,
  Clock,
  ArrowDown
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ActivityWindow from './ActivityWindow';
import ChartCard from './ChartCard';
import { DASHBOARD_CHARTS, STUDENTS, QUERY_RESULTS } from '../constants';
import { ChartDef, OverlayState, ActivityType, QueryItem } from '../types';

interface DashboardProps {
  setActiveView: (view: any) => void;
  triggerQuery?: { text: string; ts: number } | null;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, triggerQuery }) => {
  // State
  const [overlay, setOverlay] = useState<OverlayState>('none');
  const [activeActivity, setActiveActivity] = useState<ActivityType>(null);
  const [activeChart, setActiveChart] = useState<ChartDef | null>(null);
  const [charts, setCharts] = useState(DASHBOARD_CHARTS);
  const [showToday, setShowToday] = useState(true);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Effect to handle external query triggers (e.g. from Sidebar)
  useEffect(() => {
    if (triggerQuery) {
        setSearchQuery(triggerQuery.text);
        setSubmittedQuery(triggerQuery.text);
        setOverlay('query_result');
        setIsThinking(true);
        setTimeout(() => {
            setIsThinking(false);
        }, 1500);
    }
  }, [triggerQuery]);
  
  // Handlers
  const handleActivityClick = (type: ActivityType) => {
    setActiveActivity(type);
    setOverlay('activity');
  };

  const handleChartClick = (chart: ChartDef) => {
    setActiveChart(chart);
    setOverlay('chart_expanded');
  };

  const closeOverlay = () => {
    setOverlay('none');
    setActiveActivity(null);
    setActiveChart(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSubmittedQuery(searchQuery);
    setOverlay('query_result');
    setIsThinking(true);

    // Simulate AI thinking time
    setTimeout(() => {
        setIsThinking(false);
    }, 1500);
  };

  // Expand Query Result into full Activity Window
  const handleExpandQueryResult = () => {
    setOverlay('activity');
    setActiveActivity('attendance'); // Maps to attendance view for demo purposes
  };

  return (
    <div className="flex h-full relative overflow-hidden bg-slate-50">
      {/* Inject Custom Animation for Logo */}
      <style>{`
        @keyframes float-random {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(2px, -3px) rotate(1deg); }
          50% { transform: translate(-1px, 1px) rotate(-1deg); }
          75% { transform: translate(-2px, -2px) rotate(0.5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-cat {
          animation: float-random 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col h-full transition-all duration-500 ${overlay !== 'none' ? 'scale-[0.95] opacity-40 blur-[4px]' : ''}`}>
        
        {/* Header with Search Bar */}
        <header className="px-8 py-6 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center gap-6">
             {/* Logo / Branding */}
             <div className="hidden md:flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden shadow-lg shadow-slate-200 ring-2 ring-slate-100 animate-cat">
                   <img src="https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif" alt="Student.Cat" className="w-full h-full object-cover scale-110" />
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Student<span className="text-slate-400">.</span>Cat</h1>
             </div>

             {/* Search Bar Form */}
             <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
                   <Sparkles className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask a question about your data (e.g., 'Show failing grades in Math')..." 
                  className="w-full pl-12 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all placeholder:text-slate-400 text-slate-700"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-primary-600 hover:bg-primary-700 text-white px-4 rounded-xl font-medium text-sm transition-colors shadow-sm"
                >
                   Ask AI
                </button>
             </form>

             {/* Controls */}
             <div className="flex gap-2 shrink-0">
                <button 
                    onClick={() => setShowToday(!showToday)}
                    className={`px-3 py-2 text-sm font-semibold rounded-xl border transition-all ${showToday ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                >
                    {showToday ? 'Hide Today' : 'Show Today'}
                </button>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto flex flex-col gap-10 pb-20">
            
            {/* TODAY SECTION */}
            {showToday && (
                <section className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                           <Calendar className="w-5 h-5 text-slate-400" />
                           Today's Focus
                        </h2>
                        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div 
                            onClick={() => handleActivityClick('attendance')}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:shadow-primary-900/5 hover:border-primary-200 transition-all cursor-pointer group relative overflow-hidden active:scale-95 duration-200"
                        >
                            <div className="absolute right-0 top-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <ArrowRight className="w-5 h-5 text-primary-500" />
                            </div>
                            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Take Attendance</h3>
                            <p className="text-sm text-slate-500 font-medium mb-4">Science 4B • 10:00 AM</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                               <div className="flex -space-x-2">
                                  {STUDENTS.slice(0,3).map(s => (
                                      <img key={s.id} src={s.avatar} className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100" />
                                  ))}
                                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 ring-1 ring-slate-100">+2</div>
                               </div>
                               <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">Action Required</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:shadow-purple-900/5 hover:border-purple-200 transition-all cursor-pointer group relative">
                             <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Create Course</h3>
                            <p className="text-sm text-slate-500 font-medium">Plan for Spring Semester 2025</p>
                            <div className="mt-8 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-purple-600">
                               <span className="bg-purple-50 px-2 py-1 rounded-lg">Draft</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CHARTS GRID SECTION WITH INSIDE SCROLL */}
            <section className="animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center justify-between mb-2">
                     <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        Analytics Overview
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs font-medium">{charts.length}</span>
                     </h2>
                </div>

                {/* Fixed Height Scroll Container for Charts */}
                {/* Added p-8 padding to ensure hover 'pop-out' effects don't get clipped by the scroll container */}
                <div className="h-[550px] overflow-y-auto overflow-x-hidden p-8 -mx-8">
                  {/* Reduced row height from 180px to 140px and gap from 6 to 4 for smaller cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[140px] pt-12 pb-12">
                      {charts.map((chart) => (
                          <ChartCard 
                              key={chart.id} 
                              chart={chart} 
                              onClick={handleChartClick} 
                              variant="bento"
                          />
                      ))}
                      
                      {/* Add New Chart Placeholder */}
                      <button className="h-full min-h-[140px] w-full rounded-3xl border-2 border-dashed border-slate-200 hover:border-primary-400 hover:bg-primary-50 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary-600 transition-all group bg-slate-50/50">
                           <div className="w-10 h-10 rounded-full bg-white border border-slate-200 group-hover:border-primary-200 flex items-center justify-center group-hover:shadow-md transition-all">
                               <MoreHorizontal className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-bold">Add Chart</span>
                      </button>
                  </div>
                </div>
            </section>

          </div>
        </div>
      </div>

      {/* OVERLAY: Activity Window (Uses FLIP Variant) */}
      <ActivityWindow 
        isOpen={overlay === 'activity' && activeActivity === 'attendance'} 
        onClose={closeOverlay}
        title="Take Attendance"
        variant="flip" // Triggers flip animation & arrow button
      >
        <div className="max-w-6xl mx-auto flex flex-col h-full">
            {/* Top Stats Bar */}
            <div className="pb-6 border-b border-slate-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span>Science 4B</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="font-normal text-slate-500 text-sm">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700">{STUDENTS.length} Enrolled</span>
                        <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                            {STUDENTS.filter(s => s.status === 'Present').length} Present
                        </span>
                         <span className="px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold border border-red-200">
                            {STUDENTS.filter(s => s.status !== 'Present').length} Absent
                        </span>
                    </div>
                </div>
                <button className="text-sm font-bold text-primary-600 hover:text-primary-700 hover:underline">
                    Mark All Present
                </button>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg border border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <div className="col-span-3">Student Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-5">Note</div>
                <div className="col-span-2 text-right">Quick Action</div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 md:space-y-0 min-h-[300px]">
                {STUDENTS.map((student) => (
                    <div key={student.id} className="group md:grid md:grid-cols-12 gap-4 items-center p-4 bg-white border border-slate-100 rounded-xl hover:border-primary-100 hover:shadow-md transition-all">
                        {/* Name */}
                        <div className="col-span-3 flex items-center gap-3 mb-3 md:mb-0">
                            <div className="relative shrink-0">
                                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${student.status === 'Present' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                                <p className="text-xs text-slate-400">ID: #{student.id}</p>
                            </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="col-span-2 mb-3 md:mb-0">
                            <button 
                                className={`w-full md:w-auto px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center md:justify-start gap-2 ${
                                    student.status === 'Present' 
                                    ? 'bg-green-50 text-green-700 ring-1 ring-green-200 hover:bg-green-100' 
                                    : 'bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100'
                                }`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Present' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                {student.status}
                            </button>
                        </div>

                        {/* Note Input */}
                        <div className="col-span-5 mb-3 md:mb-0">
                            <input 
                                type="text" 
                                placeholder="Type a note..." 
                                className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm text-slate-600 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all"
                            />
                        </div>

                        {/* Action */}
                        <div className="col-span-2 flex justify-end">
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-colors shadow-sm">
                                <Phone className="w-3.5 h-3.5" />
                                <span className="hidden xl:inline">Call Parents</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={closeOverlay} className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-colors">
                    Cancel
                </button>
                <button onClick={closeOverlay} className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all flex items-center gap-2">
                    Save Attendance
                </button>
            </div>
        </div>
      </ActivityWindow>

      {/* OVERLAY: Query Result Window */}
      {overlay === 'query_result' && (
         <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeOverlay}
         >
            <div 
                className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col relative overflow-hidden ring-1 ring-slate-900/5 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
               <button onClick={closeOverlay} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full md:hidden">
                  <X className="w-5 h-5" />
               </button>

               <div className="p-8">
                  <div className="mb-6">
                      <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
                         "{submittedQuery}"
                      </h2>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-orange-100 p-0.5 shadow-sm border border-white">
                           <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy8Uxj4qHPS-8fjM5VPZYN6kNB-BRXqc2-2wbHU5OmoFxa5IjXR9jQMgdIAir6DY2Bk9X9IuntqM5r4VEDy7Y6raFesZNNDUgGOjOUp1BzZvHo5C2Ma0A7U0ZnkfAqW7hojTA5h9EkJPWbV0yltgtD6IqIQa2-w0LVS1NxS_HbFXSnr61KDAqz3GeQhisQ3eNmTD5FPL9N4WPfLPeNxpLGDRhFpmM-A8DGyXMjg7ddhExDBQAtq8_AFP79ymzJBtoxtN3JGZpG" className="w-full h-full rounded-full object-cover" />
                         </div>
                         {isThinking ? (
                            <p className="text-slate-500 font-medium animate-pulse flex items-center gap-2">
                               Thinking<span className="tracking-widest">...</span>
                            </p>
                         ) : (
                            <p className="text-slate-600 font-medium">
                               I analyzed the data. Here is your result:
                            </p>
                         )}
                      </div>
                  </div>

                  {!isThinking && (
                      <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-sm group">
                         <div className="absolute top-0 right-0 p-3 flex flex-col gap-2 z-10 opacity-100">
                             <button 
                                onClick={handleExpandQueryResult}
                                className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-400 hover:text-primary-600 hover:border-primary-200 transition-all hover:scale-105 active:scale-95" 
                                title="Expand to Full View"
                             >
                                <ArrowUpRight className="w-4 h-4" />
                             </button>
                             <button 
                                className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-400 hover:text-green-600 hover:border-green-200 transition-all hover:scale-105 active:scale-95" 
                                title="Download CSV"
                             >
                                <Download className="w-4 h-4" />
                             </button>
                         </div>
                         
                         <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                               <thead className="bg-white border-b border-slate-200">
                                  <tr>
                                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student ID</th>
                                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Grade</th>
                                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Age</th>
                                  </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100 bg-white">
                                  {QUERY_RESULTS.map((row) => (
                                     <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-500 font-mono">{row.id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{row.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{row.grade}</td>
                                        <td className="px-6 py-4 text-sm">
                                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                             {row.age}
                                           </span>
                                        </td>
                                     </tr>
                                  ))}
                                  <tr>
                                      <td colSpan={4} className="px-6 py-3 text-xs text-center text-slate-400 bg-slate-50/50 italic border-t border-slate-50">
                                          ... 12 more rows hidden
                                      </td>
                                  </tr>
                               </tbody>
                            </table>
                         </div>
                      </div>
                  )}
                  {!isThinking && (
                     <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                        This table contains the query results generated by AI.
                     </p>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* OVERLAY: Expanded Chart View (Uses DEFAULT Variant) */}
      <ActivityWindow 
         isOpen={overlay === 'chart_expanded' && activeChart !== null}
         onClose={closeOverlay}
         title={activeChart?.title || 'Analytics'}
         showDownload={true}
         variant="default" // Default X button
      >
         {activeChart && (
            <div className="h-[400px] w-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                   {/* Render the appropriate chart type for the expanded view */}
                   {(() => {
                        const trendStyles = {
                            up: { stroke: activeChart.color || '#3b82f6', fill: activeChart.color || '#3b82f6' },
                            down: { stroke: activeChart.color || '#f97316', fill: activeChart.color || '#f97316' },
                            neutral: { stroke: activeChart.color || '#94a3b8', fill: activeChart.color || '#94a3b8' }
                        };
                        const activeStyle = trendStyles[activeChart.trend];
                        
                        switch(activeChart.type) {
                            case 'bar':
                                return (
                                    <BarChart data={activeChart.data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                        <Bar dataKey="value" fill={activeStyle.fill} radius={[4, 4, 0, 0]} animationDuration={1500} />
                                    </BarChart>
                                );
                            case 'line':
                                 return (
                                    <LineChart data={activeChart.data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                        <Line type="monotone" dataKey="value" stroke={activeStyle.stroke} strokeWidth={3} dot={{r: 4, strokeWidth: 2}} animationDuration={1500} />
                                    </LineChart>
                                );
                            case 'multi-line':
                                 return (
                                    <LineChart data={activeChart.data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                        {activeChart.dataKeys?.map((key, index) => (
                                          <Line 
                                            key={key}
                                            type="monotone" 
                                            dataKey={key} 
                                            stroke={activeChart.colors ? activeChart.colors[index % activeChart.colors.length] : activeStyle.stroke} 
                                            strokeWidth={3} 
                                            dot={{r: 4}} 
                                            animationDuration={1500}
                                          />
                                        ))}
                                    </LineChart>
                                );
                            case 'pie':
                                return (
                                    <PieChart>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                        <Pie
                                           data={activeChart.data}
                                           cx="50%"
                                           cy="50%"
                                           innerRadius={80}
                                           outerRadius={120}
                                           paddingAngle={5}
                                           dataKey="value"
                                           label
                                        >
                                           {activeChart.data.map((entry, index) => (
                                              <Cell 
                                                key={`cell-${index}`} 
                                                fill={activeChart.colors ? activeChart.colors[index % activeChart.colors.length] : activeStyle.fill} 
                                              />
                                           ))}
                                        </Pie>
                                    </PieChart>
                                );
                            case 'area':
                            default:
                                return (
                                    <AreaChart data={activeChart.data}>
                                        <defs>
                                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={activeChart.color} stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor={activeChart.color} stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                        <Area 
                                            type="monotone" 
                                            dataKey="value" 
                                            stroke={activeChart.color} 
                                            strokeWidth={3}
                                            fill="url(#colorActive)" 
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                );
                        }
                   })()}
                </ResponsiveContainer>
                <div className="mt-6 flex justify-center gap-6">
                    <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Average</p>
                        <p className="text-2xl font-black text-slate-900">82%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Peak</p>
                        <p className="text-2xl font-black text-slate-900">95%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Trend</p>
                        <p className={`text-2xl font-black ${activeChart.trend === 'up' ? 'text-green-500' : 'text-orange-500'}`}>
                            {activeChart.trend === 'up' ? '+12%' : '-5%'}
                        </p>
                    </div>
                </div>
            </div>
         )}
      </ActivityWindow>

    </div>
  );
};

export default Dashboard;