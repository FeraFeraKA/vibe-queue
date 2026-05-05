import { ApiError } from "next/dist/server/api-utils";
import { API_URL } from "./config";

type TFetcherActions = "GET" | "POST" | "PATCH" | "DELETE";

interface IFetcherParams {
  url: string;
  method: TFetcherActions;
  body?: unknown;
}

export const fetcher = async ({ url, method, body = null }: IFetcherParams) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new ApiError(400, "BAD_REQUEST");

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
