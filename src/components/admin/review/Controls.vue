<template>
  <td>
    <button
      class="button is-primary is-outlined"
      @click.once="changeStatusReview('accept')"
    >
      Одобрить отзыв
    </button>
  </td>
  <td>
    <button
      class="button is-danger is-outlined"
      @click.once="changeStatusReview('decline')"
    >
      Отклонить отзыв
    </button>
  </td>
  <td>
    <button class="button is-danger" @click.once="deleteReview(id)">
      Удалить
    </button>
  </td>
</template>

<script>
export default {
  props: { id: { type: Number, required: true } },
  emits: ["reload-reviews"],
  methods: {
    async changeStatusReview(method) {
      await this.$api.admin.review.changeStatus(this.id, method);
      this.$emit("reload-reviews");
    },
    async deleteReview() {
      await this.$api.admin.review.delete(this.id);
      this.$emit("reload-reviews");
    },
  },
};
</script>
