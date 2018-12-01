<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      :variant="variant"
      @dismiss-count-down="countDownChanged"
      @dismissed="dismissCountDown=0"
      class="dismissablealert component"
      dismissable
    >
      <button @click="dismissCountDown=0" class="close">x</button>
      <h4>{{ content }}</h4>
    </b-alert>
  </div>
</template>

<script>
  /* This component has been included in Header.vue.
  * Usage:
  * In your component which needs to show an alert,
  * import { eventBus } from '<path to main.js>';
  * eventBus.$emit('showDismissableAlert', {
  *   content: '[your alert message]', // required
  *   variant: '<info | success | danger | warning>', // optional (defaults to 'info')
  * });
  */
  import { eventBus } from '../main';
  import bAlert from 'bootstrap-vue/es/components/alert/alert';

  const defaultState = {
    content: undefined,
    dismissCountDown: 0,
    variant: 'info',
  };

  export default {
    name: 'DismissableAlert',
    data () {
      return defaultState;
    },
    created: function () {
      eventBus.$on('showDismissableAlert', ({
          content = undefined,
          variant = 'info'
        }) => {
        if (content) {
          this.content = content;
          this.dismissCountDown = 3.5;
          this.variant = variant;
        }
      })
    },
    methods: {
      countDownChanged (countDown) {
        this.dismissCountDown = countDown;
      },
      handleDismiss () {
        this.content = defaultState.content;
        this.dismissCountDown = defaultState.dismissCountDown;
        this.variant = defaultState.variant;
      },
    },
    components: {
      'b-alert': bAlert,
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';

  .dismissablealert.component {
    animation: strobeShadow 1s ease-in-out;
    animation-iteration-count: infinite; 
    position: absolute;
    width: auto;
    max-width: 80%;
    min-width: 50%;
    top: 5.3rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: z('modal');

    @include mq("desktop") {
      max-width: 88rem;
      min-width: 45rem;
    }

    h4 {
      margin-bottom: 0;
    }

    button.close {
      color: $gray1;
      font-size: $font-size-sm;
    }

    @keyframes strobeShadow {
      0% {
        box-shadow: 0px 0px 5px 2px rgba(darken($red, 20%), .75);
      }

      50% {
        box-shadow: 0px 0px 12px 5px rgba(darken($red, 15%), 1);
      }

      100% {
        box-shadow: 0px 0px 5px 2px rgba(darken($red, 25%), .75);
      }
    }
  } // .dismissablealert.component
</style>
