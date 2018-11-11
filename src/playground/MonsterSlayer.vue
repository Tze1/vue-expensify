<template>
  <div v-if="userLoggedIn" class="monsterslayer component">
    <h2>Monster Slayer</h2>
    <div class="players">
      <div class="player me">
        <h3>You</h3>
        <div
          class="player-health"
          :class="{
            dead: myHealth <= 0
          }">
          <div
            class="player-health-value"
            :class="{
              dead: myHealth <= 0,
              almostdead: (myHealth > 0 && myHealth < 25),
              badlywounded: (myHealth >= 25 && myHealth < 50),
              notsohealthy: (myHealth >= 50 && myHealth < 75)
            }"
            :style="{width: myHealth > 0 ? myHealth + '%' : '0'}">
            {{ myHealth }}
          </div>
        </div>
      </div>
      <div class="player monster">
        <h3>Monster</h3>
        <div
          class="player-health"
          :class="{dead: monsterHealth <= 0}">
          <div
            class="player-health-value"
            :style="{width: monsterHealth > 0 ? monsterHealth + '%' : '0'}">
            {{ monsterHealth }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="result" class="result">Game over: 
      <span
        class="result-label"
        :class="{
          win: result == 'win',
          loss: result == 'loss',
          draw: result == 'draw',
        }"
        >
        {{ result }}
      </span>
    </div>
    <div class="actions">
      <div v-if="!started && ended" class="actions-start">
        <button @click="msStart" class="button">Start New Game</button>
      </div>
      <div v-if="started && !ended" class="actions-ingame">
        <button @click="msAttack" class="button">Attack</button>
        <button :disabled="specialAttackDisabled" @click="msAttackSpecial" class="button">Special Attack</button>
        <button :disabled="healDisabled" @click="msHeal" class="button">Heal Yourself</button>
        <button :disabled="surrenderDisabled" @click="msSurrender" class="button">Surrender</button>
      </div>
    </div>
    <div class="callout" :class="{show: callout.length > 0}">{{ callout }}</div>
    <ol v-if="started && !ended" class="rounds">
      <li v-for="(round, key, index) in rounds" :key="index" class="round">
        <span class="round-type">{{ round.type }}</span>:&nbsp;
        <span class="round-details">
          <span v-if="round.type !== 'heal'">
            You caused <span class="round-monsterdamage">{{ round.monsterDamage }}</span> damage, suffered <span class="round-mydamage">{{ round.myDamage }}</span>.
          </span>
          <span v-else>
            Your health improved by <span class="round-healby">{{ round.healBy }}</span>.  <span v-if="myHealth >= 100">[Your Health max is always 100]</span>
          </span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'MonsterSlayer',
    beforeCreate: function () {
      // console.log('beforeCreate');
    },
    created: function () {
      // console.log('created');
    },
    beforeMount: function () {
      // console.log('beforeMount');
    },
    mounted: function () {
      // console.log('mounted -- unhiding mounted HTML...');
    },
    beforeUpdate: function () {
      // console.log('beforeUpdate');
    },
    updated: function () {
      // console.log('updated');
    },
    beforeDestroy: function () {
      // console.log('beforeDestroy');
    },
    destroyed: function () {
      // console.log('destroyed');
    },

    data: function () {
      return {
        started: false,
        ended: true,
        myHealth: 100,
        monsterHealth: 100,
        rounds: [],
        callout: '',
        result: undefined  // undefined | 'win' | 'loss' | 'draw'
      };
    },

    computed: {
      specialAttackDisabled: function () {
        return this.myHealth < 40;
      },
      healDisabled: function () {
        return this.myHealth >= 60;
      },
      surrenderDisabled: function () {
        return ((this.myHealth > this.monsterHealth) || this.myHealth >= 30);
      },
      ...mapState({
        userLoggedIn () {
          return this.$store.getters.userLoggedIn;
        },
        user: state => state.auth.user,
      }),
    },

    watch: {
      myHealth: 'msCheckHealths',
      specialAttackDisabled: 'msCalloutSpecialAttackDisabledChange',
      healDisabled: 'msCalloutHealDisabledChange',
      surrenderDisabled: 'msCalloutSurrenderDisabled',
    },

    methods: {
      msStart: function () {
        // var vm = this;
        this.started = true;
        this.ended = false;
        this.myHealth = 100;
        this.monsterHealth = 100;
        this.rounds = [];
        this.callout = '';
        this.result = undefined;
      },
      msCheckHealths: function (val) {
        var monsterHealth = this.monsterHealth;

        if (val <= 0) {
          this.started = false;
          this.ended = true;
          if (monsterHealth > 0) {
            this.result = 'loss';
          } else {
            this.result = 'draw';
          }
        } else if (monsterHealth <= 0) {
          this.started = false;
          this.ended = true;
          if (val > 0) {
            this.result = 'win';
          } else {
            this.result = 'draw';
          }
        } else {
          this.result = undefined;
        }
      },
      msShowCallout: function (calloutMsg) {
        var vm = this;

        // Set message, if game has not ended and no one's dead.
        if (vm.rounds.length > 0 && vm.myHealth > 0 && vm.monsterHealth > 0) {
          vm.callout = calloutMsg;
          setTimeout(function () {
            vm.msClearCallout(calloutMsg);
          }, 2500);
        }
      },
      msClearCallout: function (calloutMsg) {
        if (this.callout == calloutMsg) {
          this.callout = '';
        }
      },
      msCalloutHealDisabledChange: function (disabled) {
        var vm = this,
          calloutMsg = disabled ?
            'HEALING DISABLED -- you\'re too healthy (>= 60).' :
            'HEALING ENABLED -- your Health\'s below 60.';

        if (vm.myHealth > 0 && vm.monsterHealth > 0) {
          vm.msShowCallout(calloutMsg);
        }
      },
      msCalloutSpecialAttackDisabledChange: function (disabled) {
        var vm = this,
          calloutMsg = disabled ?
            'SPECIAL ATTACK DISABLED -- you\'re not healthy enough (< 40).' :
            'SPECIAL ATTACK ENABLED -- you\'re healthy enough (>= 40).';

        if (vm.myHealth > 0 && vm.monsterHealth > 0) {
          vm.msShowCallout(calloutMsg);
        }
      },
      msCalloutSurrenderDisabled: function (disabled) {
        var vm = this,
          calloutMsg = disabled ?
            'SURRENDER DISABLED -- you\'re either healthier than Monster or too healthy (>= 30).' :
            'SURRENDER ENABLED -- Monster\'s healthier and your Health is below 30.';

        if (vm.myHealth > 0 && vm.monsterHealth > 0) {
          vm.msShowCallout(calloutMsg);
        }
      },
      msHandleCombatOutcome: function (type, monsterDamage, myDamage, healBy) {
        this.myHealth -= myDamage;
        this.monsterHealth -= monsterDamage;
        this.rounds.push({
          type,
          monsterDamage,
          myDamage,
          healBy
        });
      },
      msAttack: function () {
        var vm = this;
        var monsterDamage = Math.round(Math.random() * 15) || 1;
        var myDamage = Math.round(Math.random() * 13) || 1;

        vm.msHandleCombatOutcome('attack', monsterDamage, myDamage);
      },
      msAttackSpecial: function () {
        var vm = this;
        var monsterDamage = Math.round(Math.random() * 20) || 1;
        var myDamage = Math.round(Math.random() * 10) || 1;

        vm.msHandleCombatOutcome('special attack', monsterDamage, myDamage);
      },
      msHeal: function () {
        var vm = this;
        var healBy = Math.round(Math.random() * 30);

        vm.myHealth += healBy;
        if (vm.myHealth > 100) {
          vm.myHealth = 100;
        }

        vm.rounds.push({
          type: 'heal',
          healBy
        });
      },
      msSurrender: function () {
        this.started = false;
        this.ended = true;
        this.result = 'You SURRENDERED!';
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
  .monsterslayer.component {
    background-color: $gray4;
    color: $black;
    padding: $space-md;

    h2 {
      margin-top: 0;
    }

    .players {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .player {
        background-color: $white;
        padding: $space-sm;
        width: calc(50% - 7.5px);

        h3 {
          margin-bottom: $space-xs;
          margin-top: 0;
        }

        .player-health {
          background-color: $gray2;
          height: 38px;
          width: 100%;

          &.dead {
            background-color: darken($red, 15%);
          }

          .player-health-value {
            background-color: darken($green, 15%);
            color: $white;
            height: inherit;
            line-height: 38px;
            text-align: center;
            transition: width .65s ease;
          }
        }
      }  // .player
    }  // .players

    .result {
      font-size: $font-size-xl;
      font-weight: bold;
      padding: $space-sm 0;

      .result-label {
        text-transform: uppercase;

        &.win {
          color: darken($green, 15%);
        }

        &.loss {
          color: darken($red, 15%);
        }
      }
    }  // .result

    .actions {
      padding: $space-sm 0;

      .btn {
        text-transform: uppercase;
      }
    }

    .callout {
      background-color: lighten($blue, 45%);
      height: 0;
      margin: 0;
      overflow: hidden;
      padding: 0;
      transition: height .5s, margin .5s, padding .5s;

      &.show {
        height: auto;
        margin: $space-sm;
        padding: $space-xs;
      }
    }

    .rounds {
      .round {
        .round-type,
        .round-monsterdamage,
        .round-mydamage,
        .round-healby {
          font-weight: bold;
        }
        .round-type {
          text-transform: uppercase;
        }
      }
    }  // .rounds
  }  // .monsterslayer
</style>
