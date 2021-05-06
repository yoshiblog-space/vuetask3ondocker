<template>
  <div id="app">
    <h1>ToDoリスト</h1>
    <todo-Filter :stateFilter="stateFilters" @selectFilter="getSelectName" />
    <display-Table :todoList="filterTodoList" />
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
    getSelectName(clickLabel) {
      this.checkDisplayState = clickLabel;
    },
    addTodoList(todoComment) {
      this.todoIdCount = this.$store.getters.doneFilter("すべて").length;
      this.$store.dispatch("doPushTodoList", {
        todoId: this.todoIdCount,
        todoComment,
        todoState: this.todoStateDefault,
      });
    },
  },
  computed: {
    filterTodoList() {
      return this.$store.getters.doneFilter(this.checkDisplayState);
    },
  },
};
</script>

<style>
body {
  font-family: "Times New Roman", Times, serif;
}
</style>
