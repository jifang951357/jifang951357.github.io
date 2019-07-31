import http from "@sinoui/http";

const url = "http://localhost:3001";

async function getStudentList(params?: any) {
  return http.get(`${url}/studentList`, {
    params
  });
}
async function getTeacherList(params?: any) {
  return http.get(`${url}/teacherList`, {
    params
  });
}

export { getStudentList, getTeacherList };
