<template>
  <div class="field is-grouped mt-2">
    <p class="control">
      <button-back-component />
    </p>
  </div>
  <form class="column is-half" @submit.prevent="sendForm">
    <form-input-component
      v-for="input in inputs"
      :key="input.name"
      :form="element"
      :name="input.name"
      :label="input.label"
      :placeholder="input.placeholder"
      :object-validation="validation"
      @validation-field="validationField"
    />
    <form-textarea-component
      :form="element"
      name="description"
      label="Описание"
      placeholder="Введите описание"
      :object-validation="validation"
      @validation-field="validationField"
    />
    <form-file-component
      :form="element"
      name="picture"
      label="Загрузить"
      :object-validation="validation"
      @validation-field="validationField"
    />
    <div class="buttons is-right mt-4">
      <div class="control">
        <button
          :disabled="!validationForm"
          v-if="!loadingForm"
          class="button is-link is-medium"
        >
          <span>Создать</span>
          <span v-if="validationForm" class="icon is-small">
            <mdicon name="check-circle" />
          </span>
        </button>
        <button v-else class="button is-link is-loading is-medium">
          Loading...
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import changeOneElement from "@/mixins/change-one-element";
import { mapActions } from "vuex";
export default {
  mixins: [changeOneElement],
  methods: {
    ...mapActions("alertModule", ["add"]),
    async sendForm() {
      this.loadingForm = true;
      try {
        switch (this.model) {
          case "film":
            await this.$api.admin.film.add(this.element);
            break;
          case "serial":
            await this.$api.admin.serial.add(this.element);
            break;
        }
        this.addMessage("Данные добавлены", "info");
        this.$router.back(-1);
      } catch (e) {
        this.addMessage("Данные введены неправильно", "danger");
      } finally {
        this.loadingForm = false;
      }
    },
  },
};
</script>
