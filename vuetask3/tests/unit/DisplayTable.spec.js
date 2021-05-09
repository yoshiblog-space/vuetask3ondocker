import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import DisplayTable from "@/components/DisplayTable.vue";
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)



test('表示の確認', ()=>{
  const wrapper = shallowMount(DisplayTable,{
    propsData:{
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
        { todoId: 1, todoComment: "コメント２", todoState: "完了" },
        { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
      ],
    },
  })
 
  const tr = wrapper.findAll('table > tbody > tr');
  const td0 = tr.at(0).findAll('td');
  const td1 = tr.at(1).findAll('td');
  const td2 = tr.at(2).findAll('td');

  expect(td0.at(0).text()).toBe('0')
  expect(td0.at(1).text()).toBe('コメント１')
  expect(td0.at(2).text()).toBe('作業中')
  expect(td0.at(3).text()).toBe('削除')
  expect(td1.at(0).text()).toBe('1')
  expect(td1.at(1).text()).toBe('コメント２')
  expect(td1.at(2).text()).toBe('完了')
  expect(td1.at(3).text()).toBe('削除')
  expect(td2.at(0).text()).toBe('2')
  expect(td2.at(1).text()).toBe('コメント３')
  expect(td2.at(2).text()).toBe('作業中')
  expect(td2.at(3).text()).toBe('削除')
})


test('削除ボタンの確認', async () => {
  let actions
  let store
  actions = {
    dodelTodoList: jest.fn(),
    doChangeTodoState: jest.fn().mockResolvedValue(1)
  }
  store = new Vuex.Store({
    actions
  })

  const wrapper = shallowMount(DisplayTable, {
    propsData: {
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
        { todoId: 1, todoComment: "コメント２", todoState: "完了" },
        { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
      ],
      stateSelect: "すべて",
    },
    store,
    localVue
  })
  const tr = wrapper.findAll('table > tbody > tr');
  const td0 = tr.at(0).findAll('td');
  const td1 = tr.at(1).findAll('td');
  const td2 = tr.at(2).findAll('td');
  expect(td0.at(0).text()).toBe('0');
  expect(td0.at(1).text()).toBe('コメント１');
  expect(td0.at(2).text()).toBe('作業中');
  expect(td0.at(3).text()).toBe('削除');
  expect(td1.at(0).text()).toBe('1');
  expect(td1.at(1).text()).toBe('コメント２');
  expect(td1.at(2).text()).toBe('完了');
  expect(td1.at(3).text()).toBe('削除');
  expect(td2.at(0).text()).toBe('2');
  expect(td2.at(1).text()).toBe('コメント３');
  expect(td2.at(2).text()).toBe('作業中');
  expect(td2.at(3).text()).toBe('削除');

  const buttonsNo0 = tr.at(0).findAll('button');

  await buttonsNo0.at(1).trigger('click');  //削除ボタンクリック
  expect(actions.dodelTodoList).toHaveBeenCalled();
})

test('変更ボタンの確認', async () => {
  let actions
  let store
  actions = {
    dodelTodoList: jest.fn(),
    doChangeTodoState: jest.fn().mockResolvedValue(1)
  }
  store = new Vuex.Store({
    actions
  })
  const wrapper = shallowMount(DisplayTable, {
    propsData: {
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
        { todoId: 1, todoComment: "コメント２", todoState: "完了" },
        { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
      ],
      stateSelect: "すべて",
    },
    store,
    localVue
  })
  const tr = wrapper.findAll('table > tbody > tr');
  const td0 = tr.at(0).findAll('td');
  const td1 = tr.at(1).findAll('td');
  const td2 = tr.at(2).findAll('td');
  expect(td0.at(0).text()).toBe('0');
  expect(td0.at(1).text()).toBe('コメント１');
  expect(td0.at(2).text()).toBe('作業中');
  expect(td0.at(3).text()).toBe('削除');
  expect(td1.at(0).text()).toBe('1');
  expect(td1.at(1).text()).toBe('コメント２');
  expect(td1.at(2).text()).toBe('完了');
  expect(td1.at(3).text()).toBe('削除');
  expect(td2.at(0).text()).toBe('2');
  expect(td2.at(1).text()).toBe('コメント３');
  expect(td2.at(2).text()).toBe('作業中');
  expect(td2.at(3).text()).toBe('削除');

  const buttonsNo0 = tr.at(0).findAll('button');
  await buttonsNo0.at(0).trigger('click');  //statusボタンクリック
  expect(actions.doChangeTodoState).toHaveBeenCalled();
  const buttonsNo1 = tr.at(1).findAll('button');
  await buttonsNo1.at(0).trigger('click');  //statusボタンクリック
  expect(actions.doChangeTodoState).toHaveBeenCalled();
  const buttonsNo2 = tr.at(2).findAll('button');
  await buttonsNo2.at(0).trigger('click');  //statusボタンクリック
  expect(actions.doChangeTodoState).toHaveBeenCalled();
  
  expect(td0.at(0).text()).toBe('0');
  expect(td0.at(1).text()).toBe('コメント１');
  expect(td0.at(2).text()).toBe('完了');
  expect(td0.at(3).text()).toBe('削除');
  expect(td1.at(0).text()).toBe('1');
  expect(td1.at(1).text()).toBe('コメント２');
  expect(td1.at(2).text()).toBe('作業中');
  expect(td1.at(3).text()).toBe('削除');
  expect(td2.at(0).text()).toBe('2');
  expect(td2.at(1).text()).toBe('コメント３');
  expect(td2.at(2).text()).toBe('完了');
  expect(td2.at(3).text()).toBe('削除');
})
