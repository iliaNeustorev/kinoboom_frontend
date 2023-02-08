<template>
  <form @submit.prevent="send">
    <form-input-component
      v-for="input in inputs"
      :key="input.name"
      :form="form"
      :type="input.type"
      :name="input.name"
      :label="input.label"
      :placeholder="input.placeholder"
      :icon-name="input.iconName"
      :object-validation="validation"
      @validation-field="validationField"
    />
    <div v-if="!repeatPassword" class="notification is-danger is-light">
      Пароли не совпадают
    </div>
    <button :disabled="!validationForm" class="button is-link is-medium">
      Сменить пароль
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: this.$vform.make({
        email: "",
        password: "",
        password_confirmation: "",
        token: this.$route.query.token,
      }),
      inputs: [
        {
          name: "email",
          label: "Почта",
          placeholder: "Введите действующую почту",
          type: "email",
          iconName: "email-outline",
        },
        {
          name: "password",
          label: "Пароль",
          placeholder: "********",
          type: "password",
          iconName: "key-outline",
        },
        {
          name: "password_confirmation",
          label: "Повторите пароль",
          placeholder: "********",
          type: "password",
          iconName: "key-change",
        },
      ],
      validation: {
        email: {
          valid: false,
          rule: /^.{2,256}@.+\.[a-zA-Z]{2,256}$/,
          text: "должен быть корректный email",
        },
        password: {
          valid: false,
          rule: /.{8,256}/,
          text: "Пароль минимум 8 символов",
        },
        password_confirmation: {
          valid: false,
          rule: /.{8,256}/,
          text: "Пароль минимум 8 символов",
        },
      },
    };
  },
  computed: {
    repeatPassword() {
      return this.form.password === this.form.password_confirmation;
    },
    validationForm() {
      return (
        Object.values(this.validation).every((val) => val.valid) &&
        this.repeatPassword
      );
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async send() {
      if (this.form.token != "" && this.validationForm) {
        try {
          await this.$api.user.verification.resetPassword(this.form);
          this.addMessage({
            text: `Пароль успешно сброшен`,
            timeout: 5000,
          });
          this.$router.push({ name: "home" });
        } catch (e) {
          this.addMessage({
            text: `Ошибка. Не удалось сбросить пароль`,
            timeout: 5000,
            importance: "danger",
          });
        }
      }
    },
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.form.clear();
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
  },
};
</script>
