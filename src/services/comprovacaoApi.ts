const API_URL = import.meta.env.VITE_API_URL;

export async function buscarComprovante(
  token: string,
  arquivo: string,
): Promise<Blob> {
  const response = await fetch(
    `${API_URL}/api/v1/comprovacoes/${encodeURIComponent(arquivo)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      window.dispatchEvent(new Event("ecorank:session-expired"));
    }

    throw new Error(
      `Não foi possível carregar o comprovante (${response.status}).`,
    );
  }

  return response.blob();
}