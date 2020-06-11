import React, { useState, useEffect } from 'react';
import './loginForm.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import { environment } from '../../environment';
import { Redirect, useLocation } from 'react-router-dom';

function LoginForm(props) {
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if(props.customer){
      if(props.customer.loginError !== null && props.customer.loginSuccess === false){
        setError("Sai tên tài khoản hoặc mật khẩu!")
      } 
    }
    }, [props.customer])

  const handleForSubmit = (e) => {
    e.preventDefault();
    if(!username){
      setError("Quý khách vui lòng nhập tên đăng nhập!")
      return;
    } else if(!password) {
      setError("Quý khách vui lòng nhập mật khẩu!")
      return
    } 
    // else if(!isVerified){
    //   setError("Vui lòng xác minh!")
    //   return
    // }
    props.login(username, password)
  };

  // const verifyCallback = (res) => {
  //   if (res) {
  //     setIsVerified(true);
  //   }
  // };

  if( sessionStorage.getItem("ACCESS_TOKEN") !== null && props.user){
    return <Redirect to={`${location.pathname}/dashboard`}/>
  }
  if( sessionStorage.getItem("ACCESS_TOKEN") !== null && props.customer){
    return <Redirect to="/dashboard"/>
  }
  return (
    <div className="custom-shadow-rounded card p-3 mb-5 bg-white">
      <div className="row vertical-center-row">
        <div className="col-4 no-gutter">
          <img
            className="float-right img-fluid"
            src="/assets/logo.svg"
            alt="logo"
          />
        </div>
        <div className="col-8 center">
          <h3 className="font-weight-bold float-left yellow">KIANTOBANK</h3>
          <h5 className="float-left text-monospace">Internet b@nking</h5>
        </div>
      </div>

      <form className="text-center" onSubmit={handleForSubmit}>
        <input
          type="text"
          name="username"
          className="form-control form-control-sm mt-5 col-10 mx-auto"
          onChange = {e => setUsername(e.target.value)}
          placeholder="Tên đăng nhập"
        />
        <input
          type="password"
          name="password"
          className="form-control form-control-sm mt-2 col-10 mx-auto"
          onChange = {e => setPassword(e.target.value)}
          placeholder="Mật khẩu"
        />
        {/* <div className="mt-4 col-md-auto center-vertical">
          <ReCAPTCHA className="col-md-auto" sitekey={environment.SITE_KEY} onChange={verifyCallback} />
        </div> */}
        <div className="mt-3">
          <span className="text-danger">{error}</span>
        </div>
        <button type="submit" className="btn btn-dark mt-4 mx-auto">
          Đăng nhập
        </button>
      </form>
      <hr />
      {props.customer && (
        <div className="ml-4">
        <a href="/" className="text-secondary">
          Quên mật khẩu?
        </a>
      </div>
      )}
      
    </div>
  );
}

export default LoginForm;
