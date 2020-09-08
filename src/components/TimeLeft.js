import React, { Component } from "react";
import BitcoinPrices from "./BitcoinPrices.js";
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        time: {
          updated: "",
          updatedISO: "",
          updateduk: "",
        },
        disclaimer: "",
        chartName: "",
        bpi: {
          USD: {
            code: "",
            symbol: "",
            rate: "",
            description: "",
            rate_float: 0,
          },
          GBP: {
            code: "",
            symbol: "",
            rate: "",
            description: "",
            rate_float: 0,
          },
          EUR: {
            code: "",
            symbol: "",
            rate: "",
            description: "",
            rate_float: 0,
          },
        },
      },
      show: true,
      hours: 10,
      minutes: 0,
      seconds: 0,
    };
  }
  //In here if minutes and seconds 59 , other time value increments 1.
  Increment = (event) => {
    if (event.target.name === "seconds" && this.state.seconds === 59) {
      if (this.state.minutes === 59) {
        this.setState({ seconds: 0, minutes: 0, hours: this.state.hours + 1 });
      } else {
        this.setState({ seconds: 0, minutes: this.state.minutes + 1 });
      }
    } else if (event.target.name === "minutes" && this.state.minutes === 59) {
      this.setState({ minutes: 0, hours: this.state.hours + 1 });
    } else {
      this.setState({
        [event.target.name]: this.state[event.target.name] + 1,
      });
    }
  };
  async getData() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      this.setState({ response: JSON.parse(xhr.responseText) });
      //   console.log(xhr.responseText);
    });
    // open the request with the verb and the url
    xhr.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
    // send the request

    xhr.send();
  }

  Decrement = (event) => {
    if (event.target.name === "seconds" && this.state.seconds === 0) {
      if (this.state.minutes === 0) {
        if (this.state.hours === 0) {
          console.log("Daha fazla azaltamazsınız!");
        } else {
          this.setState({
            seconds: 59,
            minutes: 59,
            hours: this.state.hours - 1,
          });
        }
      } else {
        this.setState({ seconds: 59, minutes: this.state.minutes - 1 });
      }
    } else if (event.target.name === "minutes" && this.state.minutes === 0) {
      this.setState({ minutes: 59, hours: this.state.hours - 1 });
    } else if (event.target.name === "hours" && this.state.hours === 0) {
      console.log("Daha fazla azaltamazsınız!");
    } else {
      this.setState({
        [event.target.name]: this.state[event.target.name] - 1,
      });
    }
  };
  componentDidMount() {
    //This method is time counter and counts down.
    this.myInterval = setInterval(() => {
      const { hours, seconds, minutes } = this.state;
      this.getData(); // In that time the btc data is getting asynchronously
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }

      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(this.myInterval);
          } else {
            this.setState(({ hours }) => ({
              // if minutes and seconds 00 then they happen 59.
              hours: hours - 1,
              minutes: 59,
              seconds: 59,
            }));
          }
        } else {
          this.setState(({ minutes }) => ({
            //When minute decrements , seconds are begin from 59.
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    //When all time variable are zero, interval is cleared.
    clearInterval(this.myInterval);
  }

  render() {
    //Here is JSX and this is front end part.
    const { hours, seconds, minutes } = this.state;
    return (
      <div>
        <div>
          <button
            style={{
              border: "none",
              background: "none",
              color: "white",
              marginLeft: "61%",
              width: "5%",
              height: "5%",
            }}
            name="hours"
            onClick={this.Increment}
          >
            +
          </button>
          <button
            style={{
              border: "none",
              background: "none",
              color: "white",
              marginLeft: "9%",
              width: "5%",
              height: "5%",
            }}
            name="minutes"
            onClick={this.Increment}
          >
            +
          </button>
          <button
            style={{
              border: "none",
              background: "none",
              color: "white",
              marginLeft: "10%",
              width: "5%",
              height: "5%",
            }}
            name="seconds"
            onClick={this.Increment}
          >
            +
          </button>
        </div>
        {minutes === 0 && seconds === 0 && hours === 0 ? (
          <h1>Busted!</h1>
        ) : (
          <h1>
            Time Remaining &raquo; {hours} {" :"}{" "}
            {minutes < 10 ? `0${minutes}` : minutes} {":"} {""}{" "}
            {seconds < 10 ? `0${seconds}` : seconds}{" "}
          </h1>
        )}
        <div>
          <button
            style={{
              border: "none",
              background: "none",
              color: "white",
              marginLeft: "62%",
              width: "5%",
              height: "5%",
            }}
            name="hours"
            onClick={this.Decrement}
          >
            -
          </button>
          <button
            style={{
              border: "none",
              background: "none",
              color: "white",
              marginLeft: "9%",
              width: "5%",
              height: "5%",
            }}
            name="minutes"
            onClick={this.Decrement}
          >
            -
          </button>
          <button
            style={{
              border: "none",
              background: "none",
              color: "white",
              marginLeft: "10%",
              width: "5%",
              height: "5%",
            }}
            name="seconds"
            onClick={this.Decrement}
          >
            -
          </button>
        </div>
        <BitcoinPrices data={this.state.response.bpi} />
        {/* BitcoinPrices is other component and in that component we use props and called the data with props. */}
      </div>
    );
  }
}
