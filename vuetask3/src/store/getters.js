export default {

    doneFilter: state => filterLabel => {
      if (filterLabel === "すべて") {
        return state.todoList
      }
      return state.todoList.filter(todo => todo.todoState === filterLabel)
    }

}