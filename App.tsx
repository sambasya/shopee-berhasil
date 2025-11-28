import React, { useState } from 'react';
import { AppTab } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MarketTrends from './components/MarketTrends';
import EventCalendar from './components/EventCalendar';
import PsychologyInsights from './components/PsychologyInsights';
import PredictionGenerator from './components/PredictionGenerator';

const App: React.FC = () => {
  // Set default tab to PREDICTOR for instant access
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.PREDICTOR);

  const renderContent = () => {
    switch (currentTab) {
      case AppTab.DASHBOARD:
        return <Dashboard setTab={setCurrentTab} />;
      case AppTab.MARKET_TRENDS:
        return <MarketTrends />;
      case AppTab.CALENDAR:
        return <EventCalendar />;
      case AppTab.PSYCHOLOGY:
        return <PsychologyInsights />;
      case AppTab.PREDICTOR:
        return <PredictionGenerator />;
      default:
        return <PredictionGenerator />;
    }
  };

  return (
    <Layout currentTab={currentTab} setTab={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
