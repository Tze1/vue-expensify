import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false

/* App-wide custom-event Vue-instance.
* Usage:
*	import { eventBus } from '<path to main.js>';
*	Emitter (in any method): eventBus.$emit('eventName', eventData);
*	Listener (in life-cycle method): created () {
*	    eventBus.$on('eventName', (eventData) => { ... });
*   },
*/
export const eventBus = new Vue();

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
