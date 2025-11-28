import React, { useState } from 'react';
import { Baby, User, Palette, Brain } from 'lucide-react';
import { fetchPsychologyInsights } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const PsychologyInsights: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<'toddler' | 'kid'>('toddler');
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const loadInsight = async (group: 'toddler' | 'kid') => {
    if (content[group]) {
      setActiveGroup(group);
      return;
    }
    
    setLoading(true);
    setActiveGroup(group);
    try {
      const text = await fetchPsychologyInsights(group);
      setContent(prev => ({ ...prev, [group]: text }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  React.useEffect(() => {
    loadInsight('toddler');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col">
       <header className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Psikologi & Demografi</h2>
        <p className="text-gray-600 mt-2">
          Pahami preferensi warna dan visual berdasarkan kelompok usia anak.
        </p>
      </header>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => loadInsight('toddler')}
          className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 transition-all ${
            activeGroup === 'toddler'
              ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
              : 'border-transparent bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Baby className="w-6 h-6 mr-2" />
          <div className="text-left">
            <div className="font-bold">Usia 3-5 Tahun</div>
            <div className="text-xs opacity-75">Balita & Prasekolah</div>
          </div>
        </button>

        <button
          onClick={() => loadInsight('kid')}
          className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 transition-all ${
            activeGroup === 'kid'
              ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
              : 'border-transparent bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <User className="w-6 h-6 mr-2" />
          <div className="text-left">
            <div className="font-bold">Usia 6-10 Tahun</div>
            <div className="text-xs opacity-75">Sekolah Dasar</div>
          </div>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        {loading ? (
           <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-400">
             <Brain className="w-12 h-12 animate-pulse" />
             <p>Mengumpulkan data psikologi anak...</p>
           </div>
        ) : content[activeGroup] ? (
          <article className="prose prose-indigo max-w-none prose-headings:text-indigo-900 prose-p:text-gray-700 prose-li:text-gray-700">
            <ReactMarkdown>{content[activeGroup]}</ReactMarkdown>
          </article>
        ) : (
          <div className="text-center text-gray-500 py-12">Pilih grup usia untuk melihat analisis.</div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
          <Palette className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900">Tips Warna</h4>
            <p className="text-sm text-blue-800">
              Gunakan warna cerah primer untuk balita, dan mulai kenalkan warna sekunder atau gradasi untuk anak yang lebih tua.
            </p>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg flex items-start space-x-3">
          <Brain className="w-5 h-5 text-purple-600 mt-1" />
          <div>
            <h4 className="font-semibold text-purple-900">Kompleksitas Desain</h4>
            <p className="text-sm text-purple-800">
              Balita menyukai bentuk sederhana dan wajah besar. Anak SD menyukai detail, teks slogan, dan karakter aksi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologyInsights;