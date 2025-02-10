const apiKey='?key=AIzaSyD-uI-eMLHi5SwjimfEymOO5b_8lh2Y7Mk';
const baseUrl=`https://identitytoolkit.googleapis.com/v1/accounts:`
const login = async (item) => {
    try {
      item.returnSecureToken = true;
      console.log("Data in login call:", item);
  
      let response = await fetch(baseUrl + "signInWithPassword" + apiKey, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(item),
      });
  
      let jsonResponse = await response.json(); // Parse response JSON
  
      if (!response.ok) {
        throw new Error(jsonResponse.error?.message || "Invalid credentials");
      }
  
      console.log("Login response:", jsonResponse);
      return {success:true,response:jsonResponse};
    } catch (error) {
      console.error("Login error:", error.message);
      return { success: false, message: error.message };
    }
  };
  
  const signUp = async (item) => {
    try {
      let response = await fetch(baseUrl + "signUp" + apiKey, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...item, returnSecureToken: true }),
      });
  
      let jsonResponse = await response.json(); // Parse response JSON
  
      if (!response.ok) {
        throw new Error(jsonResponse.error?.message || "Email already exists");
      }
  
      console.log("Signup response:", jsonResponse);
      return {success:true,response:jsonResponse};
    } catch (error) {
      console.error("Signup error:", error.message);
      return { success: false, message: error.message };
    }
  };
  
  const updatePassword = async (item) => {
    try {
      console.log("Password update request:", item);
  
      let response = await fetch(baseUrl + "update" + apiKey, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...item, returnSecureToken: true }),
      });
  
      let jsonResponse = await response.json(); // Parse response JSON
  
      if (!response.ok) {
        throw new Error(jsonResponse.error?.message || "Token expired, login again");
      }
  
      console.log("Password update response:", jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error("Password update error:", error.message);
      return { success: false, message: error.message };
    }
  };
  
    export { login,signUp,updatePassword};
