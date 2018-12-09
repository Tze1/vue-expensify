<template>
  <header class="header component">
    <div class="masthead"><h1>{{ appTitle ? appTitle : 'VueJS App' }}</h1></div>
    <div v-show="userLoggedIn" class="nav">
      <router-link to="/dashboard">Dashboard</router-link>|
      <router-link to="/add">Add Expense</router-link>
    </div>
    <div v-if="user" class="auth">
      <span class="username">{{ user ? user.displayName : '' }}</span>
      <img :src="getAvatarUrl()" class="avatar"/>
      <button
        @click="startLogout"
        aria-label="Log Out"
        title="Log Out"
        class="logout-btn"
      >
        <font-awesome-icon icon="sign-out-alt" />
      </button>
    </div>
    <DismissableAlert />
  </header>
</template>

<script>
  import { mapState } from 'vuex';
  import DismissableAlert from './DismissableAlert';

  export default {
    name: 'Header',
    props: {
      appTitle: {
        type: String,
        required: true,
      },
      startLogout: {
        type: Function,
        required: true,
      },
    },
    computed: mapState({
      userLoggedIn () {
        return this.$store.getters.userLoggedIn;
      },
      user: state => state.auth.user,
    }),
    methods: {
      getAvatarUrl () {
        return this.user.photoURL ?
          this.user.photoURL :
          '/img/avatar-default.png';
      },
    },
    components: {
      DismissableAlert,
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';

  .header.component {
    align-items: flex-start;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    padding: $space-lg 0 $space-md;
    text-align: left;

    @include mq("tablet") {
      align-items: baseline;
      flex-flow: row nowrap;
    }

    > div {
      flex: 0 0 auto;
      padding: 0 $space-xs $space-xs 0;
      vertical-align: baseline;

      &:first-child {
        padding-left: 0;
        padding-top: 0;
      }

      &.auth {
        align-self: flex-end;
        padding-bottom: 0;
        padding-right: 0;
        text-align: right;
      }

      &.dismissablealert.component {
        padding: 0.75rem 1.25rem;
      }

      @include mq("tablet") {
        padding: 0 $space-sm;

        &.auth {
          align-self: initial;
        }
      }
    }  // > div

    .masthead {
      h1 {
        background: transparent url('/img/logo.png') left 50% no-repeat;
        background-size: 1.75rem 1.75rem;
        padding-left: 2.5rem;
        line-height: 1;
        margin: 0;
      }
    }

    .nav {
      @include mq("tablet") {
        flex-grow: 1;
      }

      a {
        margin: 0 $space-xs;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        &.router-link-active {
          font-weight: bold;
          text-decoration: none;
        }
      }
    }

    .auth {
      text-align: right;
      margin-top: -3.8rem;
      width: 100%;

      @include mq("tablet") {
        margin-top: 0;
        width: auto;
      }

      > * {
        margin-left: $space-xs;

        @include mq("tablet") {
          margin-left: $space-sm;
        }

        &:first-child {
          margin-left: 0;
        }
      }

      .username {
        display: none;
        font-weight: bold;

        @include mq("tablet") {
          display: inline-block;
        }
      }

      .avatar {
        border-radius: 50%;
        height: 2rem;
        vertical-align: middle;
        width: 2rem;
      }

      .logout-btn {
        background: none;
        border: none;
        font-size: $font-size-xl;
        line-height: $font-size-xl;
        margin-right: 0;
        padding: 0;

        > .svg-inline--fa {
          color: $gray4;
          vertical-align: middle;

          &:hover {
            color: $white;
          }
        }
      }
    } // .auth
  }  // header
</style>
