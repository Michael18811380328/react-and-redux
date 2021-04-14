import React, { Component } from 'react';
import store from '../Store.js';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = this.getOwnState();
  }

  // 订阅 store 的变化；自身组件重新获取 state
  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.sum !== this.state.sum;
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  // 从 redux-store 中获取 state
  getOwnState() {
    const state = store.getState();
    let sum = 0;
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        sum += state[key];
      }
    }
    return { sum: sum };
  }

  render() {
    const sum = this.state.sum;
    return (
      <div>Total Count: {sum}</div>
    );
  }
}

export default Summary;
