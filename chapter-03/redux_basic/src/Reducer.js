import * as ActionTypes from './ActionTypes.js';

// 数据唯一（直接Object.assign, 不推荐更改state的属性）
export default (state, action) => {
  const {counterCaption} = action;
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {...state, [counterCaption]: state[counterCaption] + 1};
    case ActionTypes.DECREMENT:
      return {...state, [counterCaption]: state[counterCaption] - 1};
    default:
      return state
  }
}
