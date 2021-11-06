import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './Footer';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { EventFieldsProvider } from "./shared/context/event-fields-context";
import { useAuth } from './shared/hooks/auth-hook';

const Events = React.lazy(() => import('./events/pages/Events'));
const User = React.lazy(() => import('./user/pages/User'));
const NewEvent = React.lazy(() => import('./events/pages/NewEvent'));
const UserEvents = React.lazy(() => import('./events/pages/UserEvents'));
const UpdateEvent = React.lazy(() => import('./events/pages/UpdateEvent'));
const UpdateUser = React.lazy(() => import('./user/pages/UpdateUser'));
const SpecificEvent = React.lazy(() => import('./events/pages/SpecificEvent'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
const CityEvents = React.lazy(() => import('./events/pages/CityEvents'));
const PrefectureEvents = React.lazy(() => import('./events/pages/PrefectureEvents'));
const CategoryEvents = React.lazy(() => import('./events/pages/CategoryEvents'));
const Filters = React.lazy(() => import('./events/pages/Filters'));
const Reset = React.lazy(() => import('./user/pages/Reset'));
const NewPassword = React.lazy(() => import('./user/pages/NewPassword'));
const StartDateEvents = React.lazy(() => import('./events/pages/StartDateEvents'));
const CityAndStartDateEvents = React.lazy(() => import('./events/pages/CityAndStartDateEvents'));
const PrefectureAndStartDateEvents = React.lazy(() => import('./events/pages/PrefectureAndStartDateEvents'));
const CategoryAndStartDateEvents = React.lazy(() => import('./events/pages/CategoryAndStartDateEvents'));


const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact> <Events/> </Route>
        <Route path="/search" exact> <Filters/> </Route>
        <Route path="/profile/:userId" exact> <User/> </Route>
        <Route path="/user/:userId" exact> <UserEvents/> </Route>        
        <Route path="/specific/:eventId" exact> <SpecificEvent/> </Route>
        <Route path="/update/:userId" exact> <UpdateUser/> </Route>
        <Route path="/events/new" exact> <NewEvent/> </Route>
        <Route path="/edit/:eventId" exact> <UpdateEvent/> </Route>
        <Route path="/city/:cityId" exact> <CityEvents/> </Route>  
        <Route path="/prefecture/:prefectureId" exact> <PrefectureEvents/> </Route> 
        <Route path="/category/:categoryId" exact> <CategoryEvents/> </Route>
        <Route path="/startdate/:date" exact > <StartDateEvents/> </Route> 
        <Route path="/dateofcity/:date/:cityId" exact > <CityAndStartDateEvents/> </Route> 
        <Route path="/dateofprefecture/:date/:prefectureId" exact > <PrefectureAndStartDateEvents/> </Route>
        <Route path="/dateofcategory/:date/:categoryId" exact > <CategoryAndStartDateEvents/> </Route>         
        <Redirect to="/"/> 
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact> <Events/> </Route>
        <Route path="/auth" exact> <Auth/> </Route>
        <Route path="/search" exact> <Filters/> </Route>
        <Route path="/specific/:eventId" exact> <SpecificEvent/> </Route>
        <Route path="/prefecture/:prefectureId" exact> <PrefectureEvents/> </Route> 
        <Route path="/category/:categoryId" exact> <CategoryEvents/> </Route>  
        <Route path="/event/:eventId" exact> <SpecificEvent/> </Route>
        <Route path="/reset" exact> <Reset/> </Route>
        <Route path="/reset/:token" exact> <NewPassword/> </Route>
        <Route path="/city/:cityId" exact> <CityEvents/> </Route>
        <Route path="/startdate/:date" exact > <StartDateEvents/> </Route>
        <Route path="/dateofcity/:date/:cityId" exact > <CityAndStartDateEvents/> </Route>
        <Route path="/dateofprefecture/:date/:prefectureId" exact > <PrefectureAndStartDateEvents/> </Route> 
        <Route path="/dateofcategory/:date/:categoryId" exact > <CategoryAndStartDateEvents/> </Route>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return ( 
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token, 
      userId: userId, 
      login: login, 
      logout: logout
    }}>
      <EventFieldsProvider>
      <Router>
        <MainNavigation/>
          <main> 
            <Suspense 
              fallback={
                <div className="center"> 
                  <LoadingSpinner/> 
                </div>
              }>
                {routes}
            </Suspense>
          </main>
          <footer>
            <Footer/>
          </footer>
      </Router>
      </EventFieldsProvider>
    </AuthContext.Provider>
  );
};

export default App;