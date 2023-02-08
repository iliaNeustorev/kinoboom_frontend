<template>
  <div class="container hero is-warning is-small">
    <div class="hero-head is-hidden-mobile">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link :to="{ name: 'home' }">
              <div class="hero-body">
                <div class="container has-text-left">
                  <h1 class="logo">Kinoboom</h1>
                  <p class="subtitle">Кино - наша страсть</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </header>
    </div>
    <div class="hero-foot">
      <nav-bar-component />
    </div>
  </div>
</template>
<script>
import AppNavbar from "@/components/nav/NavBar.vue";
export default {
  components: {
    "nav-bar-component": AppNavbar,
  },
};
</script>
<style scoped>
nav {
  padding: 1%;
}
.logo {
  color: #2c3e50;
  font-size: 5em;
  font-family: Avenir, Helvetica, sans-serif;
}
</style>
