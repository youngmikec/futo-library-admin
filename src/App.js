import Home from './Pages/Home';
import Signin from './Pages/Signin'
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/Allbooks';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext.js"
import Header from './Components/Header';

function App() {

  const { user } = useContext(AuthContext)
  console.log(user)

  return (
    <Router>
      
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signin'>
            {user ? (user.payload?.user?.userType === 'ADMIN' ? <Redirect to='/dashboard@admin' />:<Redirect to='/dashboard@member' />) : <Signin />}
          </Route>
          <Route exact path='/dashboard@member'>
            {user ? (user.payload?.user?.userType === 'STUDENT' === false ? <MemberDashboard /> : <Redirect to='/' />) : <Redirect to='/' />}
            {/* <MemberDashboard /> */}
          </Route>
          {/* <Route exact path='/dashboard@admin'>
            {user ? (user.isAdmin === true ? <AdminDashboard /> : <Redirect to='/' />) : <Redirect to='/' />}
          </Route> */}
          <Route exact path='/dashboard@admin'>
            {user ? (user.payload?.user?.userType === 'ADMIN' ? <AdminDashboard/>:<MemberDashboard />) : <Redirect to='/' />}
          </Route>
          <Route exact path='/books'>
            <Header />
            <Allbooks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;