import { shallowMount } from '@vue/test-utils'
import AboutDetails from '@/components/AboutDetails.vue'

describe('AboutDetails.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(AboutDetails, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
