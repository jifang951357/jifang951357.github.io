import * as React from "react";
import { useState, useEffect } from "react";
import Goodtem from "../models/Goodtem";
import { Table, Row, Col, List, Button } from "antd";
import CommodityItem from "./CommodityItem";
import ShoppingTrolleyItem from "./ShoppingTrolleyItem";
import { connect } from "react-redux";
import { commodityOverall, shoppingTrolleyOverall } from "../redux/actions";
/**
 * 购物车管理容器
 */
function ShoppingCartContainer(props) {
  // 商品列表 初始数据
  const commodityInitialize = [
    {
      key: 1,
      title: "苹果",
      amount: 10,
      total: 10
    },
    {
      key: 2,
      title: "手机",
      amount: 10,
      total: 10
    },
    {
      key: 3,
      title: "樱桃",
      amount: 10,
      total: 10
    },
    {
      key: 4,
      title: "口红",
      amount: 10,
      total: 10
    }
  ];
  // 购物车列表 初始数据
  const shoppingTrolleyInitialize = [];

  // 商品列表
  const [commodity, setCommodity] = useState<Partial<Goodtem[]>>([]);
  // 购物车列表
  const [shoppingTrolley, setShoppingTrolley] = useState<Partial<Goodtem[]>>(
    []
  );

  useEffect(() => {
    const commodityLocalStorage = localStorage.getItem("commodity");
    if (commodityLocalStorage) {
      setCommodity(JSON.parse(commodityLocalStorage));
      props.propsCommodityOverall(JSON.parse(commodityLocalStorage));
    } else {
      setCommodity(commodityInitialize);
      localStorage.setItem("commodity", JSON.stringify(commodityInitialize));
      props.propsCommodityOverall(commodityInitialize);
    }

    const shoppingTrolleyLocalStorage = localStorage.getItem("shoppingTrolley");
    if (shoppingTrolleyLocalStorage) {
      setShoppingTrolley(JSON.parse(shoppingTrolleyLocalStorage));
      props.propsShoppingTrolleyOverall(
        JSON.parse(shoppingTrolleyLocalStorage)
      );
    } else {
      setShoppingTrolley(shoppingTrolleyInitialize);
      localStorage.setItem(
        "shoppingTrolley",
        JSON.stringify(shoppingTrolleyInitialize)
      );
      props.propsShoppingTrolleyOverall(shoppingTrolleyInitialize);
    }
  });

  return (
    <div style={{ background: "#ffffff", width: "80%", margin: "0 auto" }}>
      <Row>
        <Col span={12}>
          <List
            bordered
            itemLayout="horizontal"
            dataSource={commodity}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={<CommodityItem item={item} />} />
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <List
            bordered
            itemLayout="horizontal"
            dataSource={shoppingTrolley}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={<ShoppingTrolleyItem item={item} />} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    commodity: state.change.commodity,
    shoppingTrolley: state.change.shoppingTrolley
  };
}

function mapDispatchToProps(dispatch) {
  return {
    propsCommodityOverall: (Commodity: Goodtem[]) =>
      dispatch(commodityOverall(Commodity)),
    propsShoppingTrolleyOverall: (ShoppingTrolley: Goodtem[]) =>
      dispatch(shoppingTrolleyOverall(ShoppingTrolley))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartContainer);

// export default ShoppingCartContainer;
