import * as React from "react";
import { useState, useEffect, Component } from "react";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";

interface Props {
  callback: (value: { [x: string]: string }) => void;
}

class Container extends Component<Props> {
  constructor(props) {
    super(props);
    this.node = document.createElement("div");
  }
  public componentDidMount() {
    document.body.appendChild(this.node);
    this.props.callback(this.node.lastChild.getBoundingClientRect());
  }
  public componentWillUnmount() {
    document.body.removeChild(this.node);
  }
  render() {
    return createPortal(this.props.children, this.node);
  }
}

export default Container;
