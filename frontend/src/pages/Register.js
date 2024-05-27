import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const navigate = useNavigate();

  const handleRegister  = async (e) => {
    e.preventDefault();
    
    try {
      if( validatePassword(password) && password == cpassword ){
        const response = await axios.post('register', { name : name, email : email, password : password, phone : phone, userType : 'user'});
        if (response.status === 200) {
            navigate('/login');
        }
      }
      else{
        alert('Please check your password');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    console.log("testing",regex.test(password));
    return regex.test(password);
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
        <title>Tiny Dashboard - A Bootstrap Dashboard Template</title>
        
        <link
            href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
        />
        
        <div className="wrapper vh-100">
            <div className="row align-items-center h-100">
            <form className="col-lg-6 col-md-8 col-10 mx-auto">
                <div className="mx-auto text-center my-4">
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
                <h2 className="my-3">Register</h2>
                </div>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                    type="test"
                    className="form-control" 
                    id="name"
                    placeholder='Enter name'
                    autoFocus=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-control" 
                        placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone</label>
                    <input 
                        type="number" 
                        id="phone" 
                        className="form-control"
                        placeholder='Enter phone number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                </div>
                <hr className="my-4" />
                <div className="row mb-4">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="inputPassword5">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword5"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="inputPassword6">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword6"
                        placeholder='Enter confirm password'
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-md-6">
                    <p className="mb-2">Password requirements</p>
                    <p className="small text-muted mb-2">
                    {" "}
                    To create a new password, you have to meet all of the following
                    requirements:{" "}
                    </p>
                    <ul className="small text-muted pl-4 mb-0">
                    <li> Minimum 8 character </li>
                    <li>At least one special character</li>
                    <li>At least one number</li>
                    <li>Can’t be the same as a previous password </li>
                    </ul>
                </div>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleRegister}>
                Sign up
                </button>
                <p className="mt-5 mb-3 text-muted text-center">© 2020</p>
            </form>
            </div>
        </div>
        {/* Global site tag (gtag.js) - Google Analytics */}
        </>

  );
};

export default Register;



