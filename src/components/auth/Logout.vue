<template>
  <button class="button is-primary" @click="showModal">Выйти</button>
  <modal-window-component ref="modal"
    ><p>Вы действительно хотите выйти?</p>
    <template v-slot:footer>
      <div class="buttons is-centered">
        <button
          class="button is-warning is-light is-outlined"
          @click="cancelDelete"
        >
          Нет
        </button>
        <button class="button is-success is-light is-outlined" @click="logout">
          Да
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
  methods: {
    ...mapActions("userModule", ["logoutUser"]),
    ...mapActions("alertModule", { addMessage: "add" }),
    showModal() {
      this.$refs.modal.show = true;
    },
    cancelDelete() {
      this.$refs.modal.show = false;
    },
    async logout() {
      try {
        await this.logoutUser();
      } catch (e) {
        this.addMessage({
          text: "Выйти c сайта не удалось",
          timeout: 5000,
          importance: "danger",
        });
      }
    },
  },
};
</script>
