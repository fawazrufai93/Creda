import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Search, 
  ChevronDown, 
  Menu, 
  Landmark, 
  Building2,
  Check,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { UserRole } from '../../types';

interface AppHeaderProps {
  userRole: UserRole;
  businessName?: string;
  onOpenNotifications: () => void;
  unreadNotificationCount: number;
  onOpenMobileMenu?: () => void;
  timeRange: string;
  onChangeTimeRange: (range: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  userRole,
  businessName,
  onOpenNotifications,
  unreadNotificationCount,
  onOpenMobileMenu,
  timeRange,
  onChangeTimeRange,
}) => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const hour = new Date().getHours();
  const greeting = `${hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'}${businessName ? ', ' + businessName : ''}`;

  const timeOptions = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '3m', label: 'Last 3 months' },
    { id: '12m', label: 'Last 12 months' },
  ];

  return (
    <header className="h-16 bg-white border-b border-neutral-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      
      {/* Left: Salutation & Breadcrumb */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-neutral-950">
              {greeting}
            </h1>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline-block text-xs text-neutral-500 font-medium">
              Ghana
            </span>
          </div>
          <p className="text-xs text-neutral-500 hidden sm:block">
            Here's how your business is performing.
          </p>
        </div>
      </div>

      {/* Right Controls: Date Selector, Notifications, Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Date Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">
              {timeOptions.find(o => o.id === timeRange)?.label || 'Last 30 days'}
            </span>
            <span className="sm:hidden">30d</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {dateDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-30">
              {timeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onChangeTimeRange(opt.id);
                    setDateDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 cursor-pointer ${
                    timeRange === opt.id ? 'font-semibold text-neutral-900 bg-neutral-50/60' : 'text-neutral-600'
                  }`}
                >
                  <span>{opt.label}</span>
                  {timeRange === opt.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
          title="Open notification center"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          )}
        </button>

      </div>
    </header>
  );
};
