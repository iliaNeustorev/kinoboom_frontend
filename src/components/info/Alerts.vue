<template>
  <teleport v-if="showAlerts" to="#portal-notification">
    <div class="info">
      <transition-group name="item" tag="div">
        <div
          v-for="alert in all"
          :key="alert.id"
          class="item notification"
          :class="{
            'is-info': alert.importance == 'info',
            'is-warning': alert.importance == 'warning',
            'is-danger': alert.importance == 'danger',
          }"
        >
          {{ alert.text }}
          <button
            class="delete"
            v-if="alert.closeable"
            @click="remove(alert.id)"
          >
            x
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("alertModule", ["all"]),
    showAlerts() {
      return this.all.length;
    },
  },
  methods: {
    ...mapActions("alertModule", ["remove"]),
  },
};
</script>

<style scoped>
.info {
  font-family: myriad-pro, sans-serif;
  position: fixed;
  top: 5px;
  right: 20px;
  width: 300px;
  padding: 30px;
  z-index: 10000;
}

.item {
  margin: 0 0 10px 0;
  border-radius: 20px;
  padding: 30px;
}

.item-enter-active {
  animation: fadeIn 0.5s;
}

.item-leave-active {
  animation: fadeOut 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
