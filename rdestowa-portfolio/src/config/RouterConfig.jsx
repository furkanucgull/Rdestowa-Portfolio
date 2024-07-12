import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CurrentRdestowians from '../pages/CurrentRdestowians';
import ExRdestowians from '../pages/ExRdestowians';

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/current-rdestowians" element={<CurrentRdestowians />} />
      <Route path="/ex-rdestowians" element={<ExRdestowians />} />
    </Routes>
  );
}

export default RouterConfig;
