import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Dashboard from './admin/dashboard/Dashboard';
import Hotels from "./admin/hotels/Hotels";
import Rooms from "./admin/rooms/Rooms";
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
          <Route path="rooms" element={<Rooms />} />
          <Route path="party_hall" element={<Rooms />} />
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
