<template>
  <div>
    <alert-component />
  </div>
  <header class="has-background-warning" :class="$style.headerRadius">
    <top-menu-component />
  </header>
  <div class="container">
    <section class="columns">
      <section class="column is-one-fifth">
        <left-menu-component />
      </section>
      <section class="column">
        <router-view></router-view>
      </section>
    </section>
  </div>
  <footer
    class="has-background-success-light is-hidden-mobile mt-3"
    :class="$style.footerRadius"
  >
    <footer-component />
  </footer>
</template>

<script>
import AppTopMenu from "@/components/nav/TopMenu";
import AppLeftMenu from "@/components/nav/LeftMenu";
import AppAlerts from "@/components/info/Alerts";
import AppFooter from "@/components/nav/Footer";

export default {
  components: {
    "top-menu-component": AppTopMenu,
    "left-menu-component": AppLeftMenu,
    "alert-component": AppAlerts,
    "footer-component": AppFooter,
  },
};
</script>

<style module>
.headerRadius {
  border-bottom-right-radius: 5%;
  border-bottom-left-radius: 5%;
}
.footerRadius {
  border-top-right-radius: 30%;
  border-top-left-radius: 30%;
}
</style>
