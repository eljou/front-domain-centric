import { useParams } from "react-router-dom";
import { useSelectedClientApp } from "./use-selected-client-app";

export function ClientAppPage() {
  const { id } = useParams();
  const clientApp = useSelectedClientApp();

  return (
    <div>
      <h1>Client App Page of: {id}</h1>
      <pre>{JSON.stringify({ ...clientApp }, null, 2)}</pre>
    </div>
  );
}
