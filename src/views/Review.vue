<template>
  <div
    class="container is-flex is-flex-direction-column is-flex-wrap-wrap px-2"
  >
    <h1 class="title is-1 has-text-success has-text-centered">Отзывы</h1>
    <hr />
    <template v-if="reviews.length">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="message is-link"
      >
        <one-review-component
          :review="review"
          @get-reviews="getReviews(page)"
        />
      </article>
      <pagination-component
        :pagination="objectPagination"
        @change-page="getReviews"
      />
    </template>
    <div v-else><i>Отзывов нет</i></div>
    <hr />
    <write-review-component />
  </div>
</template>

<script>
import AppOneReview from "@/components/review/One";
import AppWriteReview from "@/components/review/Write";

export default {
  components: {
    "one-review-component": AppOneReview,
    "write-review-component": AppWriteReview,
  },
  data() {
    return {
      loading: false,
      objectPagination: [],
      page: this.$route.query.page,
      reviews: [],
    };
  },
  methods: {
    async getReviews(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "reviews",
          query: { page },
        });
      }
      this.objectPagination = await this.$api.review.all(page);
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
