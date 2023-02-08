<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="is-hidden-tablet" :to="{ name: 'home' }">
        <figure class="image is-64x64 mt-2">
          <img class="is-rounded" src="@/assets/logo.jpg" />
        </figure>
      </router-link>

      <a
        @click="showMenu = !showMenu"
        class="navbar-burger mt-2 mr-1"
        :class="classActive"
      >
        <span
          v-for="(item, i) in 3"
          :key="i"
          class="burger-button"
          aria-hidden="true"
        ></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showMenu }">
      <div class="navbar-end tabs is-boxed is-fullwidth">
        <div class="navbar-item container">
          <div v-for="route in menu" :key="route.name">
            <router-link
              :to="{ name: route.name }"
              exact-active-class="active-link"
              ><span
                class="is-size-5 is-family-primary has-text-primary-dark is-uppercase"
                >{{ route.text }}</span
              ></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import itemsMenu from "@/mixins/items-menu";
export default {
  mixins: [itemsMenu],
  data: () => ({
    showMenu: false,
  }),
  computed: {
    classActive() {
      return {
        "is-active ": this.showMenu,
        "navbar-burger-active": !this.showMenu,
      };
    },
  },
};
</script>

<style scoped>
.active-link {
  font-size: 1.3em;
  color: teal !important;
  background-color: rgba(145, 165, 30, 0.51);
}
.burger-button {
  color: cadetblue;
}
.navbar-burger-active {
  border: 1px solid cadetblue;
  border-radius: 35%;
}
</style>
