import React, { Component } from "react";
import UserConsumer from "../context";
import "../App.css";
//import PropTypes from "prop-types";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
// import Ogrenci from './components/Ogrenci';
// import Ders from './components/Ders';
// import { userInfo } from 'os';
import { loggedin1 } from "../Login";

var selectedStudent = "";
var selectedStudentName = "";

class Ogrenci extends Component {
  state = {
    isVisible: false,
    adminDisable: false,
  };
  onClickEventTitle = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  studentClick = (e) => {
    this.setState({
      //:e.target.className
    });
    selectedStudent = e.currentTarget.id;
    selectedStudentName = e.currentTarget.className;
  };

  onEditStudent = (dispatch, e) => {
    dispatch({ type: "DELETE_STUDENT", payload: selectedStudent });
    var newStudent = {
      ogrenciadi: document.forms[7][0].value,
      username: document.forms[7][1].value,
      password: document.forms[7][2].value,
      usertype: "student",
    };
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
    document.forms[3].reset();
  };

  onDeleteStudent = (dispatch, e) => {
    dispatch({ type: "DELETE_STUDENT", payload: selectedStudent });
  };
  onAddStudent = (dispatch, e) => {
    var studentInputName = document.forms[6][0].value;
    var studentInputUsername = document.forms[6][1].value;
    var studentInputPassword = document.forms[6][2].value;

    var newStudent = {
      ogrenciadi: studentInputName,
      username: studentInputUsername,
      password: studentInputPassword,
      usertype: "student",
    };
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
    //console.log(document.forms);
    document.forms[6].reset(); //reset form
  };

  render() {
    const { title } = this.props;
    //const { loggedUserName } = this.props;
    const { isVisible } = this.state;
    const { adminDisable } = this.props;
    return (
      <UserConsumer>
        {(value) => {
          const { data } = value;
          const { dispatch } = value;
          return (
            <div>
              <div
                className="card"
                style={isVisible ? { backgroundColor: "#d8ebf0" } : null}
              >
                <div className="card-header d-flex justify-content-between">
                  <h4
                    className="d-inline"
                    style={{ cursor: "pointer" }}
                    onClick={this.onClickEventTitle}
                  >
                    {" "}
                    {title}{" "}
                    <i
                      className="fa fa-angle-double-down"
                      aria-hidden="true"
                    ></i>
                  </h4>

                  {isVisible ? (
                    <div>
                      {adminDisable ? (
                        <button
                          className="btn btn-warning"
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModalCenter2"
                          style={{ cursor: "pointer" }}
                          aria-hidden="true"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                {isVisible ? (
                  <div>
                    <Row>
                      <Col>
                        <Card>
                          <CardBody>
                            <h6 align="right">
                              Toplam Öğrenci Sayısı: {data.students.length}
                            </h6>
                            <Table>
                              <thead>
                                <tr>
                                  <th scope="col">Öğrenci Adı</th>
                                  <th scope="col">Öğrenci No</th>
                                </tr>
                              </thead>

                              <tbody>
                                {data.students.map((student) => {
                                  return (
                                    <tr
                                      id={student.username}
                                      className={student.ogrenciadi}
                                      onClick={this.studentClick.bind(this)}
                                    >
                                      <td className="table-light">
                                        <i
                                          className="fa fa-user-circle-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        {student.ogrenciadi}{" "}
                                      </td>
                                      <td className="table-light">
                                        {" "}
                                        {student.username}{" "}
                                      </td>

                                      {adminDisable ? (
                                        <td className="table-light">
                                          <i
                                            className="fa fa-trash-o"
                                            style={{ cursor: "pointer" }}
                                            aria-hidden="true"
                                            data-toggle="modal"
                                            data-target="#exampleModa7"
                                          ></i>
                                        </td>
                                      ) : null}
                                      {adminDisable ? (
                                        <td className="table-light">
                                          <i
                                            className="fa fa-pencil-square-o"
                                            style={{ cursor: "pointer" }}
                                            aria-hidden="true"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter8"
                                            onClick={() => {
                                              document.forms[7].reset();
                                            }}
                                          ></i>
                                        </td>
                                      ) : null}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <div align="center"></div>
                  </div>
                ) : null}
              </div>
              {/* addstudent button */}
              <div
                className="modal fade"
                id="exampleModalCenter2"
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
                        Öğrenci Ekle
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
                    <form id="studentAdd">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="nameStudent">Öğrenci Adı:</label>
                          <input
                            type="text"
                            name="nameStudent"
                            id="nameStudent"
                            placeholder="isim"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Username:</label>
                          <input
                            type="text"
                            name="usernameStudent"
                            id="usernameStudent"
                            placeholder="öğrenci numarası"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Şifre:</label>
                          <input
                            type="password"
                            name="passwordStudent"
                            id="passwordStudent"
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
                        onClick={this.onAddStudent.bind(this, dispatch)}
                        data-dismiss="modal"
                      >
                        Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* addstudent button*/}
              {/* deletestudent  */}

              <div
                class="modal fade"
                id="exampleModa7"
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
                        Öğrenciyi sil
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
                      Bu öğrenci silinecek. Onaylıyor musunuz?
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
                        type="button"
                        class="btn btn-danger"
                        onClick={this.onDeleteStudent.bind(this, dispatch)}
                        data-dismiss="modal"
                      >
                        Onayla
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* deletestudent  */}
              {/* editstudent  */}
              <div
                className="modal fade"
                id="exampleModalCenter8"
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
                        Öğrenci Güncelle
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
                    <form id="studentEdit">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="nameStudent">Öğrenci Adı:</label>
                          <input
                            type="text"
                            name="nameStudent"
                            id="nameStudent"
                            placeholder="isim"
                            className="form-control"
                            defaultValue={selectedStudentName}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Username:</label>
                          <input
                            type="text"
                            name="usernameStudent"
                            id="usernameStudent"
                            placeholder="öğrenci numarası"
                            className="form-control"
                            defaultValue={selectedStudent}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Şifre:</label>
                          <input
                            type="password"
                            name="passwordStudent"
                            id="passwordStudent"
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
                        onClick={this.onEditStudent.bind(this, dispatch)}
                        data-dismiss="modal"
                      >
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* editstudent  */}
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default Ogrenci;
