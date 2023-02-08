<template>
  <h1 class="title is-3 has-text-centered has-text-success-dark">
    Список всех зарегистрированых пользователей
  </h1>
  <div class="table-container">
    <table-component
      class-table="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      :name-titles="columns"
      :sort-column="sortColumn"
      @sort-column="sort"
    >
      <template v-if="users.length">
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ user.created_at }}
          </td>
          <td>
            {{ user.email }}
          </td>
          <td v-if="user.roles.length">
            <p v-for="role in user.roles" :key="role.id">
              <user-role-component :role="role.description" />
            </p>
          </td>
          <td v-else>
            <p>
              <i>Нет ролей</i>
            </p>
          </td>
          <td>
            <main-role-component :id="user.id" @reload-users="getUsers(page)" />
          </td>
          <td
            class="has-text-centered"
            :class="{ 'has-background-danger': user.blocked }"
          >
            <block-user-component
              :id="user.id"
              :current-state="Boolean(user.blocked)"
              @reload-users="getUsers"
            />
          </td>
        </tr>
      </template>
      <tr v-else>
        <td :colspan="tableCollspan">Нет данных</td>
      </tr>
      <tr>
        <td v-if="loading" :colspan="tableCollspan">
          <progress class="progress is-info is-medium" max="100" />
        </td>
        <td v-else :colspan="tableCollspan">
          <pagination-component
            :pagination="objectPagination"
            @change-page="getUsers"
          />
        </td>
      </tr>
    </table-component>
  </div>
</template>

<script>
import AppBlockUser from "@/components/admin/roles/BlockUser";
import AppUserRoles from "@/components/admin/roles/UserRoles";
import AppMainRole from "@/components/admin/roles/Main.vue";
import AppTable from "@/components/info/Table.vue";

export default {
  components: {
    "block-user-component": AppBlockUser,
    "user-role-component": AppUserRoles,
    "table-component": AppTable,
    "main-role-component": AppMainRole,
  },
  data() {
    return {
      columns: [
        {
          label: "Имя",
          column: "name",
          direction: "desc",
          sort: true,
        },
        {
          label: "Дата регистрации",
          column: "created_at",
          direction: "desc",
          sort: true,
        },

        {
          label: "Email",
          column: "email",
          direction: "desc",
          sort: true,
        },
        {
          label: "Роль",
          sort: false,
        },
        {
          label: "Назначить роль",
          sort: false,
        },
        {
          label: "Заблокировать",
          column: "blocked",
          direction: "desc",
          sort: true,
        },
      ],
      sortColumn: {
        label: "Имя",
        column: "name",
        direction: "desc",
        sort: true,
      },
      users: [],
      page: this.$route.query.page,
      objectPagination: [],
      loading: false,
    };
  },
  computed: {
    tableCollspan() {
      return this.columns.length;
    },
  },
  methods: {
    async getUsers(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "admin.users",
          query: { page },
        });
      }
      this.objectPagination = await this.$api.admin.users.all(
        page,
        this.sortColumn.direction,
        this.sortColumn.column
      );
      this.users = this.objectPagination.data;
      this.page = this.$route.query.page;
      this.loading = false;
    },
    sort(column) {
      let result = this.columns.filter((elem) => elem.label == column);
      this.sortColumn = result[0];
      if (column == this.sortColumn.label) {
        this.sortColumn.direction =
          this.sortColumn.direction == "desc" ? "asc" : "desc";
      }
      this.getUsers(this.page);
    },
  },
  created() {
    this.getUsers(this.page);
  },
};
</script>
