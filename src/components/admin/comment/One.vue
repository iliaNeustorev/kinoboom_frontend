<template>
  <td v-if="commentsNew || commentsDeclined">
    {{ comment.created_at }}
  </td>
  <td v-if="commentsChanged">{{ comment.updated_at }}</td>
  <td>
    <span v-if="comment.commentable != null"
      ><router-link :to="linkToCommentable">{{
        comment.commentable.name
      }}</router-link></span
    >
    <span v-else>Не найдено</span>
  </td>
  <td>{{ comment.user.name }}</td>
  <td>{{ comment.text }}</td>
  <controls-component
    :id="+comment.id"
    :comments-is-declined="commentsDeclined"
    @reload-comments="$emit('reload-comments')"
  />
</template>

<script>
import AppControlsComment from "@/components/admin/comment/Controls";
export default {
  components: {
    "controls-component": AppControlsComment,
  },
  emits: ["reload-comments"],
  props: {
    comment: { type: Object, required: true },
    method: { type: String, required: true },
  },
  computed: {
    commentsNew() {
      return this.method == "getNew";
    },
    commentsChanged() {
      return this.method == "getChanged";
    },
    commentsDeclined() {
      return this.method == "getDeclined";
    },
    linkToCommentable() {
      return {
        name: "show",
        params: { slug: this.comment.commentable.slug },
      };
    },
  },
};
</script>
