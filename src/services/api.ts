const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Shared helper for making requests to the TenderReady backend.
 *
 * The backend URL should be configured in the frontend's .env file
 * once the backend endpoint and API contract have been confirmed.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(
      'Backend API is not configured yet. Set VITE_API_BASE_URL after the backend URL is confirmed.',
    );
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`,
    {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    },
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Backend request failed with status ${response.status}.`,
    );
  }

  return (await response.json()) as T;
}