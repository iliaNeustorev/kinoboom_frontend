<template>
  <div v-if="show">
    <div class="buttons is-right">
      <button
        class="button is-link is-light is-right is-small"
        @click="ShowEditComment"
      >
        {{ buttonNameEdit }}
      </button>
      <button
        :disabled="sending"
        class="button is-danger is-light ml-2 is-small"
        @click="deleteComment"
      >
        Удалить
      </button>
    </div>
    <form v-if="showEdit" class="column is-8" @submit.prevent="sendEdit">
      <form-textarea-component
        name="text"
        :form="changeComment"
        placeholder="комментарий"
        :object-validation="validation"
        @validation-field="validationField"
      />
      <div class="buttons is-right">
        <button :disabled="!validationForm" class="button is-warning">
          Принять изменения
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
  },
  emits: ["reload-element"],
  data() {
    return {
      show: false,
      showEdit: false,
      sending: false,
      changeComment: this.$vform.make({
        text: this.text,
      }),
      validation: {
        text: {
          valid: false,
          rule: /^.{1,256}$/,
          text: "коментарий не изменен",
          oldValue: this.text,
        },
      },
    };
  },
  computed: {
    oldValueText() {
      return this.text;
    },
    validationForm() {
      return this.validation.text.valid;
    },
    buttonNameEdit() {
      return this.showEdit ? "Отмена" : "Редактировать";
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async sendEdit() {
      if (this.validationForm) {
        try {
          await this.$api.user.comment.edit(this.id, this.changeComment);
          this.showEdit = false;
          this.addMessage({
            text: "Сообщение отредактировано и будет доступно после модерации",
            timeout: 5000,
          });
          this.$emit("reload-element");
        } catch (e) {
          this.addMessage({
            text: `${e.response.data.errors}`,
            timeout: 5000,
            importance: "warning",
          });
        }
      }
    },
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
    ShowEditComment() {
      this.showEdit = !this.showEdit;
    },
    async deleteComment() {
      this.sending = true;
      try {
        await this.$api.user.comment.delete(this.id);
        this.$emit("reload-element");
        this.addMessage({
          text: "Сообщение удалено",
          timeout: 5000,
        });
      } catch (e) {
        this.addMessage({
          text: `${e.response.data.errors}`,
          timeout: 5000,
          importance: "warning",
        });
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>
