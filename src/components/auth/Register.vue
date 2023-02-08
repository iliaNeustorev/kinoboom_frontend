<template>
  <form @submit.prevent="Register">
    <div class="column is-8">
      <form-input-component
        v-for="input in inputs"
        :key="input.name"
        :form="registerUser"
        :name="input.name"
        :label="input.label"
        :placeholder="input.placeholder"
        :type="input.type"
        :icon-name="input.iconName"
        :object-validation="validation"
        @validation-field="validationField"
      />
      <div v-if="!repeatPassword" class="notification is-danger is-light">
        Пароли не совпадают
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            :disabled="!validationForm"
            v-if="!loadingRegister"
            class="button is-link is-medium"
          >
            <span v-if="validationForm" class="icon is-small">
              <mdicon name="check-circle" />
            </span>
            <span>Зарегистрироваться</span>
          </button>
          <button v-else class="button is-link is-loading is-medium">
            Loading...
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loadingRegister: false,
      registerUser: this.$vform.make({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      }),
      inputs: [
        {
          name: "name",
          label: "Имя",
          placeholder: "Введите имя",
          iconName: "account-circle",
        },
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
        name: {
          valid: false,
          rule: /^[a-zA-Zа-яА-Я].{2,14}$/,
          text: "имя должно начинаться с буквы и быть не менее 3 и не более 15 символов",
        },
        email: {
          valid: false,
          rule: /^.{2,256}@.+\.[a-zA-Z]{2,256}$/,
          text: "должен быть корректный email",
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
    repeatPassword() {
      return (
        this.registerUser.password === this.registerUser.password_confirmation
      );
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
    async Register() {
      if (this.validationForm) {
        this.loadingRegister = true;
        try {
          await this.$api.user.main.register(this.registerUser);
          document.location = "/";
        } catch (e) {
          let code = e.response?.status;
          if (code == 422) {
            this.addMessage({
              text: "Регистрация не удалась",
              timeout: 5000,
              importance: "warning",
            });
          } else {
            this.addMessage({
              text: `Ошибка ответа от сервера`,
              timeout: 5000,
              importance: "danger",
            });
          }
        } finally {
          this.loadingRegister = false;
        }
      }
    },

    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.registerUser.clear();
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
  },
};
</script>
