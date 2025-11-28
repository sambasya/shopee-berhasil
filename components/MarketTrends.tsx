import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, ExternalLink, Loader2, ShoppingBag } from 'lucide-react';
import { fetchMarketAnalysis } from '../services/geminiService';
import { TrendData } from '../types';

const MarketTrends: React.FC = () => {
  const [data, setData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchMarketAnalysis();
      setData(result);
    } catch (err) {
      setError("Gagal memuat analisis pasar. Pastikan API Key valid.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load data on mount if empty (simulating caching for this session)
    if (!data) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Analisis Pasar & Kompetitor</h2>
        <p className="text-gray-600 mt-2">
          Real-time insight dari Shopee Indonesia dan pencarian populer Google untuk kaos anak.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
          <button onClick={loadData} className="ml-4 underline font-medium">Coba Lagi</button>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-gray-500 text-sm">Sedang menganalisis tren e-commerce Indonesia...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Insights Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Top Seller Insights (Shopee & E-commerce)</h3>
            </div>
            <ul className="space-y-3">
              {data.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-800 text-sm leading-relaxed">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keywords Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Kata Kunci Populer</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((kw, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-default">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Sources Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center space-x-2 mb-4">
              <ExternalLink className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Sumber Data</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {data.sources.map((src, idx) => (
                <li key={idx} className="truncate">
                  <a href={src.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                    {src.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Mulai Analisis Pasar</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Klik tombol di bawah untuk meminta AI mencari tren terbaru di Shopee dan Google.
          </p>
          <button
            onClick={loadData}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Analisis Sekarang
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketTrends;