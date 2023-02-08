<template>
  <form-checkbox-component
    @click="showModal"
    :form="block"
    :ordinal-number="id"
    name="check"
  />
  <modal-window-component ref="modal"
    ><p>Вы действительно хотите изменить статус пользователя?</p>
    <template v-slot:footer>
      <div class="buttons is-centered">
        <button
          class="button is-warning is-light is-outlined"
          @click="cancelSendCheck"
        >
          Отмена
        </button>
        <button
          class="button is-success is-light is-outlined"
          @click="sendCheck"
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
  emits: ["reload-users"],
  props: {
    id: { type: Number, required: true },
    currentState: { type: Boolean, required: true },
  },
  data() {
    return {
      block: this.$vform.make({
        check: this.currentState,
      }),
    };
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    showModal() {
      this.$refs.modal.show = true;
    },
    cancelSendCheck() {
      this.$refs.modal.show = false;
      this.block.check = this.currentState;
    },
    async sendCheck() {
      try {
        await this.$api.admin.users.changeBlocked(this.id, this.block);
        this.$emit("reload-users");
      } catch (e) {
        this.addMessage({
          text: "Не удалось изменить статус.Ошибка сервера",
          timeout: 5000,
          importance: "warning",
        });
      } finally {
        this.$refs.modal.show = false;
      }
    },
  },
};
</script>
