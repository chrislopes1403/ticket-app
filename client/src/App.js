import React from "react"
import {useState,useEffect} from "react"
import {
  BrowserRouter as Router, 
  Link,
  Route,
  Redirect
} from 'react-router-dom'
import './App.css';
import Login from './components/loginComponents/Login';
import addUser from './components/helperFunctions/addUser_func'
import authenticateUser from './components/helperFunctions/authenticate_func'
import authorizeUser from './components/helperFunctions/authorize_func'
import SpinnerPage from './components/loginComponents/SpinnerPage'
import Dashboard from './components/dashboardComponents/Dashboard'




function App() {
  const [auth,setAuth]= useState(false)
  const [loading,setLoading]= useState(true)

  useEffect(() => {
    console.log("handle auth...")
  handleAuthorize()
  },[]);
  

 const Logins=() => 
{
  useEffect(() => {
   },[]);
 
  const { from } =  { from: { pathname: '/dashboard' } }


      const handleLogin= async(u,p)=>
      {
        let isAuth=await authenticateUser(u,p);
        if(isAuth)
        {
          setAuth(true);
         // setRedirect(true);

        }
        else
        {
          setAuth(false);
         // setRedirect(false);
        }

      }
  
   
      if (auth === true) 
      {
       return <Redirect to={from} />
      }
      else
      {
      return  <Login handleLogin={handleLogin}/>
      }

  
}


const handleAuthorize= async(u,p)=>
{
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const { from } =  { from: { pathname: '/dashboard' } }
  const { from2 } =  { from2: { pathname: '/login' } }

  if(await authorizeUser())
  {
    await delay(1000);
    setAuth(true);
    setLoading(false);
    return <Redirect to={from} />
  }
  else
  {
    await delay(1000);
    setAuth(false);
    setLoading(false);
    return <Redirect to={from2} />

  }



}




const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={(props) => (
    auth === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

if(loading)
{
  return <SpinnerPage/>
}
else{
 
      return (
        <Router>    
                       
            <Route exact path="/login" component={Logins} />
            <PrivateRoute  exact path='/dashboard' component={Dashboard} />
            <Redirect exact from="/" to="login" component={Logins} />
        </Router>
      );
    }
}




export default App;
