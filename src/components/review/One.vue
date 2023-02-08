<template>
  <div class="message-header">
    <p>{{ review.user.name }}</p>
    <div>
      <like-component
        :id="review.id"
        :comment-user-id="review.user_id"
        model="review"
        :count-like="review.likes_count"
        :count-dislike="review.dislikes_count"
        @change-likes="reloadReviews(page)"
      />
    </div>
  </div>
  <div class="message-body">
    {{ review.review }}
  </div>
</template>

<script>
import AppLike from "@/components/like/Like";
export default {
  components: {
    "like-component": AppLike,
  },
  emits: ["get-reviews"],
  props: { review: { type: Object, required: true } },
  methods: {
    reloadReviews(page) {
      this.$emit("get-reviews", page);
    },
  },
};
</script>
