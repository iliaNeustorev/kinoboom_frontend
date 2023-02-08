<template>
  <h1 class="title is-3 has-text-centered has-text-success-dark">
    Список фильмов
  </h1>
  <controls-film-component
    model="film"
    :id-for-delete="idForDelete"
    :count="count"
    route-deletion="api/admin/films/massDestroy"
    @reload-component="clearIdForDelete(), getFilms()"
  />
  <div class="table-container">
    <table-component
      class-table="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      :name-titles="columns"
      :sort-column="sortColumn"
      @sort-column="sort"
    >
      <template v-if="films.length">
        <tr class="has-text-centered" v-for="film in films" :key="film.id">
          <td>
            <label class="checkbox mr-2">
              <input
                :value="film.id"
                v-model="idForDelete"
                type="checkbox"
                title="Добавить для удаления"
              />
            </label>
          </td>
          <one-film-component model="film" :elem="film" />
        </tr>
        <tr>
          <td v-if="loading" :colspan="tableCollspan">
            <progress class="progress is-info is-medium" max="100" />
          </td>
          <td v-else :colspan="tableCollspan">
            <pagination-component
              :pagination="objectPagination"
              @change-page="getFilms"
            />
          </td>
        </tr>
      </template>
      <tr v-else class="has-text-centered">
        <td :colspan="tableCollspan">Фильмов нет</td>
      </tr>
    </table-component>
  </div>
</template>

<script>
import filmsSerialsTables from "@/mixins/films-serials-tables";
import AppControlsFilm from "@/components/admin/film/Controls.vue";
import AppOneFilm from "@/components/admin/film/One.vue";

export default {
  components: {
    "controls-film-component": AppControlsFilm,
    "one-film-component": AppOneFilm,
  },
  mixins: [filmsSerialsTables],
  data() {
    return {
      films: [],
      objectPagination: [],
      loading: false,
    };
  },
  methods: {
    async getFilms(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "admin.films",
          query: { page },
        });
      }
      let data = await this.$api.admin.film.all(
        page,
        this.sortColumn.direction,
        this.sortColumn.column
      );

      this.count = data.count;
      this.objectPagination = data.films;
      this.films = data.films.data;
      this.page = this.$route.query.page;
      this.loading = false;
    },
    getElement() {
      this.getFilms(this.page);
    },
  },
  created() {
    this.getFilms(this.page);
  },
};
</script>
