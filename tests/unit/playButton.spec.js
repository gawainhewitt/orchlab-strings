import { shallowMount } from '@vue/test-utils'
import PlayButton from '@/components/PlayButton.vue'

describe('PlayButton.vue', () => {
    it('renders button with props.buttonName when passed', () => {
      const testname = "rararara";
      const wrapper = shallowMount(PlayButton, {
        props: { buttonName: testname }
      });
      expect(wrapper.text()).toMatch(testname);
    });
    test('button triggers function passed in as prop', () => {
      const testingFunction = jest.fn();
      const wrapper = shallowMount(PlayButton, {
        props: { testFunction: testingFunction }
      });
      const button = wrapper.find('button')
      button.trigger('click');
      expect(testingFunction).toHaveBeenCalled();
    })
  })