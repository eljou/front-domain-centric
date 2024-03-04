import { Navigate, useLocation } from "react-router-dom";
import { ErrorAlert } from "../components/ErrorAlert";
import { useAuth } from "./auth-provider";

export default function LoginPage() {
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.login(email, password);
  }

  return auth.state.kind == "user:in" ? (
    <Navigate to={from} replace />
  ) : (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Please enter your name!</h2>
          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="mail">
                  Email
                  <input
                    id="mail"
                    name="email"
                    type="email"
                    placeholder="jhon@mail.com"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </label>
              </div>

              <label htmlFor="pass" className="py-3">
                Password
                <input
                  id="pass"
                  name="password"
                  type="password"
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </label>
              <button
                className="btn btn-outline btn-md mt-3"
                disabled={auth.state.kind == "user:loggin-in"}
              >
                Login
              </button>
              {auth.state.kind == "user:error" && (
                <ErrorAlert errorMsg={auth.state.errorMsg} />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
