import { useForm } from "react-hook-form";
import Social from "./Social";
import FormRequiredErrorMsg from "../../components/FormRequiredErrorMsg";
import useAuth from "../../hooks/useAuth";
import { ImSpinner10 } from "react-icons/im";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { loading, setLoading, passwordLogin } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;
    passwordLogin(email, password)
      .then(() => {
        reset();
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((err) => {
        if (err.message.includes("invalid")) {
          toast.error("Invalid login credentials");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="w-fit grid grid-cols-2 shadow-xl rounded-lg mt-16">
          <div className="min-w-80 max-w-96 pt-6">
            <div className="px-8">
              <h2 className="text-4xl font-bold text-center mb-6">
                Welcome Back
              </h2>
              <p className="divider">Login With</p>
              <Social />
              <p className="divider">or</p>
            </div>
            <form
              className="card-body -mt-8"
              onSubmit={handleSubmit(handleLogin)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email*</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Registered Email Address"
                  className="input input-bordered"
                />
                {errors.email && <FormRequiredErrorMsg />}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password*</span>
                </label>
                <input
                  type={visible ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Account Password"
                  className="input input-bordered"
                />
                {errors.password && <FormRequiredErrorMsg />}
                {/* will implement latter */}
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control flex-row gap-2 ps-2 mt-4">
                <input
                  type="checkbox"
                  id="visible"
                  onChange={() => setVisible(!visible)}
                />
                <label htmlFor="visible">Show Password</label>
              </div>
              <div className="form-control mt-6">
                <button className="btn rounded-full text-white text-lg bg-blue-500 hover:text-blue-500 hover:border-blue-500 hover:bg-white">
                  {loading ? (
                    <ImSpinner10 className="animate-spin text-2xl" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="bg-blue-500 min-w-80 max-w-96 rounded-r-lg text-center text-white flex flex-col items-center justify-center p-6 gap-y-6">
            <h2 className="text-4xl font-bold pb-2">Login Now!!!</h2>
            <p>Get in touch with us using your login credentials</p>
            <p className="divider">or</p>
            <Link
              to="/register"
              className="px-6 py-2 rounded-full font-bold border border-white hover:bg-white hover:text-blue-500 duration-150">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
