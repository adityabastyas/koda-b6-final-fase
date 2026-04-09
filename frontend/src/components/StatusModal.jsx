import React from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const StatusModal = ({ isOpen, onClose, type = 'success', title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl border border-slate-100 transform transition-all animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`mb-6 p-4 rounded-3xl ${
            type === 'success' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
          }`}>
            {type === 'success' ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
          </div>

          <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            {message}
          </p>

          <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
              type === 'success' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-slate-800 hover:bg-slate-900 shadow-slate-200'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;