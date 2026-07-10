import React from "react";
import { useForm } from "react-hook-form";
import "./SignUpForm.css";

const SignUpForm = ({ onSubmit, loading, errorMessage }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  return (
    <main className="main-outer-form">
      <div className="outer-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-container">
            <h2>New at CrapShop</h2>
            <p>Make a new account and start your order!</p>
            <p>Personal Information</p>
          </div>

          <div className="form-input-outer">
            <section className="inner-form">
              <h3>Account Information</h3>

              <label htmlFor="email-field">
                Email:
                <input
                  type="email"
                  id="email-field"
                  {...register("email", {
                    required: "Email is verplicht",
                    validate: (value) =>
                      value.includes("@") || "Email is not valid",
                  })}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </label>

              <label htmlFor="password-field">
                Password:
                <input
                  type="password"
                  id="password-field"
                  {...register("password", {
                    required: "Password is obliged",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </label>

              <div className="submit-container">
                <button className="submit" type="submit" disabled={loading}>
                  {loading ? "Please wait..." : "Register"}
                </button>
              </div>

              {errorMessage && <p className="error">{errorMessage}</p>}
            </section>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
