import React, { useState } from 'react';
import './loginForm.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import { environment } from '../../environment';

function LoginForm(props) {
  const [isVerified, setIsVerified] = useState(false);

  const handleForSubmit = (e) => {
    e.preventDefault();
    if (isVerified) {
      alert(`${e.target.username.value} ${e.target.password.value}`);
    } else {
      alert('Vui lòng xác thực lại');
    }
  };

  const verifyCallback = (res) => {
    if (res) {
      setIsVerified(true);
    }
  };
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
          placeholder="Tên đăng nhập"
        />
        <input
          type="password"
          name="password"
          className="form-control form-control-sm mt-2 col-10 mx-auto"
          placeholder="Mật khẩu"
        />
        <div className="mt-4 col-md-auto">
          <ReCAPTCHA className="col-md-auto" sitekey={environment.SITE_KEY} onChange={verifyCallback} />
        </div>
        <a></a>
        <button type="submit" className="btn btn-dark mt-4 mx-auto">
          Đăng nhập
        </button>
      </form>
      <hr />
      <div className="ml-4">
        <a href="/" className="text-secondary">
          Quên mật khẩu?
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
