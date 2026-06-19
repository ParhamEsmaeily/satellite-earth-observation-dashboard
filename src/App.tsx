import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './pages/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="regions" element={<div className="text-white p-4">Regions coming soon</div>} />
          <Route path="imagery" element={<div className="text-white p-4">Imagery coming soon</div>} />
          <Route path="alerts" element={<div className="text-white p-4">Alerts coming soon</div>} />
          <Route path="compare" element={<div className="text-white p-4">Compare coming soon</div>} />
          <Route path="settings" element={<div className="text-white p-4">Settings coming soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
