import { shallowMount,mount } from '@vue/test-utils'
import DisplayTable from "@/components/DisplayTable.vue";


test('表示の確認(すべて）', ()=>{
  const wrapper = mount(DisplayTable,{
    propsData:{
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
        { todoId: 1, todoComment: "コメント２", todoState: "完了" },
        { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
      ],
      stateSelect:"すべて"
    }
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

test('表示の確認(完了)', () => {
  const wrapper = mount(DisplayTable, {
    propsData: {
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
        { todoId: 1, todoComment: "コメント２", todoState: "完了" },
        { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
      ],
      stateSelect: "完了"
    }
  })
  const tr = wrapper.findAll('table > tbody > tr');
  expect(tr.at(0).find('td').exists()).toBeFalsy()
  expect(tr.at(1).find('td').exists()).toBeTruthy()
  expect(tr.at(2).find('td').exists()).toBeFalsy()
})
test('表示の確認(作業中）', ()=>{
  const wrapper = mount(DisplayTable,{
    propsData:{
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
        { todoId: 1, todoComment: "コメント２", todoState: "完了" },
        { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
      ],
      stateSelect:"作業中"
    }
  })
  const tr = wrapper.findAll('table > tbody > tr');
  expect(tr.at(0).find('td').exists()).toBeTruthy()
  expect(tr.at(1).find('td').exists()).toBeFalsy()
  expect(tr.at(2).find('td').exists()).toBeTruthy()
})

test('状態変更の確認(作業中<->完了)', async () => {
  const wrapper = mount(DisplayTable, {
    propsData: {
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
      ],
      stateSelect: "すべて"
    }
  })
  const tds = wrapper.findAll('table > tbody > tr > td');
  expect(tds.at(2).text()).toBe('作業中')
  const buttons = wrapper.findAll('button');
  await buttons.at(0).trigger('click');
  expect(tds.at(2).text()).toBe('完了')
  await buttons.at(0).trigger('click');
  expect(tds.at(2).text()).toBe('作業中')
})

test('削除ボタンの確認', async () => {
  const wrapper = mount(DisplayTable, {
    propsData: {
      todoList: [
        { todoId: 0, todoComment: "コメント１", todoState: "作業中" },
        { todoId: 1, todoComment: "コメント２", todoState: "完了" },
        { todoId: 2, todoComment: "コメント３", todoState: "作業中" },
      ],
      stateSelect: "すべて"
    }
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
  

  expect(td0.at(0).text()).toBe('0');
  expect(td0.at(1).text()).toBe('コメント２');
  expect(td0.at(2).text()).toBe('完了');
  expect(td0.at(3).text()).toBe('削除');
  expect(td1.at(0).text()).toBe('1');
  expect(td1.at(1).text()).toBe('コメント３');
  expect(td1.at(2).text()).toBe('作業中');
  expect(td1.at(3).text()).toBe('削除');
})

