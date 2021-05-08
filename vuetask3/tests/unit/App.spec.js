import { shallowMount, createLocalVue } from '@vue/test-utils'
import todoFilter from "@/components/TodoFilter";
import displayTable from "@/components/DisplayTable";
import addTodo from "@/components/AddTodo";
import Apps from "@/app.vue";
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

test('リスト追加時の設定', async () => {
  let actions
  let getters
  let store
  const state = {
    todoList : [
      { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
      { todoId: 1, todoComment: "コメント２", todoState: "完了" },
    ]

  }
  actions = {
    doPushTodoList: jest.fn(),
  }

  getters =  {
    doneFilter: () => (data) => state.todoList,
  }
  store = new Vuex.Store({
    actions,
    getters
  })

  const wrapper = shallowMount(Apps, {
    store,
    localVue
  })
  const pushTodo =  "コメント３" 
  wrapper.find(addTodo).vm.$emit('getTodo', pushTodo)
  expect(actions.doPushTodoList).toHaveBeenCalled();
  expect(wrapper.vm.$data.todoIdCount).toBe(2);
  expect(actions.doPushTodoList).toHaveBeenLastCalledWith(expect.any(Object),{
    "todoId":2,
    "todoComment": "コメント３",
    "todoState": "作業中"
  });
})

