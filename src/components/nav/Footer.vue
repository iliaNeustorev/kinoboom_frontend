<template>
  <footer
    class="container footer has-background-success-light is-hidden-mobile"
  >
    <div class="tabs is-centered has-text-primary">
      <div class="has-text-primary" v-for="route in menu" :key="route.name">
        <router-link
          :to="{ name: route.name }"
          exact-active-class="is-uppercase has-text-weight-bold"
          >{{ route.text }}</router-link
        >
      </div>
    </div>
  </footer>
</template>

<script>
import itemsMenu from "@/mixins/items-menu";
export default {
  mixins: [itemsMenu],
};
</script>

<style scoped>
.tabs.is-boxed a:hover {
  background-color: none;
  border-bottom-color: none;
}
.tabs a {
  color: steelblue;
}
.footer {
  padding: 2rem 6.5rem 2rem;
  border-top-right-radius: 20%;
  border-top-left-radius: 20%;
}
</style>
