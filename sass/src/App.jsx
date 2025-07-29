import React from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import { Footer } from './component/Footer';
import Room from './pages/Room';
import RoomDetails from './pages/RoomDetails';
import Layout from './pages/Layout';
import Hotelreq from './pages/Hotelreq';
import Dashboard from './HotelOwner/Dashboard';
import Listroom from './HotelOwner/Listroom';
import AddRoom from './HotelOwner/AddRoom';

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  const knownRoutes = ['/', '/room', '/room/:id']; // static only
  const isOwner = pathname.startsWith('/owner');

  // function to check if current path matches any known path (ignoring dynamic ID)
  const isKnownRoute = () => {
    if (pathname === '/' || pathname === '/room') return true;
    if (pathname.startsWith('/room/')) return true;
    if (pathname.startsWith('/owner')) return true;
    return false;
  };

  return (
    <div>

      {!isOwner && isKnownRoute() && <Navbar />}
      {!isOwner && isKnownRoute() &&      <Hotelreq/>}


      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room' element={<Room />} />
   
        <Route path='/room/:id' element={<RoomDetails />} />
        <Route path='/owner' element={<Layout />}>
          <Route path='' element={<Dashboard/>} />
          <Route path='listroom' element={<Listroom/>} />
          <Route path='addroom' element={<AddRoom/>} />
        </Route>
        <Route path='*' element={<h1>not found</h1>} />
      </Routes>

      {!isOwner && isKnownRoute() && <Footer />}
    </div>
  );
}

export default App;
