<template>
  <div class="panel-heading is-flex is-align-items-center">
    <app-auth-access>
      <router-link :to="linkToAvatar" title="Изменить аватар">
        <figure class="image is-32x32 is-flex">
          <img
            class="is-rounded is-align-self-center"
            :src="user.urlPicture"
          /></figure></router-link
    ></app-auth-access>

    <span class="is-flex-grow-1 ml-1">{{ loginNameHeader }} </span>
    <app-auth-access>
      <span v-if="user.blocked" class="has-text-danger" title="бан">
        <mdicon name="block-helper" /></span
      ><span v-else :class="actived">{{ activeUser }} </span></app-auth-access
    >
  </div>
  <div class="box">
    <app-auth-access :no-auth="true">
      <form @submit.prevent="sendForm">
        <form-input-component
          :form="login"
          type="email"
          name="email"
          label="Почта"
          placeholder="Введите почту"
          icon-name="email-outline"
          :object-validation="validation"
          @validation-field="validationField"
        />
        <form-input-component
          :form="login"
          type="password"
          name="password"
          label="Пароль"
          icon-name="key-outline"
          placeholder="********"
          :object-validation="validation"
          @validation-field="validationField"
        />
        <form-checkbox-component
          class="mb-2"
          name="remember"
          :form="login"
          label="Запомнить меня"
        />
        <router-link :to="{ name: 'forgot' }"
          ><p v-if="showForbiddenPassword" class="has-text-centered mt-1">
            Забыли пароль?
          </p></router-link
        >
        <div class="buttons has-addons is-centered">
          <button
            v-if="!loadingLogin"
            :disabled="!validationForm"
            class="button is-primary mr-1"
          >
            Войти
          </button>
          <button v-else class="button is-primary is-loading mr-1">
            Loading
          </button>
          <router-link :to="{ name: 'register' }"
            ><button v-if="!loadingLogin" class="button is-warning">
              Регистрация
            </button></router-link
          >
        </div>
      </form></app-auth-access
    >
    <app-auth-access>
      <router-link :to="linkToProfile"
        ><button class="button is-link is-outlined mb-1 mr-1">
          Личный кабинет
        </button></router-link
      >
      <logout-component
    /></app-auth-access>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppLogout from "@/components/auth/Logout.vue";
export default {
  components: {
    "logout-component": AppLogout,
  },
  data() {
    return {
      loadingLogin: false,
      showForbiddenPassword: false,
      login: this.$vform.make({
        email: "",
        password: "",
      }),
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
      },
    };
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
    loginNameHeader() {
      return this.user.name ?? "Вход";
    },
    activeUser() {
      return this.user.status === "Верифицирован" ? "✓" : "?";
    },
    actived() {
      return {
        [this.$style.activated]: this.activeUser == "✓",
        [this.$style.unactivated]: this.activeUser == "?",
      };
    },
    validationForm() {
      return Object.values(this.validation).every((val) => val.valid);
    },
    linkToProfile() {
      return { name: "profile.main", params: { name: this.user.name } };
    },
    linkToAvatar() {
      return { name: "profile.avatar", params: { name: this.user.name } };
    },
  },
  methods: {
    ...mapActions("userModule", ["authUser"]),
    ...mapActions("alertModule", { addMessage: "add" }),
    async sendForm() {
      if (this.validationForm) {
        this.loadingLogin = true;
        try {
          await this.authUser(this.login);
        } catch (e) {
          let code = e.response?.status;
          if (code === 422) {
            this.addMessage({
              text: "Ошибка. Неверные данные",
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

          this.showForbiddenPassword = true;
        } finally {
          this.loadingLogin = false;
        }
      }
    },
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.login.clear();
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
  },
};
</script>

<style module>
.activated {
  float: right;
  color: #183e83;
}
.unactivated {
  float: right;
  color: #611919;
}
</style>
