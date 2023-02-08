<template>
  <a @click="showModal"><slot></slot></a>
  <modal-window-bulma-component ref="modal"
    ><p v-if="uri != ''" class="image is-4by3">
      <img :src="uri" />
    </p>
    <p v-else class="image is-4by3">
      <img src="@/assets/nopicture.jpg" /></p
  ></modal-window-bulma-component>
</template>

<script>
import AppModalBulma from "@/components/info/modal/ModalWindowBulma";

export default {
  components: {
    "modal-window-bulma-component": AppModalBulma,
  },
  props: {
    uri: { type: String, required: true },
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
