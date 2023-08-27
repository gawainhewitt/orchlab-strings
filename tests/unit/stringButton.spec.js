import { shallowMount } from '@vue/test-utils'
import StringButton from '@/components/StringButton.vue'

describe('StringButton.vue', () => {
  describe('Styling', () => {
    it('renders button with props.buttonText when passed', () => {
      const testname = "hahaha";
      const wrapper = shallowMount(StringButton, {
        props: { buttonText: testname }
      });
      expect(wrapper.text()).toMatch(testname);
    });
    it('renders button with the colour that is passed in', () => {
      const testColour = "Blue";
      const wrapper = shallowMount(StringButton, {
        props: { buttonColour: testColour }
      });
      expect(wrapper.find('.note-buttons').element.style.backgroundColor).toBe(testColour)
    });
  })
  describe('on mouseup', () => {
    test('triggers function passed in as prop', () => {
      const testFunction = jest.fn();
      const wrapper = shallowMount(StringButton, {
        props: { testFunction }
      });
      const button = wrapper.find('.note-buttons')
      button.trigger('mouseup');
      expect(testFunction).toHaveBeenCalled();
    });
    test('triggers function with note name passed in as prop', () => {
      const testFunction = jest.fn();
      const note = "testNote";
      const triggerType = "mouseup";
      const wrapper = shallowMount(StringButton, {
        props: { testFunction, note }
      });
      const button = wrapper.find('.note-buttons')
      button.trigger('mouseup');
      expect(testFunction).toHaveBeenCalledWith(note, triggerType);
    });
  })
})
