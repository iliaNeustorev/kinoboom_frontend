<template>
  <span :class="countClass">({{ count }})</span>
</template>

<script>
export default {
  props: {
    countLike: { type: Number, required: true },
    countDislike: { type: Number, required: true },
  },
  computed: {
    count() {
      return this.countLike - this.countDislike;
    },
    countClass() {
      return {
        "has-text-success": this.count > 0,
        "has-text-danger": this.count < 0,
        "": this.count == 0,
      };
    },
  },
};
</script>
