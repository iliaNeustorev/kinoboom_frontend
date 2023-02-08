<template>
  <td>
    <button
      @click.once="changeStatusComment('accept')"
      class="button is-primary is-outlined"
    >
      Принять
    </button>
  </td>
  <td>
    <button
      :disabled="allowDecline"
      @click.once="changeStatusComment('decline')"
      class="button is-info is-outlined"
    >
      Отклонить
    </button>
  </td>
  <td>
    <button @click.once="deleteComment()" class="button is-danger is-outlined">
      Удалить
    </button>
  </td>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    commentsIsDeclined: { type: Boolean, default: false },
  },
  emits: ["reload-comments"],
  computed: {
    allowDecline() {
      return this.commentsIsDeclined === true;
    },
  },
  methods: {
    async changeStatusComment(method) {
      await this.$api.admin.comment.changeStatus(this.id, method);
      this.$emit("reload-comments");
    },
    async deleteComment() {
      await this.$api.admin.comment.delete(this.id);
      this.$emit("reload-comments");
    },
  },
};
</script>
