import React from 'react';
import {view as Todos} from './todos/';
import {view as Filter} from './filter/';

// APP组件直接引用子功能的视图组件
// 函数式组件无状态
function TodoApp() {
  return (
    <div>
      <Todos />
      <Filter />
    </div>
  );
}

export default TodoApp;
