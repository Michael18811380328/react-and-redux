import * as ActionTypes from './ActionTypes.js';

// 函数返回对象（执行操作，数据），在 View 层通过 store.dispatch 发送事件到 store 层
export const increment = (counterCaption) => {
  return {
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  };
};

export const decrement = (counterCaption) => {
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  };
};
