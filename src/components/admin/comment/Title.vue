<template>
  <p class="has-text-success-dark" v-if="commentsNew">Новые сообщения</p>
  <p class="has-text-info-dark" v-if="commentsChanged">Измененые сообщения</p>
  <p class="has-text-danger" v-if="commentsDeclined">Отклоненые сообщения</p>
</template>

<script>
export default {
  props: { method: { type: String, required: true } },
  computed: {
    commentsNew() {
      return this.method == "getNew";
    },
    commentsChanged() {
      return this.method == "getChanged";
    },
    commentsDeclined() {
      return this.method == "getDeclined";
    },
  },
};
</script>
