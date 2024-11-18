import { Link, useNavigate } from "react-router-dom";
import "./Authentication.css";
import React from "react";
import { useUser } from "../context/useUser";

// Authentication modes (Login/signup)
export const AuthenticationMode = Object.freeze({
  Login: "Login",
  Register: "Register",
});

export default function Authentication({ authenticationMode }) {
  // Accessing user context and functions
  const { user, setUser, signUp, logIn } = useUser();
  const navigate = useNavigate();

  // Function for the submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authenticationMode === AuthenticationMode.Register) {
        await signUp();
        navigate("/logIn"); // Redirect to login page after successful registration
      } else {
        await logIn(); // Handle user login
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      // Handle any errors, display an error message
      const message =
        error.response && error.response.data ? error.response.data.error : error;
      alert(message);
    }
  };
  return (
    <div id="auth-container">
      <h3>{authenticationMode === AuthenticationMode.Login ? "Login" : "Sign up"}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label className="password-info">{authenticationMode === AuthenticationMode.Login ? "" : "Password must be at least 8 characters"}</label>
        </div>
        <div>
          <button>
            {authenticationMode === AuthenticationMode.Login ? "Login" : "Submit"}
          </button>
        </div>
        <div>
          <Link
            to={authenticationMode === AuthenticationMode.Login ? "/signup" : "/login"}
          >
            {authenticationMode === AuthenticationMode.Login
              ? "No account? Sign up"
              : "Already signed up? Sign in"}
          </Link>
        </div>
      </form>
    </div>
  );
}
