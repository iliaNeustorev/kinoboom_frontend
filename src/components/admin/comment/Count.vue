<template>
  <span class="has-text-grey-lighter" v-if="count.length == 0">(0)</span>
  <template v-else>
    <span class="has-text-success" v-if="New">({{ count.newCount }})</span>
    <span class="has-text-info-dark" v-if="Changed"
      >({{ count.changedCount }})</span
    >
    <span class="has-text-danger" v-if="Declined"
      >({{ count.declinedCount }})</span
    >
  </template>
</template>

<script>
export default {
  props: {
    method: { type: String, required: true },
    count: { type: Object, required: true },
  },

  computed: {
    New() {
      return this.method == "getNew";
    },
    Changed() {
      return this.method == "getChanged";
    },
    Declined() {
      return this.method == "getDeclined";
    },
  },
};
</script>
