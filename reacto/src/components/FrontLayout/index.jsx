import React, { createRef, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Category from "../categories/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/app.css";
import Auth from './auth.jsx';
import LoginForm from "../FrontLayout/forms/login.jsx";
import RegisterForm from "../FrontLayout/forms/register.jsx";
import { closeModal } from '../../utils/fonctions.jsx'
import axiosClient from '../../axios/axiosClient.js';
import { useAuthStateContext } from '../../contexts/AuthContextProvider.jsx';
import ToastMessage from './forms/toasts/ToastMessage.jsx';
export default function index() {

  const { token, user, setToken, setUser, notification, setNotification } = useAuthStateContext();
const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data);
        })
    }
  }, []);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState('');
  const nameRef = createRef('');
  const emailRef = createRef('');
  const passwordRef = createRef('');
  const rememberRef = createRef('');
  const passwordConfirmationRef = createRef('');


  const login = (e) => {
    e.preventDefault();
    setLoader(true);
    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      remember: rememberRef.current.checked,
    };

    axiosClient.post('/login')
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {

      })
  }
  const register = (e) => {
    e.preventDefault();
    setLoader(true);
    setErrors('')
    const registerData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient.post('/register', registerData)
      .then(({ data }) => {
        setLoader(false);
        setErrors('')
        setToken(data.token);
        setUser(data.user);
        setNotification(`Bienvenue ${data.user.name}`);
        window.location.reload();
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setLoader(false);
          setErrors(response.data.errors);
          // console.log(response.data.errors.email[0]);
        }
      })
  }

  const logout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout', user)
      .then(() => {
        setToken('');
        setUser('');
        setNotification(`Vous vous êtes deconnecté(e)`);
        // window.location.reload();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      <div className="container">
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <Link className="link-secondary" to="https://github.com/DialloDBA"target='__blank'>@DIALLODBA</Link>
            </div>
            <div className="col-4 text-center">
              <Link className="blog-header-logo text-dark" href="/">Laravel React</Link>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">

              {(!token || !user.id) && (<button type="button" id='handleAuthModal' className="btn btn-sm btn-outline-secondary mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdropAuth">
                Login/signup
              </button>)}
              {
                (token && user.id) ? <Auth user={user} logoutUser={logout} /> : ''
              }
            </div>
          </div>
        </header>

        <Category />
      </div>
      <main className="container">
        {/* <ToastMessage /> */}
        <Outlet />
        <div className="modal fade" id="staticBackdropAuth" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropAuthLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropAuthLabel">Login/signup</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={(e) => closeModal(e, setLoader(false))}></button>
              </div>
              <div className="modal-body float-center">
                <>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Login
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Register
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      {
                        (token && user.id) ? <Auth user={user} logoutUser={logout} /> : ''
                      }
                      <LoginForm errors={errors} emailRef={emailRef} passwordRef={passwordRef} rememberRef={rememberRef} showLoader={loader} setLoader={setLoader} submitLogin={login} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <RegisterForm showLoader={loader} errors={errors} nameRef={nameRef} emailRef={emailRef} passwordRef={passwordRef} passwordConfirmationRef={passwordConfirmationRef} submitRegister={register} />
                    </div>
                  </div>
                </>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={(e) => closeModal(e, setLoader(false))}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </main>


      <footer className="container blog-footer">
        <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        <p>
          <a href="#">Back to top</a>
        </p>
      </footer>
    </>
  )
}
