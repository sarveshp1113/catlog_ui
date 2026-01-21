import React, { useState } from 'react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell,
  ResponsiveContainer,
  CartesianGrid, XAxis, YAxis, Tooltip
} from 'recharts';
import { ChartDef } from '../types';
import { GripVertical, TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

interface ChartCardProps {
  chart: ChartDef;
  onClick: (chart: ChartDef) => void;
  draggable?: boolean;
  variant?: 'bento' | 'featured';
}

const ChartCard: React.FC<ChartCardProps> = ({ chart, onClick, draggable, variant = 'bento' }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define styling based on trend
  const trendStyles = {
    up: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      stroke: chart.color || '#3b82f6',
      fill: chart.color || '#3b82f6',
      icon: TrendingUp
    },
    down: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      stroke: chart.color || '#f97316',
      fill: chart.color || '#f97316',
      icon: TrendingDown
    },
    neutral: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-600',
      stroke: chart.color || '#94a3b8',
      fill: chart.color || '#94a3b8',
      icon: Minus
    }
  };

  const activeStyle = trendStyles[chart.trend];
  const TrendIcon = activeStyle.icon;

  const renderChart = () => {
    // For featured view, we add grid and axes for better data visibility
    // For bento hover view, we keep it minimal but visible
    const showAxes = variant === 'featured';

    switch (chart.type) {
      case 'bar':
        return (
          <BarChart data={chart.data}>
             {showAxes && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
             {showAxes && <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />}
             <Bar dataKey="value" fill={activeStyle.fill} radius={[4, 4, 0, 0]} animationDuration={1000} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chart.data}>
             {showAxes && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
             {showAxes && <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />}
             <Line type="monotone" dataKey="value" stroke={activeStyle.stroke} strokeWidth={3} dot={showAxes} animationDuration={1000} />
          </LineChart>
        );
      case 'multi-line':
        return (
          <LineChart data={chart.data}>
            {showAxes && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
            {showAxes && <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />}
            {showAxes && <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />}
            {chart.dataKeys?.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={chart.colors ? chart.colors[index % chart.colors.length] : activeStyle.stroke} 
                strokeWidth={3} 
                dot={showAxes} 
                animationDuration={1000}
              />
            ))}
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
             <Pie
               data={chart.data}
               cx="50%"
               cy="50%"
               innerRadius={variant === 'featured' ? 60 : (isHovered ? 25 : 20)}
               outerRadius={variant === 'featured' ? 100 : (isHovered ? 45 : 35)}
               paddingAngle={5}
               dataKey="value"
               animationDuration={1000}
               label={variant === 'featured'}
             >
               {chart.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={chart.colors ? chart.colors[index % chart.colors.length] : activeStyle.fill} 
                    stroke="none"
                  />
               ))}
             </Pie>
             {variant === 'featured' && <Tooltip />}
          </PieChart>
        );
      case 'area':
      default:
        return (
          <AreaChart data={chart.data}>
             <defs>
                 <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor={activeStyle.fill} stopOpacity={0.3}/>
                     <stop offset="95%" stopColor={activeStyle.fill} stopOpacity={0}/>
                 </linearGradient>
             </defs>
             {showAxes && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
             {showAxes && <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />}
             <Area 
               type="monotone" 
               dataKey="value" 
               stroke={activeStyle.stroke} 
               strokeWidth={2} 
               fill={`url(#grad-${chart.id})`} 
               animationDuration={1000}
             />
          </AreaChart>
        );
    }
  };

  // Featured Variant (Large, Detailed)
  if (variant === 'featured') {
    return (
      <div 
        onClick={() => onClick(chart)}
        className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[400px] cursor-pointer hover:shadow-lg transition-all duration-300 group"
      >
        <div className="p-8 md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
           <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 ${activeStyle.bg} ${activeStyle.text}`}>
                 <TrendIcon className="w-3 h-3" />
                 <span>{chart.trend === 'up' ? '+12% Growth' : (chart.trend === 'down' ? '-5% Decline' : 'Stable')}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{chart.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Detailed analytics view for {chart.title.toLowerCase()}. Tap to open the full report and export data.
              </p>
           </div>
           <div className="mt-8">
              <div className="flex items-baseline gap-2 mb-1">
                 <span className="text-4xl font-black text-slate-900">82</span>
                 <span className="text-sm font-bold text-slate-400">/ 100</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Score</p>
           </div>
        </div>
        <div className="flex-1 p-6 md:p-8 bg-white relative">
           <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
           </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // Bento Variant (Tile Pop-out Effect)
  // This implements the "Reveal on Hover" design
  return (
    <div className="relative h-full min-h-[140px] w-full z-0 hover:z-50 select-none group">
      {/* 
        The Card Container 
        - Uses absolute positioning on hover to "break out" of the grid cell 
        - Scales up and gains shadow
      */}
      <div
        className={`
          absolute inset-0 w-full rounded-3xl border bg-white flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center cursor-pointer
          ${isHovered 
            ? `h-[260px] -top-[60px] -left-[10%] w-[120%] shadow-2xl ring-1 ring-slate-900/5 ${activeStyle.border}` 
            : 'h-full border-slate-200 shadow-sm hover:border-slate-300'
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(chart)}
      >
        <div className="flex flex-col h-full p-4 relative overflow-hidden">
           
           {/* Header / Title Section */}
           <div className={`relative z-10 transition-all duration-500 flex flex-col ${isHovered ? 'items-start' : 'items-center justify-center h-full'}`}>
              <h3 className={`font-black text-slate-900 transition-all duration-500 leading-tight ${isHovered ? 'text-lg' : 'text-lg text-center'}`}>
                  {chart.title}
              </h3>
              
              {/* Subtitle/Trend - Only visible on hover */}
              <div className={`transition-all duration-500 overflow-hidden flex items-center gap-2 ${isHovered ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                 <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${activeStyle.bg} ${activeStyle.text}`}>
                    <TrendIcon className="w-3 h-3" />
                    {chart.trend === 'up' ? 'Trending Up' : (chart.trend === 'down' ? 'Needs Attention' : 'Stable')}
                 </span>
                 <span className="text-[10px] text-slate-400 font-medium">Last 7 Days</span>
              </div>
           </div>
           
           {/* Action Icon (Top Right) - Reveal on hover */}
           <div className={`absolute top-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <div className="p-1.5 bg-slate-100 rounded-full text-slate-400">
                 <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
           </div>

           {/* Chart Reveal Section */}
           {/* Fades in and slides up from bottom */}
           <div className={`absolute bottom-0 left-0 right-0 h-32 p-4 transition-all duration-700 delay-100 ease-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
               <ResponsiveContainer width="100%" height="100%">
                   {renderChart()}
               </ResponsiveContainer>
           </div>
           
           {/* Placeholder for non-hovered state (optional subtle visual) */}
           {!isHovered && (
             <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-20">
                <div className="w-12 h-1 rounded-full bg-slate-300" />
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default ChartCard;