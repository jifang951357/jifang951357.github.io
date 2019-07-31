import * as React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Table, Divider, Button } from "antd";
import { getStudentList, getTeacherList } from "./api";
import Record from "../models/Record";
import SearchForm from "./SearchForm";
import useRestAPi from "./useRestAPi";

function StudentList(porps) {
  // 学生列表
  //   const [studentList, setStudentList] = useState<Partial<Record[]>>([]);

  const dataSource = useRestAPi<Record>(
    "http://localhost:3001/studentList",
    "key"
  );

  //   useEffect(() => {
  //     const studentListLocal = localStorage.getItem("studentList");
  //     if (studentListLocal) {
  //       setStudentList(JSON.parse(studentListLocal));
  //     } else {
  //       getStudentList().then((result: { data: Record[] }) => {
  //         setStudentList(result.data);
  //         localStorage.setItem("studentList", JSON.stringify(result.data));
  //       });
  //     }
  //   });

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
    },
    {
      title: "操作",
      dataIndex: "opt",
      key: "opt",
      render: (value: string, item: Record, index: number) => {
        return (
          <div>
            <a
              href="javascript:;"
              onClick={() => {
                dataSource.remove(item.key);
              }}
            >
              删除
            </a>
            <Divider type="vertical" />
            <a
              id="edit"
              href="javascript:;"
              onClick={() => {
                dataSource.update({ ...item, name: "学生123" });
              }}
            >
              编辑
            </a>
          </div>
        );
      }
    }
  ];

  /**
   * 查询数据
   * @param value
   */
  const handleSearch = (value: { name: string }) => {
    dataSource.query({
      ...value
    });
  };

  function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
  }

  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      <Row style={{ padding: "0 24px 10px" }}>
        <Col style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {
              dataSource.save({
                key: uuid(),
                name: "学生",
                age: 11,
                address: "222222222"
              });
            }}
          >
            新建
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={dataSource.items}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}

export default StudentList;
