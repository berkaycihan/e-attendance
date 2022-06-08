import React, { Component } from "react";
import UserConsumer from "../context";
import "../App.css";
//import PropTypes from "prop-types";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
// import Ogrenci from './components/Ogrenci';
import Ogrencilerim from "./Ogrencilerim";
// import Ders from './components/Ders';
// import { userInfo } from 'os';

var selectedLesson = "";

class Derslerim extends Component {
  state = {
    isVisible: false,
    adminDisable: false,
  };
  onClickEventTitle = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  lessonClick = (e) => {
    this.setState({
      //:e.target.className
    });
    //console.log(e);
    //console.log(e.currentTarget.className);
    //e.currentTarget.className = "table-info";
    //console.log(e.target.className);
    selectedLesson = e.target.className;
  };

  render() {
    const { title } = this.props;
    const { loggedUserName } = this.props;
    const { isVisible } = this.state;
    const { adminDisable } = this.props;
    return (
      <UserConsumer>
        {(value) => {
          const { data } = value;

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
                        >
                          <i
                            className="fa fa-plus-square-o"
                            aria-hidden="true"
                          ></i>
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

                              {data.teachers
                                .filter(
                                  (teacher) =>
                                    teacher.username === loggedUserName
                                )
                                .map((teacher) => {
                                  return teacher.dersler.map((lesson) => {
                                    return (
                                      <tbody className={lesson.dersid}>
                                        <tr
                                          className="table-info"
                                          style={{ cursor: "pointer" }}
                                          onClick={this.lessonClick.bind(this)}
                                        >
                                          <td className={lesson.dersid}>
                                            {lesson.dersadi}
                                          </td>
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

                                          {adminDisable ? (
                                            <td className="table-light">
                                              <i
                                                className="fa fa-trash-o"
                                                style={{ cursor: "pointer" }}
                                                aria-hidden="true"
                                              ></i>
                                            </td>
                                          ) : null}
                                          {adminDisable ? (
                                            <td className="table-light">
                                              <i
                                                className="fa fa-pencil-square-o"
                                                style={{ cursor: "pointer" }}
                                                aria-hidden="true"
                                              ></i>
                                            </td>
                                          ) : null}
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
                  </div>
                ) : null}
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export { selectedLesson };

export default Derslerim;
