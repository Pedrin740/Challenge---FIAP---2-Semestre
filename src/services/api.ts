import { useEffect, useState, type ChangeEvent } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";

import {
  buscarCatalogoAcoes,
  type CatalogoAcao,
} from "../services/publicApi";

import {
  enviarAcao,
  type ResultadoEnvioAcao,
} from "../services/userApi";

type FormData = {
  action: string;
  description: string;
  proof: FileList;
};

function validateVideoDuration(
  file: File,
): Promise<boolean | string> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);

      if (!Number.isFinite(video.duration)) {
        resolve("Não foi possível identificar a duração do vídeo.");
        return;
      }

      if (video.duration > 45) {
        resolve("O vídeo deve ter no máximo 45 segundos.");
        return;
      }

      resolve(true);
    };

    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve("Não foi possível carregar este vídeo.");
    };

    video.src = objectUrl;
  });
}

async function validateProof(
  files: FileList | undefined,
): Promise<boolean | string> {
  const file = files?.[0];

  if (!file) {
    return "Envie uma foto ou um vídeo.";
  }

  if (file.type.startsWith("image/")) {
    return true;
  }

  if (file.type.startsWith("video/")) {
    return validateVideoDuration(file);
  }

  return "Envie somente uma foto ou um vídeo.";
}

export function SubmitAction() {
  const { user, isLoading } = useAuth();

  const [catalogo, setCatalogo] = useState<CatalogoAcao[]>([]);
  const [carregandoCatalogo, setCarregandoCatalogo] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultado, setResultado] = useState<ResultadoEnvioAcao | null>(null);
  const [erroApi, setErroApi] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
    watch,
  } = useForm<FormData>();

  const selectedActionId = watch("action");

  const selectedAction = catalogo.find(
    (action) => action.codigo === selectedActionId,
  );

  useEffect(() => {
    let ativo = true;

    async function carregarCatalogo() {
      try {
        const dados = await buscarCatalogoAcoes();

        if (ativo) {
          setCatalogo(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);

        if (ativo) {
          setErroApi("Não foi possível carregar o catálogo de ações.");
        }
      } finally {
        if (ativo) {
          setCarregandoCatalogo(false);
        }
      }
    }

    void carregarCatalogo();

    return () => {
      ativo = false;
    };
  }, []);

  const proofRegister = register("proof", {
    required: "Envie uma foto ou um vídeo.",
    validate: validateProof,
  });

  const submit: SubmitHandler<FormData> = async (data) => {
    const acao = catalogo.find(
      (item) => item.codigo === data.action,
    );

    const arquivo = data.proof?.[0];
    const token = localStorage.getItem("ecorank_token");

    if (!acao || !arquivo || !token) {
      setErroApi("Confira os dados do formulário e tente novamente.");
      return;
    }

    try {
      setErroApi("");
      setResultado(null);

      const resposta = await enviarAcao(token, {
        codigo: acao.codigo,
        descricao: data.description,
        arquivo,
      });

      setResultado(resposta);
      reset();
      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao enviar ação:", error);
      setErroApi("Não foi possível enviar sua ação. Tente novamente.");
    }
  };

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;

    setSelectedFile(file);
    void proofRegister.onChange(event);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-zinc-400">
          Carregando sua conta...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-zinc-300">
          Entre na sua conta para enviar uma ação.
        </p>

        <Link
          to="/login"
          className="mt-4 inline-block text-sm font-semibold text-lime-400"
        >
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[850px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Enviar ação"
        subtitle="Registre uma prática sustentável realizada por você."
      />

      <form
        onSubmit={handleSubmit(submit)}
        className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5 sm:p-7"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="action"
              className="text-sm font-semibold"
            >
              Ação realizada
            </label>

            <select
              id="action"
              {...register("action", {
                required: "Selecione uma ação.",
              })}
              disabled={carregandoCatalogo || catalogo.length === 0}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50 disabled:opacity-50"
            >
              <option value="">
                {carregandoCatalogo
                  ? "Carregando ações..."
                  : "Selecione uma ação"}
              </option>

              {catalogo.map((action) => (
                <option
                  key={action.id}
                  value={action.codigo}
                >
                  {action.rotulo} — +{action.pontos} pontos
                </option>
              ))}
            </select>

            {errors.action && (
              <p className="mt-1 text-xs text-red-400">
                {errors.action.message}
              </p>
            )}

            {selectedAction && (
              <div className="mt-3 rounded-xl border border-lime-400/10 bg-lime-400/[.03] px-4 py-3">
                <p className="text-xs text-zinc-500">
                  Categoria
                </p>

                <p className="mt-1 text-sm font-semibold text-zinc-300">
                  {selectedAction.categoria}
                </p>

                <p className="mt-2 text-sm font-bold text-lime-400">
                  +{selectedAction.pontos} pontos previstos
                </p>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-semibold"
            >
              Descrição
            </label>

            <textarea
              id="description"
              rows={5}
              placeholder="Conte como foi sua ação..."
              {...register("description", {
                required: "Descreva a ação.",
                minLength: {
                  value: 10,
                  message: "Digite pelo menos 10 caracteres.",
                },
                maxLength: {
                  value: 180,
                  message: "Máximo de 180 caracteres.",
                },
              })}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/50"
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="proof"
              className="text-sm font-semibold"
            >
              Comprovação
            </label>

            <label
              htmlFor="proof"
              className="mt-2 flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[.02] px-5 text-center transition hover:border-lime-400/40"
            >
              <Icon
                name="camera"
                size={36}
                className="text-lime-400"
              />

              <span className="mt-3 text-sm font-semibold">
                Adicionar foto ou vídeo
              </span>

              <span className="mt-1 text-xs text-zinc-500">
                Vídeos devem ter no máximo 45 segundos.
              </span>

              {selectedFile && (
                <span className="mt-4 max-w-full truncate rounded-lg bg-white/[.04] px-3 py-2 text-xs text-zinc-300">
                  {selectedFile.name}
                </span>
              )}

              <input
                id="proof"
                type="file"
                accept="image/*,video/*"
                className="sr-only"
                {...proofRegister}
                onChange={handleFileChange}
              />
            </label>

            {errors.proof && (
              <p className="mt-1 text-xs text-red-400">
                {errors.proof.message as string}
              </p>
            )}
          </div>

          {erroApi && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
            >
              {erroApi}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/ecorank"
              className="rounded-lg border border-white/10 px-5 py-3 text-center text-sm font-semibold text-zinc-300 transition hover:bg-white/[.03]"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || carregandoCatalogo}
              className="rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar ação"}
            </button>
          </div>

          {resultado && (
            <div className="rounded-xl border border-lime-400/20 bg-lime-400/[.05] p-5">
              <div className="flex items-center gap-2 text-lime-300">
                <Icon name="check" size={19} />

                <span className="text-sm font-semibold">
                  Ação enviada com sucesso!
                </span>
              </div>

              <p className="mt-2 text-sm text-zinc-400">
                Pontos recebidos:{" "}
                <strong className="text-lime-400">
                  +{resultado.pontosGanhos}
                </strong>
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Status: {resultado.status}
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Pontuação total: {resultado.pontosTotais}
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Nível atual: {resultado.nivel}
              </p>

              <button
                type="button"
                onClick={() => navigate("/ecorank")}
                className="mt-4 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-lime-300"
              >
                Ver meu EcoRank
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}