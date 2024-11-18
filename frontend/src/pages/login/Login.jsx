import { useState } from "react";
import LoginImage from "../../assets/loginimage.svg?react";
import Button from "../../components/button/Button";
import ErrorAlert from "../../components/erroralert/ErrorAlert";
import Logo from "../../components/logo/Logo";
import apiClient from "../../ultils/apiClient";
import LoginSchema from "../../validations/LoginSchema";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState({ messages: null, show: null });
  const navigate = useNavigate();

  const showErrors = (messages, show) =>
    setError({
      messages,
      show,
    });

  const resetErrors = () =>
    setError({
      messages: null,
      show: null,
    });

  // handle submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // to fix the reflow of the error animation
    resetErrors();

    // Frontend Validations block
    try {
      const emailOrPhone = e.target["login-email-phone"].value;
      const password = e.target["login-password"].value;

      await LoginSchema.validate(
        { emailOrPhone, password },
        { abortEarly: false }
      );

      // Backend Validations block
      try {
        const response = await apiClient.post("/auth/login", {
          emailorphone: emailOrPhone,
          password,
        });

        console.log(response);
        navigate("/dashboard");
      } catch (error) {
        let message = `[${error.status}] : ${error.response.data.message}`;

        showErrors([message], true);
      }
    } catch (errors) {
      const errorMessages = errors?.inner?.map((error) => error.message);
      console.log(errorMessages);

      //setTimout to fix the reflow of the error animation
      setTimeout(() => {
        showErrors(errorMessages, true);
      }, 0);
    }
  };

  return (
    <div
      id="login-page"
      className="flex w-screen max-sm:p-0 h-screen bg-white p-10 gap-5 justify-center"
    >
      <ErrorAlert
        messages={error.messages}
        className={
          error.show
            ? "animate-[expanddown_0.3s_ease-in]"
            : error.show !== null
            ? "animate-[collapse_0.3s_ease-in] opacity-0"
            : "hidden"
        }
        onClose={() => {
          setError((pre) => ({
            ...pre,
            show: false,
          }));
        }}
      />

      <form
        id="login-form"
        className="rounded-2 p-5 w-1/2 flex flex-col justify-center items-center"
        onSubmit={handleLogin}
      >
        <Logo />
        <div className=" flex flex-col rounded gap-3 w-full max-w-[300px]">
          <input
            id="login-email-phone"
            name="login-email-phone"
            type="text"
            placeholder="Email or Phone"
          />
          <input
            id="login-password"
            name="login-password"
            type="password"
            placeholder="Password"
          />

          <div>
            <Button
              label="Login"
              className="bg-red-500 text-white active:bg-red-400 w-full mt-4"
            />
          </div>

          <p className="text-[12px]">
            Not having an account yet ? register{" "}
            <a className="text-red-500 font-semibold" href="#">
              here
            </a>
            &nbsp;👀
          </p>
        </div>
      </form>

      <div
        id="login-brand-section"
        className="flex w-full p-10  rounded-2 flex-1 max-lg:hidden"
      >
        <LoginImage className="rounded-md w-full object-contain aspect-square fill-red-500" />
      </div>
    </div>
  );
}
