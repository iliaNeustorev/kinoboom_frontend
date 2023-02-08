<template>
  <a class="has-text-primary-dark" @click="showModal"><slot></slot></a>
  <modal-window-bulma-component ref="modal">
    <div class="box">
      <figure class="image is-16by9">
        <iframe
          class="has-ratio"
          width="640"
          height="360"
          :src="'https://www.youtube.com/embed/' + video"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </figure></div
  ></modal-window-bulma-component>
</template>

<script>
import AppModalBulma from "@/components/info/modal/ModalWindowBulma.vue";

export default {
  components: {
    "modal-window-bulma-component": AppModalBulma,
  },
  props: {
    video: { type: String, required: true },
  },
  methods: {
    showModal() {
      this.$refs.modal.show = true;
    },
  },
};
</script>
<style scoped>
.addModal {
  display: block;
}
</style>
