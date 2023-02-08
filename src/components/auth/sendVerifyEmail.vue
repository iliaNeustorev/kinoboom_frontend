<template>
  <div v-if="checkConfirmEmail" class="notification is-link is-light">
    Подтвердите аккаунт на вашей электронной почте
    <div><a @click="confirmEmail">отправить повторно ссылку</a></div>
  </div>
  <div v-if="hideConfirmEmail" class="notification is-link is-light">
    Ссылка отправлена. <i>Проверьте электронную почту</i>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    userName: { type: String, required: true },
    checkVerifiedEmail: { type: String | null },
  },
  data() {
    return {
      hideConfirmEmail: false,
    };
  },
  computed: {
    checkConfirmEmail() {
      return (
        this.userName &&
        this.checkVerifiedEmail == null &&
        !this.hideConfirmEmail
      );
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async confirmEmail() {
      try {
        this.hideConfirmEmail = true;
        await this.$api.user.verification.sendVerifyEmail();
      } catch (e) {
        this.addMessage({
          text: "Ошибка ответа от сервера. Отправить письмо не удалось",
          timeout: 5000,
          importance: "danger",
        });
      }
    },
  },
};
</script>
