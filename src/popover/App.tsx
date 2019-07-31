import * as React from "react";
import { useState, useEffect } from "react";
import Popover from "./Popover";
import { Row, Col } from "antd";

function App(props) {
  const [off, setOff] = useState(false);

  return (
    <div>
      <Popover
        placement="top"
        buttonText="top"
        title={<h3>标题</h3>}
        content={<div>top显示方式demo</div>}
        trigger="click"
      />
      <Popover
        placement="left"
        buttonText="left"
        title={<h3>标题</h3>}
        content={<div>left显示方式demo</div>}
      />
      <Popover
        placement="right"
        buttonText="right"
        title={<h3>标题</h3>}
        content={<div>right显示方式demo</div>}
      />

      <Popover
        placement="botton"
        buttonText="botton"
        title={<h3>标题</h3>}
        content={<div>botton显示方式demo</div>}
        trigger="click"
      />
    </div>
  );
}
export default App;
