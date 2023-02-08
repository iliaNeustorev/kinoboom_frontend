<template>
  <button @click="back" class="button is-link is-medium">Назад</button>
</template>

<script>
export default {
  props: { route: { type: String, required: false } },
  methods: {
    back() {
      if (this.route === undefined) {
        return this.$router.back(-1);
      } else if (this.route !== undefined) {
        return this.$router.push({ name: this.route });
      }
    },
  },
};
</script>
