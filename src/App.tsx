import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";

import { Challenges } from "./pages/Challenges";
import { Configuracoes } from "./pages/Configuracoes";
import { Conteudos } from "./pages/Conteudos";
import { Contato } from "./pages/Contato";
import { Cadastro } from "./pages/Cadastro";
import { EcoRankDashboard } from "./pages/EcoRankDashboard";
import { FAQ } from "./pages/FAQ";
import { Home } from "./pages/Home;
import { Impact } from "./pages/Impact";
import { Integrantes } from "./pages/Integrantes";
import { Login } from "./pages/Login";
import { MeusObjetivos } from "./pages/MeusObjetivos";
import { Perfil } from "./pages/Perfil";
import { Ranking } from "./pages/Ranking";
import { SubmitAction } from "./pages/SubmitAction";
import { Sobre } from "./pages/Sobre";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/objetivos" element={<MeusObjetivos />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/conteudos" element={<Conteudos />} />
        <Route path="/ecorank" element={<EcoRankDashboard />} />
        <Route path="/ecorank/ranking" element={<Ranking />} />
        <Route path="/ecorank/desafios" element={<Challenges />} />
        <Route path="/ecorank/enviar" element={<SubmitAction />} />
        <Route path="/ecorank/impacto" element={<Impact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}