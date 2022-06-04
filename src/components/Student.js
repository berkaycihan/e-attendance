import React, { Component } from "react";
import UserConsumer from "../context";
import "../App.css";
// import Ogrenci from './components/Ogrenci';
// import Ders from './components/Ders';

class Student extends Component {
  onSubmit1 = (dispatch, e) => {
    //this.setState({});
    var studentSubmit = {
      studentid: this.props.loggedUserName,
      inputCode: document.forms[0][0].value,
    };
    dispatch({ type: "SUBMIT_YOKLAMA", payload: studentSubmit });

    console.log(document.forms);
  };

  render() {
    //const { title } = this.props;
    const { loggedUserName } = this.props;
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
                        onClick={this.onSubmit1.bind(this, dispatch)}
                      />
                    </div>
                  </form>

                  <h6 align="center" style={{ color: "Tomato" }}>
                    Eşleşen aktif bir ders bulunamadı.
                  </h6>
                  <h6 align="center" style={{ color: "green" }}>
                    Yoklama kaydınız alınmıştır.
                  </h6>
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
