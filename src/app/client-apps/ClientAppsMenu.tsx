import { Link } from "react-router-dom";
import { ClientApp } from "../../core/client-apps/domain/client-app";

export function ClientAppsMenu(props: {
  clientApps: ClientApp[];
  selectApp: (id: string) => Promise<void> | void;
}) {
  if (props.clientApps.length == 0) return <h3>No apps to show</h3>;

  return (
    <ul className="menu bg-base-200 w-56 rounded-box border border-gray-300">
      <li>
        <h2 className="menu-title">Select an App</h2>
        <ul>
          {props.clientApps.map((app) => (
            <li key={app.id}>
              <Link
                to={`/app/${app.id}`}
                onClick={() => props.selectApp(app.id)}
              >
                {app.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
