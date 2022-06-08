import React, { Component } from "react";
import UserConsumer from "../context";
import "../App.css";
//import PropTypes from "prop-types";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
// import Ogrenci from './components/Ogrenci';
// import Ders from './components/Ders';
// import { userInfo } from 'os';
import { selectedLesson } from "./Derslerim";
import { loggedin1 } from "../Login";

// function OpenModal() {
//   //div tagını ekranın merkezine pop-up çıkaracak fonksiyon
//   let element = document.getElementById("reportTag");
//   element.style.display = "block";
// }

// deactiveYoklama = true;

//get today date in dd/mm//yyyy
let d = new Date();
let curr_date = d.getDate();
let curr_month = d.getMonth();
let curr_year = d.getFullYear();
let today = curr_date + "-" + (curr_month + 1) + "-" + curr_year;

var createdCode = "";

class Ogrencilerim extends Component {
  state = {
    isVisible: false,
    adminDisable: false,
  };
  onClickEventTitle = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  onClickStarter = (dispatch, e) => {
    if (this.state.deactiveYoklama) {
      //onClickStarter
      var a1 = String(Math.floor(Math.random() * 10));
      var a2 = String(Math.floor(Math.random() * 10));
      var a3 = String(Math.floor(Math.random() * 10));
      var a4 = String(Math.floor(Math.random() * 10));
      createdCode = a1 + a2 + a3 + a4;
      console.log(selectedLesson);
      console.log(createdCode);
      var newYoklama = {
        yoklamakodu: createdCode,
        dersid: selectedLesson,
      };
      dispatch({ type: "STARTING_YOKLAMA", payload: newYoklama });
    } else {
      //onClickEnder
      //popup yansıt
      var yoklamaBitir = {
        yoklamakodu: createdCode,
        dersid: selectedLesson,
      };
      //dersin tüm durumları "yok" ve createdcodeu ""
      dispatch({ type: "FINISHING_YOKLAMA", payload: yoklamaBitir });
    }
    this.setState({
      deactiveYoklama: !this.state.deactiveYoklama,
    });
  };
  //render frequency
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 150);
    this.deactiveYoklama = createdCode ? true : false;
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { title } = this.props;
    const { loggedUserName } = this.props;
    //const { selectedLesson } = this.props;
    const { isVisible } = this.state;
    const { adminDisable } = this.props;
    const { deactiveYoklama } = this.state;
    //const { createdCode } = this.state;

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
                          style={{ cursor: "pointer" }}
                          aria-hidden="true"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          <i
                            className="fa fa-plus-square-o"
                            aria-hidden="true"
                          ></i>{" "}
                        </button>
                      ) : null}
                      <button
                        className="btn btn-primary"
                        style={{ cursor: "pointer" }}
                        aria-hidden="true"
                      >
                        <i className="fa fa-file-text-o" aria-hidden="true"></i>{" "}
                      </button>
                    </div>
                  ) : null}
                </div>

                {isVisible ? (
                  <div id="reportTag">
                    <div>
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <h6 align="right">{"Tarih: " + today}</h6>
                              <Table>
                                <thead>
                                  <tr>
                                    <th scope="col">Ders Adı</th>
                                    <th scope="col">Ders Kodu</th>
                                    <th scope="col">Bölüm</th>
                                    <th scope="col">Öğretim Görevlisi</th>
                                    <th scope="col">Dönem</th>
                                    <th scope="col">Yıl</th>
                                    <th scope="col">Sınıf</th>
                                    <th scope="col">Mevcut</th>
                                  </tr>
                                </thead>
                                {/* {selectedLesson} */}

                                {data.teachers
                                  .filter(
                                    (teacher) =>
                                      teacher.username === loggedUserName
                                  )
                                  .map((teacher) => {
                                    return teacher.dersler
                                      .filter(
                                        (lesson) =>
                                          lesson.dersid === selectedLesson
                                      )
                                      .map((lesson) => {
                                        return (
                                          <tbody className={lesson.dersid}>
                                            <tr
                                              className="table-light"
                                              // style={{ cursor: "pointer" }}
                                            >
                                              <td>{lesson.dersadi}</td>
                                              <td className={lesson.dersid}>
                                                {lesson.dersid}
                                              </td>
                                              <td className={lesson.dersid}>
                                                {lesson.bolumadi}
                                              </td>
                                              <td className={lesson.dersid}>
                                                {teacher.name}
                                              </td>
                                              <td className={lesson.dersid}>
                                                {lesson.donem}
                                              </td>
                                              <td className={lesson.dersid}>
                                                {lesson.yil}
                                              </td>
                                              <td className={lesson.dersid}>
                                                {lesson.sinif}
                                              </td>
                                              <td className={lesson.dersid}>
                                                {lesson.ogrencilistesi.length}
                                              </td>
                                            </tr>
                                          </tbody>
                                        );
                                      });
                                  })}
                              </Table>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>

                      <div>
                        <Row>
                          <Col>
                            <Card>
                              <CardBody>
                                <Table>
                                  <thead>
                                    <tr>
                                      <th scope="col">Öğrenci Adı</th>
                                      <th scope="col">Öğrenci No</th>
                                      <th scope="col">Durum</th>
                                    </tr>
                                  </thead>

                                  {data.teachers
                                    .filter(
                                      (teacher) =>
                                        teacher.username === loggedUserName
                                    )
                                    .map((teacher) => {
                                      return teacher.dersler
                                        .filter(
                                          (lesson) =>
                                            lesson.dersid === selectedLesson
                                        )
                                        .map((lesson) => {
                                          return lesson.ogrencilistesi.map(
                                            (student) => {
                                              return (
                                                <tbody>
                                                  {student.durum === "yok" ? (
                                                    <tr>
                                                      {data.students
                                                        .filter(
                                                          (student2) =>
                                                            student2.username ===
                                                            student.username
                                                        )
                                                        .map((person) => {
                                                          return (
                                                            <td className="table-danger">
                                                              <i
                                                                className="fa fa-user-circle"
                                                                aria-hidden="true"
                                                              ></i>{" "}
                                                              {
                                                                person.ogrenciadi
                                                              }{" "}
                                                            </td>
                                                          );
                                                        })}
                                                      <td className="table-danger">
                                                        {student.username}
                                                      </td>

                                                      <th
                                                        scope="row"
                                                        className="table-danger"
                                                      >
                                                        {student.durum}
                                                      </th>
                                                    </tr>
                                                  ) : (
                                                    <tr>
                                                      {data.students
                                                        .filter(
                                                          (student2) =>
                                                            student2.username ===
                                                            student.username
                                                        )
                                                        .map((person) => {
                                                          return (
                                                            <td className="table-success">
                                                              <i
                                                                className="fa fa-user-circle"
                                                                aria-hidden="true"
                                                              ></i>{" "}
                                                              {
                                                                person.ogrenciadi
                                                              }{" "}
                                                            </td>
                                                          );
                                                        })}
                                                      <td className="table-success">
                                                        {student.username}
                                                      </td>
                                                      <th
                                                        scope="row"
                                                        className="table-success"
                                                      >
                                                        {student.durum}
                                                      </th>
                                                    </tr>
                                                  )}
                                                </tbody>
                                              );
                                            }
                                          );
                                        });
                                    })}
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                      {deactiveYoklama ? (
                        <div align="center">
                          <button className="btn btn-info" aria-hidden="true">
                            {" "}
                            Kod:
                          </button>
                          <br />
                          <button
                            onClick={this.onClickStarter.bind(this, dispatch)}
                            className="btn btn-success"
                            style={{ cursor: "pointer" }}
                            aria-hidden="true"
                          >
                            {" "}
                            Yoklamayı Başlat
                          </button>
                        </div>
                      ) : (
                        <div align="center">
                          <button
                            className="btn btn-warning"
                            aria-hidden="true"
                          >
                            {" "}
                            Kod: {createdCode}
                          </button>
                          <br />
                          <button
                            className="btn btn-danger"
                            style={{ cursor: "pointer" }}
                            aria-hidden="true"
                            data-toggle="modal"
                            data-target="#exampleModal"
                          >
                            {" "}
                            Yoklamayı Bitir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    {/* <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Modal title
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
                    <div class="modal-body">...</div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div> */}
                    <div id="reportTag">
                      <div>
                        <Row>
                          <Col>
                            <Card>
                              <CardBody>
                                <h6 align="right">{"Tarih: " + today}</h6>
                                <Table>
                                  <thead>
                                    <tr>
                                      <th scope="col">Ders Adı</th>
                                      <th scope="col">Ders Kodu</th>
                                      <th scope="col">Bölüm</th>
                                      <th scope="col">Öğretim Görevlisi</th>
                                      <th scope="col">Dönem</th>
                                      <th scope="col">Yıl</th>
                                      <th scope="col">Sınıf</th>
                                      <th scope="col">Mevcut</th>
                                    </tr>
                                  </thead>
                                  {/* {selectedLesson} */}

                                  {data.teachers
                                    .filter(
                                      (teacher) =>
                                        teacher.username === loggedUserName
                                    )
                                    .map((teacher) => {
                                      return teacher.dersler
                                        .filter(
                                          (lesson) =>
                                            lesson.dersid === selectedLesson
                                        )
                                        .map((lesson) => {
                                          return (
                                            <tbody className={lesson.dersid}>
                                              <tr
                                                className="table-light"
                                                // style={{ cursor: "pointer" }}
                                              >
                                                <td>{lesson.dersadi}</td>
                                                <td className={lesson.dersid}>
                                                  {lesson.dersid}
                                                </td>
                                                <td className={lesson.dersid}>
                                                  {lesson.bolumadi}
                                                </td>
                                                <td className={lesson.dersid}>
                                                  {teacher.name}
                                                </td>
                                                <td className={lesson.dersid}>
                                                  {lesson.donem}
                                                </td>
                                                <td className={lesson.dersid}>
                                                  {lesson.yil}
                                                </td>
                                                <td className={lesson.dersid}>
                                                  {lesson.sinif}
                                                </td>
                                                <td className={lesson.dersid}>
                                                  {lesson.ogrencilistesi.length}
                                                </td>
                                              </tr>
                                            </tbody>
                                          );
                                        });
                                    })}
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>

                        <div>
                          <Row>
                            <Col>
                              <Card>
                                <CardBody>
                                  <Table>
                                    <thead>
                                      <tr>
                                        <th scope="col">Öğrenci Adı</th>
                                        <th scope="col">Öğrenci No</th>
                                        <th scope="col">Durum</th>
                                      </tr>
                                    </thead>

                                    {data.teachers
                                      .filter(
                                        (teacher) =>
                                          teacher.username === loggedUserName
                                      )
                                      .map((teacher) => {
                                        return teacher.dersler
                                          .filter(
                                            (lesson) =>
                                              lesson.dersid === selectedLesson
                                          )
                                          .map((lesson) => {
                                            return lesson.ogrencilistesi.map(
                                              (student) => {
                                                return (
                                                  <tbody>
                                                    {student.durum === "yok" ? (
                                                      <tr>
                                                        {data.students
                                                          .filter(
                                                            (student2) =>
                                                              student2.username ===
                                                              student.username
                                                          )
                                                          .map((person) => {
                                                            return (
                                                              <td className="table-danger">
                                                                <i
                                                                  className="fa fa-user-circle"
                                                                  aria-hidden="true"
                                                                ></i>{" "}
                                                                {
                                                                  person.ogrenciadi
                                                                }{" "}
                                                              </td>
                                                            );
                                                          })}
                                                        <td className="table-danger">
                                                          {student.username}
                                                        </td>

                                                        <th
                                                          scope="row"
                                                          className="table-danger"
                                                        >
                                                          {student.durum}
                                                        </th>
                                                      </tr>
                                                    ) : (
                                                      <tr>
                                                        {data.students
                                                          .filter(
                                                            (student2) =>
                                                              student2.username ===
                                                              student.username
                                                          )
                                                          .map((person) => {
                                                            return (
                                                              <td className="table-success">
                                                                <i
                                                                  className="fa fa-user-circle"
                                                                  aria-hidden="true"
                                                                ></i>{" "}
                                                                {
                                                                  person.ogrenciadi
                                                                }{" "}
                                                              </td>
                                                            );
                                                          })}
                                                        <td className="table-success">
                                                          {student.username}
                                                        </td>
                                                        <th
                                                          scope="row"
                                                          className="table-success"
                                                        >
                                                          {student.durum}
                                                        </th>
                                                      </tr>
                                                    )}
                                                  </tbody>
                                                );
                                              }
                                            );
                                          });
                                      })}
                                  </Table>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </div>

                        <div align="center">
                          <button
                            onClick={this.onClickStarter.bind(this, dispatch)}
                            className="btn btn-success"
                            style={{ cursor: "pointer" }}
                            aria-hidden="true"
                            data-dismiss="modal"
                          >
                            Kapat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default Ogrencilerim;
