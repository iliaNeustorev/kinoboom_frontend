<template>
  <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
    <span> {{ rating }}</span>
    <template v-if="isAuth">
      <div v-if="!checkScore" class="ml-2 buttons has-addons are-small">
        <button
          class="button is-primary is-rounded"
          :class="$style.buttonWidth"
          @click="sendRating('increase')"
          :disabled="loading"
        >
          <span class="is-size-4 has-text-weight-bold">+</span>
        </button>
        <button
          class="button is-danger is-rounded"
          :class="$style.buttonWidth"
          @click="sendRating('decrease')"
          :disabled="loading"
        >
          <span class="is-size-4 has-text-weight-bold">-</span>
        </button>
      </div>
      <span v-else class="ml-1 has-text-success" title="Вы уже оценили"
        ><mdicon name="checkbox-marked-circle-outline"
      /></span>
    </template>
  </div>

  <!-- <div class="tag is-black is-medium">
    {{ rating }}
    <template v-if="isAuth">
      <span v-if="!checkScore" class="ml-2 buttons has-addons are-small">
        <button
          class="button is-primary is-rounded"
          :class="$style.buttonWidth"
          @click="sendRating('increase')"
          :disabled="loading"
        >
          <span class="is-size-4 has-text-weight-bold">+</span>
        </button>
        <button
          class="button is-danger is-rounded"
          :class="$style.buttonWidth"
          @click="sendRating('decrease')"
          :disabled="loading"
        >
          <span class="is-size-4 has-text-weight-bold">-</span>
        </button>
      </span>
      <span v-else class="ml-1 has-text-success" title="Вы уже оценили"
        ><mdicon name="checkbox-marked-circle-outline"
      /></span>
    </template>
  </div> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    rating: { type: Number, required: true },
    score: { type: Number, default: 0 },
    slug: { type: String, required: true },
  },
  emits: ["reload-element"],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters("userModule", ["isAuth"]),
    checkScore() {
      return this.score > 0;
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async sendRating(method) {
      this.loading = true;
      try {
        await this.$api.home.changeRating(method, this.slug);
        this.$emit("reload-element");
      } catch (e) {
        let code = e.response?.status;
        if (code === 400) {
          this.addMessage({
            text: "Рейтинг уже был поставлен",
            importance: "warning",
            closeable: true,
          });
          this.$emit("reload-element");
        } else {
          this.addMessage({
            text: `Ошибка ответа от сервера`,
            timeout: 5000,
            importance: "danger",
          });
        }
      }
    },
  },
};
</script>

<style module>
.buttonWidth {
  width: 25px;
  height: 25px;
}
</style>
