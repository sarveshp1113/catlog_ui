import React from 'react';
import { X, CheckCircle, ArrowLeft } from 'lucide-react';
import { Student } from '../types';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ isOpen, onClose, students }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900">Take Attendance</h2>
            <p className="text-slate-500 text-sm font-medium">Science 4B • Today</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {students.map((student) => (
            <div key={student.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div 
                    className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-white shadow-sm" 
                    style={{ backgroundImage: `url(${student.avatar})` }}
                  />
                  {student.status === 'Present' && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-900 font-semibold">{student.name}</p>
                  <span className="text-xs text-slate-400 font-medium">{student.attendance}% Attendance</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner">
                <button 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm ${
                    student.status === 'Present' 
                      ? 'bg-primary-700 text-white' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Present
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    student.status === 'Absent' 
                      ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-100 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy8Uxj4qHPS-8fjM5VPZYN6kNB-BRXqc2-2wbHU5OmoFxa5IjXR9jQMgdIAir6DY2Bk9X9IuntqM5r4VEDy7Y6raFesZNNDUgGOjOUp1BzZvHo5C2Ma0A7U0ZnkfAqW7hojTA5h9EkJPWbV0yltgtD6IqIQa2-w0LVS1NxS_HbFXSnr61KDAqz3GeQhisQ3eNmTD5FPL9N4WPfLPeNxpLGDRhFpmM-A8DGyXMjg7ddhExDBQAtq8_AFP79ymzJBtoxtN3JGZpG" alt="Cat" className="w-full h-full object-cover" />
            </div>
            <div className="bg-slate-100 text-slate-600 text-xs py-2 px-3 rounded-xl rounded-bl-none shadow-sm">
              Just one absent today? That's pawsome! 🐾
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full h-12 bg-primary-700 hover:bg-primary-800 active:scale-[0.98] transition-all rounded-xl text-white font-semibold text-base shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <span>Submit Attendance</span>
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AttendanceModal;