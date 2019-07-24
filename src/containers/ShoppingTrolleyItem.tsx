import * as React from "react";
import { useState, useEffect } from "react";
import Goodtem from "../models/Goodtem";
import { Table, Row, Col, List, Button } from "antd";
import update from "immutability-helper";
import { connect } from "react-redux";
import { commodityOverall, shoppingTrolleyOverall } from "../redux/actions";

/**
 * 购物车列表item
 * @param props
 */
function ShoppingTrolleyItem(props) {
  // 添加数量开关
  const [addButton, setAddButton] = useState(false);
  // 减少数量开关
  const [subButton, setSubButton] = useState(false);

  useEffect(() => {
    if (props.item.total === props.item.amount) {
      setAddButton(true);
    } else {
      setAddButton(false);
    }
    if (props.item.amount === 1) {
      setSubButton(true);
    } else {
      setSubButton(false);
    }
  });

  /**
   * 添加数量操作
   * @param Goodtem
   */
  const addShoppingTrolley = () => {
    let commodity = props.commodity;
    const shoppingTrolley = props.shoppingTrolley;

    const index = commodity.findIndex(item => props.item.key === item.key);
    const commodityItem = commodity[index];
    commodityItem.amount -= 1;
    commodity = update(commodity, {
      [index]: { $set: commodityItem }
    });

    // 对商品列表数据处理
    props.propsCommodityOverall(commodity);
    localStorage.setItem("commodity", JSON.stringify(commodity));

    // 对购物车列表数据处理
    let shoppingTrolleyNew = [];
    const indexShopping = shoppingTrolley.findIndex(
      item => props.item.key === item.key
    );
    const shoppingTrolleyItem = shoppingTrolley[indexShopping];
    shoppingTrolleyItem.amount = commodityItem.total - commodityItem.amount;
    if (indexShopping !== -1) {
      shoppingTrolleyNew = update(shoppingTrolley, {
        [indexShopping]: { $set: shoppingTrolleyItem }
      });
    } else {
      shoppingTrolleyNew.push(...shoppingTrolley, shoppingTrolleyItem);
    }
    props.propsShoppingTrolleyOverall(shoppingTrolleyNew);
    localStorage.setItem("shoppingTrolley", JSON.stringify(shoppingTrolleyNew));
  };

  /**
   * 减少数量操作
   * @param Goodtem
   */
  const subShoppingTrolley = () => {
    let commodity = props.commodity;
    const shoppingTrolley = props.shoppingTrolley;

    const index = commodity.findIndex(item => props.item.key === item.key);
    const commodityItem = commodity[index];
    commodityItem.amount += 1;
    commodity = update(commodity, {
      [index]: { $set: commodityItem }
    });
    // 对商品列表数据处理
    props.propsCommodityOverall(commodity);
    localStorage.setItem("commodity", JSON.stringify(commodity));

    let shoppingTrolleyNew = [];
    const indexShopping = shoppingTrolley.findIndex(
      item => props.item.key === item.key
    );
    const shoppingTrolleyItem = shoppingTrolley[indexShopping];
    shoppingTrolleyItem.amount = commodityItem.total - commodityItem.amount;
    if (indexShopping !== -1) {
      // 对购物车列表数据处理
      shoppingTrolleyNew = update(shoppingTrolley, {
        [indexShopping]: { $set: shoppingTrolleyItem }
      });
    } else {
      shoppingTrolleyNew.push(...shoppingTrolley, shoppingTrolleyItem);
    }
    props.propsShoppingTrolleyOverall(shoppingTrolleyNew);
    localStorage.setItem("shoppingTrolley", JSON.stringify(shoppingTrolleyNew));
  };

  /**
   * 移除购物车商品
   */
  const removeShoppingTrolley = () => {
    let commodity = props.commodity;
    let shoppingTrolley = props.shoppingTrolley;

    // 对商品列表库存回写
    const index = commodity.findIndex(item => props.item.key === item.key);
    const commodityItem = commodity[index];
    commodityItem.amount = commodityItem.total;
    commodity = update(commodity, {
      [index]: { $set: commodityItem }
    });
    props.propsCommodityOverall(commodity);
    localStorage.setItem("commodity", JSON.stringify(commodity));

    // 购物车清空
    const shoppingTrolleyNew = shoppingTrolley.filter(
      item => props.item.key !== item.key
    );
    props.propsShoppingTrolleyOverall(shoppingTrolleyNew);
    localStorage.setItem("shoppingTrolley", JSON.stringify(shoppingTrolleyNew));
  };

  return (
    <Row>
      <Col span={6}>{props.item.title}</Col>
      <Col span={2} style={{ textAlign: "center" }}>
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          disabled={addButton}
          onClick={() => addShoppingTrolley()}
        />
      </Col>
      <Col span={4} style={{ textAlign: "center" }}>{`数量：${
        props.item.amount
      }`}</Col>
      <Col span={2} style={{ textAlign: "center" }}>
        <Button
          type="primary"
          shape="circle"
          icon="minus"
          onClick={() => subShoppingTrolley()}
          disabled={subButton}
        />
      </Col>
      <Col span={8}>
        <Button
          type="primary"
          icon="rest"
          style={{ float: "right" }}
          onClick={() => removeShoppingTrolley()}
        >
          移除
        </Button>
      </Col>
    </Row>
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
)(ShoppingTrolleyItem);
