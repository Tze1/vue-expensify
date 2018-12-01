import { mount } from '@vue/test-utils';
import DismissableAlert from '@/components/DismissableAlert';
import EventBus from '@/components/EventBus';
import Vue from 'vue';

describe('DismissableAlert.vue', () => {
  const wrapper = mount(DismissableAlert);
  test('should render empty on init', () => {
    expect(wrapper.contains('div.alert')).toBe(false);
  });

  test('should render alert properly upon show event', () => {
    EventBus.$emit('showDismissableAlert', {
      content: 'test alert message',
    });

    Vue.nextTick(() => {
      expect(wrapper.contains('div.alert')).toBe(true);
    });
  });

  test('should render empty upon dismissCountDown = 0', () => {
    wrapper.setData({ dismissCountDown: 0 });

    Vue.nextTick(() => function () {
      expect(wrapper.contains('div.alert')).toBe(false);
    });
  });
});
