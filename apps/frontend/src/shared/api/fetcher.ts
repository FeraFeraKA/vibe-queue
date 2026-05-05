import { ApiError } from "next/dist/server/api-utils";

type TFetcherActions = "GET" | "POST" | "PATCH" | "DELETE";

interface IFetcherParams {
  url: string;
  method: TFetcherActions;
  body?: unknown;
}

const fetcher = async ({ url, method, body = null }: IFetcherParams) => {
  try {
    const response = await fetch(url, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) throw new ApiError(400, "BAD_REQUEST");

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
