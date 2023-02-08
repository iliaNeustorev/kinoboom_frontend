<template>
  <loading-component v-if="loading" />
  <div v-else>
    <div v-if="!emptyElement" class="box">
      <show-element-component :object="element" @reload-element="getElement" />
      <show-comments-component
        :comments="commentsOfElement"
        @reload-element="getElement"
      />
      <hr />
      <send-comment-component :model="model" :slug="slug" />
    </div>
    <app-e-404 v-else class="box" />
  </div>
</template>

<script>
import AppShowElement from "@/components/ShowOneElement";
import AppSendComment from "@/components/user/comments/Send";
import AppShowComments from "@/components/user/comments/ShowMany";
import AppE404 from "@/components/info/E404.vue";

export default {
  components: {
    "show-element-component": AppShowElement,
    "send-comment-component": AppSendComment,
    "show-comments-component": AppShowComments,
    AppE404,
  },
  props: {
    model: { type: String, required: false },
    slug: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
      element: {},
      commentsOfElement: [],
    };
  },
  computed: {
    emptyElement() {
      return Object.keys(this.element).length == 0;
    },
  },
  methods: {
    async getElement() {
      this.loading = true;
      switch (this.model) {
        case "film":
          this.element = await this.$api.film.getOne(this.slug);
          break;
        case "serial":
          this.element = await this.$api.serial.getOne(this.slug);
          break;
        default:
          this.element = await this.$api.home.getOneElement(this.slug);
          break;
      }
      this.commentsOfElement = this.element.comments;
      this.loading = false;
    },
  },
  created() {
    this.getElement();
  },
  watch: {
    slug() {
      this.getElement();
    },
  },
};
</script>
