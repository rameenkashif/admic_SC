import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, Calendar } from 'lucide-react';
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
      {/* Light White Panel Card Container as shown in screenshot */}
      <div className="bg-white/95 text-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200/80 backdrop-blur-md">
        
        {/* Header with Title and Search Input */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mesazhet</h1>
          
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            />
          </div>
        </div>

        {/* Message List */}
        <div className="space-y-6">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">Nuk u gjet asnjë mesazh.</p>
            </div>
          ) : (
            filteredMessages.map((msg, index) => {
              const isExpanded = Boolean(expandedIds[msg.id]);

              return (
                <div key={msg.id} className="group">
                  {/* Message Item */}
                  <div className="space-y-3">
                    {/* Header Row: Sender email & Date */}
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        {msg.sender}
                      </h2>
                      <span className="text-xs font-medium text-slate-400 shrink-0 text-right font-mono">
                        {msg.date}
                      </span>
                    </div>

                    {/* Message body text */}
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {msg.message}
                    </p>

                    {/* Expanded details: Email and Phone number */}
                    {isExpanded && (
                      <div className="pt-2 pb-1 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-slate-900 font-normal">
                        <div>
                          <span className="font-bold text-slate-900">Email: </span>
                          <span className="text-slate-800">{msg.sender}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900">Numri i Telefonit: </span>
                          <span className="text-slate-800 font-mono">{msg.phone}</span>
                        </div>
                      </div>
                    )}

                    {/* Expand/Collapse Toggle Button */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs text-slate-400 font-medium select-none">
                        {isExpanded ? 'Shiko më pak' : 'Shiko më shumë'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExpand(msg.id)}
                        className="w-7 h-7 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg flex items-center justify-center shadow-md transition cursor-pointer"
                        title={isExpanded ? 'Shiko më pak' : 'Shiko më shumë'}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 stroke-[3]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Divider line between items */}
                  {index < filteredMessages.length - 1 && (
                    <div className="border-b border-slate-200/80 my-6"></div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
