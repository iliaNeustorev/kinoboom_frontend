import AppTable from "@/components/info/Table.vue";

export default {
  components: {
    "table-component": AppTable,
  },
  data() {
    return {
      idForDelete: [],
      count: 0,
      columns: [
        {
          label: "Удалить",
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
          label: "Дата создания",
          column: "created_at",
          direction: "desc",
          sort: true,
        },
        {
          label: "Описание",
          sort: false,
        },
        {
          label: "Видео",
          sort: false,
        },
        {
          label: "Картинка",
          sort: false,
        },
      ],
      sortColumn: {
        label: "Название",
        column: "name",
        direction: "desc",
      },
      page: this.$route.query.page,
    };
  },
  computed: {
    tableCollspan() {
      return this.columns.length;
    },
  },
  methods: {
    clearIdForDelete() {
      this.idForDelete = [];
    },
    sort(column) {
      let result = this.columns.filter((elem) => elem.label == column);
      this.sortColumn = result[0];
      if (column == this.sortColumn.label) {
        this.sortColumn.direction =
          this.sortColumn.direction == "desc" ? "asc" : "desc";
      }
      this.getElement();
    },
  },
};
