<template>
  <h1 class="title is-3 has-text-centered has-text-success-dark">
    Список сериалов
  </h1>
  <controls-serial-component
    model="serial"
    :count="count"
    route-deletion="api/admin/serials/massDestroy"
    :id-for-delete="idForDelete"
    @reload-component="clearIdForDelete(), getSerials()"
  />
  <div class="table-container">
    <table-component
      class-table="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      :name-titles="columns"
      :sort-column="sortColumn"
      @sort-column="sort"
    >
      <template v-if="serials.length">
        <tr
          class="has-text-centered"
          v-for="serial in serials"
          :key="serial.id"
        >
          <td>
            <label class="checkbox mr-2">
              <input
                :value="serial.id"
                v-model="idForDelete"
                type="checkbox"
                title="Добавить для удаления"
              />
            </label>
          </td>
          <one-serial-component model="serial" :elem="serial" />
        </tr>
        <tr>
          <td v-if="loading" :colspan="tableCollspan">
            <progress class="progress is-info is-medium" max="100" />
          </td>
          <td v-else :colspan="tableCollspan">
            <pagination-component
              :pagination="objectPagination"
              @change-page="getSerials"
            />
          </td>
        </tr>
      </template>
      <tr v-else class="has-text-centered">
        <td :colspan="tableCollspan">Сериалов нет</td>
      </tr>
    </table-component>
  </div>
</template>

<script>
import filmsSerialsTables from "@/mixins/films-serials-tables";
import AppControlsSerial from "@/components/admin/film/Controls.vue";
import AppOneSerial from "@/components/admin/film/One.vue";

export default {
  components: {
    "controls-serial-component": AppControlsSerial,
    "one-serial-component": AppOneSerial,
  },
  mixins: [filmsSerialsTables],
  data() {
    return {
      serials: [],
      objectPagination: [],
      loading: false,
    };
  },
  methods: {
    async getSerials(page = 1) {
      this.loading = true;
      if (page != this.$route.query.page) {
        this.$router.push({
          name: "admin.serials",
          query: { page },
        });
      }
      let data = await this.$api.admin.serial.all(
        page,
        this.sortColumn.direction,
        this.sortColumn.column
      );

      this.count = data.count;
      this.objectPagination = data.serials;
      this.serials = data.serials.data;
      this.page = this.$route.query.page;
      this.loading = false;
    },
    getElement() {
      this.getSerials(this.page);
    },
  },
  created() {
    this.getSerials(this.page);
  },
};
</script>
