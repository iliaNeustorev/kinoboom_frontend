<template>
  <div class="field is-grouped">
    <p class="control">
      <button v-if="loading" class="button is-success is-medium is-loading">
        ..loading
      </button>
      <button
        v-else
        @click.once="restoreAll"
        :disabled="!checkElems"
        class="button is-primary is-medium"
      >
        Восстановить все
      </button>
    </p>
    <p v-if="checkElems" class="control">
      <button v-if="loading" class="button is-danger is-medium is-loading">
        ..loading
      </button>
      <delete-component
        v-else
        :route="`api/admin/trash/${model}/deleteAll`"
        btn-class="is-danger is-medium"
        @delete-successful="$emit('reload-elems')"
        method="post"
      >
        Удалить все</delete-component
      >
    </p>
    <p class="control">
      <button-back-component :route="routeBack" />
    </p>
  </div>
</template>

<script>
import AppDelete from "@/components/buttons/Delete.vue";
import { mapActions } from "vuex";

export default {
  components: {
    "delete-component": AppDelete,
  },

  props: {
    model: { type: String, required: true },
    checkElems: { type: Boolean, required: true },
  },
  emits: ["reload-elems"],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    routeBack() {
      switch (this.model) {
        case "film":
          return "admin.films";
        case "serial":
          return "admin.serials";
      }
    },
  },
  methods: {
    ...mapActions("alertModule", { addMessage: "add" }),
    async restoreAll() {
      this.loading = true;
      try {
        await this.$api.admin.trash.restoreAll(this.model);
        this.$router.push({ name: this.routeBack });
      } catch (e) {
        this.addMessage({
          text: "Восстановить не удалось",
          timeout: 5000,
          importance: "warning",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
