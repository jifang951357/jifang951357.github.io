import * as React from "react";
import { Form, Row, Col, Input, Button } from "antd";

interface Props {
  handleSearch: (value: { name: string }) => void;
}
/**
 * 学生查询表单
 * @param props
 */
function SearchFormHode(props) {
  const { getFieldDecorator } = props.form;

  const handleSearch = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      for (var i in values) {
        if (!values[i] || values[i] === "undefined") {
          values[i] = "";
        }
      }
      props.handleSearch(values);
    });
  };

  const handleReset = () => {
    props.form.resetFields();
  };

  return (
    <Form layout="inline" onSubmit={e => handleSearch(e)}>
      <Form.Item label="姓名">
        {getFieldDecorator("name", {
          rules: []
        })(<Input />)}
      </Form.Item>
      <Button style={{ top: 3 }} type="primary" htmlType="submit">
        查询
      </Button>
      <Button style={{ marginLeft: 8, top: 3 }} onClick={() => handleReset()}>
        重置
      </Button>
    </Form>
  );
}
const SearchForm = Form.create({})(SearchFormHode);
export default SearchForm;
