import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';
import {login,signUp} from '../../api/ApiCalls'
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail,setEnteredEmail]=useState('');
  const [enteredPassword,setEnteredPassword]=useState('');
  const navigate=useNavigate()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const onLogin = async () => {
    if (enteredPassword.length < 6) {
        return alert("Enter a password with at least 6 characters");
    }
    
    setIsLoading(true);
    
    try {
        // Wait for the response
        const response = await login({
            email: enteredEmail,
            password: enteredPassword
        });

        console.log("Response from the login:", response.response);
        if(!response.success){
          alert(response.message);
          return;
        }
        // Store response as a string
        localStorage.setItem('user', JSON.stringify(response.response));
        const currentTime = new Date().getTime();
        localStorage.setItem('loginTime', currentTime);
        setEnteredEmail('');
        setEnteredPassword('')
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
    if (enteredPassword.length < 6) {
        return alert("Enter a password with at least 6 characters");
    }

    setIsLoading(true);
    
    try {
        // Wait for the response
        const response = await signUp({
            email: enteredEmail,
            password: enteredPassword
        });

        console.log("Response from the signUp:", response);
        if(!response.success){
          alert(response.message);
          return;
        }
        // Store response as a string
        localStorage.setItem('user', JSON.stringify(response));
        const currentTime = new Date().getTime();
        localStorage.setItem('loginTime', currentTime);
        setEnteredEmail('');
        setEnteredPassword('');
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
          <input type='email' id='email' required value={enteredEmail} autoComplete='off' onChange={(e)=>setEnteredEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            value={enteredPassword} autoComplete='off' onChange={(e)=>setEnteredPassword(e.target.value)}
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
