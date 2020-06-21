import React, { Component } from "react";
import axios from "axios";

const URL = "http://localhost:8080/auth/login";

class Order extends Component {
  render() {
    return (
      <div class="row">
        <div class="cell">Vincent Williamson</div>
        <div class="cell">31</div>
        <div class="cell">iOS Developer</div>
        <div class="cell">Washington</div>
      </div>
    );
  }
}

export default Order;
