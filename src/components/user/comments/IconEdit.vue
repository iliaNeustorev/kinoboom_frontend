<template>
  <span
    v-if="accessEdit"
    class="icon has-text-primary is-clickable"
    title="редактировать сообщение"
    ><mdicon v-if="show" class="has-text-info" name="book-edit" /><mdicon
      v-else
      name="book-edit-outline"
  /></span>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    id: { type: Number, required: true },
    commentUserId: { type: Number, required: true },
  },
  data() {
    return { show: true };
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
    accessEdit() {
      return this.commentUserId === this.user.id;
    },
  },
};
</script>
