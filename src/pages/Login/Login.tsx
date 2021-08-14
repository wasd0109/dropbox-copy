import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData } from "./LoginType";
import ErrorBar from "../../components/ErrorBar";
import ReactLoading from "react-loading";
import emailRegex from "../../components/validators/isEmail";
import { Link } from "react-router-dom";
import { auth } from "../../utils/fbInit";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loading, setLoading] = useState(false);
  const [registerError, setLoginError] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setLoginError("");
    const { email, password } = data;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      const authError = err as firebase.default.auth.Error;
      const ambiguousError =
        authError.code === "auth/user-not-found" ||
        authError.code === "auth/wrong-password"
          ? "Invalid email or password"
          : "";
      setLoading(false);
      setLoginError(ambiguousError || "Something went wrong");
    }
  };

  return (
    <div className="grid h-screen auto-rows-auto grid-cols-1 gap-x-2">
      <form
        className="row-start-2 row-end-4 col-span-full flex flex-col shadow-md items-stretch py-4 px-4 mx-2 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          Email
          <input
            type="email"
            className="border-2 mt-1"
            {...register("email", {
              required: "Required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email",
              },
            })}
          />
        </label>
        {errors.email?.message && (
          <div className="mt-2">
            <ErrorBar message={errors.email.message} />
          </div>
        )}

        <label className="flex flex-col mt-4">
          Password
          <input
            type="password"
            className="border-2 mt-1"
            {...register("password", {
              required: "Required",
              minLength: {
                value: 6,
                message: "Password must be longer than 6 characters",
              },
            })}
          />
        </label>
        {errors.password?.message && (
          <div className="mt-2">
            <ErrorBar message={errors.password.message} />
          </div>
        )}

        <div className="flex justify-center flex-col mt-4">
          {loading ? (
            <ReactLoading
              type="spin"
              color="#4299e1"
              className="self-center"
              width="2rem"
              height="2rem"
            />
          ) : (
            <input
              type="submit"
              aria-label="Login"
              value="Login"
              className="bg-blue-500 hover:bg-blue-700 cursor-pointer  text-white text-xl font-bold py-2 px-4 rounded self-center"
            />
          )}
          <Link
            to="/register"
            aria-label="To Login Page"
            className="self-end text-blue-500 hover:text-blue-700 cursor-pointer text-xl font-bold mt-2 mr-4"
          >
            Register
          </Link>
        </div>
        <div className=" self-center mt-2">
          {registerError ? <ErrorBar message={registerError} /> : null}
        </div>
      </form>
    </div>
  );
}

export default Login;
