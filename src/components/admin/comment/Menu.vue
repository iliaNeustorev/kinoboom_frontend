<template>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <router-link
        v-for="(elem, i) in menu"
        :key="i"
        :to="{ name: 'admin.comments', params: { method: elem.method } }"
        class="dropdown-item"
        exact-active-class="has-text-danger-dark is-underlined"
      >
        {{ elem.text }}
        <count-comments-component :method="elem.method" :count="count" />
      </router-link>
    </div>
  </div>
</template>

<script>
import AppCountComments from "@/components/admin/comment/Count.vue";
export default {
  components: {
    "count-comments-component": AppCountComments,
  },
  data() {
    return {
      count: [],
      menu: [
        { method: "getNew", text: "Новые комментарии" },
        { method: "getChanged", text: "Измененые комментарии" },
        { method: "getDeclined", text: "Отклоненые комментарии" },
      ],
    };
  },
  async created() {
    this.count = await this.$api.admin.comment.getCount();
  },
};
</script>
