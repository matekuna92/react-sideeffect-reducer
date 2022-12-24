import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT')
  return { value: action.val, isValid: action.val.includes('@') };

if(action.type === 'INPUT_BLUR')
  return { value: state.value, isValid: state.value.includes('@') };

// for any other action which reaches this reducer: return the default state
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
	if(action.type === 'USER_INPUT_PASSWORD') {
		return { value: action.val, isValid: action.val.trim().length > 6 }
	}

	if(action.type === 'INPUT_BLUR')
  		return { value: state.value, isValid: state.value.trim().length > 6 };

	return { value: '', isValid: false };
};

const Login = (props) => {
  /* const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
 // const [enteredPassword, setEnteredPassword] = useState('');
 // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

	// managing the 2 state (enteredEmail, emailIsValid) in one place with reducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false});

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

   useEffect(() => {
      const identifier = setTimeout(() => {
          console.log('using form validation useEffect');
		  // this code now only run once, not on every keystroke
          setFormIsValid(emailIsValid && passwordIsValid);   	
      }, 500);

      return () => {
          console.log('CLEANUP');
		clearTimeout(identifier);			// clearing the timer that was set before this cleanup function ran, 
		// so when the next useEffect function runs we can set a new timer
      };  
  }, [emailIsValid, passwordIsValid]);
    

  const emailChangeHandler = (event) => {
   // setEnteredEmail(event.target.value);
   dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    /* setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    ); */
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT_PASSWORD', val: event.target.value});

    /* setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    ); */
  };

  const validateEmailHandler = () => {
   // setEmailIsValid(emailState.isValid);
   dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
