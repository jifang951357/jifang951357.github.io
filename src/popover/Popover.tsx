import * as React from "react";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";
import Container from "./Container";
interface Props {
  placement?: string; // 弹窗方向
  buttonText: string; // 按钮文本
  title?: React.ReactNode | string; // 标题
  content?: React.ReactNode | string; // 内容
  trigger?: "hover" | "click"; // 触发方式
}

function Popover(props) {
  const [off, setOff] = useState(false);

  const ButtonNew = styled.button`
    line-height: 1.499;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border-color: #d9d9d9;
  `;

  const Arrow = styled.div`
    position: absolute;
    display: block;
    width: 8.48528137px;
    height: 8.48528137px;
    background: transparent;
    border-style: solid;
    border-width: 4.24264069px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
    transform: translateX(-50%) rotate(45deg);
    ${props => {
      switch (props.placement) {
        case "rightBottom":
          return `
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #fff;
    border-left-color: #fff;
    -webkit-box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    top:80%;
    left: 0px;`;
        case "rightTop":
          return `
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #fff;
    border-left-color: #fff;
    -webkit-box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    top:20%;
    left: 0px;`;
        case "right":
          return `left: 0px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: #fff;
    border-left-color: #fff;
    -webkit-box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    top:42%;`;
        case "leftBottom":
          return `
    border-top-color: #fff;
    border-right-color: #fff;
    border-bottom-color: transparent;
    border-left-color: transparent;
    -webkit-box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    right: -8px;
    top: 80%;`;
        case "leftTop":
          return `
    border-top-color: #fff;
    border-right-color: #fff;
    border-bottom-color: transparent;
    border-left-color: transparent;
    -webkit-box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    right: -8px;
    top: 20%;`;
        case "left":
          return `
    border-top-color: #fff;
    border-right-color: #fff;
    border-bottom-color: transparent;
    border-left-color: transparent;
    -webkit-box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    right: -8px;
    top: 42%;`;
        case "bottonRight":
          return `border-top-color: #fff;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #fff;
    -webkit-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
    left: 80%;
    top: -3px;`;
        case "bottonLeft":
          return `border-top-color: #fff;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #fff;
    -webkit-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
    left: 20%;
    top: -3px;`;
        case "botton":
          return `border-top-color: #fff;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #fff;
    -webkit-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
    left: 50%;
    top: -3px;`;
        case "topRight":
          return `bottom: 6.2px;
    border-top-color: transparent;
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: transparent;
    -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.07);
    box-shadow: 3px 3px 7px rgba(0,0,0,0.07);
    left: 80%;
    bottom: -3px`;
        case "topLeft":
          return `bottom: 6.2px;
    border-top-color: transparent;
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: transparent;
    -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.07);
    box-shadow: 3px 3px 7px rgba(0,0,0,0.07);
    left: 20%;
    bottom: -3px`;
        case "top":
        default:
          return `bottom: 6.2px;
    border-top-color: transparent;
    border-right-color: #fff;
    border-bottom-color: #fff;
    border-left-color: transparent;
    -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.07);
    box-shadow: 3px 3px 7px rgba(0,0,0,0.07);
    left: 50%;
    bottom: -3px`;
      }
    }}
  `;

  const Tooltip = styled.div`
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 2px;
  `;

  const Placement = styled.div`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: absolute;
    z-index: 1030;
    font-weight: normal;
    white-space: normal;
    text-align: left;
    cursor: auto;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    top: ${props => props.pageY && `${props.pageY}px`};
    left: ${props => props.pageX && `${props.pageX}px`};
  `;

  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [trigger, setTrigger] = useState("");

  let callbackValue = {};
  useEffect(() => {
    setOff(props.off || false);
    setTrigger(props.trigger || "hover");
  }, [props.off, props.trigger]);

  const callback = value => {
    callbackValue = value;
  };

  const CommonalityCalculate = e => {
    const parent = e.target.getBoundingClientRect();
    switch (props.placement) {
      case "rightBottom":
        setPageY(parent.top - (callbackValue.height - parent.height));
        setPageX(parent.left + parent.width + 9);
        break;
      case "rightTop":
        setPageY(parent.top);
        setPageX(parent.left + parent.width + 9);
        break;
      case "right":
        setPageY(parent.top - callbackValue.height / 2 + parent.height / 2);
        setPageX(parent.left + parent.width + 9);
        break;
      case "leftBottom":
        setPageY(parent.top - (callbackValue.height - parent.height));
        setPageX(parent.left - callbackValue.width - 9);
        break;
      case "leftTop":
        setPageY(parent.top);
        setPageX(parent.left - callbackValue.width - 9);
        break;
      case "left":
        setPageY(parent.top - callbackValue.height / 2 + parent.height / 2);
        setPageX(parent.left - callbackValue.width - 9);
        break;
      case "bottonRight":
        setPageY(parent.top + parent.height + 9);
        setPageX(parent.left - (callbackValue.height - parent.height));
        break;
      case "bottonLeft":
        setPageY(parent.top + parent.height + 9);
        setPageX(parent.left);
        break;
      case "botton":
        setPageY(parent.top + parent.height + 9);
        setPageX(parent.left - callbackValue.width / 2 + parent.width / 2);
        break;
      case "topRight":
        setPageY(parent.top - callbackValue.height - 9);
        setPageX(parent.left - (callbackValue.width - parent.width));
        break;
      case "topLeft":
        setPageY(parent.top - callbackValue.height - 9);
        setPageX(parent.left);
        break;
      case "top":
      default:
        setPageY(parent.top - callbackValue.height - 9);
        setPageX(parent.left - callbackValue.width / 2 + parent.width / 2);
    }
  };

  return (
    <div style={{ margin: "80px auto 0 auto", textAlign: "center" }}>
      <ButtonNew
        onClick={e => {
          if (trigger === "click") {
            CommonalityCalculate(e);
            if (props.off === undefined) {
              setOff(!off);
            }
          }
        }}
        onMouseOver={e => {
          if (trigger === "hover") {
            CommonalityCalculate(e);
            if (props.off === undefined) {
              setOff(true);
            }
          }
        }}
        onMouseOut={e => {
          if (trigger === "hover") {
            if (props.off === undefined) {
              setOff(false);
            }
          }
        }}
      >
        {props.buttonText}
        <Container callback={callback}>
          <Placement
            pageX={pageX}
            pageY={pageY}
            // style={off ? { display: "block" } : { overflow: "hidden" }}
            style={off ? { visibility: "visible" } : { visibility: "hidden" }}
          >
            <div style={{ margin: "0", padding: "0" }}>
              <Arrow placement={props.placement} />
              <Tooltip>
                <div>{props.title}</div>
                <hr />
                <div>{props.content}</div>
              </Tooltip>
            </div>
          </Placement>
        </Container>
      </ButtonNew>

      {/* <Rotate>111111111</Rotate> */}
    </div>
  );
}
export default Popover;
