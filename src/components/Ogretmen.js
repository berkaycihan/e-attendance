import React, { Component } from "react";
import UserConsumer from "../context";
//import "../App.css";
// import Ogrenci from './components/Ogrenci';
// import Ders from './components/Ders';
// import { userInfo } from 'os';
//import { AddTeacher } from "./AddTeacher";

var selectedTeacher = "";
var selectedTeacherName = "";
var selectedLesson = [];

class Ogretmen extends Component {
  teacherClick = (e) => {
    this.setState({
      //:e.target.className
    });
    //console.log(e);
    //console.log(e.currentTarget.className);
    //e.currentTarget.className = "table-info";
    //console.log(e.target.className);
    selectedTeacher = e.currentTarget.id;
    //console.log(selectedTeacher);
    selectedTeacherName = e.currentTarget.className;
  };

  onDeleteTeacher = (dispatch, e) => {
    dispatch({ type: "DELETE_TEACHER", payload: selectedTeacher });
  };

  onAddTeacher = (dispatch, e) => {
    var teacherInputName = document.forms[0][0].value;
    var teacherInputUsername = document.forms[0][1].value;
    var teacherInputPassword = document.forms[0][2].value;

    var newTeacher = {
      name: teacherInputName,
      username: teacherInputUsername,
      password: teacherInputPassword,
      usertype: "teacher",
      dersler: [],
    };
    dispatch({ type: "ADD_TEACHER", payload: newTeacher });
    document.forms[0].reset(); //reset form
  };

  onEditTeacher = (dispatch, e) => {
    dispatch({ type: "DELETE_TEACHER", payload: selectedTeacher });
    var newTeacher = {
      name: document.forms[1][0].value,
      username: document.forms[1][1].value,
      password: document.forms[1][2].value,
      usertype: "teacher",
      dersler: selectedLesson,
    };
    dispatch({ type: "ADD_TEACHER", payload: newTeacher });
    document.forms[4].reset();
  };

  render() {
    const { title } = this.props;
    //const { loggedUserName } = this.props;
    return (
      <UserConsumer>
        {(value) => {
          const { data } = value;
          const { dispatch } = value;

          {
            data.teachers
              .filter((teacher) => teacher.username === selectedTeacher)
              .map((teacher) => {
                return (selectedLesson = teacher.dersler);
              });
          }

          return (
            <div className="card">
              <div
                className="card-header d-flex justify-content-between"
                style={{ backgroundColor: "#d8ebf0" }}
              >
                <h4 className="d-inline" style={{ cursor: "pointer" }}>
                  {" "}
                  {title}{" "}
                </h4>

                <button
                  className="btn btn-warning"
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  style={{ cursor: "pointer" }}
                  aria-hidden="true"
                  //onClick={}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
              <ul className="pending">
                {data.teachers.map((teacher) => {
                  return (
                    <li
                      id={teacher.username}
                      className={teacher.name}
                      onClick={this.teacherClick.bind(this)}
                    >
                      <h4>{teacher.name}</h4>

                      {/* {data.teachers
                        .filter(
                          (teacher1) => teacher1.username === selectedTeacher
                        )
                        .map((teacher1) => {
                          return ( */}
                      <h6>username : {teacher.username}</h6>
                      {/* );
                        })} */}

                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModalCenter9"
                        aria-hidden="true"
                        onClick={() => {
                          document.forms[1].reset();
                        }}
                      >
                        {" "}
                        düzenle
                      </button>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModa2"
                        aria-hidden="true"
                      >
                        sil
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* addteacher button */}
              <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        style={{ color: "black" }}
                        id="exampleModalLongTitle"
                      >
                        Öğretim Görevlisi Ekle
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    {/* body */}
                    <form id="teacherAdd">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="nameTeacher">İsim:</label>
                          <input
                            type="text"
                            name="nameTeacher"
                            id="nameTeacher"
                            placeholder="isim"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="usernameTeacher">Username:</label>
                          <input
                            type="text"
                            name="usernameTeacher"
                            id="usernameTeacher"
                            placeholder="kullanıcı adı"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="passwordTeacher">Şifre:</label>
                          <input
                            type="password"
                            name="passwordTeacher"
                            id="passwordTeacher"
                            placeholder="hesap şifresi"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </form>
                    {/* body */}

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        İptal
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        data-dismiss="modal"
                        onClick={this.onAddTeacher.bind(this, dispatch)}
                      >
                        Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* addteacher button*/}
              {/* deleteteacher  */}

              <div
                class="modal fade"
                id="exampleModa2"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{ color: "red" }}
                      >
                        Akademisyeni sil
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      Bu Akademisyen silinecek. Onaylıyor musunuz?
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        İptal
                      </button>
                      <button
                        onClick={this.onDeleteTeacher.bind(this, dispatch)}
                        type="button"
                        class="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Onayla
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* deleteteacher  */}
              {/* editteacher  */}
              <div
                className="modal fade"
                id="exampleModalCenter9"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        style={{ color: "black" }}
                        id="exampleModalLongTitle"
                      >
                        Öğretim Görevlisi Güncelle
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    {/* body */}
                    <form id="teacherEdit">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="nameTeacher">İsim:</label>
                          <input
                            type="text"
                            name="nameTeacher"
                            id="nameTeacher"
                            placeholder="isim"
                            className="form-control"
                            defaultValue={selectedTeacherName}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="usernameTeacher">Username:</label>
                          <input
                            type="text"
                            name="usernameTeacher"
                            id="usernameTeacher"
                            placeholder="kullanıcı adı"
                            className="form-control"
                            defaultValue={selectedTeacher}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="passwordTeacher">Şifre:</label>
                          <input
                            type="password"
                            name="passwordTeacher"
                            id="passwordTeacher"
                            placeholder="hesap şifresi"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </form>
                    {/* body */}

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        İptal
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        data-dismiss="modal"
                        onClick={this.onEditTeacher.bind(this, dispatch)}
                      >
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* editteacher  */}
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default Ogretmen;
