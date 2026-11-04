import React, { useState } from 'react';
import {
  Inbox,
  RefreshCw,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Mail,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { MessageItem } from '../../../types/student';

export const StudentMessageBoxPage: React.FC = () => {
  const { messages, markMessageAsRead } = useStudent();
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<{ [id: string]: boolean }>({});

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const all: { [id: string]: boolean } = {};
      messages.forEach((m) => (all[m.id] = true));
      setSelectedIds(all);
    } else {
      setSelectedIds({});
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenMessage = (msg: MessageItem) => {
    markMessageAsRead(msg.id);
    setSelectedMessage(msg);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb matching Page 14 */}
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        MESSAGE BOX &gt; INBOX
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Inbox Header Controls matching Page 14 */}
        <div className="p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/70">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <Inbox className="w-4 h-4 text-purple-600" />
              <span>Inbox</span>
            </span>

            <div className="flex items-center gap-1.5 pl-3 border-l border-gray-300">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded text-purple-600 cursor-pointer"
                title="Select all"
              />
              <button
                onClick={() => alert('Inbox updated with live announcements.')}
                className="p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"
                title="Refresh"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span>&lt; Page 1 - 1 &gt;</span>
            <div className="flex gap-0.5">
              <button className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40" disabled>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40" disabled>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Message Rows matching Page 14 */}
        <div className="divide-y divide-gray-100 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`flex items-center gap-3 p-3.5 transition-colors cursor-pointer group ${
                !msg.isRead
                  ? 'bg-purple-50/30 hover:bg-purple-50/60 font-bold'
                  : 'bg-white hover:bg-gray-50/80 font-normal text-gray-700'
              }`}
            >
              <input
                type="checkbox"
                checked={!!selectedIds[msg.id]}
                onClick={(e) => toggleSelectOne(msg.id, e)}
                className="w-4 h-4 rounded text-purple-600 cursor-pointer shrink-0"
              />

              <div className="w-36 sm:w-44 truncate text-gray-900 font-bold shrink-0">
                {msg.sender}
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <p className="truncate text-gray-900 group-hover:text-purple-700 transition-colors">
                  {msg.subject}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {msg.hasAttachment && (
                  <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
                )}
                <span className="text-[11px] text-gray-500 w-16 text-right">
                  {msg.time || msg.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900">
                    {selectedMessage.sender}
                  </h3>
                  <p className="text-[11px] text-purple-700 font-semibold">
                    {selectedMessage.circularNo || 'University Circular'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-800">
              <h4 className="font-extrabold text-sm text-gray-900 leading-snug">
                {selectedMessage.subject}
              </h4>
              <p className="text-[11px] text-gray-400">
                Date: {selectedMessage.date} • Sent at {selectedMessage.time}
              </p>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 leading-relaxed text-gray-700 text-xs">
                {selectedMessage.body}
              </div>

              {selectedMessage.hasAttachment && (
                <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="font-bold text-gray-900 text-xs">
                        {selectedMessage.attachmentName}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {selectedMessage.attachmentSize}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading attachment: ${selectedMessage.attachmentName}`)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors text-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs cursor-pointer"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
