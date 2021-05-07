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
        <td>{{ todo.todoId }}</td>
        <td>{{ todo.todoComment }}</td>
        <td>
          <button
            type="button"
            @click="changeTodoState(todo.todoState, todo.todoId)"
          >
            {{ todo.todoState }}
          </button>
        </td>
        <td>
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
    stateSelect: { type: String },
  },
  emits: ["todoLength"],
  methods: {
    delTodoList(delTodoId) {
      this.$store.dispatch("dodelTodoList", delTodoId);
    },
    changeTodoState(todoStatus, todoId) {
      if (todoStatus === "作業中") {
        this.$store.dispatch("doChangeTodoState", {
          todoId,
          todoState: "完了",
        });
        this.todoList[todoId].todoState = "完了";
      } else {
        this.$store.dispatch("doChangeTodoState", {
          todoId,
          todoState: "作業中",
        });
        this.todoList[todoId].todoState = "作業中";
      }
    },
  },
};
</script>
