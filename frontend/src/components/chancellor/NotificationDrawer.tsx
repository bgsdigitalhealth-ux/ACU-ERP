import React from 'react';
import { X, CheckCheck, Bell, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { useChancellor } from '../../context/ChancellorContext';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationCount
  } = useChancellor();

  if (!isNotificationDrawerOpen) return null;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'approval':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'governance':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-2xs select-none animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-purple-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#320b60] to-[#4a157c] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-amber-300" />
              <div>
                <h3 className="font-extrabold text-base text-white">Notifications</h3>
                <span className="text-[11px] text-purple-200 font-medium">
                  {unreadNotificationCount} unread governance alerts
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="px-5 py-2.5 bg-purple-50/80 border-b border-purple-100 flex items-center justify-between text-xs">
            <span className="font-bold text-[#2e1065]">Recent Alerts</span>
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1 font-bold text-purple-700 hover:text-purple-900 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">
                No notifications to display.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`pt-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                    n.read
                      ? 'bg-white border-gray-100 text-gray-600'
                      : 'bg-purple-50/60 border-purple-200 text-gray-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {getCategoryIcon(n.category)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#1e1b4b] truncate">
                          {n.title}
                        </h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-gray-600 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                      <span className="text-[10px] text-gray-400 font-semibold mt-1 block">
                        {n.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-[#320b60] text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

