import React, {PropTypes} from 'react';
//import {bindActionCreators} from 'redux';
import TodoItem from './todoItem.js';
import {FilterTypes} from '../../constants.js';

// 主要是这两个
import {toggleTodo, removeTodo} from '../actions.js';
import {connect} from 'react-redux';

const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
  return (
    <ul className="todo-list">
    {todos.map((item) => (
      <TodoItem
        key={item.id}
        text={item.text}
        completed={item.completed}
        onToggle={() => onToggleTodo(item.id)}
        onRemove={() => onRemoveTodo(item.id)}
      />
    ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed);
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

// 把 store 中的 state 转发到组件内部
const mapStateToProps = (state) => {
  return {
    // 把全部的 todos 过滤后，传到组件内部 todos
    todos: selectVisibleTodos(state.todos, state.filter)
  };
}

// 把组件内部的时间发布到外部
// 通过 actions 发出事件，参数从内部传出
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    onRemoveTodo: (id) => {
      dispatch(removeTodo(id));
    }
  };
};

/*
const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleTodo: toggleTodo,
  onRemoveTodo: removeTodo
}, dispatch);
*/

// 通过 connect 高阶函数，获取和设置状态
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

