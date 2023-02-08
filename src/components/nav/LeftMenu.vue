<template>
  <send-verify-component
    v-if="user.status == 'Зарегистрирован'"
    :user-name="user.name"
    :check-verified-email="user.email_verified_at"
  />
  <article class="panel is-primary mt-2">
    <search-component />
    <admin-panel-component v-if="isAdmin" />
    <login-component />
    <rating-component />
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import AppLogin from "@/components/auth/Login";
import AppSendVerifyEmail from "@/components/auth/sendVerifyEmail";
import AppAdminPanel from "@/components/admin/Panel.vue";
import AppSearch from "@/components/Search.vue";
import AppRating from "@/components/rating/OnLeftMenu.vue";

export default {
  components: {
    "login-component": AppLogin,
    "send-verify-component": AppSendVerifyEmail,
    "admin-panel-component": AppAdminPanel,
    "search-component": AppSearch,
    "rating-component": AppRating,
  },
  computed: {
    ...mapGetters("userModule", ["user", "isAdmin"]),
  },
};
</script>
