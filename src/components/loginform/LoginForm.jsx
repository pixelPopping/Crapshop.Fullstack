import { useForm } from "react-hook-form";
import "./LoginForm.css";

const LoginForm = ({ onSubmit, loading }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  return (
    <main className="outer-signin">
      <section className="inner-signin">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="username-field">
            Username:
            <input
              type="text"
              id="username-field"
              {...register("username", {
                required: "Username is verplicht",
                minLength: {
                  value: 3,
                  message: "Minimum 3 karakters",
                },
              })}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </label>

          <label htmlFor="email-field">
            Email:
            <input
              type="email"
              id="email-field"
              {...register("email", {
                required: "Email is verplicht",
                validate: (value) =>
                  value.includes("@") || 'Email moet een "@" bevatten',
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
                required: "Password is verplicht",
                minLength: {
                  value: 8,
                  message: "Minimum 8 karakters",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Just one moment..." : "Log In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginForm;