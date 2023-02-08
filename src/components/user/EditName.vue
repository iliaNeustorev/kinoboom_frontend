<template>
  <form v-if="show" @submit.prevent="sendForm">
    <div class="field has-addons">
      <div class="control">
        <form-input-component
          :form="changeName"
          name="name"
          placeholder="Введите имя"
          :object-validation="validation"
          @validation-field="validationField"
        />
      </div>
      <div class="control">
        <button
          v-if="!loading"
          :disabled="!validationForm"
          class="button is-info"
        >
          Ок
        </button>
        <button v-else class="button is-info is-loading">..loading</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    name: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
      show: false,
      changeName: this.$vform.make({ name: this.name }),
      validation: {
        name: {
          valid: false,
          rule: /^[a-zA-Zа-яА-Я].{2,14}$/,
          text: " не менее 3 и не более 15 символов",
        },
      },
    };
  },
  computed: {
    validationForm() {
      return this.validation.name.valid;
    },
  },
  methods: {
    ...mapActions("userModule", ["checkUser"]),
    ...mapActions("alertModule", { addMessage: "add" }),
    async sendForm() {
      if (this.validationForm) {
        this.loading = true;
        try {
          await this.$api.user.profile.changeName(this.changeName);
          this.checkUser();
          this.show = false;
        } catch (e) {
          this.addMessage({
            text: "Ошибка.Изменить имя не удалось",
            timeout: 5000,
            importance: "danger",
          });
        } finally {
          this.loading = false;
        }
      }
    },
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
  },
};
</script>
