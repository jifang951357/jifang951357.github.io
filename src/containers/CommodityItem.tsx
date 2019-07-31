import * as React from "react";
import { useState, useEffect } from "react";
import Goodtem from "../models/Goodtem";
import { Table, Row, Col, List, Button } from "antd";
import update from "immutability-helper";
import { connect } from "react-redux";
import { commodityOverall, shoppingTrolleyOverall } from "../redux/actions";

function CommodityItem(props) {
  /**
   * 添加购物车
   * @param Goodtem
   */
  const addShoppingTrolley = (Goodtem: Goodtem) => {
    let commodity = props.commodity;
    const shoppingTrolley = props.shoppingTrolley;

    const commodityGoodtem = Goodtem;

    const index = commodity.findIndex(item => Goodtem.key === item.key);
    commodityGoodtem.amount -= 1;
    commodity = update(commodity, {
      [index]: { $set: commodityGoodtem }
    });
    // 对商品列表数据处理
    props.propsCommodityOverall(commodity);
    localStorage.setItem("commodity", JSON.stringify(commodity));

    let shoppingTrolleyNew = [];
    const shoppingTrolleyGoodtem = Goodtem;
    shoppingTrolleyGoodtem.amount =
      commodityGoodtem.total - commodityGoodtem.amount;
    const indexShopping = shoppingTrolley.findIndex(
      item => Goodtem.key === item.key
    );
    if (indexShopping !== -1) {
      // 对购物车列表数据处理
      shoppingTrolleyNew = update(shoppingTrolley, {
        [indexShopping]: { $set: shoppingTrolleyGoodtem }
      });
    } else {
      shoppingTrolleyNew.push(...shoppingTrolley, shoppingTrolleyGoodtem);
    }
    props.propsShoppingTrolleyOverall(shoppingTrolleyNew);
    localStorage.setItem("shoppingTrolley", JSON.stringify(shoppingTrolleyNew));
  };

  return (
    <Row>
      <Col span={6}>{props.item.title}</Col>
      <Col span={4}>{`库存：${props.item.amount}`}</Col>
      <Col span={4}>{`总量：${props.item.total}`}</Col>
      <Col span={10}>
        <Button
          type="primary"
          icon="shopping-cart"
          style={{ float: "right" }}
          disabled={props.item.amount === 0}
          onClick={() => addShoppingTrolley(props.item)}
        >
          添加购物车
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
)(CommodityItem);
