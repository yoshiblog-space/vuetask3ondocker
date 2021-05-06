import { mount } from '@vue/test-utils'
import RadioBtn from "@/components/RadioBtn.vue";

test('ラジオボタンの表示確認とボタン押下時の送信確認', async()=>{

  const wrapper = mount(RadioBtn,{
    propsData:{
      filterLabel: "すべて",
      defaultState: 0,

    }
  })
  expect(wrapper.html()).toBe('<label><input type="radio" name="state" value="すべて">すべて</label>')
  const radio = wrapper.find('input[type="radio"]');
  radio.trigger('click');
  expect(JSON.stringify(wrapper.emitted().clickFilters)).toBe(JSON.stringify([["すべて"]]))
})