<template>
  <h1 class="title is-1 has-text-warning" :class="$style.titleShadow">
    {{ object.name }}
  </h1>
  <hr />
  <div class="image is-16by9">
    <iframe
      class="has-ratio"
      width="640"
      height="360"
      :src="'https://www.youtube.com/embed/' + object.video"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
  <div
    class="box is-flex is-flex-wrap-wrap is-justify-content-center is-align-content-center"
    :class="$style.tagM"
  >
    Год:
    <span class="mx-1 tag is-black is-medium">{{ object.year_release }}</span>
    Рейтинг:
    <span class="mx-1 tag is-black is-medium">
      <rating-component
        :rating="+object.rating"
        :slug="object.slug"
        :score="+object.ratings_count"
        @reload-element="reload"
      />
    </span>
  </div>
  <article class="message is-warning is-medium">
    <div class="message-header">
      <h2>Описание {{ object.name }}</h2>
    </div>
    <div class="message-body">
      {{ object.description }}
    </div>
  </article>
</template>

<script>
import AppRating from "@/components/rating/Seting.vue";
export default {
  components: {
    "rating-component": AppRating,
  },
  emits: ["reload-element"],
  props: {
    object: { type: Object, required: true },
  },
  methods: {
    reload() {
      this.$emit("reload-element");
    },
  },
};
</script>

<style module>
.titleShadow {
  text-shadow: 1px 1px 2px black;
}
.tagM {
  margin-left: -5%;
}
</style>
