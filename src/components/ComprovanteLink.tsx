import { useState } from "react";

import { buscarComprovante } from "../services/comprovacaoApi";

type ComprovanteLinkProps = {
  arquivo: string;
};

export function ComprovanteLink({
  arquivo,
}: ComprovanteLinkProps) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function visualizarComprovante() {
    const token = localStorage.getItem("ecorank_token");

    if (!token) {
      setErro("Sua sessão expirou. Entre novamente.");
      return;
    }

    try {
      setErro("");
      setCarregando(true);

      const arquivoBlob = await buscarComprovante(token, arquivo);
      const url = URL.createObjectURL(arquivoBlob);

      const novaAba = window.open(url, "_blank");

      if (!novaAba) {
        const link = document.createElement("a");
        link.href = url;
        link.download = arquivo;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000);
    } catch (error) {
      console.error("Erro ao visualizar comprovante:", error);
      setErro("Não foi possível visualizar este comprovante.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => void visualizarComprovante()}
        disabled={carregando}
        className="text-xs font-semibold text-purple-300 transition hover:text-purple-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {carregando ? "Carregando comprovante..." : "Ver comprovante"}
      </button>

      {erro && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {erro}
        </p>
      )}
    </div>
  );
}