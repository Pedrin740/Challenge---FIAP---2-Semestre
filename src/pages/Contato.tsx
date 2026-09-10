import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = { nome: string; email: string; motivo: string; mensagem: string };

export function Contato() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [sent, setSent] = useState(false);

  function onSubmit() {
    setSent(true);
    reset();
  }

  return (
    <div className="mx-auto max-w-[1100px] p-4 pb-24 sm:p-6 lg:p-8">
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">Fale conosco</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Contato</h1>
          <p className="mt-4 leading-7 text-zinc-400">Envie sua dúvida, feedback, sugestão ou interesse em parceria sobre o EcoRank.</p>
          <img src="/images/imagem-de-contato.png" alt="Ilustração de contato" className="mt-8 w-full rounded-2xl border border-white/10" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium">Nome<input {...register("nome", { required: "Informe seu nome." })} placeholder="Seu nome" className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/50" />{errors.nome && <span className="text-xs text-red-400">{errors.nome.message}</span>}</label>
          <label className="grid gap-2 text-sm font-medium">E-mail<input type="email" {...register("email", { required: "Informe seu e-mail." })} placeholder="Seu e-mail" className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/50" />{errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}</label>
          <label className="grid gap-2 text-sm font-medium">Motivo<select {...register("motivo", { required: "Selecione o motivo." })} className="rounded-xl border border-white/10 bg-[#18181b] px-4 py-3 text-white outline-none focus:border-lime-400/50"><option value="">Selecione o motivo</option><option value="duvida">Dúvida</option><option value="suporte">Suporte</option><option value="feedback">Feedback</option><option value="parceria">Parceria</option><option value="outro">Outro</option></select>{errors.motivo && <span className="text-xs text-red-400">{errors.motivo.message}</span>}</label>
          <label className="grid gap-2 text-sm font-medium">Mensagem<textarea {...register("mensagem", { required: "Digite sua mensagem." })} placeholder="Digite sua mensagem" rows={5} className="resize-none rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/50" />{errors.mensagem && <span className="text-xs text-red-400">{errors.mensagem.message}</span>}</label>
          <div className="grid gap-3 sm:grid-cols-2"><button type="submit" className="rounded-xl bg-lime-400 px-5 py-3 font-bold text-zinc-950 transition hover:bg-lime-300">Enviar</button><button type="button" onClick={() => { reset(); setSent(false); }} className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-zinc-300 transition hover:bg-white/[.05]">Limpar</button></div>
          {sent && <p className="rounded-xl border border-lime-400/20 bg-lime-400/5 p-3 text-sm text-lime-300">Mensagem registrada com sucesso no protótipo.</p>}
        </form>
      </section>
    </div>
  );
}