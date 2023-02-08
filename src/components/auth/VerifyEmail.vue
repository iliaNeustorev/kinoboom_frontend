<template>
  <div v-if="user.status == 1">Аккаунт уже активирован</div>
  <div v-else>Аккаунт активирован</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("userModule", ["user", "isAuth"]),
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async verified() {
      if (this.isAuth && this.user.email_verified_at == null) {
        try {
          await this.$api.user.verification.verifyEmail(
            this.$route.query.email_verify_url
          );
          document.location = "/";
        } catch (e) {
          this.addMessage({
            text: "Ошибка. Верификация аккаунта не удалась",
            timeout: 5000,
            importance: "danger",
          });
        }
      }
    },
  },
  mounted() {
    this.verified();
  },
  watch: {
    user() {
      this.verified();
    },
  },
};
</script>
