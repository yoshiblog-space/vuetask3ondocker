import { createLocalVue } from '@vue/test-utils'
import getters from '@/store/getters.js';
import actions from '@/store/actions.js';
import mutations from '@/store/mutations.js';
import Vuex from 'vuex'

//
// { todoId: 1, todoComment: "コメント２", todoState: "完了" },

let store
let localVue = createLocalVue()
localVue.use(Vuex)




test('dispatch pushTodoList', () => {
  const state = {
    todoList: []
  }
  store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
  const todo = { todoId: 0, todoComment: "コメント１", todoState: "作業中" }
  expect(store.state.todoList).toEqual([])
  store.dispatch('doPushTodoList', todo)
  expect(store.state.todoList).toEqual([todo])
})


test('dispatch changeTodoList', () => {
  const state = {
    todoList: [
      { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
      { todoId: 1, todoComment: "コメント２", todoState: "作業中" }
    ]
  }
  store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
  expect(store.state.todoList).toEqual([
    { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
    { todoId: 1, todoComment: "コメント２", todoState: "作業中" }
  ])
  const changeTodo = {
    todoId: 1,
    todoState: "完了"
  }
  store.dispatch('doChangeTodoState', changeTodo)
  expect(store.state.todoList).toEqual([
    { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
    { todoId: 1, todoComment: "コメント２", todoState: "完了" }
  ])
})

test('dispatch delTodoList', () => {
  const state = {
    todoList: [
      { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
      { todoId: 1, todoComment: "コメント２", todoState: "作業中" }
    ]
  }
  store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
  expect(store.state.todoList).toEqual([
    { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
    { todoId: 1, todoComment: "コメント２", todoState: "作業中" }
  ])
  store.dispatch('dodelTodoList', 0)
  expect(store.state.todoList).toEqual([
    { todoId: 0, todoComment: "コメント２", todoState: "作業中" }
  ])
})

test('getters check', () => {
  const state = {
    todoList: [
      { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
      { todoId: 1, todoComment: "コメント２", todoState: "完了" },
      { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
    ]
  }
  store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
  const resultAll = store.getters.doneFilter("すべて");
  expect(resultAll).toEqual(store.state.todoList);
  const resultDo = store.getters.doneFilter("作業中");
  expect(resultDo).toEqual([
    { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
    { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
  ]);
  const resultComplete = store.getters.doneFilter("完了");
  expect(resultComplete).toEqual([
    { todoId: 1, todoComment: "コメント２", todoState: "完了" }
  ]);
})