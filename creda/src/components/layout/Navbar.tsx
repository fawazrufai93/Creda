import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { ViewMode } from '../../types';
import { Wordmark } from '../common/Logo';

interface NavbarProps {
  onNavigate: (view: ViewMode) => void;
  onSelectFeature?: (featureId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSelectFeature }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onSelectFeature) {
      onSelectFeature(sectionId);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('marketing')}
              aria-label="Creda home"
              className="flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <Wordmark size={30} />
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            <button
              onClick={() => handleNavClick('features')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => handleNavClick('passport-section')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Financial Passport
            </button>
            <button
              onClick={() => handleNavClick('creda-ai-section')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Creda AI
            </button>
            <button
              onClick={() => handleNavClick('solutions-sme')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              For Businesses
            </button>
            <button
              onClick={() => handleNavClick('solutions-institutions')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              For Institutions
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('login')}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950"
            >
              Log in
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-neutral-700">
            <button
              onClick={() => handleNavClick('features')}
              className="text-left py-1.5 hover:text-neutral-950"
            >
              Product
            </button>
            <button
              onClick={() => handleNavClick('passport-section')}
              className="text-left py-1.5 hover:text-neutral-950"
            >
              Financial Passport
            </button>
            <button
              onClick={() => handleNavClick('creda-ai-section')}
              className="text-left py-1.5 hover:text-neutral-950"
            >
              Creda AI
            </button>
            <button
              onClick={() => handleNavClick('solutions-sme')}
              className="text-left py-1.5 hover:text-neutral-950"
            >
              For Businesses
            </button>
            <button
              onClick={() => handleNavClick('solutions-institutions')}
              className="text-left py-1.5 hover:text-neutral-950"
            >
              For Institutions
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="text-left py-1.5 hover:text-neutral-950"
            >
              Pricing
            </button>
          </nav>
          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('signup');
              }}
              className="w-full py-2.5 text-center text-sm font-medium text-white bg-neutral-950 rounded-lg hover:bg-neutral-800"
            >
              Get started free
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('login');
              }}
              className="w-full py-2 text-center text-sm font-medium text-neutral-700 hover:text-neutral-950"
            >
              Existing account sign in
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
