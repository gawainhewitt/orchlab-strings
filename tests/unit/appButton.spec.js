import { shallowMount } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('renders button with props.buttonText when passed', () => {
    const testname = "hahaha";
    const wrapper = shallowMount(AppButton, {
      props: { buttonText: testname }
    });
    expect(wrapper.text()).toMatch(testname);
  });
  it('renders button with the colour that is passed in', () => {
    const testColour = "Blue";
    const wrapper = shallowMount(AppButton, {
      propsData: { buttonColour: testColour }
    });
    expect(wrapper.find('.note-buttons').element.style.backgroundColor).toBe(testColour)
  })
})
