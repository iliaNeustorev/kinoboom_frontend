<template>
  <loading-component v-if="loading" />
  <div v-else>
    <h1 class="title is-3 has-text-centered">
      <title-component :method="method" />
    </h1>
    <div class="table-container">
      <table-component
        class-table="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        :name-titles="columns"
        :sort-column="sortColumn"
        @sort-column="sort"
      >
        <template v-if="comments.length">
          <tr
            class="has-text-centered"
            v-for="comment in comments"
            :key="comment.id"
          >
            <one-comment-component
              :comment="comment"
              :method="method"
              @reload-comments="getComments"
            />
          </tr>
          <tr>
            <td v-if="loading" :colspan="tableCollspan">
              <progress class="progress is-info is-medium" max="100" />
            </td>
            <td v-else :colspan="tableCollspan">
              <pagination-component
                :pagination="objectPagination"
                @change-page="getComments"
              />
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colspan="tableCollspan" class="has-text-centered has-text-info">
            <i>Новых коментариев нет</i>
          </td>
        </tr>
      </table-component>
    </div>
  </div>
</template>

<script>
import AppTable from "@/components/info/Table.vue";
import AppOneComment from "@/components/admin/comment/One.vue";
import AppTitleComment from "@/components/admin/comment/Title.vue";
export default {
  components: {
    "table-component": AppTable,
    "one-comment-component": AppOneComment,
    "title-component": AppTitleComment,
  },
  data() {
    return {
      loading: false,
      page: this.$route.query.page,
      objectPagination: [],
      columns: [
        {
          label: "Время добавления",
          column: "created_at",
          direction: "desc",
          sort: true,
        },
        {
          label: "Фильм/Сериал",
          column: "commentable_type",
          direction: "desc",
          sort: true,
        },

        {
          label: "Автор",
          sort: false,
        },
        {
          label: "Комммент",
          sort: false,
        },
        {
          label: "Принять",
          sort: false,
        },
        {
          label: "Отклонить",
          sort: false,
        },
        {
          label: "Удалить",
          sort: false,
        },
      ],
      comments: [],
      sortColumn: {
        label: "Время добавления",
        column: "created_at",
        direction: "desc",
        sort: true,
      },
    };
  },
  computed: {
    method() {
      return this.$route.params.method;
    },
    tableCollspan() {
      return this.columns.length;
    },
  },
  methods: {
    async getComments(page = 1) {
      if (this.method != undefined) {
        this.objectPagination = await this.$api.admin.comment.getComments(
          this.method,
          page,
          this.sortColumn.direction,
          this.sortColumn.column
        );
        this.comments = this.objectPagination.data;
        this.page = this.$route.query.page;
        this.loading = false;
      }
    },
    loadComments() {
      this.loading = true;
      this.getComments(this.page);
    },
    sort(column) {
      let result = this.columns.filter((elem) => elem.label == column);
      this.sortColumn = result[0];
      if (column == this.sortColumn.label) {
        this.sortColumn.direction =
          this.sortColumn.direction == "desc" ? "asc" : "desc";
      }
      this.loadComments();
    },
  },
  watch: {
    method() {
      this.loadComments();
    },
  },
  created() {
    this.loadComments();
  },
};
</script>
