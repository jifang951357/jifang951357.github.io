import * as React from "react";
import { useState, useEffect, useReducer } from "react";
import { Row, Col, Table } from "antd";
import { getStudentList, getTeacherList } from "./api";
import Record from "../models/Record";
import StudentList from "./StudentList";
import objectAssign = require("object-assign");

function reducer(state, action) {
  switch (action.type) {
    case "studentList":
      return objectAssign({}, state, {
        studentList: action.studentList
      });
    case "teacherList":
      return objectAssign({}, state, {
        teacherList: action.teacherList
      });
    default:
      throw new Error();
  }
}
const initialState = { studentList: Array[0], teacherList: Array[0] };

function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 老师列表
  const [teacherList, setTeacherList] = useState<Partial<Record[]>>([]);

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address"
    }
  ];

  useEffect(() => {
    getTeacherList().then((result: { data: Record[] }) => {
      setTeacherList(result.data);
      dispatch({ type: "teacherList", teacherList: result.data });
    });
  }, []);

  return (
    <div style={{ background: "#ffffff", width: "80%", margin: "0 auto" }}>
      <Row>
        <Col>
          <StudentList dispatch={dispatch} state={state} />
        </Col>
        <Col>
          <Table
            dataSource={teacherList}
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Main;
