<template>
  <h1 class="title is-1 has-text-success has-text-centered">Сериалы</h1>
  <hr />
  <loading-component v-if="loading" />
  <template v-else>
    <div
      v-for="serial in serials"
      :key="serial.id"
      class="box has-background-white-ter"
    >
      <div class="columns">
        <div class="column is-one-fifth">
          <router-link :to="linkToFilm(serial.slug)">
            <figure class="image is-square">
              <img :src="serial.urlPicture" alt="Картинка" title="Подробнее" />
            </figure>
          </router-link>

          <p class="has-text-centered">
            {{ serial.name }}
            <span class="has-text-success" title="комментарии"
              >({{ serial.comments_count }})</span
            >
          </p>
        </div>
        <div class="column">
          <p>
            {{ serial.description }}
          </p>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <router-link :to="linkToFilm(serial.slug)">
          <button class="button is-warning is-medium">Подробнее</button>
        </router-link>
      </div>
    </div>
    <pagination-component
      :pagination="objectPagination"
      @change-page="getSerials"
    />
  </template>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      serials: [],
      objectPagination: [],
      page: this.$route.query.page,
    };
  },
  computed: {
    link() {
      return {};
    },
  },
  methods: {
    async getSerials(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "serials",
          query: { page },
        });
      }
      this.objectPagination = await this.$api.serial.all(page);
      this.serials = this.objectPagination.data;
      this.loading = false;
    },
    linkToFilm(slug) {
      return { name: "show", params: { slug: slug, model: "serial" } };
    },
  },
  created() {
    this.getSerials(this.page);
  },
};
</script>
