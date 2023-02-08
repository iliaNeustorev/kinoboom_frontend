<template>
  <div class="buttons">
    <router-link :to="linkToAdd">
      <button class="button is-info is-rounded is-medium">
        Добавить новый
      </button></router-link
    >
    <router-link :to="linkToTrash">
      <button class="button is-warning is-rounded is-medium ml-2">
        Корзина<span> ({{ count }})</span>
      </button></router-link
    >
    <mass-delete-component
      v-if="idForDelete.length"
      :id-for-delete="idForDelete"
      :model="model"
      :route="routeDeletion"
      @reload-component="$emit('reload-component')"
    />
  </div>
</template>

<script>
import AppMassDelete from "@/components/buttons/MassDelete.vue";

export default {
  components: {
    "mass-delete-component": AppMassDelete,
  },
  props: {
    idForDelete: { type: Array, default: [] },
    model: { type: String, required: true },
    routeDeletion: { type: String, required: true },
    count: { type: Number, required: false },
  },
  emits: ["reload-component"],
  computed: {
    linkToTrash() {
      return { name: "admin.trash", params: { model: this.model } };
    },
    linkToAdd() {
      return { name: "admin.addElement", params: { model: this.model } };
    },
  },
};
</script>
