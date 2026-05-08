import { ApiError } from "@/shared/helpers/ApiError";
import { API_URL } from "./config";

type TFetcherActions = "GET" | "POST" | "PATCH" | "DELETE";

interface IFetcherParams {
  url: string;
  method: TFetcherActions;
  body?: unknown;
  signal?: AbortSignal;
}

interface NestErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
}

export const fetcher = async <T>({
  url,
  method,
  body = undefined,
  signal,
}: IFetcherParams): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as NestErrorResponse;

      throw new ApiError(
        errorData.message,
        errorData.statusCode,
        errorData.error,
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
};
