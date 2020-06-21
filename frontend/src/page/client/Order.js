import React, { Component } from "react";
import OrderComp from "./OrderComp";
class OrderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table">
              <div class="row header">
                <div class="cell">Full Name</div>
                <div class="cell">Age</div>
                <div class="cell">Job Title</div>
                <div class="cell">Location</div>
              </div>
              <OrderComp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderComponent;
