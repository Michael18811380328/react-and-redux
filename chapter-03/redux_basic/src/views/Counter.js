import React, { Component, PropTypes } from 'react';
import store from '../Store.js';
import * as Actions from '../Actions.js';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);
    this.state = this.getOwnState();
  }

  getOwnState() {
    // 获取一部分数据（当前组件需要的数据）
    return {
      value: store.getState()[this.props.caption]
    };
  }

  onIncrement() {
    store.dispatch(Actions.increment(this.props.caption));
  }

  onDecrement() {
    store.dispatch(Actions.decrement(this.props.caption));
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) || (nextState.value !== this.state.value);
  }

  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  render() {
    const value = this.state.value;
    const {caption} = this.props;

    return (
      <div>
        <button onClick={this.onIncrement}>+</button>
        <button onClick={this.onDecrement}>-</button>
        <span>{caption} count: {value}</span>
      </div>
    );
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired
};

export default Counter;

