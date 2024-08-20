import { useState, useContext } from "react";
const useFetch = () => {
  // ---------------------------------- STATE ----------------------------------
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // ---------------------------------- FUNCS ----------------------------------
  const handleFetch = async ({
    path = "",
    method = "GET",
    headers = {},
    body = null,
    signal = null,
  } = {}) => {
    setIsError(false);

    if (!path) {
      setIsError(true);

      return { status: 400, data: { message: "No path provided" } };
    }

    if (!/^GET$|^PUT$|^POST$/.test(method)) {
      setIsError(true);

      return { status: 405, data: { message: "Method not allowed" } };
    }

    if (/^GET$/.test(method) && body) {
      setIsError(true);

      return { status: 400, data: { message: "Get should not have body" } };
    }

    setIsPending(true);

    const { status, data } = await fetch(path, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
      signal,
    })
      .then(async (resp) => {
        if (resp?.headers?.get("Content-Type")?.includes("application/json")) {
          return { data: await resp.json(), status: resp.status };
        } else {
          setIsError(true);

          return {
            data: { message: `Oops, an unexpected error occurred.` },
            status: resp.status,
          };
        }
      })
      .then(({ data, status }) => {
        if (status >= 400) setIsError(true);

        return { status, data };
      })
      .catch((err) => {
        setIsError(true);

        return { status: 500, data: { message: `${err}` } };
      });

    setIsPending(false);

    return { status, data };
  };

  // ---------------------------------- RETURN ---------------------------------
  return { isPending, isError, setIsError, handleFetch };
};

export default useFetch;
