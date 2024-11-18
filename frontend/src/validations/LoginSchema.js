import { object, string } from "yup";

const LoginSchema = object({
  emailOrPhone: string()
    .required("Phone or email cannot be empty.")
    .test("is-phone-or-email", function (value) {
      const { createError } = this;

      if (value) {
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const phonePattern = /^[0-9]{10,11}$/;

        if (value.includes("@"))
          return (
            emailPattern.test(value) ||
            createError({ message: "Not a valid email address." })
          );
        if (parseInt(value))
          return (
            phonePattern.test(value) ||
            createError({
              message: "Invalid phone, 10 or 11 digits only.",
            })
          );
        return createError({ message: "Invalid phone or email." });
      }

      return true;
    }),
  password: string().required("Password cannot be empty."),
});

export default LoginSchema;
