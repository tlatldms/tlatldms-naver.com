import React, { useEffect, useState, Component } from "react";
import Axios from "axios";

const Popup = order => {
  useEffect(() => {
    console.log(order);
    console.log(order.order.member.username);
  }, []);
  return (
    <div className="modal-box">
      <div></div>
      주문자: {order.order.member.username}
      <br />
      {order.order.menu1} : {order.order.quantity1}개 | {order.order.price1}원
      <br />
      {order.order.menu2} : {order.order.quantity2}개 | {order.order.price2}원
      <br />
      주문 시간: {order.order.order_dt}
      <br />총 {order.order.totalPrice} 원
      <br />
      <button className="modalBtn" onClick={order.fun}>
        접수 완료
      </button>
    </div>
  );
};

export default Popup;
