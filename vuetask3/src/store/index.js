import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: []
  },
  getters: {
    doneFilter: state => filterLabel => {
      if (filterLabel === "すべて") {
        return state.todoList
      }
      return state.todoList.filter(todo => todo.todoState === filterLabel)
    }
  },
  mutations: {
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
  },
  actions: {
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
})