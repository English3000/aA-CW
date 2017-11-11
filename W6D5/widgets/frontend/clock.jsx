import React from 'react';

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
    this.handle = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  componentDidMount() {
    setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.handle.bind(this));
  }

  render () {
    return (
      <div className="flex-div clock-div">
        <h1>Clock Title</h1>
        <p>{this.state.date.getHours()}:{this.state.date.getMinutes()}:{this.state.date.getSeconds()}</p>
      </div>
    );
  }
}

export default Clock;
