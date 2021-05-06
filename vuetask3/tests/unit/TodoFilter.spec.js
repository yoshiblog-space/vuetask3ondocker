import { shallowMount, mount } from '@vue/test-utils'
import RadioBtn from "@/components/RadioBtn.vue";
import TodoFilter from "@/components/TodoFilter.vue";

test('子コンポーネントから親へのデータ送信確認', async () => {
  const wrapperShallow = shallowMount(TodoFilter, {
    propsData: {
      stateFilter: [
        { id: 1, label: "すべて", defaultState: 1 },
        { id: 2, label: "作業中", defaultState: 0 },
        { id: 3, label: "完了", defaultState: 0 }
      ],
    }
  })

  wrapperShallow.find(RadioBtn).vm.$emit('clickFilters', "すべて")
  expect(JSON.stringify(wrapperShallow.emitted().selectFilter)).toBe(JSON.stringify([["すべて"]]))
})
test('フィルター項目の確認', () => {
  //表示htmlの確認
  const wrapper = mount(TodoFilter, {
    propsData: {
      stateFilter: [
        { id: 1, label: "すべて", defaultState: 1 },
        { id: 2, label: "作業中", defaultState: 0 },
        { id: 3, label: "完了", defaultState: 0 }
      ],
    }
  })



  const radio = wrapper.findAll('input[type="radio"]');

  expect(radio.length).toBe(3);
  expect(radio.at(0).element.value).toBe("すべて");
  expect(radio.at(1).element.value).toBe("作業中");
  expect(radio.at(2).element.value).toBe("完了");

})