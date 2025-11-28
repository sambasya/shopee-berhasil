import { GoogleGenAI } from "@google/genai";
import { TrendData, CalendarEvent, DesignPrediction } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelName = 'gemini-2.5-flash';

// Helper to extract JSON from response if wrapped in markdown
const extractJson = (text: string | undefined) => {
  if (!text) return null;
  try {
    // Use flexible regex for code blocks, handling optional 'json' tag and whitespace
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    // Attempt to parse the whole text if no code blocks found
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON", e);
    return null;
  }
};

export const fetchMarketAnalysis = async (): Promise<TrendData> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    Bertindaklah sebagai analis tren e-commerce ahli khusus untuk pasar Indonesia (Shopee).
    Lakukan riset online menggunakan Google Search untuk menemukan tren terkini kaos anak KHUSUS di Shopee Indonesia (shopee.co.id).
    
    Fokus riset kamu:
    1. Identifikasi karakter, motif, atau tema gambar yang mendominasi kategori 'Kaos Anak' di Shopee Indonesia (lihat produk terlaris/terpopuler).
    2. Cari tahu kata kunci pencarian yang sedang naik daun di Shopee terkait fashion anak.
    3. Analisis gaya desain dari toko-toko 'Star Seller' atau 'Shopee Mall' untuk kategori anak.

    Berikan output dalam format JSON saja sebagai berikut (tanpa Markdown):
    {
      "category": "Shopee Trends Indonesia",
      "insights": ["insight 1 (berbasis data Shopee)", "insight 2", "insight 3", "insight 4", "insight 5"],
      "keywords": ["keyword shopee 1", "keyword shopee 2", "keyword shopee 3", "keyword shopee 4", "keyword shopee 5"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const data = extractJson(response.text);
    if (!data) {
      throw new Error("Failed to parse JSON from response");
    }

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
      title: c.web?.title || 'Source',
      uri: c.web?.uri || '#'
    })) || [];

    return { ...data, sources };
  } catch (error) {
    console.error("Error fetching market analysis:", error);
    throw error;
  }
};

export const fetchCalendarEvents = async (): Promise<{ events: CalendarEvent[], sources: any[] }> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    Cari informasi mengenai jadwal rilis film anak-anak (bioskop & streaming), update video game populer (seperti Roblox, Minecraft, Mobile Legends), dan kalender liburan di Indonesia untuk 3-6 bulan ke depan.
    
    Identifikasi event yang berpotensi mempengaruhi pencarian produk di Shopee Indonesia.
    
    Berikan output JSON array (tanpa Markdown):
    [
      {
        "title": "Nama Event/Film/Liburan",
        "date": "Bulan/Tanggal perkiraan",
        "type": "Movie" | "Holiday" | "Game" | "Social",
        "impact": "High" | "Medium" | "Low",
        "description": "Penjelasan singkat pengaruhnya terhadap penjualan kaos"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const events = extractJson(response.text) || [];
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
      title: c.web?.title || 'Source',
      uri: c.web?.uri || '#'
    })) || [];

    return { events, sources };
  } catch (error) {
    console.error("Error fetching calendar:", error);
    throw error;
  }
};

export const fetchPsychologyInsights = async (ageGroup: 'toddler' | 'kid'): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");
  
  const groupName = ageGroup === 'toddler' ? '3-5 tahun' : '6-10 tahun';

  const prompt = `
    Berikan analisis mendalam tentang psikologi warna dan preferensi gambar untuk anak usia ${groupName} di Indonesia.
    Jelaskan apa yang menarik perhatian mereka dan apa yang disukai orang tua mereka saat membeli kaos di marketplace seperti Shopee.
    Gunakan format Markdown yang rapi. Jangan gunakan JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text || "Maaf, tidak dapat mengambil insight saat ini.";
  } catch (error) {
    console.error("Error fetching psychology:", error);
    throw error;
  }
};

export const generateMonthlyPredictions = async (month: number, year: number, customContext?: string): Promise<DesignPrediction[]> => {
  if (!apiKey) throw new Error("API Key missing");

  const monthName = new Date(year, month - 1).toLocaleString('id-ID', { month: 'long' });
  
  const prompt = `
    Bertindaklah sebagai Konsultan Fashion Anak Expert spesialis marketplace Shopee Indonesia.
    User ingin merencanakan produksi kaos anak untuk periode penjualan: ${monthName} ${year}.
    
    ${customContext ? `CATATAN PENTING DARI USER: "${customContext}". Anda WAJIB meriset topik ini secara mendalam dan memasukkannya sebagai salah satu prediksi utama jika relevan.` : ''}

    Langkah kerja kamu:
    1.  Gunakan Google Search untuk mencari event spesifik, hari raya, rilis film kartun/animasi (termasuk film lokal Indonesia seperti 'Jumbo' jika relevan), atau tren game yang akan populer di Indonesia pada ${monthName} ${year}.
    2.  Lakukan riset spesifik mengenai tren pencarian dan produk terlaris kategori 'Pakaian Anak' di Shopee Indonesia. Cari tahu karakter atau gaya visual apa yang mendominasi halaman pencarian Shopee.
    3.  Analisis cuaca/musim di Indonesia pada bulan tersebut (misal: musim hujan butuh bahan apa, atau musim liburan sekolah).
    
    Berdasarkan riset di atas (terutama data Shopee dan catatan user), berikan 3-4 rekomendasi tema desain kaos yang diprediksi akan menjadi 'Star Seller' atau 'Winning Product' di Shopee Indonesia.
    
    Berikan output format JSON Array murni (tanpa Markdown):
    [
      {
        "themeName": "Nama Tema (misal: 'Edisi Film Jumbo' atau 'Robot Galaxy')",
        "targetAgeGroup": "3-5 Tahun atau 6-10 Tahun",
        "colorPalette": ["Warna1", "Warna2", "Warna3"],
        "visualElements": ["Elemen visual 1", "Elemen visual 2", "Style gambar"],
        "reasoning": "Jelaskan data Shopee Indonesia atau Event apa yang mendasari prediksi ini untuk ${monthName} ${year}.",
        "estimatedDemand": 90 (angka 0-100)
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Strong reasoning model with search
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    return extractJson(response.text) || [];
  } catch (error) {
    console.error("Error generating predictions:", error);
    throw error;
  }
};

export const generatePredictions = async (context: string): Promise<DesignPrediction[]> => {
  // Redirect to generic logic if needed, but UI now prefers generateMonthlyPredictions
  return []; 
};