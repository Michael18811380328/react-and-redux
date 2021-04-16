import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import TodoApp from './TodoApp';

import store from './Store.js';

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

// import { Provider } from 'react-redux';
// import store from './Store';
// import TodoApp from './TodoApp';

// 顶层组件通过 Provider 把 store 绑定到全局，下层组件可以直接使用
// ReactDOM.render(
//   <Provider store={store}>
//     <TodoApp/>
//   </Provider>,
//   document.getElementById('root')
// );
