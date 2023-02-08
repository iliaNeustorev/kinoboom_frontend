<template>
  <h1 class="title is-1 has-text-success has-text-centered">Рейтинг фильмов</h1>
  <hr />
  <loading-component v-if="loading" />
  <div v-else class="box has-background-light">
    <table-component
      class="table is-striped has-text-grey-dark has-background-light is-fullwidth"
      :name-titles="columns"
      :sort-column="sortColumn"
      @sort-column="sort"
    >
      <tr v-for="(item, i) in data" :key="i">
        <td>
          <router-link :to="linkToElem(item.slug)">{{ item.name }}</router-link>
        </td>
        <td class="has-text-centered">
          <span class="tag is-success is-medium"> {{ item.year_release }}</span>
        </td>
        <td class="has-text-centered">
          <rating-component
            :rating="+item.rating"
            :score="+item.ratings_count"
            :slug="item.slug"
            @reload-element="getRating(page)"
          />
        </td>
      </tr>
      <tr>
        <td :colspan="tableCollspan">
          <pagination-component
            :pagination="objectPagination"
            @change-page="getRating"
          />
        </td>
      </tr>
    </table-component>
  </div>
</template>

<script>
import AppTable from "@/components/info/Table.vue";
import AppRating from "@/components/rating/Seting.vue";
export default {
  components: {
    "table-component": AppTable,
    "rating-component": AppRating,
  },
  data() {
    return {
      columns: [
        {
          label: "Фильм",
          column: "name",
          direction: "desc",
          sort: true,
        },
        {
          label: "Год",
          column: "year_release",
          direction: "desc",
          sort: true,
        },
        {
          label: "Рейтинг",
          column: "rating",
          direction: "desc",
          sort: true,
        },
      ],
      data: [],
      objectPagination: [],
      page: this.$route.query.page,
      loading: false,
      sortColumn: {
        label: "Рейтинг",
        column: "rating",
        direction: "desc",
        sort: true,
      },
    };
  },
  computed: {
    tableCollspan() {
      return this.columns.length;
    },
  },
  methods: {
    async getRating(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "rating",
          query: { page },
        });
      }
      this.objectPagination = await this.$api.home.rating(
        page,
        this.sortColumn.direction,
        this.sortColumn.column
      );
      this.data = this.objectPagination.data;
      this.page = this.$route.query.page;
      this.loading = false;
    },
    sort(column) {
      let result = this.columns.filter((elem) => elem.label == column);
      this.sortColumn = result[0];
      if (column == this.sortColumn.label) {
        this.sortColumn.direction =
          this.sortColumn.direction == "desc" ? "asc" : "desc";
      }
      this.getRating(this.page);
    },
    linkToElem(slug) {
      return { name: "show", params: { slug } };
    },
  },
  created() {
    this.getRating(this.page);
  },
};
</script>
