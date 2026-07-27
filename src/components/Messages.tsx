import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, User } from 'lucide-react';
import { MessageItem } from '../types';

interface MessagesProps {
  messages: MessageItem[];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'msg-1': true, // Keep first message expanded by default as shown in screenshot
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredMessages = messages.filter((msg) => {
    const q = searchTerm.toLowerCase();
    return (
      msg.sender.toLowerCase().includes(q) ||
      msg.message.toLowerCase().includes(q) ||
      msg.phone.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Header & Search Bar matching overall dark theme */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/15 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Mesazhet</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Lexoni dhe menaxhoni komunikimet dhe mesazhet e anëtarëve.
          </p>
        </div>

        {/* Search input with dark glass pill */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Kërko mesazhet..."
            className="w-full bg-slate-900 border border-indigo-500/20 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60 shadow-inner"
          />
        </div>
      </div>

      {/* Message Cards Stream */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-dashed border-indigo-500/30 text-center space-y-3">
            <Mail className="w-10 h-10 text-indigo-400 mx-auto opacity-50" />
            <h3 className="font-bold text-base text-white">Nuk u gjet asnjë mesazh</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Nuk ka mesazhe që përputhen me kërkimin tuaj.
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isExpanded = Boolean(expandedIds[msg.id]);

            return (
              <div
                key={msg.id}
                className={`glass-panel p-5 rounded-2xl border transition-all duration-200 space-y-3 ${
                  isExpanded
                    ? 'border-indigo-400/50 bg-slate-900/90 shadow-2xl ring-1 ring-indigo-500/20'
                    : 'border-indigo-500/20 hover:border-indigo-400/30 bg-slate-900/50'
                }`}
              >
                {/* Header Row: Sender email & Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/10 pb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
                      {msg.sender}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-indigo-300 font-mono bg-indigo-950/80 px-2.5 py-1 rounded-xl border border-indigo-500/30 w-fit">
                    {msg.date}
                  </span>
                </div>

                {/* Message body text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
                  {msg.message}
                </p>

                {/* Expanded details: Email and Phone number */}
                {isExpanded && (
                  <div className="pt-3 border-t border-indigo-500/15 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-slate-200 font-medium animate-in fade-in duration-200">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-400">Email:</span>
                      <span className="text-white font-semibold">{msg.sender}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-400">Numri i Telefonit:</span>
                      <span className="text-indigo-300 font-mono font-bold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">{msg.phone}</span>
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Toggle Button */}
                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => toggleExpand(msg.id)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-bold text-xs border border-blue-400/30 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Shiko më pak' : 'Shiko më shumë'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

