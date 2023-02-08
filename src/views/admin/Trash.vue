<template>
  <loading-component v-if="!model" />
  <template v-else>
    <h1 class="title is-3 has-text-centered has-text-success-dark">
      {{ title }}
    </h1>
    <controls-trash-component
      :model="model"
      :check-elems="NoEmptyElems"
      @reload-elems="getElems"
    />
    <table-component
      class-table="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      :name-titles="columns"
      :sort-column="sortColumn"
      @sort-column="sort"
    >
      <template v-if="NoEmptyElems">
        <tr class="has-text-centered" v-for="elem in elems" :key="elem.id">
          <one-elem-component
            :model="model"
            :elem="elem"
            @reload-element="getElems(page)"
          />
        </tr>
        <tr>
          <td v-if="loading" :colspan="tableCollspan">
            <progress class="progress is-info is-medium" max="100" />
          </td>
          <td v-else :colspan="tableCollspan">
            <pagination-component
              :pagination="objectPagination"
              @change-page="getElems"
            />
          </td>
        </tr>
      </template>
      <tr v-else class="has-text-centered">
        <td :colspan="tableCollspan">Нет удаленных елементов</td>
      </tr>
    </table-component>
  </template>
</template>

<script>
import AppTable from "@/components/info/Table.vue";
import AppControlsTrash from "@/components/admin/trash/Controls";
import AppOneElem from "@/components/admin/trash/One.vue";
export default {
  components: {
    "table-component": AppTable,
    "controls-trash-component": AppControlsTrash,
    "one-elem-component": AppOneElem,
  },
  props: {
    model: { type: String, required: true },
  },
  data() {
    return {
      page: this.$route.query.page,
      objectPagination: [],
      loading: false,
      elems: [],
      columns: [
        {
          label: "Удалить",
          sort: false,
        },
        {
          label: "Востановить",
          sort: false,
        },
        {
          label: "Название",
          column: "name",
          direction: "desc",
          sort: true,
        },
        {
          label: "Slug",
          column: "slug",
          direction: "desc",
          sort: true,
        },
        {
          label: "Описание",
          sort: false,
        },
        {
          label: "Рейтинг",
          column: "rating",
          direction: "desc",
          sort: true,
        },
        {
          label: "Год релиза",
          column: "year_release",
          direction: "desc",
          sort: true,
        },
        {
          label: "Дата удаления",
          column: "deleted_at",
          direction: "desc",
          sort: true,
        },
      ],
      sortColumn: {
        label: "Дата удаления",
        column: "deleted_at",
        direction: "desc",
        sort: true,
      },
    };
  },
  methods: {
    async getElems(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "admin.trash",
          query: { page },
        });
      }
      let route;
      switch (this.model) {
        case "film":
          route = `api/admin/trash/${this.model}`;
          this.objectPagination = await this.$api.admin.trash.all(
            route,
            page,
            this.sortColumn.direction,
            this.sortColumn.column
          );
          break;
        case "serial":
          route = `api/admin/trash/${this.model}`;
          this.objectPagination = await this.$api.admin.trash.all(
            route,
            page,
            this.sortColumn.direction,
            this.sortColumn.column
          );
          break;
      }
      this.elems = this.objectPagination.data;
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
      this.getElems(this.page);
    },
  },
  computed: {
    title() {
      switch (this.model) {
        case "film":
          return "Список фильмов";
        case "serial":
          return "Список сериалов";
      }
    },
    tableCollspan() {
      return this.columns.length;
    },
    NoEmptyElems() {
      return this.elems.length > 0;
    },
  },
  created() {
    this.getElems(this.page);
  },
};
</script>
