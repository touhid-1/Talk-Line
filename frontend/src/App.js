import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navigation from './components/shared/Navigation/Navigation';
import Activate from './pages/Activate';
import Authenticate from './pages/Authenticate';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Loader from './components/shared/Loader';

import { useSelector } from 'react-redux';
import useLoadingWithRefresh from './hooks/useLoadingWithRefresh';
import Room from './pages/Room';
import Profile from './pages/Profile';

const App = () => {

  const { loading } = useLoadingWithRefresh();

  console.log({loading})

  return loading ? (
    <Loader message="Loading please wait..." />
  ) : (
    <Router>
      <Navigation />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<Home />} path="/" exact />
        </Route>
        <Route element={<GuestRoute />}>
          <Route element={<Authenticate />} path="/authenticate" />
        </Route>
        <Route element={<SemiProtectedRoute />}>
          <Route element={<Activate />} path="/activate" />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route element={<Rooms />} path="/rooms" />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route element={<Room />} path="/room/:id" />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>
    </Router>
  )
}


const GuestRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    isAuth ? (
      <Navigate
        to='/rooms'
      />
    ) : (
      <Outlet />
    )
  );
};

const SemiProtectedRoute = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    !isAuth ? (
      <Navigate
        to='/'
      />
    ) : isAuth && !user.activated ? (
      <Outlet />
    ) : (
      <Navigate
        to='/rooms'
      />
    )
  );
};

const ProtectedRoute = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    !isAuth ? (
      <Navigate
        to='/'
      />
    ) : isAuth && !user.activated ? (
      <Navigate
        to='/activate'
      />
    ) : (
      <Outlet />
    )
  );
};


export default App;
