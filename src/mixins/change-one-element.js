export default {
  data() {
    return {
      model: this.$route.params.model,
      loadingForm: false,
      element: this.$vform.make({
        name: "",
        slug: "",
        description: "",
        video: "",
        picture: null,
        rating: "",
        year_release: "",
      }),
      inputs: [
        {
          name: "name",
          label: "Имя",
          placeholder: "Введите имя",
        },
        {
          name: "slug",
          label: "Slug",
          placeholder: "Введите slug",
        },

        {
          name: "video",
          label: "Видео",
          placeholder: "Введите код видео с youtube",
        },
        {
          name: "rating",
          label: "Рейтинг",
          placeholder: "Введите рейтинг",
        },
        {
          name: "year_release",
          label: "Год релиза",
          placeholder: "Введите год релиза",
        },
      ],
      validation: {
        name: {
          valid: false,
          rule: /^[a-zA-Zа-яА-Я\d].{2,29}$/,
          text: "Имя должно начинаться с буквы или цифры и иметь от 3 до 30 символов",
        },
        slug: {
          valid: false,
          rule: /^[a-zA-Zа-яА-Я].{2,63}$/,
          text: "Slug должен начинаться с буквы и иметь от 3 до 64 символов",
        },
        description: {
          valid: false,
          rule: /^.{10,1000}$/,
          text: "Описание от 10 до 1000 символов",
        },
        video: {
          valid: false,
          rule: /^.{2,16}$/,
          text: "Должен быть код с yotube максимум 16 символов",
        },
        rating: {
          valid: false,
          rule: /^[1-9]\d{0,2}\.\d{1,2}$/,
          text: "формат ввода (число.число)",
        },
        year_release: {
          valid: false,
          rule: /^\d{4}$/,
          text: "4 цифры",
        },
        picture: {
          valid: true,
          rule: /^.+\.jpeg|jpg|png|bmp$/,
          text: "Картинка должна иметь расширение jpeg,jpg,png,bmp",
        },
      },
    };
  },
  computed: {
    validationForm() {
      return Object.values(this.validation).every((val) => val.valid);
    },
  },
  methods: {
    validationField(elem) {
      if (this.validation[elem.name] != undefined) {
        this.validation[elem.name].valid = elem.currentRule;
      }
    },
    addMessage(text, type) {
      this.add({
        text: text,
        timeout: 5000,
        importance: type,
      });
    },
  },
};
