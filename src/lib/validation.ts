import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    // @ts-ignore Yup do not provide types for that
    //   notType: (args) => {
    //       if (args.type === "number" && isNaN(args.value)) {
    //           return "Pole wymagane";
    //       }
    //       if (args.path.includes("selected")) {
    //           return "Pole wymagane";
    //       }
    //       return "Niepoprawny format";
    //   },
    required: "Field is required",
    //   oneOf: "Niepoprawna wartość",
    // @ts-ignore Yup do not provide types for that
    //   length: "Minimalna ilość znaków to ${min}",
  },
  // string: {
  //     min: "Minimalna ilość znaków to ${min}",
  //     max: "Maksymalna ilość znaków to ${max}",
  //     email: "Niepoprawny adres e-mail",
  // },
  // number: {
  //     min: "Wartość musi być większa od ${min}",
  //     max: "Wartość musi być mniejsza od ${min}",
  //     positive: "Wartość nie może być ujemna",
  // },
  // array: {
  //     min: "Minimalna ilość to ${min}",
  // },
  // date: {
  //     min: "Please select a later date",
  //     max: "Please select an earlier date",
  // },
});

export default Yup;
