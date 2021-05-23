import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';

// 主要使用这个库
import Perf from 'react-addons-perf'

const win = window;
win.Perf = Perf

// 把全部的 reducer 组合成一个 reducer
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

// 生产环境下面使用这个库
const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

// 生产环境下面增强
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

// 初始化state
const initialState = {
  todos: [
    {
      id: 0,
      text: 'First',
      completed: true
    },
    {
      id: 1,
      text: 'Second',
      completed: false
    },
    {
      id: 2,
      text: 'Third',
      completed: true
    }
  ]

}
export default createStore(reducer, initialState, storeEnhancers);

