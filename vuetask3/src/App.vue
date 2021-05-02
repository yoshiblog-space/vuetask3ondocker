<template>
  <div id="app">
    <h1>ToDoリスト</h1>
    <todo-Filter :stateFilter="stateFilters" @selectFilter="getSelectName" />
    <display-Table
      :todoList="todoList"
      :stateSelect="checkDisplayState"
      @todoLength="updatetodoLength"
    />
    <h2>新規タスクの追加</h2>
    <add-Todo @getTodo="addTodoList" />
  </div>
</template>

<script>
import todoFilter from "./components/TodoFilter";
import displayTable from "./components/DisplayTable";
import addTodo from "./components/AddTodo";
export default {
  name: "App",
  components: {
    "todo-Filter": todoFilter,
    "display-Table": displayTable,
    "add-Todo": addTodo,
  },
  data() {
    return {
      todoList: [],
      todoIdCount: 0,
      stateFilters: [
        { id: 1, label: "すべて", defaultState: 1 },
        { id: 2, label: "作業中", defaultState: 0 },
        { id: 3, label: "完了", defaultState: 0 },
      ],
      todoStateDefault: "作業中",
      checkDisplayState: "すべて",
    };
  },
  methods: {
    updatetodoLength(length) {
      console.log(length);
      this.todoIdCount = length;
    },
    getSelectName(clickLabel) {
      this.checkDisplayState = clickLabel;
    },
    addTodoList(todoComment) {
      this.todoList.push({
        todoId: this.todoIdCount,
        todoComment,
        todoState: this.todoStateDefault,
      });
      this.todoIdCount++;
    },
  },
};
</script>

<style>
body {
  font-family: "Times New Roman", Times, serif;
}
</style>
