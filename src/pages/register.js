import Layout from "../../layout/layout";
import Link from "next/link";
import { BsGithub, BsFillEyeSlashFill } from "react-icons/bs";
import { HiAtSymbol, HiUserCircle } from "react-icons/hi";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [show, setShow] = useState({ password: false, cpassword: false });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    onSubmit,
    validate: registerValidate,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("http://localhost:3000");
        }
      });
  }

  return (
    <Layout>
      <div className="">
        <div className="text-center font-bold text-3xl text-gray-800">
          <h2 className="py-2">Register</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              className=" border gap-10 my-3 p-1 w-2/3"
              placeholder="User Name"
              {...formik.getFieldProps("name")}
            />
            <HiUserCircle className="icon inline items-center -ml-5" />
          </div>
          {formik.errors.name && formik.touched.name ? (
            <span className="text-rose-400">{formik.errors.name} </span>
          ) : (
            <></>
          )}
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
              type={`${show.password ? "text" : "password"}`}
              name="password"
              className=" border gap-10 my-3 p-1 w-2/3"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />

            <BsFillEyeSlashFill
              className="icon inline items-center -ml-5"
              onClick={() => setShow({ ...show, password: !show.password })}
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-400">{formik.errors.password} </span>
          ) : (
            <></>
          )}
          <div>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              className=" border gap-10 my-3 p-1 w-2/3"
              placeholder="Confirm Password"
              {...formik.getFieldProps("cpassword")}
            />

            <BsFillEyeSlashFill
              className="icon inline items-center -ml-5"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            />
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-rose-400">{formik.errors.cpassword} </span>
          ) : (
            <></>
          )}
          <div>
            <button
              type="submit"
              className="border px-3 py-1 rounded-full  my-3 w-2/4 bg-blue-300 shadow-sm hover:bg-blue-700 hover:text-gray-100"
            >
              Sign Up
            </button>
          </div>

          <div>
            <p className="text-gray-600 py-3">
              Have an account!
              <Link legacyBehavior href={"/login"}>
                <a className="text-blue-700"> Sign In</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
