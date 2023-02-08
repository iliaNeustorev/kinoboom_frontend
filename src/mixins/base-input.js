export default {
  props: {
    placeholder: { type: String, required: false },
    iconName: { type: String, required: false },
  },
  computed: {
    iconClass() {
      return { "has-icons-left": this.iconName };
    },
  },
};
