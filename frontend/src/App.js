
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import MainNavigation from './shared/component/navigation/MainNavigation';
import LoadingSpinner from './shared/component/UIElement/LoadingSpinner';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const User = React.lazy(() => import('./user/pages/user'));
const NewPlace = React.lazy(() => import('./place/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./place/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./place/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));


const App = () => {
  const {
    token,
    login,
    logout,
    userId
  } = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
        <Route exact path="/" element={<User />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/place/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/" element={<Navigate replace to="/" />} />
      </>
    )
  }
  else {
    routes = (
      <>
        <Route exact path="/" element={<User />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate replace to="/" />} />
      </>
    )
  }


  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }
      }
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense fallback={<div className='center'><LoadingSpinner /></div>}>
            <Routes>
              {routes}
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider >
  );
}

export default App;
