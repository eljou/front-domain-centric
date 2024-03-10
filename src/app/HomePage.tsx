import { useEffect } from "react";
import { useAuth } from "./auth/auth-provider";
import { ClientAppsMenu } from "./client-apps/ClientAppsMenu";
import { CreateAppModal } from "./client-apps/create-app-modal";
import { useClientApps } from "./client-apps/use-client-apps";

export function HomePage() {
  const auth = useAuth();
  const clientApps = useClientApps();
  const appsAreLoaded = () =>
    clientApps.state.kind == "app:reloading" ||
    clientApps.state.kind == "app:success";

  const getUserApps = () => clientApps.fetchUserApps().then(() => {});

  useEffect(() => {
    if (auth.state.kind == "user:in" && !appsAreLoaded()) getUserApps();
  }, [auth.state]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {auth.state.kind == "user:in" && (
            <div className="flex items-center flex-col">
              {(clientApps.state.kind == "app:success" ||
                clientApps.state.kind == "app:reloading") && (
                <ClientAppsMenu
                  clientApps={clientApps.state.apps}
                  selectApp={clientApps.setSelectedApp}
                />
              )}
              <br />

              <CreateAppModal />

              <hr />
              <button onClick={getUserApps}>get apps</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
