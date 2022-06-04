import React, { Component } from "react";
import UserConsumer from "../context";
import "../App.css";
//import PropTypes from "prop-types";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
// import Ogrenci from './components/Ogrenci';
// import Ders from './components/Ders';
// import { userInfo } from 'os';

var selectedLesson = "";
var studentList = [];

class Ders extends Component {
  state = {
    isVisible: false,
    adminDisable: false,
  };
  onClickEventTitle = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  onDeleteLesson = (dispatch, e) => {
    dispatch({ type: "DELETE_LESSON", payload: selectedLesson });
  };

  onAddLesson = (dispatch, e) => {
    var newLesson = {
      teacher: document.forms[2][3].value,
      lesson: {
        dersid: document.forms[2][1].value,
        yoklamakodu: "",
        dersadi: document.forms[2][0].value,
        bolumadi: document.forms[2][2].value,
        donem: document.forms[2][4].value,
        yil: document.forms[2][5].value,
        sinif: document.forms[2][6].value,
        ogrencilistesi: [],
      },
    };

    dispatch({ type: "ADD_LESSON", payload: newLesson });
    document.forms[2].reset();
  };

  onEditLesson = (dispatch, e) => {
    dispatch({ type: "DELETE_LESSON", payload: selectedLesson });
    var newLesson = {
      teacher: document.forms[3][3].value,
      lesson: {
        dersid: selectedLesson,
        yoklamakodu: "",
        dersadi: "",
        bolumadi: document.forms[3][2].value,
        donem: document.forms[3][4].value,
        yil: document.forms[3][5].value,
        sinif: document.forms[3][6].value,
        ogrencilistesi: studentList,
      },
    };
    dispatch({ type: "ADD_LESSON", payload: newLesson });
    document.forms[3].reset();
  };

  onAssignStudent = (dispatch, e) => {
    //console.log(document.forms[4][0].value); // ogrencino
    // var Student = {
    //   username: document.forms[4][0].value,
    //   durum: "yok",
    // };
    const payload = {
      lessonId: selectedLesson,
      username: document.forms[4][0].value,
    };
    dispatch({ type: "ASSIGN_STUDENT", payload: payload });
    document.forms[4].reset();
  };

  onUnassignStudent = (dispatch, e) => {
    //console.log(document.forms[5][0].value); //ogrencino
    var unassignStudent = document.forms[5][0].value;
    const payload = {
      lessonId: selectedLesson,
      username: document.forms[5][0].value,
    };
    dispatch({ type: "UNASSIGN_STUDENT", payload: payload });
    document.forms[5].reset();
  };

  lessonClick = (e) => {
    this.setState({
      //:e.target.className
    });
    selectedLesson = e.currentTarget.id;
    //console.log(e.target);
    //console.log(selectedLesson);
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

          // {
          //   selectedLesson = data.teachers.map((teacher) => {
          //     return teacher.dersler.map((lesson) => {
          //       return lesson.filter(
          //         (lesson) => lesson.dersid === selectedLesson
          //       );
          //     });
          //   });
          // }

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
                          data-target="#exampleModalCenter1"
                          style={{ cursor: "pointer" }}
                          aria-hidden="true"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      ) : null}{" "}
                    </div>
                  ) : null}
                </div>
                {isVisible ? (
                  <div>
                    <Row>
                      <Col>
                        <Card>
                          <CardBody>
                            <Table>
                              <thead>
                                <tr>
                                  <th scope="col">Ders Adı</th>
                                  <th scope="col">Kodu</th>
                                  <th scope="col">Bölüm</th>
                                  <th scope="col">Öğretim Görevlisi</th>
                                  <th scope="col">Dönem</th>
                                  <th scope="col">Yıl</th>
                                  <th scope="col">Sınıf</th>
                                  <th scope="col">Mevcut</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.teachers.map((teacher) => {
                                  return teacher.dersler.map((lesson) => {
                                    return (
                                      <tr
                                        className="table-light"
                                        id={lesson.dersid}
                                        onClick={this.lessonClick.bind(this)}
                                      >
                                        <td>{lesson.dersadi}</td>
                                        <td>{lesson.dersid}</td>
                                        <td>{lesson.bolumadi}</td>
                                        <td>{teacher.name}</td>
                                        <td>{lesson.donem}</td>
                                        <td>{lesson.yil}</td>
                                        <td>{lesson.sinif}</td>
                                        <td>{lesson.ogrencilistesi.length}</td>
                                        {adminDisable ? (
                                          <td className="table-light">
                                            <i
                                              className="fa fa-trash-o"
                                              style={{ cursor: "pointer" }}
                                              aria-hidden="true"
                                              data-toggle="modal"
                                              data-target="#exampleModa6"
                                            ></i>
                                          </td>
                                        ) : null}
                                        {adminDisable ? (
                                          //LESSONEDIT BUTTON DISABLED
                                          <td className="table-light">
                                            <i
                                            // className="fa fa-pencil-square-o"
                                            // type="button"
                                            // data-toggle="modal"
                                            // style={{ cursor: "pointer" }}
                                            // aria-hidden="true"
                                            // data-target="#exampleModalCenter10"
                                            ></i>
                                          </td>
                                        ) : null}
                                        {adminDisable ? (
                                          <td className="table-light">
                                            <button
                                              type="button"
                                              data-toggle="modal"
                                              data-target="#exampleModalCenter4"
                                              style={{ cursor: "pointer" }}
                                              aria-hidden="true"
                                            >
                                              <i
                                                className="fa fa-user-plus"
                                                style={{ cursor: "pointer" }}
                                                aria-hidden="true"
                                              ></i>
                                            </button>
                                            <button
                                              type="button"
                                              data-toggle="modal"
                                              data-target="#exampleModalCenter5"
                                              style={{ cursor: "pointer" }}
                                              aria-hidden="true"
                                            >
                                              <i
                                                className="fa fa-user-times"
                                                style={{ cursor: "pointer" }}
                                                aria-hidden="true"
                                              ></i>
                                            </button>
                                          </td>
                                        ) : null}
                                      </tr>
                                    );
                                  });
                                })}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                ) : null}
              </div>
              {/* addlesson button */}
              <div
                className="modal fade"
                id="exampleModalCenter1"
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
                        Ders Ekle
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
                    <form id="lessonAdd">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="name">Ders Adı:</label>
                          <input
                            type="text"
                            name="nameLesson"
                            id="nameLesson"
                            placeholder="ders"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Ders Kodu:</label>
                          <input
                            type="text"
                            name="keyLesson"
                            id="keyLesson"
                            placeholder="ders kodu"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="username">Bölüm:</label>
                          <select
                            id="departmentLesson"
                            className="form-control"
                          >
                            {/* {data.teachers.map((teacher) => {
                              return teacher.dersler.map((ders) => {
                                return (
                                  <option value={ders.bolumadi}>
                                    {ders.bolumadi}
                                  </option>
                                );
                              });
                            })} */}
                            <option value="Bilgisayar Mühendisliği">
                              Bilgisayar Mühendisliği
                            </option>
                            <option value="Makine Mühendisliği">
                              Makine Mühendisliği
                            </option>
                            <option value="Gıda Mühendisliği">
                              Gıda Mühendisliği
                            </option>
                            {/* test */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Öğretim Görevlisi:</label>
                          <select id="lessonTeacher" className="form-control">
                            {data.teachers.map((teacher) => {
                              return (
                                <option value={teacher.name}>
                                  {teacher.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Dönem:</label>
                          <br />
                          <select id="lessonDonem" className="form-control">
                            <option value="Güz">Güz</option>
                            <option value="Bahar">Bahar</option>
                            <option value="Yaz">Yaz</option>
                            {/* test */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Yıl:</label>
                          <input
                            type="text"
                            name="lessonYear"
                            id="lessonYear"
                            placeholder="girilecek format '2021-2022'"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Sınıf:</label>
                          <input
                            type="number"
                            name="lessonClass"
                            id="lessonClass"
                            placeholder="sınıf"
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
                        onClick={this.onAddLesson.bind(this, dispatch)}
                        data-dismiss="modal"
                      >
                        Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* addlesson button*/}
              {/* editlesson button*/}

              <div
                className="modal fade"
                id="exampleModalCenter10"
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
                        Dersi Düzenle
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
                    <form id="LessonEdit">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="name">Ders Adı:</label>
                          <input
                            type="text"
                            name="nameLesson"
                            id="nameLesson"
                            placeholder="ders"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Ders Kodu:</label>
                          <input
                            type="text"
                            name="keyLesson"
                            id="keyLesson"
                            placeholder="ders kodu"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="username">Bölüm:</label>
                          <select
                            id="departmentLesson"
                            className="form-control"
                          >
                            {/* {data.teachers.map((teacher) => {
                              return teacher.dersler.map((ders) => {
                                return (
                                  <option value={ders.bolumadi}>
                                    {ders.bolumadi}
                                  </option>
                                );
                              });
                            })} */}
                            <option value="Bilgisayar Mühendisliği">
                              Bilgisayar Mühendisliği
                            </option>
                            <option value="Makine Mühendisliği">
                              Makine Mühendisliği
                            </option>
                            <option value="Gıda Mühendisliği">
                              Gıda Mühendisliği
                            </option>
                            {/* test */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Öğretim Görevlisi:</label>
                          <select id="lessonTeacher" className="form-control">
                            {data.teachers.map((teacher) => {
                              return (
                                <option value={teacher.name}>
                                  {teacher.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Dönem:</label>
                          <br />
                          <select id="lessonDonem" className="form-control">
                            <option value="Güz">Güz</option>
                            <option value="Bahar">Bahar</option>
                            <option value="Yaz">Yaz</option>
                            {/* test */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Yıl:</label>
                          <input
                            type="text"
                            name="lessonYear"
                            id="lessonYear"
                            placeholder="girilecek format '2021-2022'"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Sınıf:</label>
                          <input
                            type="number"
                            name="lessonClass"
                            id="lessonClass"
                            placeholder="sınıf"
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
                        onClick={this.onEditLesson.bind(this, dispatch)}
                        data-dismiss="modal"
                      >
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* editlesson button*/}

              {/* assignstudent button */}
              <div
                className="modal fade"
                id="exampleModalCenter4"
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
                        Derse Öğrenci Ata
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
                    <form id="assignStudent">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="name">Öğrenci Username:</label>
                          <input
                            type="number"
                            name="name"
                            id="id"
                            placeholder="öğrenci numarası"
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
                        onClick={this.onAssignStudent.bind(this, dispatch)}
                        type="button"
                        className="btn btn-warning"
                        data-dismiss="modal"
                      >
                        Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* assignstudent button*/}
              {/* unassignstudent button */}
              <div
                className="modal fade"
                id="exampleModalCenter5"
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
                        style={{ color: "red" }}
                        id="exampleModalLongTitle"
                      >
                        Dersten öğrenci çıkar
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
                    <form id="unassignStudent">
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="name">Öğrenci Username:</label>
                          <input
                            type="number"
                            name="name"
                            id="id"
                            placeholder="öğrenci numarası"
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
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={this.onUnassignStudent.bind(this, dispatch)}
                      >
                        Çıkar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* unassignstudent button*/}
              {/* deletelesson */}
              <div
                class="modal fade"
                id="exampleModa6"
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
                        Dersi sil
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
                      Bu ders silinecek. Onaylıyor musunuz?
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
                        onClick={this.onDeleteLesson.bind(this, dispatch)}
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
              {/* deletelesson */}
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default Ders;
