<template>
  <router-link title="Перейти на страницу" :to="linkToElem">
    <div class="card-image">
      <figure class="image is-1by1">
        <img :src="elem.urlPicture" alt="Картинка" />
      </figure>
    </div>
    <div class="card-content has-text-justified">
      <div class="media">
        <div class="media-content">
          <hr />
          <p class="title is-4 has-text-centered">{{ elem.name }}</p>
          <p>
            {{ elem.description }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    elem: { type: Object, required: true },
    model: { type: String, required: true },
  },
  computed: {
    linkToElem() {
      return {
        name: "show",
        params: { slug: this.elem.slug, model: this.model },
      };
    },
  },
};
</script>
