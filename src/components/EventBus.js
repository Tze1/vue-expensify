/* App-wide custom-event Vue-instance.
* Usage:
* import EventBus from '<path to EventBus.js>';
* Emitter (in any method): EventBus.$emit('eventName', eventData);
* Listener (in life-cycle method): created () {
*     EventBus.$on('eventName', (eventData) => { ... });
*   },
*/
import Vue from 'vue';

const EventBus = new Vue();

export default EventBus;
