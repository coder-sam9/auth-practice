import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';
import {login,signUp} from '../../api/ApiCalls'
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const enteredEmail=useRef(null);
  const enteredPassword=useRef(null);
  const navigate=useNavigate()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const onLogin = async () => {
    if (enteredPassword.current.value.length < 6) {
        return alert("Enter a password with at least 6 characters");
    }
    
    setIsLoading(true);
    
    try {
        // Wait for the response
        const response = await login({
            email: enteredEmail.current.value,
            password: enteredPassword.current.value
        });

        console.log("Response from the login:", response);
        if(!response.success){
          alert(response.message);
          return;
        }
        // Store response as a string
        localStorage.setItem('user', JSON.stringify(response));
        navigate('/');

        window.location.reload()
    } catch (error) {
        console.error("Login failed:", error);
    }
    finally{

      setIsLoading(false);
    }
};

const onSignUp = async () => {
    if (enteredPassword.current.value.length < 6) {
        return alert("Enter a password with at least 6 characters");
    }

    setIsLoading(true);
    
    try {
        // Wait for the response
        const response = await signUp({
            email: enteredEmail.current.value,
            password: enteredPassword.current.value
        });

        console.log("Response from the signUp:", response);
        if(!response.success){
          alert(response.message);
          return;
        }
        // Store response as a string
        localStorage.setItem('user', JSON.stringify(response));
        navigate('/');

        window.location.reload();
    } catch (error) {
        console.error("Sign-up failed:", error);
    }
    finally{

      setIsLoading(false);
    }
};


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={enteredEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={enteredPassword}
          />
        </div>
        {!isLoading ?(<div className={classes.actions}>
          <button
            type='button'
            onClick={isLogin?onLogin:onSignUp}
          >
            {isLogin ? 'Login' : 'Sign up'}
          </button>
        </div>):(
          <p style={{color:'whitesmoke',marginTop:'50px'}}>Sending Request...</p>
        )}
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
