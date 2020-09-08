import React, { Component } from "react";

export default class Bitcoin extends Component {
  render() {
    return (
      <div
        style={{
          border: " 5px outset lightblue",
          backgroundColor: "lightblue",
          height: "250px",
          width: "100%",
          marginTop: "8%",
        }}
      >
        <h1
          style={{
            color: "#282c34",
            marginTop: "8%",
          }}
        >
          {"1 BTC : $ " + this.props.data.USD.rate}
        </h1>
        <h1
          style={{
            color: "#282c34",
          }}
        >
          {"1 BTC : £ " + this.props.data.GBP.rate}
        </h1>
        <h1
          style={{
            color: "#282c34",
          }}
        >
          {"1 BTC :  € " + this.props.data.EUR.rate}
        </h1>
      </div>
    );
  }
}
