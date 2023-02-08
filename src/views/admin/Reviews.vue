<template>
  <loading-component v-if="loading" />
  <div v-else class="table-container mt-2">
    <table-component
      class-table="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      :name-titles="columns"
    >
      <template v-if="reviews.length">
        <tr
          class="has-text-centered"
          v-for="review in reviews"
          :key="review.id"
        >
          <td>{{ review.review }}</td>
          <td>{{ review.user.name }}</td>
          <controls-review-component
            :id="review.id"
            @reload-reviews="getReviews"
          />
        </tr>
        <tr>
          <td v-if="loading" :colspan="tableCollspan">
            <progress class="progress is-info is-medium" max="100" />
          </td>
          <td v-else :colspan="tableCollspan">
            <pagination-component
              :pagination="objectPagination"
              @change-page="getReviews"
            />
          </td>
        </tr>
      </template>
      <tr v-else>
        <td :colspan="tableCollspan" class="has-text-centered has-text-info">
          <i>Новых отзывов нет</i>
        </td>
      </tr>
    </table-component>
  </div>
</template>

<script>
import AppTable from "@/components/info/Table.vue";
import AppControlsReview from "@/components/admin/review/Controls.vue";
export default {
  components: {
    "table-component": AppTable,
    "controls-review-component": AppControlsReview,
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          label: "Отзыв",
          sort: false,
        },
        {
          label: "Автор",
          sort: false,
        },
        {
          label: "Одобрить",
          sort: false,
        },
        {
          label: "Отклонить",
          sort: false,
        },
        {
          label: "Удалить",
          sort: false,
        },
      ],
      reviews: [],
      page: this.$route.query.page,
      objectPagination: [],
    };
  },
  computed: {
    tableCollspan() {
      return this.columns.length;
    },
  },
  methods: {
    async getReviews(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "admin.reviews",
          query: { page },
        });
      }
      this.objectPagination = await this.$api.admin.review.all(page);
      this.reviews = this.objectPagination.data;
      this.page = this.$route.query.page;
      this.loading = false;
    },
  },
  created() {
    this.getReviews(this.page);
  },
};
</script>
