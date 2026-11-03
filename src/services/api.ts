const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "A variável VITE_API_URL não foi configurada no arquivo de ambiente.",
  );
}

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string;
  body?: unknown;
};

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { method = "GET", token, body } = options;

  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let requestBody: BodyInit | undefined;

  if (body instanceof FormData) {
    requestBody = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: requestBody,
  });

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(
      errorMessage || `Erro na requisição: ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}