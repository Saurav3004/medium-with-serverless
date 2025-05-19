import type { SignupInput } from "@devfreak/medium-common";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const data = response.data;
      console.log(data.token);
      localStorage.setItem("token", data.token);
      setLoading(false);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.msg);
      } else {
        console.log(error);
      }
    }
  }
  return (
    <div className="h-screen flex flex-col justify-center w-full ">
      <div className="flex flex-col  justify-center items-center ">
        <div>
          <div>
            <div className="text-3xl mr-3 font-extrabold">
              {type == "signup" ? "Create an account" : "Welcome back!!"}
            </div>
            <div className="text-slate-500">
              {type == "signup"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Link
                to={type == "signup" ? "/signin" : "/signup"}
                className="underline pl-1"
              >
                {type == "signup" ? "Sign in" : "Sign up"}
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[300px] mt-7">
          <div>
            <LabelledInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            {type == "signup" ? (
              <LabelledInput
                label="Username"
                placeholder="Enter your username"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              disabled={loading}
              className="text-white w-full mt-2 bg-gray-800  focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 flex justify-center items-center cursor-pointer"
            >
              {loading ? (
                <>
                 <span className="ml-2">Loading...</span>
                </>
              ) : type === "signup" ? (
                "Sign up"
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block  text-sm font-medium text-black mt-2 mb-1">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        id="first_name"
        className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
