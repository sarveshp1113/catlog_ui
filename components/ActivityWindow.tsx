import React from 'react';
import { X, Download, CornerUpLeft } from 'lucide-react';

interface ActivityWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showDownload?: boolean;
  variant?: 'default' | 'flip'; // 'default' for charts (X button), 'flip' for activities (Arrow button)
}

const ActivityWindow: React.FC<ActivityWindowProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  showDownload,
  variant = 'default' 
}) => {
  if (!isOpen) return null;

  const isFlip = variant === 'flip';

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 lg:p-8 perspective-container">
      <style>{`
        .perspective-container {
          perspective: 1500px;
        }
        @keyframes flipIn {
          0% {
            opacity: 0;
            transform: rotateY(-90deg) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) scale(1);
          }
        }
        .animate-flip-in {
          animation: flipIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Container */}
      <div 
        className={`bg-white w-full h-full rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-900/5 relative z-10 
          ${isFlip ? 'animate-flip-in origin-center' : 'animate-in fade-in zoom-in-95 duration-300'}`}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
              <p className="text-sm text-slate-400 font-medium">
                {isFlip ? 'Task View' : 'Detailed Analytics View'}
              </p>
          </div>
          
          <div className="flex gap-3">
            {showDownload && (
              <button 
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors border border-slate-200"
                title="Export PDF"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            )}
            
            <button 
              onClick={onClose}
              className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all shadow-sm border
                ${isFlip 
                  ? 'bg-slate-900 text-white hover:bg-slate-700 border-slate-900' // Dark button for Flip/Task view
                  : 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 border-transparent' // Light button for Chart view
                }`}
              title={isFlip ? "Return" : "Close"}
            >
              {isFlip ? <CornerUpLeft className="w-6 h-6" /> : <X className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50/50 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ActivityWindow;