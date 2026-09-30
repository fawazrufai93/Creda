import React from 'react';
import { 
  X, 
  Bell, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Receipt, 
  CheckCheck,
  Check
} from 'lucide-react';
import { NotificationItem, AppTab } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'passport':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'invoice':
        return <Receipt className="w-4 h-4 text-amber-600" />;
      case 'revenue':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'alert':
      default:
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-neutral-700" />
              <h3 className="text-sm font-bold text-neutral-900">Notifications</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllAsRead}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <p className="text-xs text-neutral-400 text-center py-8">
                No notifications to display.
              </p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onSelectNotification(notif)}
                  className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      : 'bg-emerald-50/40 border-emerald-200 text-neutral-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {getIcon(notif.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <p className="font-bold text-neutral-900 line-clamp-1">{notif.title}</p>
                        {!notif.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-600 leading-relaxed">{notif.message}</p>
                      <span className="text-[10px] text-neutral-400 mt-1 block tabular-nums">
                        {notif.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 text-center">
            <span className="text-[11px] text-neutral-400">
              Synced with continuous telemetry
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
