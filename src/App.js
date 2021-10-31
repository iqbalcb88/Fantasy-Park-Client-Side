import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home from './components/Home/Home/Home';
import Login from './components/Home/Login/Login';
import PrivateRoute from './components/Home/Login/PrivateRoute/PrivateRoute';
import Events from './components/Home/Events/Events';
import Header from './components/Shared/Header/Header';
import EventDetails from './components/Home/Events/EventDetails/EventDetails';
import OrderReview from './components/Home/OrderReview/OrderReview';
import MyOrder from './components/Home/MyOrder/MyOrder';
import AllOrders from './components/Home/Home/AllOrders/AllOrders';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/myOrder'>
            <MyOrder />
          </Route>
          <Route path='/allOrders'>
            <AllOrders />
          </Route>
          <Route path='/review'>
            <OrderReview></OrderReview>
          </Route>
          <Route path='/events'>
            <Events />
          </Route>
          <PrivateRoute path='/details/:eventId'>
            <EventDetails />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
