export default {
  doPushTodoList(context, todo) {
    context.commit('pushTodoList', todo)
  },
  doChangeTodoState(context, changeTodo) {
    context.commit('changeTodoList', changeTodo)
  },
  dodelTodoList(context, delTodoId) {
    context.commit('delTodoList', delTodoId)
  }
}