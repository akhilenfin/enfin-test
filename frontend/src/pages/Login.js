import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('login', { email : username, password : password });
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <link rel="icon" href="favicon.ico" />
      <title>Login to Movie Manager</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      
      <div className="wrapper vh-100">
        <div className="row align-items-center h-100">
          <form className="col-lg-3 col-md-4 col-10 mx-auto text-center">
            <a
              className="navbar-brand mx-auto mt-2 flex-fill text-center"
              href="./index.html"
            >
              <svg
                version="1.1"
                id="logo"
                className="navbar-brand-img brand-md"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 120 120"
                xmlSpace="preserve"
              >
                <g>
                  <polygon className="st0" points="78,105 15,105 24,87 87,87 	" />
                  <polygon className="st0" points="96,69 33,69 42,51 105,51 	" />
                  <polygon className="st0" points="78,33 15,33 24,15 87,15 	" />
                </g>
              </svg>
            </a>

            
            <h1 className="h6 mb-3">Sign in</h1>
            <div id="error-message"></div>
            <div className="form-group">
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="inputEmail"
                className="form-control form-control-lg"
                placeholder="Email address"
                required="required"
                autoFocus=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="inputPassword"
                className="form-control form-control-lg"
                placeholder="Password"
                required="required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="checkbox mb-3">
              <label>
                <input type="checkbox" defaultValue="remember-me" /> Stay logged in{" "}
              </label>
            </div> */}
            <button className="btn btn-lg btn-primary btn-block" onClick={handleLogin} >
              Let me in
            </button>
            <p className="mt-5 mb-3 text-muted"><a href='/register'>Create a Account</a></p>
            <p className="mt-5 mb-3 text-muted">© 2020</p>
          </form>
        </div>
      </div>
      {/* Global site tag (gtag.js) - Google Analytics */}
    </>
  );
};

export default Login;



