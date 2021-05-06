<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>コメント</th>
        <th>状態</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo in todoList" v-bind:key="todo.todoId">
        <td v-if="displayPermit(stateSelect, todo.todoState)">
          {{ todo.todoId }}
        </td>
        <td v-if="displayPermit(stateSelect, todo.todoState)">
          {{ todo.todoComment }}
        </td>
        <td v-if="displayPermit(stateSelect, todo.todoState)">
          <button
            type="button"
            @click="changeTodoState(todo.todoState, todo.todoId)"
          >
            {{ todo.todoState }}
          </button>
        </td>
        <td v-if="displayPermit(stateSelect, todo.todoState)">
          <button type="button" @click="delTodoList(todo.todoId)">削除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    todoList: { type: Array },
    stateSelect: { type: String }
  },
  emits: ["todoLength"],
  methods: {
    displayPermit(stateSelect, todoStatus) {
      return stateSelect === "すべて" || stateSelect === todoStatus;
    },
    delTodoList(delTodoId) {
      this.$delete(this.todoList, delTodoId);
      this.todoList.forEach((element, key) => {
        element.todoId = key;
      });
      this.$emit("todoLength", this.todoList.length);
    },
    changeTodoState(todoStatus, todoId) {
      if (todoStatus === "作業中") {
        this.todoList[todoId].todoState = "完了";
      } else {
        this.todoList[todoId].todoState = "作業中";
      }
    }
  }
};
</script>
