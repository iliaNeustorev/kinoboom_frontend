<template>
  <h2 class="subtitle is-3">Комментарии</h2>
  <template v-if="comments.length">
    <article
      v-for="comment in comments"
      :key="comment.id"
      class="message is-dark"
    >
      <div class="message-header">
        <p>
          {{ comment.user.name }}
          <app-auth-access>
            <icon-edit-component
              ref="iconEdit"
              :id="comment.id"
              :comment-user-id="comment.user.id"
              @click="showEdit(comment.user.id, comment.id)"
            />
          </app-auth-access>
        </p>
        <div>
          <like-component
            :id="comment.id"
            model="comment"
            :comment-user-id="comment.user.id"
            :count-like="comment.likes_count"
            :count-dislike="comment.dislikes_count"
            @change-likes="$emit('reload-element')"
          />
        </div>
      </div>
      <div class="message-body">
        {{ comment.text }}
      </div>
      <app-auth-access>
        <change-comment-component
          ref="editComment"
          :id="comment.id"
          :text="comment.text"
          @reload-element="$emit('reload-element')"
        />
      </app-auth-access>
    </article>
  </template>
  <template v-else>
    <article>
      <h4><i>коментариев нет</i></h4>
    </article>
  </template>
</template>

<script>
import AppChangeComment from "@/components/user/comments/Change.vue";
import AppLike from "@/components/like/Like";
import AppIconEdit from "@/components/user/comments/IconEdit.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    "change-comment-component": AppChangeComment,
    "like-component": AppLike,
    "icon-edit-component": AppIconEdit,
  },
  props: { comments: { type: Array, default: [] } },
  emits: ["reload-element"],
  computed: {
    ...mapGetters("userModule", ["user"]),
  },
  methods: {
    showEdit(userId, commentId) {
      if (userId === this.user.id) {
        let edit = Object.values(this.$refs.editComment).filter(
          (elem) => elem.id === commentId
        );
        let icon = Object.values(this.$refs.iconEdit).filter(
          (elem) => elem.id === commentId
        );
        edit[0].show = !edit[0].show;
        icon[0].show = !icon[0].show;
      }
    },
  },
};
</script>
