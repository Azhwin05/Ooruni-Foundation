import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from '../api';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
            <div className="bg-admin-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-admin-primary">
                <Lock size={32} />
            </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500">Ooruni Foundation CMS</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
          />
          <button
            disabled={loading}
            onClick={handleClick}
            className="w-full bg-admin-primary text-white py-3 rounded-lg font-bold hover:bg-admin-secondary transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          {error && <span className="text-red-500 text-sm block text-center mt-2">{error.message || "Invalid credentials"}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
