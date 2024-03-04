import { useNavigate } from "react-router-dom";
import { dependenciesLocator } from "../../core/shared/dependecies";
import { usePlocState } from "../shared/use-ploc-state";
import { useEffect } from "react";

const registrationPloc = dependenciesLocator.provideRegisterPLoc();
export default function RegisterPage() {
  const state = usePlocState(registrationPloc);
  useEffect(() => {
    return () => registrationPloc.changeState({ kind: "registration:idle" });
  }, []);

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    registrationPloc
      .register(username, email, password)
      .then(() => navigate("/login", { replace: true }))
      .catch(() => {});
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="uname">
                  Username
                  <input
                    id="uname"
                    name="username"
                    type="text"
                    placeholder="jhondoe"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
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
                disabled={state.kind == "registration:loading"}
              >
                Register
              </button>
              {state.kind == "registration:error" && (
                <div role="alert" className="alert alert-error mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{state.errorMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
