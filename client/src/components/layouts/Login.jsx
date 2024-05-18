import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:8001/login", { email, password });
        const {token}=response.data
        Cookies.set('token',token, { expires: 7 });
        navigate('/');
      } else {
        const response = await axios.post("http://localhost:8001/register", { name, email, password });
        const {token}=response.data
        Cookies.set('token',token, { expires: 7 });
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); 
  };

  return (
    <div className="loginform bg-primary">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <p className="text">{error}</p>}
        {!isLogin && (
          <div>
            <label htmlFor="inputName" className="form-label mt-4">Name</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>          <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div>
          <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          <button type="button" className="btn btn-secondary my-2 my-sm-0 ms-2" onClick={toggleForm}>
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
      </div>
    </div>
  );
};

export default Login;
