<template>
  <div class="container" :class="$style.containerM">
    <h1
      class="is-size-2 is-italic is-family-sans-serif has-text-success-dark has-text-centered"
    >
      Новые фильмы
    </h1>
    <hr />
    <loading-component v-if="loading" />
    <div v-else class="is-flex is-justify-content-center is-flex-wrap-wrap">
      <div
        v-for="film in films.data"
        :key="film.id"
        class="is-flex-grow-1 card p-2 mx-1"
        :class="$style.cardWidth"
      >
        <show-card-elem-component :elem="film" model="film" />
      </div>
    </div>

    <h1
      class="is-size-2 is-italic is-family-sans-serif has-text-success-dark has-text-centered mt-2"
    >
      Новые сериалы
    </h1>
    <hr />
    <loading-component v-if="loading" />
    <div v-else class="is-flex is-justify-content-center is-flex-wrap-wrap">
      <div
        v-for="serial in serials.data"
        :key="serial.id"
        class="is-flex-grow-1 card p-2 mx-1"
        :class="$style.cardWidth"
      >
        <show-card-elem-component :elem="serial" model="serial" />
      </div>
    </div>
  </div>
</template>

<script>
import AppShowCardElem from "@/components/ShowCardElem.vue";
export default {
  components: {
    "show-card-elem-component": AppShowCardElem,
  },
  data() {
    return {
      films: [],
      serials: [],
      show: false,
      loading: true,
    };
  },
  async created() {
    this.films = await this.$api.film.all();
    this.serials = await this.$api.serial.all();
    this.loading = false;
  },
};
</script>

<style module>
.containerM {
  margin: 0 -2%;
}
.cardWidth {
  flex-basis: 250px;
}
.cardWidth a {
  color: #000;
}
</style>
