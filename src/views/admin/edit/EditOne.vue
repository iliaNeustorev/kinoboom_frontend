<template>
  <loading-component v-if="loading" />
  <template v-else>
    <div class="field is-grouped mt-2">
      <p class="control">
        <delete-component
          btn-class="is-danger is-medium"
          :route="route"
          :back="true"
          >Удалить
        </delete-component>
      </p>
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
      <show-image-component :uri="oldPicture ?? ''">
        <figure class="image mt-2">
          <img :src="oldPicture" title="Посмотреть" />
        </figure>
      </show-image-component>

      <div class="buttons is-right mt-4">
        <div class="control">
          <button
            :disabled="!validationForm"
            v-if="!loadingForm"
            class="button is-link is-medium"
          >
            <span>Принять изменения</span>
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
</template>

<script>
import changeOneElement from "@/mixins/change-one-element";
import AppDelete from "@/components/buttons/Delete.vue";
import AppShowImageModal from "@/components/info/modal/ShowImage";
import { mapActions } from "vuex";

export default {
  components: {
    "delete-component": AppDelete,
    "show-image-component": AppShowImageModal,
  },
  mixins: [changeOneElement],
  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      oldPicture: "",
      route: "",
    };
  },
  created() {
    this.getElement();
  },
  methods: {
    ...mapActions("alertModule", ["add"]),
    async sendForm() {
      this.loadingForm = true;
      try {
        this.element.update({ _method: "PATCH" });
        switch (this.model) {
          case "film":
            await this.$api.admin.film.updateOne(this.id, this.element);
            break;
          case "serial":
            await this.$api.admin.serial.updateOne(this.id, this.element);
            break;
        }
        this.addMessage("Изменения приняты", "info");
        this.getElement();
      } catch (e) {
        this.addMessage("Данные введены неправильно", "danger");
      } finally {
        this.loadingForm = false;
      }
    },
    async getElement() {
      let data;
      switch (this.model) {
        case "film":
          this.route = `api/admin/films/${this.id}`;
          data = await this.$api.admin.film.getOne(this.id);
          break;
        case "serial":
          this.route = `api/admin/serials/${this.id}`;
          data = await this.$api.admin.serial.getOne(this.id);
          break;
      }
      Object.assign(this.element, data);
      this.oldPicture = data.urlPicture;
      this.element.picture = null;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.image {
  width: 256px;
  height: 256px;
}
</style>
