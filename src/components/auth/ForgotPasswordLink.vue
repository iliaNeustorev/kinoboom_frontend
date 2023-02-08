<template>
  <form v-if="!show" class="box column is-5" @submit.prevent="send">
    <form-input-component
      ref="email"
      :form="form"
      type="email"
      name="email"
      label="Почта"
      placeholder="Введите почту"
      icon-name="email-outline"
      :object-validation="validation"
      @validation-field="validationField"
    />
    <button :disabled="!validationForm" v-if="!loading" class="button is-link">
      Отправить
    </button>
    <button v-else class="button is-link is-loading">Loading</button>
  </form>
  <p v-else>
    <i>Ссылка для сброса пароля отправлена на почту {{ form.email }}</i>
  </p>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      show: false,
      form: this.$vform.make({
        email: "",
      }),
      validation: {
        email: {
          valid: false,
          rule: /^.{2,256}@.+\.[a-zA-Z]{2,256}$/,
          text: "должен быть корректный email",
        },
      },
    };
  },
  computed: {
    validationForm() {
      return this.validation.email.valid;
    },
  },
  mounted() {
    this.$refs.email.$refs.first.focus();
  },
  methods: {
    async send() {
      if (this.validationForm) {
        this.loading = true;
        try {
          await this.$api.user.verification.forgotPassword(this.form);
          this.show = true;
        } catch (e) {
        } finally {
          this.loading = false;
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
