import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Dashboard from './admin/dashboard/Dashboard';
import Hotels from "./admin/hotels/Hotels";
import Party from "./admin/partyHalls/party";
import UsersTable from "./admin/users/UsersTable";
import './app.scss';
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';


function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-right" />
      <Routes>
        <Route path="admin/dashboard" element={<Dashboard />}>
          <Route path="users" element={<UsersTable />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="party_hall" element={<Party />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
