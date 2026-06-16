import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { IconContext } from "@phosphor-icons/react";
import { FinanceProvider, useFinance } from "./context/FinanceContext";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import LoginScreen from "./components/layout/LoginScreen";
import { motion, AnimatePresence } from "motion/react";

function AppContent() {
  const { currentUser, isTransitioning, transitionStep, transitionUser } = useFinance();

  return (
    <>
      {!currentUser ? (
        <IconContext.Provider value={{ weight: "fill" }}>
          <Toaster theme="dark" position="bottom-right" className="font-sans" toastOptions={{ style: { background: '#111112', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' } }} />
          <LoginScreen />
        </IconContext.Provider>
      ) : (
        <Router>
          <IconContext.Provider value={{ weight: "fill" }}>
            <Toaster theme="dark" position="bottom-right" className="font-sans" toastOptions={{ style: { background: '#111112', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' } }} />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/reports" element={<Reports />} />
              </Route>
            </Routes>
          </IconContext.Provider>
        </Router>
      )}

      {/* Full-screen Security Session Switch Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 flex flex-col items-center justify-center bg-[#f7f7f7] text-ink font-sans p-6"
          >
            <div className="relative mb-8 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
              <span className="absolute text-primary material-icons-google text-2xl">security</span>
            </div>

            <motion.h4 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={transitionStep}
              className="text-lg font-bold tracking-tight mb-2 text-center text-ink h-7 flex items-center justify-center gap-2"
            >
              {transitionStep === 0 && (
                <>
                  <span className="material-icons-google text-primary text-xl">lock</span>
                  <span>Finalizando sesión y encriptando caches...</span>
                </>
              )}
              {transitionStep === 1 && (
                <>
                  <span className="material-icons-google text-primary text-xl">cleaning_services</span>
                  <span>Destruyendo credenciales locales y tokens...</span>
                </>
              )}
              {transitionStep === 2 && (
                <>
                  <span className="material-icons-google text-primary text-xl">vpn_key</span>
                  <span>Autenticando acceso y cargando perfil...</span>
                </>
              )}
              {transitionStep === 3 && (
                <>
                  <span className="material-icons-google text-primary text-xl animate-spin">sync</span>
                  <span>Sincronizando panel seguro de {transitionUser?.name || "Usuario"}...</span>
                </>
              )}
            </motion.h4>
            <p className="text-xs text-muted tracking-wide text-center uppercase font-bold mt-1.5">
              Protocolo de Seguridad Encriptado AES-GCM
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
