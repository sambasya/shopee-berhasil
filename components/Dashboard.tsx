import React from 'react';
import { AppTab } from '../types';
import { TrendingUp, Calendar, Brain, ArrowRight } from 'lucide-react';

interface DashboardProps {
  setTab: (tab: AppTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setTab }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Halo, Entrepreneur Kaos!</h1>
          <p className="text-indigo-200 max-w-2xl text-lg">
            Selamat datang di pusat komando TrendKaos AI. Kami siap membantu Anda menemukan desain 'Winning Product' berikutnya berdasarkan data real-time.
          </p>
          <button 
            onClick={() => setTab(AppTab.PREDICTOR)}
            className="mt-6 bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center shadow-lg"
          >
            Buat Prediksi Baru
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setTab(AppTab.MARKET_TRENDS)}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Cek Tren Pasar</h3>
          <p className="text-gray-500 text-sm">Lihat apa yang sedang laku di Shopee dan kata kunci yang sedang dicari orang tua.</p>
        </div>

        <div 
          onClick={() => setTab(AppTab.CALENDAR)}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Kalender Event</h3>
          <p className="text-gray-500 text-sm">Pantau jadwal rilis film kartun, game populer, dan liburan nasional Indonesia.</p>
        </div>

        <div 
          onClick={() => setTab(AppTab.PSYCHOLOGY)}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Insight Psikologi</h3>
          <p className="text-gray-500 text-sm">Pelajari preferensi warna dan visual anak berdasarkan kelompok umur.</p>
        </div>
      </div>
      
      {/* Mini Footer / Info */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-gray-400 text-sm">
          Aplikasi ini menggunakan Google Gemini API dengan kemampuan Search Grounding untuk data terkini.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;