import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;

    auth.login(username).then(() => navigate(from, { replace: true }));
    // Send them back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Please enter your name!</h2>
          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit}>
              <input
                name="username"
                type="text"
                placeholder="Type here"
                className="input input-md input-bordered w-full max-w-xs"
              />
              <button
                className="btn btn-ghost btn-md mt-3"
                disabled={auth.state.kind == "auth:loggin-in"}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
