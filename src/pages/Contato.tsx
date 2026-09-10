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