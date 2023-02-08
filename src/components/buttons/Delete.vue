<template>
  <button class="button" :class="btnClass" @click="showModal">
    <slot></slot>
  </button>
  <modal-window-component ref="modal"
    ><p>Вы действительно хотите удалить?</p>
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
          @click="deleteElement"
        >
          OK
        </button>
      </div>
    </template>
  </modal-window-component>
</template>

<script>
import { mapActions } from "vuex";
import AppModalWindow from "@/components/info/modal/ModalWindow";
export default {
  components: { "modal-window-component": AppModalWindow },
  emits: ["delete-successful"],
  props: {
    route: { type: String, required: true },
    btnClass: { type: String, default: "" },
    back: { type: Boolean, default: false },
    method: { type: String, default: "delete" },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async deleteElement() {
      try {
        if (this.method === "delete") {
          await this.$api.admin.main.delete.deleteElement("delete", this.route);
          this.$refs.modal.show = false;
          if (this.back) {
            this.$router.back(-1);
          } else {
            this.$emit("delete-successful");
          }
        }
        if (this.method === "post") {
          await this.$api.admin.main.delete.deleteElement("post", this.route);
          this.$refs.modal.show = false;
          if (this.back) {
            this.$router.back(-1);
          } else {
            this.$emit("delete-successful");
          }
        }
      } catch (e) {
        this.addMessage({
          text: "Удаление не выполнено",
          timeout: 5000,
          importance: "danger",
        });
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
