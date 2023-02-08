<template>
  <article class="panel is-info">
    <p class="panel-heading">Поиск</p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          class="input is-info"
          type="text"
          v-model="search"
          placeholder="ENTER для поиска"
          @keydown.enter="startSearch"
        />
        <span class="icon is-left">
          <mdicon name="magnify" />
        </span>
      </p>
      <button
        :disabled="emptySearch"
        @click="clearSearch"
        class="button is-info is-light ml-1"
      >
        X
      </button>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    emptySearch() {
      return this.search === "";
    },
  },
  methods: {
    startSearch() {
      if (!this.emptySearch) {
        this.$router.push({
          name: "search",
          params: { word: this.search },
        });
      }
    },
    clearSearch() {
      this.search = "";
    },
  },
};
</script>
