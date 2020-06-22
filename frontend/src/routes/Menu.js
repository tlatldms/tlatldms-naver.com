import React, { Component } from "react";
import Axios from "axios";

const ip = "http://localhost:8080/menuimgs/";
const Menu = props => {
  return (
    <div className="menu-card">
      <img
        className="menu-img"
        src={`${ip}${props.menu.menuImgUuid}`}
        alt="썸네일"
      />
      <br />
      메뉴 이름: {props.menu.menuName}
      <br />
      가격: {props.menu.price}
      <br />
      설명: {props.menu.description}
    </div>
  );
};

export default Menu;
