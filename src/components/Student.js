import React, { Component } from "react";
import UserConsumer from "../context";
import "../App.css";
// import Ogrenci from './components/Ogrenci';
// import Ders from './components/Ders';

class Student extends Component {
  state = {
    isVisible: false,
  };

  onSubmit1 = (dispatch, e) => {
    //this.setState({});
    var studentSubmit = {
      studentid: this.props.loggedUserName,
      inputCode: document.forms[0][0].value,
    };
    dispatch({ type: "SUBMIT_YOKLAMA", payload: studentSubmit });

    console.log(document.forms);
    this.setState({
      isVisible: true,
    });

    //logout
  };

  render() {
    //const { title } = this.props;
    //const { loggedUserName } = this.props;
    const { isVisible } = this.state;
    return (
      <UserConsumer>
        {(value) => {
          const { data } = value;
          const { dispatch } = value;
          return (
            <div className="card">
              <div className="login-form">
                <div className="form">
                  <div align="center" className="title">
                    Yoklama Kaydı
                  </div>
                  <form align="center">
                    <div className="input-container">
                      <label align="center">
                        <i className="fa fa-key" aria-hidden="true"></i> Yoklama
                        Kodu{" "}
                      </label>
                      <input type="text" name="pass" required />
                    </div>

                    <div className="button-container">
                      <input
                        type="button"
                        value="Kaydet"
                        style={{
                          backgroundColor: "rgb(1,210,142)",
                          color: "white",
                          border: "1px solid #00000",
                          borderRadius: "5px",
                          height: "50px",
                          marginTop: "28px",
                        }}
                        onClick={this.onSubmit1.bind(this, dispatch)}
                      />
                    </div>
                  </form>

                  {isVisible ? (
                    <div>
                      <h6 align="center" style={{ color: "orange" }}>
                        Yoklama kayıt talebiniz alınmıştır.
                      </h6>
                      {/* <h6 align="center" style={{ color: "black" }}>
                        Ana sayfaya yönlendiriliyorsunuz...
                      </h6> */}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default Student;
