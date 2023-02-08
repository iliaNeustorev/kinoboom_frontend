<template>
  <i :class="classRoles">{{ role }},</i>
</template>

<script>
export default {
  props: { role: { type: String, required: true } },
  computed: {
    classRoles() {
      return {
        "has-text-grey": this.role == "Пользователь",
        "has-text-primary-dark": this.role == "Администратор сайта",
        "has-text-info": this.role == "Модератор комментариев",
      };
    },
  },
  mounted() {},
};
</script>
