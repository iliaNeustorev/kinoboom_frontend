<template>
  <h1 class="title is-1 has-text-success has-text-centered">Фильмы</h1>
  <hr />
  <loading-component v-if="loading" />
  <template v-else>
    <div
      v-for="film in films"
      :key="film.id"
      class="box has-background-white-ter"
    >
      <div class="columns">
        <div class="column is-one-fifth">
          <router-link :to="linkToFilm(film.slug)">
            <figure class="image is-square">
              <img :src="film.urlPicture" alt="картинка" title="подробнее" />
            </figure>
          </router-link>
          <p class="has-text-centered">
            {{ film.name }}
            <span class="has-text-success" title="комментарии"
              >({{ film.comments_count }})</span
            >
          </p>
        </div>
        <div class="column">
          <p>
            {{ film.description }}
          </p>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <router-link :to="linkToFilm(film.slug)">
          <button class="button is-warning is-medium">Подробнее</button>
        </router-link>
      </div>
    </div>
    <pagination-component
      :pagination="objectPagination"
      @change-page="getFilms"
    />
  </template>
</template>

<script>
export default {
  data() {
    return {
      films: [],
      loading: false,
      objectPagination: [],
      page: this.$route.query.page,
    };
  },
  methods: {
    linkToFilm(slug) {
      return { name: "show", params: { slug: slug, model: "film" } };
    },
    async getFilms(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "films",
          query: { page },
        });
      }
      this.objectPagination = await this.$api.film.all(page);
      this.films = this.objectPagination.data;
      this.loading = false;
    },
  },
  created() {
    this.getFilms(this.page);
  },
};
</script>
