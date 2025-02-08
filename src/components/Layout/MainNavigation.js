import { Link,useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const hasToken = localStorage.getItem('user');
  // const user = hasToken ? JSON.parse(hasToken) : null; 
  const navigate=useNavigate()

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!hasToken && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {hasToken && (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={() => { 
                  localStorage.removeItem('user'); 
                 navigate('/');
                 window.location.reload()
                }}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
