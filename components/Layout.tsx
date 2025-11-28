import React from 'react';
import { AppTab } from '../types';
import { LayoutDashboard, TrendingUp, Calendar, Brain, Sparkles, Shirt } from 'lucide-react';

interface LayoutProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentTab, setTab, children }) => {
  const navItems = [
    { id: AppTab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppTab.MARKET_TRENDS, label: 'Tren Pasar (Shopee)', icon: TrendingUp },
    { id: AppTab.CALENDAR, label: 'Kalender Event', icon: Calendar },
    { id: AppTab.PSYCHOLOGY, label: 'Psikologi & Demografi', icon: Brain },
    { id: AppTab.PREDICTOR, label: 'Generator Prediksi', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar / Mobile Header */}
      <aside className="bg-indigo-900 text-white w-full md:w-64 flex-shrink-0 flex flex-col">
        <div className="p-6 flex items-center space-x-3 border-b border-indigo-800">
          <Shirt className="w-8 h-8 text-indigo-300" />
          <h1 className="text-xl font-bold tracking-wide">TrendKaos AI</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    currentTab === item.id
                      ? 'bg-indigo-700 text-white shadow-md'
                      : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-indigo-800 text-xs text-indigo-400 text-center">
          Powered by Gemini AI
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;