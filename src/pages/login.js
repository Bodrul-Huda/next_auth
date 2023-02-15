import Layout from "../../layout/layout";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsFillEyeSlashFill } from "react-icons/bs";
import { HiAtSymbol } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import loginValidate from "../../lib/validate";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

const Login = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validate: loginValidate,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    if (status.ok) router.push(status.url);
  }

  //Google sign in handler
  const handleGoogleSignin = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  //GitHub sign in handler
  const handleGitHubSignin = async () => {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <Layout>
      <div>
        <div className="text-center font-bold text-3xl text-gray-800">
          <h2 className="py-2">Explore</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              className=" border gap-10 my-3 p-1 w-2/3"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            <HiAtSymbol className="icon inline items-center -ml-5" />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-400">{formik.errors.email} </span>
          ) : (
            <></>
          )}
          <div>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              className=" border gap-10 my-3 p-1 w-2/3"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <span onClick={() => setShow(!show)}>
              <BsFillEyeSlashFill
                className="icon inline items-center -ml-5"
                onClick={() => setShow(!show)}
              />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-400">{formik.errors.password} </span>
          ) : (
            <></>
          )}
          <div>
            <button
              type="submit"
              className="border px-3 py-1 rounded-full  my-3 w-2/4 bg-blue-300 shadow-sm hover:bg-blue-700 hover:text-gray-100"
            >
              Login
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="border px-3 py-1 rounded-full text-center my-3 w-2/4 bg-slate-300 shadow-sm hover:bg-blue-200 "
            >
              <FcGoogle className="inline text-xl mx-1" />
              Log in with Google
            </button>
          </div>
          <div>
            <button
              onClick={handleGitHubSignin}
              type="button"
              className="border px-3 py-1 rounded-full  my-3 w-2/4 bg-slate-300 shadow-sm hover:bg-blue-200"
            >
              <BsGithub className="inline text-xl mx-1" />
              Log in with Github
            </button>
          </div>

          <div>
            <p className="text-gray-600 py-3">
              Do not have an account yet?
              <Link legacyBehavior href={"/register"}>
                <a className="text-blue-700"> Sign Up</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
