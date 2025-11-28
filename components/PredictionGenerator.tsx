import React, { useState } from 'react';
import { Sparkles, BarChart2, Calendar as CalendarIcon, Loader2, MessageSquarePlus } from 'lucide-react';
import { DesignPrediction } from '../types';
import { generateMonthlyPredictions } from '../services/geminiService';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const PredictionGenerator: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [year, setYear] = useState(currentYear);
  const [customContext, setCustomContext] = useState('');
  const [predictions, setPredictions] = useState<DesignPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const months = [
    { value: 1, label: 'Januari' }, { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' }, { value: 4, label: 'April' },
    { value: 5, label: 'Mei' }, { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' }, { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' }, { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' }, { value: 12, label: 'Desember' }
  ];

  const years = [currentYear, currentYear + 1];

  const handleGenerate = async () => {
    setLoading(true);
    setHasSearched(true);
    setPredictions([]); // Clear previous
    try {
      const results = await generateMonthlyPredictions(month, year, customContext);
      setPredictions(results);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menganalisis. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Prediksi Trend Kaos</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Pilih waktu penjualan dan masukkan event spesifik (opsional). AI akan meriset event, liburan, dan data Shopee untuk memberikan rekomendasi.
        </p>
      </div>

      {/* Input Selection Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-indigo-100 flex flex-col gap-6">
        
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Bulan
            </label>
            <div className="relative">
                <select 
                value={month} 
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 font-medium text-lg transition-all"
                >
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 w-5 h-5" />
            </div>
            </div>

            <div className="w-full md:w-1/3">
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Tahun
            </label>
            <div className="relative">
                <select 
                value={year} 
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-4 pl-4 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 font-medium text-lg transition-all"
                >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            </div>

             <div className="w-full md:w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                    Topik Khusus <span className="text-gray-400 text-xs ml-2 normal-case font-normal">(Opsional)</span>
                </label>
                <div className="relative">
                    <input 
                        type="text"
                        value={customContext}
                        onChange={(e) => setCustomContext(e.target.value)}
                        placeholder="Cth: Film Jumbo, Roblox, Idul Fitri"
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 transition-all placeholder:text-gray-400"
                    />
                    <MessageSquarePlus className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 w-5 h-5" />
                </div>
            </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1 ${
            loading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Menganalisis Data...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2" />
              Cek Prediksi
            </span>
          )}
        </button>
      </div>

      {/* Results Section */}
      {loading && (
        <div className="py-20 text-center animate-pulse">
          <div className="inline-block p-4 rounded-full bg-indigo-50 mb-4">
             <Sparkles className="w-12 h-12 text-indigo-600 animate-spin" />
          </div>
          <h3 className="text-xl font-medium text-gray-900">Sedang Meriset Tren...</h3>
          <p className="text-gray-500 mt-2">AI sedang mengecek kalender film, liburan, dan data Shopee untuk {months.find(m => m.value === month)?.label} {year}.</p>
        </div>
      )}

      {!loading && predictions.length > 0 && (
        <div className="space-y-8 animate-fade-in-up">
          
           {/* Chart Overview */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
            <h3 className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              Skor Potensi Permintaan
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={predictions} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="themeName" type="category" width={180} tick={{fontSize: 13, fontWeight: 500}} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="estimatedDemand" radius={[0, 6, 6, 0]} barSize={32}>
                  {predictions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.estimatedDemand > 90 ? '#4f46e5' : '#818cf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Cards */}
          <div className="grid gap-6">
            {predictions.map((pred, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  {/* Left Column: Title & Reasoning */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase rounded-full tracking-wide">
                        Rekomendasi #{idx + 1}
                      </span>
                      <span className="text-sm text-gray-500 font-medium border border-gray-200 px-2 py-0.5 rounded">
                        Target: {pred.targetAgeGroup}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{pred.themeName}</h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      "{pred.reasoning}"
                    </p>
                  </div>

                  {/* Right Column: Visual Details */}
                  <div className="md:w-1/3 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
                     <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Elemen Visual Wajib</h4>
                        <div className="flex flex-wrap gap-2">
                          {pred.visualElements.map((el, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg font-medium shadow-sm">
                              {el}
                            </span>
                          ))}
                        </div>
                     </div>
                     <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Palet Warna</h4>
                        <div className="flex gap-3">
                          {pred.colorPalette.map((color, i) => (
                            <div key={i} className="group relative">
                              <div 
                                className="w-10 h-10 rounded-full border-2 border-white shadow-md ring-1 ring-gray-200"
                                style={{ backgroundColor: color.toLowerCase().includes('hitam') ? '#1a1a1a' : color.toLowerCase().includes('putih') ? '#ffffff' : color }}
                              ></div>
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none z-10">
                                {color}
                              </span>
                            </div>
                          ))}
                        </div>
                     </div>
                     <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Estimasi Permintaan</span>
                        <span className="text-xl font-bold text-indigo-600">{pred.estimatedDemand}/100</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && hasSearched && predictions.length === 0 && (
         <div className="text-center py-12 text-gray-500">
           Tidak dapat menghasilkan prediksi. Silakan coba lagi.
         </div>
      )}

      {!loading && !hasSearched && (
        <div className="text-center mt-12 opacity-50">
           <BarChart2 className="w-24 h-24 mx-auto text-gray-300 mb-4" />
           <p>Hasil prediksi akan muncul di sini setelah Anda menekan tombol.</p>
        </div>
      )}
    </div>
  );
};

export default PredictionGenerator;