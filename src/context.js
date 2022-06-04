import React, { Component } from "react";
import { loggedin1 } from "./Login";

export const UserContext = React.createContext();

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_TEACHER":
      return {
        data: {
          ...state.data,
          teachers: state.data.teachers.filter(
            (teachers) => action.payload !== teachers.username
          ),
        },
      };
    case "ADD_TEACHER":
      return {
        data: {
          ...state.data,
          teachers: [...state.data.teachers, action.payload],
        },
      };
    // case "EDIT_TEACHER":
    //   return {
    //
    //   };

    case "DELETE_LESSON":
      return {
        data: {
          ...state.data,
          teachers: state.data.teachers.map((teacher) => {
            return {
              ...teacher,
              dersler: teacher.dersler.filter(
                (ders) => action.payload !== ders.dersid
              ),
            };
          }),
        },
      };

    case "ADD_LESSON":
      const teacherIndex = state.data.teachers.findIndex(
        (teachers) => teachers.name == action.payload.teacher
      );
      state.data.teachers[teacherIndex].dersler = [
        action.payload.lesson,
        ...state.data.teachers[teacherIndex].dersler,
      ];
      return {
        data: {
          ...state.data,
          teachers: [...state.data.teachers],
        },
      };
    // case "EDIT_LESSON":
    //   return {
    //
    //   };

    case "DELETE_STUDENT":
      return {
        data: {
          ...state.data,
          students: state.data.students.filter(
            (students) => action.payload !== students.username
          ),
          teachers: state.data.teachers.map((teacher) => {
            return {
              ...teacher,
              dersler: teacher.dersler.map((ders) => {
                return {
                  ...ders,
                  ogrencilistesi: ders.ogrencilistesi.filter(
                    (ogrencilistesi) =>
                      action.payload !== ogrencilistesi.username
                  ),
                };
              }),
            };
          }),
        },
      };

    case "ADD_STUDENT":
      return {
        data: {
          ...state.data,
          students: [...state.data.students, action.payload],
        },
      };
    // case "EDIT_STUDENT":
    //   return {
    //
    //   };

    case "ASSIGN_STUDENT":
      const foundStudent = state.data.students.find(
        (student) => student.username === action.payload.username
      );
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.dersid === action.payload.lessonId
        );
        if (foundLesson && foundStudent) {
          foundLesson.ogrencilistesi = [
            { username: action.payload.username, durum: "yok" },
            ...foundLesson.ogrencilistesi,
          ];
        }
      });

      return { data: { ...state.data } };

    case "UNASSIGN_STUDENT":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.dersid === action.payload.lessonId
        );
        if (foundLesson) {
          const foundStudentIndex = foundLesson.ogrencilistesi.findIndex(
            (ogrenci) => ogrenci.username === action.payload.username
          );

          if (foundStudentIndex !== -1) {
            foundLesson.ogrencilistesi.splice(foundStudentIndex, 1);
          }
        }
      });
      return { data: { ...state.data } };

    case "STARTING_YOKLAMA":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.dersid === action.payload.dersid
        );
        if (foundLesson) {
          foundLesson.yoklamakodu = action.payload.yoklamakodu;
        }
      });

      return { data: { ...state.data } };
    case "FINISHING_YOKLAMA":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.yoklamakodu === action.payload.yoklamakodu
        );
        if (foundLesson) {
          foundLesson.ogrencilistesi.forEach(
            (ogrenci) => (ogrenci.durum = "yok")
          );
          foundLesson.yoklamakodu = "";
        }
      });
      return { data: { ...state.data } };

    case "SUBMIT_YOKLAMA":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.yoklamakodu === action.payload.inputCode
        );
        if (foundLesson) {
          const foundStudent = foundLesson.ogrencilistesi.find(
            (ogrenci) => ogrenci.username === action.payload.studentid
          );

          if (foundStudent) {
            foundStudent.durum = "var";
          }
        }
      });
      return { data: { ...state.data } };

    default:
      return state;
  }
};

export class UserProvider extends Component {
  state = {
    // User Login info
    data: {
      superusers: [
        {
          userid: "0",
          name: "superuser",
          username: "superuser",
          password: "123",
          usertype: "superuser",
        },
      ],
      students: [
        {
          ogrenciadi: "İsmet İnönü",
          username: "1191602801",
          password: "123",

          usertype: "student",
        },
        {
          ogrenciadi: "Berkay Cihan",
          username: "1181602807",
          password: "123",

          usertype: "student",
        },
        {
          ogrenciadi: "Celal Bayar",
          username: "1191602802",
          password: "123",

          usertype: "student",
        },
        {
          ogrenciadi: "Cevat Abbas Gürer",
          username: "1191602803",
          password: "123",

          usertype: "student",
        },
        {
          ogrenciadi: "Falih Rıfkı Atay",
          username: "1191602804",
          password: "123",

          usertype: "student",
        },
        {
          ogrenciadi: "Fethi Okyar",
          username: "1191602805",
          password: "123",

          usertype: "student",
        },
        {
          ogrenciadi: "Ali Fuat Cebesoy",
          username: "1191602806",
          password: "123",

          usertype: "student",
        },
      ],

      teachers: [
        {
          name: "Prof. Dr. Muharrem Tolga Sakallı",
          username: "tolga",
          password: "123",
          usertype: "teacher",
          dersler: [
            {
              dersid: "1",
              yoklamakodu: "",
              dersadi: "YAZILIM MÜHENDİSLİĞİ",
              bolumadi: "Bilgisayar Mühendisliği",
              donem: "Bahar",
              yil: "2021-2022",
              sinif: "4",
              ogrencilistesi: [
                {
                  username: "1191602801",
                  durum: "yok",
                },
                {
                  username: "1191602802",
                  durum: "yok",
                },
                {
                  username: "1191602803",
                  durum: "yok",
                },
                {
                  username: "1191602804",
                  durum: "yok",
                },
                {
                  username: "1191602805",
                  durum: "yok",
                },
                {
                  username: "1191602806",
                  durum: "yok",
                },
              ],
            },
            {
              dersid: "2",
              yoklamakodu: "",
              dersadi: "VERİ ANALİZİ",
              bolumadi: "Bilgisayar Mühendisliği",
              donem: "Yaz",
              yil: "2021-2022",
              sinif: "4",
              ogrencilistesi: [
                {
                  username: "1191602801",
                  durum: "yok",
                },
                {
                  username: "1191602802",
                  durum: "yok",
                },
                {
                  username: "1191602803",
                  durum: "yok",
                },
                {
                  username: "1191602804",
                  durum: "yok",
                },
                {
                  username: "1191602805",
                  durum: "yok",
                },
                {
                  username: "1191602806",
                  durum: "yok",
                },
              ],
            },
          ],
        },
        {
          name: "Dr. Altan Mesut",
          username: "altan",
          password: "123",
          usertype: "teacher",
          dersler: [
            {
              dersid: "3",
              yoklamakodu: "",
              dersadi: "WEB TABANLI PROGRAMLAMA",
              bolumadi: "Bilgisayar Mühendisliği",
              donem: "Bahar",
              yil: "2021-2022",
              sinif: "3",
              ogrencilistesi: [
                {
                  username: "1191602801",
                  durum: "yok",
                },
                {
                  username: "1191602802",
                  durum: "yok",
                },
                {
                  username: "1191602803",
                  durum: "yok",
                },
                {
                  username: "1191602804",
                  durum: "yok",
                },
                {
                  username: "1191602805",
                  durum: "yok",
                },
                {
                  username: "1191602806",
                  durum: "yok",
                },
              ],
            },
            {
              dersid: "4",
              yoklamakodu: "",
              dersadi: "BİLGİ GÜVENLİĞİ",
              bolumadi: "Bilgisayar Mühendisliği",
              donem: "Bahar",
              yil: "2021-2022",
              sinif: "4",
              ogrencilistesi: [
                {
                  username: "1191602801",
                  durum: "yok",
                },
                {
                  username: "1191602802",
                  durum: "yok",
                },
                {
                  username: "1191602803",
                  durum: "yok",
                },
                {
                  username: "1191602804",
                  durum: "yok",
                },
                {
                  username: "1191602805",
                  durum: "yok",
                },
                {
                  username: "1191602806",
                  durum: "yok",
                },
              ],
            },
          ],
        },
        {
          name: "Dr. Öğr. Emir Öztürk",
          username: "emir",
          password: "123",
          usertype: "teacher",
          dersler: [
            {
              dersid: "5",
              yoklamakodu: "",
              dersadi: "NESNE TABANLI PROGRAMLAMA",
              bolumadi: "Bilgisayar Mühendisliği",
              donem: "Güz",
              yil: "2021-2022",
              sinif: "2",
              ogrencilistesi: [
                {
                  username: "1191602801",
                  durum: "yok",
                },
                {
                  username: "1191602802",
                  durum: "yok",
                },
                {
                  username: "1191602803",
                  durum: "yok",
                },
                {
                  username: "1191602804",
                  durum: "yok",
                },
                {
                  username: "1191602805",
                  durum: "yok",
                },
                {
                  username: "1191602806",
                  durum: "yok",
                },
              ],
            },
            {
              dersid: "6",
              yoklamakodu: "",
              dersadi: "BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ",
              bolumadi: "Bilgisayar Mühendisliği",
              donem: "Güz",
              yil: "2021-2022",
              sinif: "1",
              ogrencilistesi: [
                {
                  username: "1191602801",
                  durum: "yok",
                },
                {
                  username: "1191602802",
                  durum: "yok",
                },
                {
                  username: "1191602803",
                  durum: "yok",
                },
                {
                  username: "1191602804",
                  durum: "yok",
                },
                {
                  username: "1191602805",
                  durum: "yok",
                },
                {
                  username: "1191602806",
                  durum: "yok",
                },
              ],
            },
          ],
        },
      ],
    },
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
const UserConsumer = UserContext.Consumer;
export default UserConsumer;
