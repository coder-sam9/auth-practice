import { useRef } from 'react';
import classes from './ProfileForm.module.css';
import { updatePassword } from '../../api/ApiCalls';

const ProfileForm = () => {
  const newPassword = useRef(null);

  const onChangePassword = async (event) => {
    event.preventDefault();

    try {
      // Parse user object from localStorage
      const user = JSON.parse(localStorage.getItem('user')); 

      if (!user || !user.idToken) {
          console.error("No valid user or ID token found!");
          return;
      }

      // ✅ Ensure API call is awaited properly
      const response = await updatePassword({
          password: newPassword.current.value,
          idToken: user.idToken
      });

      console.log("Password update response:", response);

      // ✅ Ensure response is valid before storing
      if (response && response.idToken) {
          localStorage.setItem('user', JSON.stringify(response));
      } else {
          console.error("Invalid response received:", response);
      }

    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  const onFicuspass=()=>{
    
    const user = JSON.parse(localStorage.getItem('user')); 
    console.log('the user is',user)
  }

  return (
    <form className={classes.form} onSubmit={onChangePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassword} onFocus={onFicuspass}/>
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
