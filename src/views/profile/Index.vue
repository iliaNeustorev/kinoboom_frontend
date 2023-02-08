<template>
  <loading-component v-if="$route.params.name === undefined" />
  <div class="container" v-else>
    <ul
      class="tabs is-large is-flex is-justify-content-flex-start is-flex-wrap-wrap"
    >
      <li v-for="route in menu" :key="route.name">
        <router-link
          :to="{ name: route.name }"
          exact-active-class="is-italic has-text-info"
        >
          {{ route.text }}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    menu: [
      {
        name: "profile.main",
        text: "Общая информация о профиле",
      },
      {
        name: "profile.password",
        text: "Сменить пароль",
      },
      {
        name: "profile.avatar",
        text: "Сменить аватар",
      },
    ],
  }),
  computed: {
    ...mapGetters("userModule", ["user"]),
  },
  created() {
    if (this.$route.params.name === undefined) {
      this.$route.params.name = this.user.name;
    }
  },
};
</script>
