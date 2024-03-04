export type QueryOptions = {
  timeout?: number;
  headers?: { [k: string]: string | number | string[] };
};

export type MutationOptions = QueryOptions & {
  mode: "update" | "create" | "remove";
  body: object;
};

class ServerError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ServerError";
  }
}
class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
  }
}
class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

function makeRestClient() {
  const baseURL = "http://localhost:8080";
  let authToken: string | null = null;

  const makeUrl = (path: string) => `${baseURL}${path}`;

  const getOptions = (
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
    headers: Headers,
    timeout = 8000,
    body: null | object = null
  ): RequestInit => {
    if (method != "GET" && method != "DELETE")
      headers.set("Content-type", "application/json");

    return {
      method,
      headers,
      credentials: "include",
      mode: "cors",
      cache: "default",
      signal: AbortSignal.timeout(timeout ?? 8000),
      body: body ? JSON.stringify(body) : null,
    };
  };

  const getHeaders = (headers: { [k: string]: string | number | string[] }) => {
    const heads = new Headers();
    if (authToken) heads.set("Authorization", authToken);

    Object.entries(headers).forEach((entrie) =>
      heads.set(entrie[0], entrie[1].toString())
    );
    return heads;
  };

  const handleError = (runReq: () => Promise<Response>) =>
    runReq()
      .then((res) => {
        if (res.ok) return res;

        // TODO: if res.status == 401 refresh the token

        return Promise.reject(new ServerError(res.statusText, res.status));
      })
      .catch((err) => {
        console.error("🚀 ~ makeRestClient ~ err:", err);
        if (err instanceof Error && err.name == "AbortError")
          throw new TimeoutError(`Request has taken too long`);
        throw new NetworkError(`${err.name}: ${err.message}`);
      });

  return {
    removeAuthorizationToken: () => {
      authToken = null;
    },

    setAuthroizationToken: (type: string, token: string) => {
      authToken = `${type} ${token}`;
    },

    query: (path: string, options?: QueryOptions) =>
      handleError(() =>
        fetch(
          makeUrl(path),
          getOptions(
            "GET",
            getHeaders(options?.headers ?? {}),
            options?.timeout
          )
        )
      ),

    mutate: (path: string, options: MutationOptions) =>
      handleError(() =>
        fetch(
          makeUrl(path),
          getOptions(
            options.mode == "create"
              ? "POST"
              : options.mode == "update"
              ? "PUT"
              : "DELETE",
            getHeaders(options?.headers ?? {}),
            options?.timeout,
            options.body
          )
        )
      ),
  };
}

export const restClient = makeRestClient();
