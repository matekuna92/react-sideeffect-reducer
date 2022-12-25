import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  // function is executed after every component re-evaluation,
  // it runs when the dependencies changed in the useEffect dependency array
  // dependencies change on first run (when app loads), but since they dont change after (array is empty),
  // this useEffect function only run once here
  useEffect(() => {
      const isUserLoggedIn = localStorage.getItem('isLoggedIn');

      if(isUserLoggedIn === '1') {
        setIsLoggedIn(true);
      }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // all components wrapped in AuthContext now has access to the isLoggedIn property in AuthContext.js
  // usage: when we need to use an object in multiple components in our app. For example check if User is logged in at shop, my account page, etc...
 // Provider requires a value property, which is the default value. It can now be changed through state.
 // when it changes, the new value is passed down to all consuming components! 
  return (
		<AuthContext.Provider value={{isLoggedIn: false}}>
      		<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
      	</AuthContext.Provider>
  );
}

export default App;
