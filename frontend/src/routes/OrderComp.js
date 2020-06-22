import React, { Component } from "react";

const Order = props => {
  if (props.order) {
    return (
      <div className="row">
        <div className="cell"> {props.order.member.username} </div>
        <div className="cell">{props.order.menu1}</div>
        <div className="cell">{props.order.totalPrice}</div>
        <div className="cell">{props.order.order_dt}</div>
        <div className="cell">
          {props.order.orderStatus == 0 ? "대기중" : "완료"}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Order;
