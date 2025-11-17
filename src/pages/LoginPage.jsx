import React, { useState } from 'react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [registerData, setRegisterData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    agreeTerms: false 
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', registerData);
  };

  return (
    <>
      <Header />
      
      <main className="main__content_wrapper">
        <Breadcrumb title="Account Page" items={[{ label: 'Account Page' }]} />
        
        <div className="login__section section--padding mb-80">
          <div className="container">
            <form onSubmit={handleLoginSubmit}>
              <div className="login__section--inner">
                <div className="row row-cols-md-2 row-cols-1">
                  <div className="col">
                    <div className="account__login">
                      <div className="account__login--header mb-25">
                        <h2 className="account__login--header__title h3 mb-10">Login</h2>
                        <p className="account__login--header__desc">Login if you area a returning customer.</p>
                      </div>
                      <div className="account__login--inner">
                        <label>
                          <input 
                            className="account__login--input" 
                            placeholder="Email Addres" 
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          />
                        </label>
                        <label>
                          <input 
                            className="account__login--input" 
                            placeholder="Password" 
                            type="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          />
                        </label>
                        <div className="account__login--remember__forgot mb-15 d-flex justify-content-between align-items-center">
                          <div className="account__login--remember position__relative">
                            <input 
                              className="checkout__checkbox--input" 
                              id="check1" 
                              type="checkbox"
                              checked={loginData.remember}
                              onChange={(e) => setLoginData({ ...loginData, remember: e.target.checked })}
                            />
                            <span className="checkout__checkbox--checkmark"></span>
                            <label className="checkout__checkbox--label login__remember--label" htmlFor="check1">
                              Remember me
                            </label>
                          </div>
                          <button className="account__login--forgot" type="button">Forgot Your Password?</button>
                        </div>
                        <button className="account__login--btn btn" type="submit">Login</button>
                        <div className="account__login--divide">
                          <span className="account__login--divide__text">OR</span>
                        </div>
                        <div className="account__social d-flex justify-content-center mb-15">
                          <a className="account__social--link facebook" target="_blank" rel="noreferrer" href="https://www.facebook.com">Facebook</a>
                          <a className="account__social--link google" target="_blank" rel="noreferrer" href="https://www.google.com">Google</a>
                          <a className="account__social--link twitter" target="_blank" rel="noreferrer" href="https://twitter.com">Twitter</a>
                        </div>
                        <p className="account__login--signup__text">Don,t Have an Account? <button type="button">Sign up now</button></p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="account__login register">
                      <div className="account__login--header mb-25">
                        <h2 className="account__login--header__title h3 mb-10">Create an Account</h2>
                        <p className="account__login--header__desc">Register here if you are a new customer</p>
                      </div>
                      <div className="account__login--inner">
                        <label>
                          <input 
                            className="account__login--input" 
                            placeholder="Username" 
                            type="text"
                            value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                          />
                        </label>
                        <label>
                          <input 
                            className="account__login--input" 
                            placeholder="Email Addres" 
                            type="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          />
                        </label>
                        <label>
                          <input 
                            className="account__login--input" 
                            placeholder="Password" 
                            type="password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          />
                        </label>
                        <label>
                          <input 
                            className="account__login--input" 
                            placeholder="Confirm Password" 
                            type="password"
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          />
                        </label>
                        <button className="account__login--btn btn mb-10" type="button" onClick={handleRegisterSubmit}>Submit & Register</button>
                        <div className="account__login--remember position__relative">
                          <input 
                            className="checkout__checkbox--input" 
                            id="check2" 
                            type="checkbox"
                            checked={registerData.agreeTerms}
                            onChange={(e) => setRegisterData({ ...registerData, agreeTerms: e.target.checked })}
                          />
                          <span className="checkout__checkbox--checkmark"></span>
                          <label className="checkout__checkbox--label login__remember--label" htmlFor="check2">
                            I have read and agree to the terms & conditions
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <ShippingInfo />
      </main>
      
      <Footer />
    </>
  );
};

export default LoginPage;
