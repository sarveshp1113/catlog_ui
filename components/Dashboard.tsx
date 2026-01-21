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
  ArrowDown,
  Eye,
  EyeOff,
  Gift,
  FileText,
  GraduationCap,
  AlertCircle,
  Users,
  TrendingUp
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ActivityWindow from './ActivityWindow';
import ChartCard from './ChartCard';
import { DASHBOARD_CHARTS, STUDENTS, QUERY_RESULTS, BRAND_LOGO } from '../constants';
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
      
      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col h-full transition-all duration-500 ${overlay !== 'none' ? 'scale-[0.95] opacity-40 blur-[4px]' : ''}`}>
        
        {/* Header with Hero Search Bar */}
        <header className="px-8 py-8 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
             
             {/* Left Controls & Logo */}
             <div className="hidden md:flex items-center gap-4 shrink-0 w-48">
                {/* Spacer to maintain center alignment of search bar */}
             </div>

             {/* AI SEARCH BAR - The Centerpiece */}
             <form 
                onSubmit={handleSearchSubmit} 
                className={`relative flex-1 w-full max-w-3xl transition-all duration-500 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}
             >
                {/* Magical Glow Background */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 transition duration-1000 group-hover:opacity-60 ${isSearchFocused ? 'opacity-70 blur-md' : ''}`}></div>
                
                {/* Main Input Container */}
                <div className="relative bg-white rounded-2xl flex items-center shadow-xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-100">
                    
                    {/* Animated Icon */}
                    <div className="pl-5 pr-3 flex items-center justify-center">
                       <img 
                          src={BRAND_LOGO}
                          alt="AI Cat"
                          className={`w-7 h-7 object-contain transition-all duration-500 ${isSearchFocused ? 'scale-110 -rotate-12 filter-none' : 'grayscale opacity-40'}`}
                       />
                    </div>

                    {/* The Input */}
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      placeholder="Ask StudentCat AI anything about your data..." 
                      className="w-full py-4 bg-transparent border-none text-lg text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-0"
                    />

                    {/* The Button */}
                    <div className="pr-2 py-2">
                        <button 
                          type="submit"
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                           <span>Ask AI</span>
                           <Sparkles className="w-4 h-4 fill-white/20" />
                        </button>
                    </div>
                </div>

                {/* Optional: 'Did you mean' or Quick chips could go here in future */}
                {isSearchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 z-50">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Suggested Queries</div>
                        <div className="flex flex-wrap gap-2 px-2 pb-2">
                            {['Failing Math grades', 'Attendance report', 'Weekly engagement'].map(q => (
                                <button 
                                    key={q}
                                    type="button"
                                    onMouseDown={() => { setSearchQuery(q); }} // onMouseDown fires before onBlur
                                    className="px-3 py-1.5 bg-slate-50 hover:bg-purple-50 hover:text-purple-700 text-slate-600 text-sm font-medium rounded-lg transition-colors border border-slate-200 hover:border-purple-200"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
             </form>

             {/* Right Spacer for balance */}
             <div className="hidden md:block w-48"></div>

          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-20">

            {/* SECTION 1: TODAY TASKS */}
            <section className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-700">
                    {/* Header */}
                    <div className="px-8 py-5 border-b border-slate-100 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Today Tasks</h2>
                    </div>
                    <div className="text-sm font-medium text-slate-400 hidden sm:block">
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    </div>

                    <div className="flex flex-col md:flex-row min-h-[300px]">
                    {/* LEFT: IMMEDIATE */}
                    <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/0 md:bg-blue-500/0"></div> {/* Optional accent */}
                        
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            Immediate
                        </h3>

                        <div className="space-y-4">
                            {/* Task 1 */}
                            <div 
                                onClick={() => handleActivityClick('attendance')}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 hover:scale-[1.02] transition-all cursor-pointer border border-slate-100 hover:border-blue-100"
                            >
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white text-blue-600 rounded-xl shrink-0 shadow-sm border border-slate-100 font-bold leading-tight">
                                    <span>10:00</span>
                                    <span className="text-[10px] text-slate-400">AM</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900 truncate">Science 4B</h4>
                                    <p className="text-sm text-slate-500 font-medium">Take Attendance</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                                    Start
                                </button>
                            </div>

                            {/* Task 2 */}
                            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 hover:scale-[1.02] transition-all cursor-pointer border border-slate-100 hover:border-blue-100">
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white text-slate-400 rounded-xl shrink-0 shadow-sm border border-slate-100 font-bold leading-tight">
                                    <span>11:00</span>
                                    <span className="text-[10px] text-slate-400">AM</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900 truncate">Math 3A</h4>
                                    <p className="text-sm text-slate-500 font-medium">Take Attendance</p>
                                </div>
                                <button className="px-4 py-2 bg-white text-slate-600 border border-slate-200 text-xs font-bold rounded-lg group-hover:bg-slate-50 transition-colors">
                                    Pending
                                </button>
                            </div>

                            {/* Birthdays */}
                            <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-500 shadow-sm shrink-0">
                                    <Gift className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm mb-1">Today's Birthdays</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-pink-100 text-xs font-bold text-slate-700 shadow-sm">
                                            John Smith
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-pink-100 text-xs font-bold text-slate-700 shadow-sm">
                                            Paul Green
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: NEEDED SOON */}
                    <div className="flex-1 p-6 md:p-8 bg-slate-50/30">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            Needed Soon
                        </h3>

                        <div className="space-y-4">
                            {/* Assignment Item */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Assignment 1 Due</h4>
                                            <p className="text-xs text-slate-500 font-medium">Algebra I • Due 1/26</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-red-100">
                                        High Prio
                                    </span>
                                    </div>
                                    <div className="pl-11">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                                        2 Students not submitted
                                        </div>
                                    </div>
                            </div>

                                {/* Grading Item */}
                                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                            <GraduationCap className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Grade Entry Required</h4>
                                            <p className="text-xs text-slate-500 font-medium">Physics Lab 4 • 24 Pending</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                                    <div className="h-full bg-purple-500 w-[40%] rounded-full"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </section>

            {/* SECTION 2: ANALYTICS */}
            <section className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-1000">
                    {/* Header */}
                    <div className="px-8 py-5 border-b border-slate-100 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Analytics</h2>
                    </div>
                    <button className="text-sm font-bold text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
                        View All Reports
                    </button>
                    </div>

                    <div className="flex flex-col md:flex-row min-h-[400px]">
                    {/* LEFT: PRIORITY (Top Left in concept) */}
                    <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            Overview
                        </h3>
                        <div className="grid grid-cols-2 gap-4 auto-rows-[160px]">
                            {/* Count 1 */}
                            <div className="bg-slate-50/50 hover:bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 shadow-sm transition-all group flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 rounded-lg bg-green-100 text-green-600">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">+5%</span>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-slate-900 tracking-tight">95%</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Attendance</p>
                                </div>
                            </div>

                            {/* Chart 1 */}
                            <div className="rounded-2xl overflow-hidden">
                                <ChartCard chart={charts.find(c => c.id === 'grades') || charts[0]} onClick={handleChartClick} variant="bento" />
                            </div>

                            {/* Chart 2 */}
                            <div className="col-span-2 rounded-2xl overflow-hidden">
                                <ChartCard chart={charts.find(c => c.id === 'engagement') || charts[1]} onClick={handleChartClick} variant="bento" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: SECONDARY (Top Right in concept) */}
                    <div className="flex-1 p-6 md:p-8 bg-slate-50/30">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            Performance & Habits
                        </h3>
                        <div className="grid grid-cols-2 gap-4 auto-rows-[160px]">
                            {/* Chart 3 */}
                            <div className="rounded-2xl overflow-hidden">
                                <ChartCard chart={charts.find(c => c.id === 'assignments') || charts[2]} onClick={handleChartClick} variant="bento" />
                            </div>
                            
                            {/* Count 2 */}
                            <div className="bg-white hover:bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-sm transition-all group flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">Avg</span>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-slate-900 tracking-tight">B+</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Class Avg</p>
                                </div>
                            </div>

                            {/* Chart 4 */}
                            <div className="col-span-2 rounded-2xl overflow-hidden">
                                <ChartCard chart={charts.find(c => c.id === 'study_dist') || charts[4]} onClick={handleChartClick} variant="bento" />
                            </div>
                        </div>
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