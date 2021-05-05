<template>
  <div>
    <input v-model="todoInput" />
    <button @click="addTodoList" type="button">追加</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      todoInput: ""
    };
  },
  emits: ["getTodo"],
  methods: {
    addTodoList() {
      if (!this.todoInput) {
        return;
      }
      this.$emit("getTodo", this.todoInput);

      this.todoInput = "";
    }
  }
};
</script>
