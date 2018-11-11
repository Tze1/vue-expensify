import { shallowMount } from '@vue/test-utils'
import About from '@/views/About'

describe('About.vue', () => {
  it('renders About view properly', () => {
    const wrapper = shallowMount(About);

    expect(wrapper).toMatchSnapshot();
  })
})
