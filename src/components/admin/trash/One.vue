<template>
  <td title="Удалить навсегда">
    <button v-if="loading" class="button is-danger is-loading">
      ..loading
    </button>
    <delete-component
      v-else
      :route="`api/admin/trash/${model}/${elem.id}`"
      btn-class="is-danger is-rounded is-light"
      @delete-successful="$emit('reload-element')"
    >
      X</delete-component
    >
  </td>
  <td>
    <button v-if="loading" class="button is-success is-loading">
      ..loading
    </button>
    <button v-else @click.once="restoreOne" class="button is-success is-light">
      V
    </button>
  </td>
  <td>{{ elem.name }}</td>
  <td>{{ elem.slug }}</td>
  <td>{{ elem.description }}</td>
  <td>{{ elem.rating }}</td>
  <td>{{ elem.year_release }}</td>
  <td>{{ elem.deleted_at }}</td>
</template>

<script>
import AppDelete from "@/components/buttons/Delete.vue";
export default {
  components: {
    "delete-component": AppDelete,
  },
  props: {
    elem: { type: Object, requried: true },
    model: { type: String, requried: true },
  },
  data() {
    return { loading: false };
  },
  emits: ["reload-element"],
  methods: {
    async restoreOne() {
      this.loading = true;
      await this.$api.admin.trash.restoreOne(this.elem.id, this.model);
      this.loading = false;
      this.$emit("reload-element");
    },
  },
};
</script>
