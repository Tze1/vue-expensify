<template>
  <header class="header component">
    <div class="masthead"><h1>{{ appTitle ? appTitle : 'VueJS App' }}</h1></div>
    <div v-show="userLoggedIn" class="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/addexpense">Add Expense</router-link>
    </div>
    <div v-if="user" class="auth">
      <span class="username">{{ user ? user.displayName : '' }}</span>
      <img :src="getAvatarUrl()" class="avatar"/>
      <button @click="startLogout" class="button logout-btn exit">Logout</button>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex';

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
    }
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

      &:last-child {
        align-self: flex-end;
        padding-bottom: 0;
        padding-right: 0;
        text-align: right;
      }

      @include mq("tablet") {
        padding: 0 $space-sm;

        &:last-child {
          align-self: initial;
        }
      }
    }  // > div

    .masthead {
      h1 {
        background: transparent url('/img/logo.png') left 50% no-repeat;
        background-size: 2.8rem 2.8rem;
        padding-left: 4rem;
        line-height: 1;
        margin: 0;
      }
    }

    .nav {
      @include mq("tablet") {
        flex-grow: 1;
      }

      a {
        &.router-link-active {
          font-weight: bold;
          text-decoration: none;
        }
      }
    }

    .auth {
      text-align: right;
      margin-top: -5.4rem;
      width: 100%;

      @include mq("tablet") {
        margin-top: 0;
        width: auto;
      }

      > * {
        margin-left: $space-sm;

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
        height: 3.2rem;
        vertical-align: middle;
        width: 3.2rem;
      }

      .button.exit {
        margin-right: 0;
        width: auto;
      }
    }
  }  // header
</style>
