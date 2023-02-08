<template>
  <div class="column is-half is-offset-one-quarter" v-if="!accessWrite">
    <i>Зарегистрируйтесь и подтвердите почту для отзыва</i>
  </div>
  <div v-else-if="user.blocked">
    <i class="has-text-danger">Отзыв оставить нельзя! Аккаунт заблокирован!</i>
  </div>
  <div v-else class="dropdown is-active is-justify-content-end">
    <div class="dropdown-trigger">
      <button
        @click="showForm"
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu2"
      >
        <span>Оставить отзыв</span>
        <span class="icon is-small">
          <mdicon name="menu-down-outline" />
        </span>
      </button>
    </div>
  </div>
  <div
    v-if="toggle"
    class="column is-half is-offset-one-quarter"
    id="dropdown-menu2"
  >
    <form-textarea-component
      :form="review"
      name="review"
      label="Отзыв"
      placeholder="Ваш отзыв"
      :object-validation="validation"
      @validation-field="validationField"
    />
    <div :disabled="!validationForm" class="field is-grouped is-grouped-right">
      <div class="control">
        <button
          :disabled="!validationForm"
          v-if="!loading"
          @click="sendForm"
          class="button is-link is-medium"
        >
          <span v-if="validationForm" class="icon is-small">
            <mdicon name="check-circle" />
          </span>
          <span> Отправить</span>
        </button>
        <button v-else class="button is-link is-loading is-medium">
          Loading
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      review: this.$vform.make({
        review: "",
      }),
      validation: {
        review: {
          valid: false,
          rule: /^.{5,}$/,
          text: "минимум 5 символов",
        },
      },
      toggle: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("userModule", ["user", "isAuth"]),
    validationForm() {
      return this.validation.review.valid;
    },
    accessWrite() {
      return this.isAuth || this.user.status === "Верифицирован";
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async sendForm() {
      if (this.validationForm) {
        this.loading = true;
        try {
          await this.$api.review.store(this.review);
          this.review.reset();
          this.toggle = false;
          this.addMessage({
            text: "Отзыв будет опубликован после модерации",
            timeout: 5000,
          });
        } catch (e) {
          this.addMessage({
            text: "Отзыв не отправлен.Ошибка",
            timeout: 5000,
            importance: "warning",
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
    showForm() {
      this.toggle = !this.toggle;
    },
  },
};
</script>
