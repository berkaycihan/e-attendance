//import React, { Component, useState } from 'react';
import React, { useState, useContext } from "react";
//import ReactDOM from "react-dom";
import "./Login.css";
import { UserContext } from "./context";
import Ogrenciler from "./components/Ogrenciler";
import Ogrencilerim from "./components/Ogrencilerim";
import Ogretmen from "./components/Ogretmen";
import Derslerim from "./components/Derslerim";
import Dersler from "./components/Dersler";
import Ogrenci from "./components/Ogrenci";
import Navbar from "./Navbar";

let loggedin1;

function Login() {
  const data1 = useContext(UserContext);

  //data1.data

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitted2, setIsSubmitted2] = useState(false);
  const [isSubmitted3, setIsSubmitted3] = useState(false);

  const errors = {
    uname: "geçersiz kullanıcı",
    pass: "geçersiz şifre",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = data1.data.superusers.find(
      (user) => user.username === uname.value
    );
    const tuserData = data1.data.teachers.find(
      (user) => user.username === uname.value
    );
    const suserData = data1.data.students.find(
      (user) => user.username === uname.value
    );

    // Compare user info

    if (userData) {
      if (userData.password !== pass.value) {
        // geçersiz şifre
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        loggedin1 = userData.username.toString();
        console.log(loggedin1);
      }
    } else if (tuserData) {
      if (tuserData.password !== pass.value) {
        // geçersiz şifre
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted2(true);
        loggedin1 = tuserData.username.toString();
        console.log(loggedin1);
      }
    } else if (suserData) {
      if (suserData.password !== pass.value) {
        // geçersiz şifre
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted3(true);
        loggedin1 = suserData.username.toString();
        console.log(loggedin1);
      }
    } else {
      // geçersiz kullanıcı
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const logOut = () => {
    setIsSubmitted(false);
    setIsSubmitted2(false);
    setIsSubmitted3(false);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div>
      <Navbar onLogOut={logOut} />

      <div className="login-form">
        <div className="form">
          <br />
          <br />
          <div align="center" className="title">
            Elektronik Yoklama
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>
                <i className="fa fa-user-circle" aria-hidden="true"></i> Abs/Obs
                No{" "}
              </label>
              <input type="text" name="uname" required />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>
                <i className="fa fa-key" aria-hidden="true"></i> Şifre{" "}
              </label>
              <input type="password" name="pass" required />
              {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <input type="submit" value="Giriş" />
            </div>
          </form>
          <br />
          <h6 align="center" style={{ color: "Tomato" }}>
            Okul hesabı ile girilmektedir.
            <br />
            (Şifreyi öğrenci işlerinden öğrenebilirsiniz.)
          </h6>
          <h6 align="center" style={{ color: "green" }}>
            Yoklama Kodu bir sonraki sayfaya girilmektedir.
          </h6>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        {(() => {
          if (isSubmitted) {
            return (
              <div>
                <Navbar
                  loggedUserName={loggedin1}
                  exit1={true}
                  onLogOut={logOut}
                />

                <Ogretmen
                  title="Öğretim Görevlileri"
                  loggedUserName={loggedin1}
                />
                <Dersler
                  title="Dersler"
                  loggedUserName={loggedin1}
                  adminDisable={true}
                />
                <Ogrenciler
                  title="Öğrenciler"
                  loggedUserName={loggedin1}
                  adminDisable={true}
                />
              </div>
            );
          } else if (isSubmitted2) {
            return (
              <div>
                <Navbar
                  loggedUserName={loggedin1}
                  exit1={true}
                  onLogOut={logOut}
                />
                <Derslerim
                  title="Derslerim"
                  loggedUserName={loggedin1}
                  isVisible={true}
                  adminDisable={false}
                />
                <Ogrencilerim
                  title="Yoklama"
                  loggedUserName={loggedin1}
                  adminDisable={false}
                />
              </div>
            );
          } else if (isSubmitted3) {
            return (
              <div>
                <Navbar
                  loggedUserName={loggedin1}
                  exit1={true}
                  onLogOut={logOut}
                />
                <Ogrenci loggedUserName={loggedin1} />
              </div>
            );
          } else {
            return renderForm;
          }
        })()}
      </div>
    </div>
  );
}
export { loggedin1 };
export default Login;
