import React from "react";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";
import LoginImage from "../../assets/loginimage.svg?react";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div
      id="login-page"
      className="flex w-screen h-screen bg-white p-10 gap-5 justify-center"
    >
      <form
        id="login-form"
        className="rounded-2 p-5 w-full max-w-[500px] flex flex-col justify-center items-center"
        onSubmit={handleLogin}
      >
        <Logo />
        <div className=" flex flex-col rounded gap-3 w-full max-w-[300px]">
          <input type="text" placeholder="Username or email" />
          <input type="password" placeholder="Password" />

          <div>
            <Button
              label="Login"
              className="bg-red-500 text-white active:bg-red-400 w-full mt-4"
            />
          </div>
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
