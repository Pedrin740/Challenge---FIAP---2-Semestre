import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { RotaProtegida } from "./components/RotaProtegida";

import { Challenges } from "./pages/Challenges";
import { Configuracoes } from "./pages/Configuracoes";
import { Conteudos } from "./pages/Conteudos";
import { Contato } from "./pages/Contato";
import { Cadastro } from "./pages/Cadastro";
import { EcoRankDashboard } from "./pages/EcoRankDashboard";
import { FAQ } from "./pages/FAQ";
import { Home } from "./pages/Home";
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
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/conteudos" element={<Conteudos />} />

        {/* Páginas protegidas */}
        <Route
          path="/perfil"
          element={
            <RotaProtegida>
              <Perfil />
            </RotaProtegida>
          }
        />

        <Route
          path="/objetivos"
          element={
            <RotaProtegida>
              <MeusObjetivos />
            </RotaProtegida>
          }
        />

        <Route
          path="/configuracoes"
          element={
            <RotaProtegida>
              <Configuracoes />
            </RotaProtegida>
          }
        />

        <Route
          path="/ecorank"
          element={
            <RotaProtegida>
              <EcoRankDashboard />
            </RotaProtegida>
          }
        />

        <Route
          path="/ecorank/ranking"
          element={
            <RotaProtegida>
              <Ranking />
            </RotaProtegida>
          }
        />

        <Route
          path="/ecorank/desafios"
          element={
            <RotaProtegida>
              <Challenges />
            </RotaProtegida>
          }
        />

        <Route
          path="/ecorank/enviar"
          element={
            <RotaProtegida>
              <SubmitAction />
            </RotaProtegida>
          }
        />

        <Route
          path="/ecorank/impacto"
          element={
            <RotaProtegida>
              <Impact />
            </RotaProtegida>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}