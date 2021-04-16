import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';

// perf 性能优化工具
// 参考 https://blog.csdn.net/zhuzhupozhuzhuxia/article/details/77198851
import Perf from 'react-addons-perf'

// 优化工具绑定到全局
const win = window;
win.Perf = Perf

// 合并 reducers
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

// 在开发环境中，加入中间件。如果 reducer 不是纯函数，直接修改了 state，这里会给出警告
// 参考：https://www.npmjs.com/package/redux-immutable-state-invariant
// https://blog.csdn.net/fendouyoungman/article/details/111549073
const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

// compose 增强 store 的功能，参数是多个函数，把传入的参数依次通过这些函数，类似 aray.reduce，middleware
// 参考：https://blog.csdn.net/astonishqft/article/details/82791622
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);

// const reducer = combineReducers({
//   todos: todoReducer,
//   filter: filterReducer,
// });

// const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant'));
// }

// const storeEnhancers = compose(
//   applyMiddleware(...middlewares),
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

// compose 函数源码
// export default function compose(...funcs) {
//   if (funcs.length === 0) {
//     return arg => arg
//   }
//   if (funcs.length === 1) {
//     return funcs[0]
//   }
//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return arg => arg;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce((a, b) => {
//     (...args) => a(b(...args))
//   })
// } 
