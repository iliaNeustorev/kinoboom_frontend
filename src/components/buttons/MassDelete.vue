<template>
  <div :class="$style.fixEl">
    <button
      v-if="loading"
      class="button is-danger is-outlined is-large is-loading"
    >
      ...loading
    </button>
    <button
      v-else
      class="button is-danger is-outlined is-large"
      @click="showModal"
    >
      <span>Удалить</span>
      <span class="icon is-small">
        <i>({{ countDeleteItems }})</i>
      </span>
    </button>
  </div>
  <modal-window-component ref="modal"
    ><p>Вы действительно хотите удалить в количестве {{ countDeleteItems }}?</p>
    <template v-slot:footer>
      <div class="buttons is-centered">
        <button
          class="button is-warning is-light is-outlined"
          @click="cancelDelete"
        >
          Отмена
        </button>
        <button
          class="button is-success is-light is-outlined"
          @click="deleteElements"
        >
          OK
        </button>
      </div>
    </template>
  </modal-window-component>
</template>

<script>
import AppModalWindow from "@/components/info/modal/ModalWindow";
import { mapActions } from "vuex";
export default {
  components: { "modal-window-component": AppModalWindow },
  emits: ["reload-component"],
  props: {
    idForDelete: { type: Array, required: true },
    route: { type: String, required: false },
    model: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    countDeleteItems() {
      return this.idForDelete.length;
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async deleteElements() {
      this.loading = true;
      try {
        await this.$api.admin.main.delete.massDelete(
          this.route,
          this.idForDelete,
          this.model
        );
        this.$refs.modal.show = false;
        this.$emit("reload-component");
      } catch (e) {
        this.addMessage({
          text: "Удаление не удалось",
          timeout: 5000,
          importance: "danger",
        });
      } finally {
        this.loading = false;
      }
    },
    showModal() {
      this.$refs.modal.show = true;
    },
    cancelDelete() {
      this.$refs.modal.show = false;
    },
  },
};
</script>

<style module>
.fixEl {
  position: fixed;
  left: 3%;
}
</style>
