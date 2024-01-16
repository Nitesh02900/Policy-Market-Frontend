import React, { useState } from 'react';
import './Login.css';
import { authslogin } from '../../Service/Authentication';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterModel from '../FrontPage/Modal/RegisterModel';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const showToast = (message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const toggleRegistrationModal = () => {
    setShowRegistrationModal(!showRegistrationModal);
  };

  const UserLogin = async () => {
    try {
      if (!userName || !password) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters long.', 'error');
        return;
      }

      let response = await authslogin(userName, password);

      if (response.data) {
        if (response.data.roles[0].rolename === 'ROLE_ADMIN') {
          localStorage.setItem('authentication', response.headers['bearer-token']);
          navigate('/adminDashboard');
        } else if (response.data.roles[0].rolename === 'ROLE_CUSTOMER') {
          localStorage.setItem('authentication', response.headers['bearer-token']);
          navigate('customerDashboard');
        } else if (response.data.roles[0].rolename === 'ROLE_EMPLOYEE') {
          localStorage.setItem('authentication', response.headers['bearer-token']);
          navigate('/employeeDashboard');
        } else if (response.data.roles[0].rolename === 'ROLE_AGENT') {
          localStorage.setItem('authentication', response.headers['bearer-token']);
          navigate('/agentDashboard');
        }

        showToast('Login successful!', 'success');
      }

      setUserName('');
      setPassword('');
    } catch (error) {
      console.log(error);
      showToast('Wrong Username Or Password', 'error');
    }
  };

  return (
    <>
      <div className="l-container">
        <div className="left-element">
          <img
            style={{ height: '55vh', width: '50vh' }}
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Phone image"
          />
        </div>

        <div className="right-element">
          <div className="box">
            <div className='login-tittle'>
              <h1 className="heading">Login </h1>
            </div>
            <div className='login-form'>
              <form className="postdata">
                <div className="form-group">
                  <label htmlFor="userName"> User Name</label>
                  <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password"> Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="c-button">
                  <button type="button" className="btn btn-primary n-button" onClick={UserLogin}>
                    Submit
                  </button>
                </div>
                <div className="n-container">
                  <h1 className="wrap">New user ?</h1>
                  <button className="btn btn-primary login-button" onClick={toggleRegistrationModal}>
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {showRegistrationModal && <RegisterModel showRegistrationModal={showRegistrationModal} toggleRegistrationModal={toggleRegistrationModal} />}
    </>
  );
};         
export default Login;