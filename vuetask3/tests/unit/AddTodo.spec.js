import { mount } from '@vue/test-utils'
import AddTodo from "@/components/AddTodo.vue";

test('入力データの確認', async()=>{
  const wrapper = mount(AddTodo)
  const textInput = wrapper.find('input')
  await textInput.setValue('contents test')
  expect(wrapper.find('input').element.value).toBe('contents test')
  const button = wrapper.find('button')
  button.trigger('click')

  expect(JSON.stringify(wrapper.emitted().getTodo)).toBe(JSON.stringify([["contents test"]]))
})