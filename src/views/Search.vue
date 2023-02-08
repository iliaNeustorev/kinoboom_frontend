<template>
  <div v-if="loading">
    <loading-component />
  </div>
  <div class="px-2" v-else>
    <b class="is-size-4">Результат поиска:</b>
    <ul v-if="objectPagination.total > 0">
      <li v-for="elem in data" :key="elem.id">
        <router-link :to="linkToElem(elem.slug)"
          ><span v-html="elem.name" class="is-italic is-size-5"></span
        ></router-link>
        <div>
          <p v-html="elem.description"></p>
        </div>
      </li>
      <pagination-component
        :pagination="objectPagination"
        @change-page="getResult"
      />
    </ul>
    <div v-else>
      <span>Ничего не найдено</span>
    </div>
  </div>
</template>

<script>
export default {
  props: { word: { type: String, required: true } },
  data() {
    return {
      loading: false,
      page: this.$route.query.page,
      data: [],
      objectPagination: [],
    };
  },
  methods: {
    async getResult(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "search",
          query: { page },
          params: { word: this.word },
        });
      }
      this.objectPagination = await this.$api.home.search(page, this.word);
      this.page = this.$route.query.page;
      this.data = this.objectPagination.data;
      this.loading = false;
      if (this.data.length) {
        for (let elem of this.data) {
          elem.name = this.selectWord(this.word, elem.name);
          elem.description = this.selectWord(this.word, elem.description);
        }
      }
    },
    linkToElem(slug) {
      return { name: "show", params: { slug } };
    },
    selectWord(word, field) {
      return field.replace(
        new RegExp(word, "g"),
        `<span class="has-text-success-dark has-background-grey-lighter">${word}</span>`
      );
    },
  },
  created() {
    this.getResult(this.page);
  },
  watch: {
    word() {
      this.getResult(this.page);
    },
  },
};
</script>
