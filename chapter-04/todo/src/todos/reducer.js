import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO}from './actionTypes.js';

// 注意：这是纯函数，不能直接改变状态
export default (state = [], action) => {
  switch(action.type) {
    case ADD_TODO: {
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ]
    }
    case TOGGLE_TODO: {
      return state.map((todoItem) => {
        if (todoItem.id === action.id) {
           return {...todoItem, completed: !todoItem.completed};
        } else {
          return todoItem;
        }
      })
    }
    case REMOVE_TODO: {
      return state.filter((todoItem) => {
        return todoItem.id !== action.id;
      })
    }
    default: {
      return state;
    }
  }
}

// export default (state = [], action) => {
//   switch (action.type) {
//     case ADD_TODO: {
//       return [
//         {
//           id: action.id,
//           text: action.text,
//           complete: false,
//         },
//         ...state
//       ]
//     }
//     case TOGGLE_TODO: {
//       return state.map((todoItem) => {
//         if (todoItem.id === action.id) {
//           return { ...todoItem, complete: !todoItem.completed };
//         } else {
//           return todoItem;
//         }
//       })
//     }
//     case REMOVE_TODO: {
//       return state.filter(todoItem => {
//         return todoItem.id !== action.id;
//       });
//     }
//     default: {
//       return state;
//     }
//   }
// }
