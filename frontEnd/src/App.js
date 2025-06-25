import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminPage from './AdminPage';

import Login from './Login';
import DashBoard from './DashBoard';
import ItemMaster from './ItemMaster';

import UomMaster from './UomMaster';
import Inventory from './Transaction/Inventory';
import Consumption from './Transaction/Consumption';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="item-master" element={<ItemMaster />} />
          <Route path="uom-master" element={<UomMaster />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="consumption" element={<Consumption />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
