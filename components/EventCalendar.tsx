import React, { useState, useEffect } from 'react';
import { Calendar, Film, Gamepad2, Plane, Star, RefreshCw } from 'lucide-react';
import { fetchCalendarEvents } from '../services/geminiService';
import { CalendarEvent } from '../types';

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const { events: fetchedEvents } = await fetchCalendarEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only load if explicitly requested or initial logic (optional)
    if(events.length === 0) loadEvents();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Movie': return <Film className="w-5 h-5 text-pink-500" />;
      case 'Game': return <Gamepad2 className="w-5 h-5 text-purple-500" />;
      case 'Holiday': return <Plane className="w-5 h-5 text-green-500" />;
      default: return <Star className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
       <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Kalender Event & Pop Culture</h2>
          <p className="text-gray-600 mt-2">
            Jadwal rilis film, game, dan hari libur yang akan mempengaruhi permintaan kaos.
          </p>
        </div>
        <button 
          onClick={loadEvents} 
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </header>

      {loading && events.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {getIcon(event.type)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {event.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{event.type}</span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">{event.description}</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex-shrink-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getImpactColor(event.impact)}`}>
                  Impact: {event.impact}
                </span>
              </div>
            </div>
          ))}

          {events.length === 0 && !loading && (
             <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
               <p className="text-gray-500">Data belum dimuat. Klik refresh untuk mengambil data terbaru.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCalendar;