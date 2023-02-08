import Form from "vform";
export default {
  props: {
    form: { type: Form, required: true },
    name: { type: String, required: true },
    label: { type: String, required: false },
    objectValidation: {
      type: Object,
      default: function () {
        return {
          default: { valid: true, rule: /^.*$/, text: "", oldValue: undefined },
        };
      },
    },
  },
  emits: ["validation-field"],
  computed: {
    checkRepeatValue() {
      return this.form[this.name] !== this.object.oldValue;
    },
    object() {
      return this.objectValidation[this.name] ?? this.objectValidation.default;
    },
    validation() {
      return this.object
        ? this.object.rule.test(this.form[this.name]) && this.checkRepeatValue
        : true;
    },
    text() {
      return this.object.text && !this.emptyFieldClass && !this.validation;
    },
    id() {
      return `field-${this.name}`;
    },
    hasError() {
      return this.form.errors.has(this.name);
    },
    emptyFieldClass() {
      if (this.emptyField && !this.hasError && !this.validation) {
        return "is-link";
      }
    },
    emptyField() {
      return !this.form[this.name].length;
    },
    inputClasses() {
      return {
        "is-danger": this.hasError || !this.validation,
        "is-success": this.validation,
      };
    },
    errorText() {
      return this.hasError ? this.form.errors.get(this.name) : null;
    },
  },
  mounted() {
    this.validationField();
  },
  watch: {
    validation() {
      this.validationField();
    },
  },
  methods: {
    validationField() {
      return this.$emit("validation-field", {
        currentRule: this.validation,
        name: this.name,
      });
    },
  },
};
