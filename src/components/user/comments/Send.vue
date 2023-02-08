<template>
  <div class="is-flex is-justify-content-flex-end">
    <button
      @click="showForm"
      class="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu2"
    >
      <span>{{ nameButtonEdit }}</span>
      <span class="icon is-small">
        <mdicon name="menu-down-outline" />
      </span>
    </button>
  </div>
  <div v-show="show">
    <div v-if="user.blocked">
      <i class="has-text-danger"
        >Аккаунт заблокирован! Вы не можете отправлять сообщения!</i
      >
    </div>
    <div class="is-flex is-justify-content-flex-end" v-else>
      <form class="commentW" @submit.prevent="sendComment">
        <form-textarea-component
          name="text"
          :form="comment"
          placeholder="комментарий"
          :object-validation="validation"
          @validation-field="validationField"
        />
        <div class="buttons">
          <button
            :disabled="!validationForm"
            class="button is-warning is-medium"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    model: { type: String, required: false },
    slug: { type: String, required: true },
  },

  data() {
    return {
      comment: this.$vform.make({
        for: this.model ?? null,
        slug: this.slug,
        text: "",
      }),
      validation: {
        text: {
          valid: false,
          rule: /^.{1,256}$/,
          text: "минимум 1 максимум 256 символов",
        },
      },
      show: false,
    };
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
    validationForm() {
      return this.validation.text.valid;
    },
    nameButtonEdit() {
      return this.show ? "Отмена" : "Написать комментарий";
    },
  },
  watch: {
    slug() {
      this.comment.slug = this.slug;
    },
    model() {
      this.comment.for = this.model;
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async sendComment() {
      if (this.validationForm) {
        try {
          await this.$api.user.comment.store(this.comment);
          this.comment.reset();
          this.addMessage({
            text: "Сообщение отправлено и будет видно после модерации",
            timeout: 5000,
          });
          this.show = false;
        } catch (e) {
          this.addMessage({
            text: "Произошла ошибка. Сообщение не отправлено",
            timeout: 5000,
            importance: "warning",
          });
        }
      }
    },
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.comment.clear();
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
    showForm() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.commentW {
  flex-basis: 500px;
}
</style>
