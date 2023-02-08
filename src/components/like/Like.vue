<template>
  <app-auth-access>
    <mdicon
      v-if="ruleCommentableUser"
      class="is-clickable"
      @click.exact="sendRate(id, 'like')"
      :class="likeClass"
      name="thumb-up"
    />
    |
  </app-auth-access>
  <count-like-component
    :count-like="this.countLike"
    :count-dislike="this.countDislike"
  />
  <app-auth-access>
    |
    <mdicon
      v-if="ruleCommentableUser"
      class="is-clickable"
      @click.exact="sendRate(id, 'dislike')"
      :class="dislikeClass"
      name="thumb-down-outline"
    />
  </app-auth-access>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppCountLike from "@/components/like/Count";
export default {
  components: {
    "count-like-component": AppCountLike,
  },
  emits: ["change-likes"],
  props: {
    id: { type: Number, required: true },
    model: { type: String, required: true },
    countLike: { type: Number, required: true },
    countDislike: { type: Number, required: true },
    commentUserId: { type: Number, required: true },
  },
  computed: {
    ...mapGetters("userModule", [
      "likes",
      "dislikes",
      "user",
      "inLikes",
      "inDislikes",
    ]),
    emptyLike() {
      return !this.inLikes(this.id) && !this.inDislikes(this.id);
    },
    likeClass() {
      return {
        "has-text-success": this.inLikes(this.id),
        "has-text-grey": this.inDislikes(this.id),
      };
    },
    dislikeClass() {
      return {
        "has-text-danger": this.inDislikes(this.id),
        "has-text-grey": this.inLikes(this.id),
      };
    },
    ruleCommentableUser() {
      return this.commentUserId !== this.user.id;
    },
  },
  methods: {
    ...mapActions("userModule", ["setRate", "deleteRate", "checkUser"]),
    ...mapActions("alertModule", { addMessage: "add" }),
    async sendRate(id, method) {
      if (this.emptyLike) {
        try {
          await this.$api.home.like.store(method, this.model, id);
          this.setRate({ id: this.id, model: this.model, method: method });
        } catch (e) {
          let code = e.response?.status;
          if (code === 422) {
            this.addMessage({
              text: "Уже поставлен",
              timeout: 5000,
              importance: "warning",
            });
            this.checkUser();
          } else {
            this.addMessage({
              text: `Ошибка ответа от сервера`,
              timeout: 5000,
              importance: "danger",
            });
          }
        } finally {
          this.$emit("change-likes");
        }
      } else if (
        (method === "like" && this.inLikes(this.id)) ||
        (method === "dislike" && this.inDislikes(this.id))
      ) {
        this.cancelRate(id, method);
      } else {
        let res = await this.$api.home.like.update(method, this.model, id);
        if (res) {
          this.setRate({ id: this.id, model: this.model, method: method });
          this.$emit("change-likes");
        }
      }
    },
    async cancelRate(id, method) {
      let res = await this.$api.home.like.cancel(id, this.model);
      if (res) {
        this.deleteRate({ id: this.id, model: this.model, method: method });
        this.$emit("change-likes");
      }
    },
  },
};
</script>
