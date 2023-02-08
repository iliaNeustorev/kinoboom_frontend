<template>
  <form class="box column is-half" @submit.prevent="sendForm">
    <form-input-component
      v-for="input in inputs"
      :key="input.name"
      :form="changePassword"
      :name="input.name"
      type="password"
      :label="input.label"
      placeholder="********"
      :object-validation="validation"
      @validation-field="validationField"
    />
    <button
      :disabled="!validationForm"
      v-if="!loading"
      class="button is-link is-medium"
    >
      <span v-if="validationForm" class="icon is-small">
        <mdicon name="check-circle" />
      </span>
      <span>Сменить пароль</span>
    </button>
    <button v-else class="button is-link is-loading is-medium">
      Loading...
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      changePassword: this.$vform.make({
        current: "",
        password: "",
        password_confirmation: "",
      }),
      inputs: [
        {
          name: "current",
          label: "Текущий пароль",
          iconName: "key-outline",
        },
        {
          name: "password",
          label: "Новый пароль",
          iconName: "key-outline",
        },
        {
          name: "password_confirmation",
          label: "Повторите новый пароль",
          iconName: "key-change",
        },
      ],
      validation: {
        current: {
          valid: false,
          rule: /^.{3,}$/,
          text: "введите текущий пароль",
        },
        password: {
          valid: false,
          rule: /^.{8,256}$/,
          text: "Пароль минимум 8 символов",
        },
        password_confirmation: {
          valid: false,
          rule: /^.{8,256}$/,
          text: "Пароль минимум 8 символов",
        },
      },
    };
  },
  computed: {
    validationForm() {
      return Object.values(this.validation).every((val) => val.valid);
    },
  },
  methods: {
    ...mapActions("userModule", ["changeUser"]),
    ...mapActions("alertModule", { addMessage: "add" }),
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
    async sendForm() {
      if (this.validationForm) {
        this.loading = true;
        try {
          await this.$api.user.profile.changePassword(this.changePassword);
          this.changeUser({});
          this.$router.push({ name: "home" });
        } catch (e) {
          this.addMessage({
            text: "Ошибка.Сменить пароль не удалось",
            timeout: 5000,
            importance: "danger",
          });
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
