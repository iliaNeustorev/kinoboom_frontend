<template>
  <table :class="classTable">
    <thead>
      <th class="has-text-centered" v-for="(name, i) of nameTitles" :key="i">
        {{ name.label }}
        <div
          class="is-clickable"
          v-if="name.sort"
          @click="sort(name.label)"
          v-html="sortArrow(name.label)"
        ></div>
      </th>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    nameTitles: { type: Array, required: true },
    classTable: { type: String, default: "table is-bordered" },
    sortColumn: { type: Object, required: false },
  },
  emits: ["sort-column"],
  methods: {
    sortArrow(column) {
      if (column != this.sortColumn.label) {
        return "&udarr;";
      } else {
        return this.sortColumn.direction == "desc" ? "&#8642;" : "&#8639;";
      }
    },
    sort(column) {
      this.$emit("sort-column", column);
    },
  },
};
</script>
