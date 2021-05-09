export default {
  pushTodoList(state, todo) {
    state.todoList.push(todo);
  },
  changeTodoList(state, changeTodo) {
    state.todoList[changeTodo.todoId].todoState = changeTodo.todoState
  },
  delTodoList(state, delTodoId) {
    state.todoList = state.todoList.filter(todo => todo.todoId !== delTodoId);
    state.todoList.forEach((todo, key) => {
      todo.todoId = key;
    });
  }
}