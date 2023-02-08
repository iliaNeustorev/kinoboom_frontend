<template>
  <div class="dropdown is-active">
    <div class="dropdown-trigger">
      <button
        @click="toggle = !toggle"
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu2"
      >
        <span>Изменить роль</span>
        <span class="icon is-small">
          <mdicon name="menu-down-outline" />
        </span>
      </button>
    </div>
  </div>
  <div v-if="toggle" id="dropdown-menu2">
    <edit-role-component :id="id" @reload-users="reloadUsers" />
  </div>
</template>

<script>
import AppEditRole from "@/components/admin/roles/Edit";

export default {
  components: {
    "edit-role-component": AppEditRole,
  },
  props: { id: { type: Number, required: true } },
  emits: ["reload-users"],
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    reloadUsers() {
      this.toggle = false;
      this.$emit("reload-users");
    },
  },
};
</script>
