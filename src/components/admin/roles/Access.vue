<template>
  <slot v-if="can"></slot>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: { roles: { type: Array, required: true } },
  computed: {
    ...mapGetters("userModule", ["hasRole"]),
    can() {
      return this.roles.some((role) => this.hasRole(role));
    },
  },
};
</script>
