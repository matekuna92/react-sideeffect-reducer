import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  // all components wrapped in AuthContext now has access to the isLoggedIn property in AuthContext.js
  // usage: when we need to use an object in multiple components in our app. For example check if User is logged in at shop, my account page, etc...
 // Provider requires a value property, which is the default value. It can now be changed through state.
 // when it changes, the new value is passed down to all consuming components! 

  // get isLoggedIn from state instead of hardCoding false value
  // Provider value will change every time when isLoggedinState changes, and the new context Object 
  // will be passed down to the listening components
	const ctx = useContext(AuthContext);

  return (
	<React.Fragment>
		<MainHeader />
			<main>
				{!ctx.isLoggedIn && <Login />}
				{ctx.isLoggedIn && <Home />}
			</main>
	</React.Fragment>
  );
}

export default App;
