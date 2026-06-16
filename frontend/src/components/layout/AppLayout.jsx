import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../png/logo.svg";
import avatarMale from "../png/Avatar.png";
import avatarFemale from "../png/Avatar2.png";

const navItems = [
  { path: "/", label: "Dashboard", icon: "grid_view" },
  { path: "/transactions", label: "Transacciones", icon: "receipt_long" },
  { path: "/goals", label: "Metas", icon: "track_changes" },
  { path: "/reports", label: "Reportes", icon: "pie_chart" },
];

export default function AppLayout() {
  const { currentUser, setCurrentUser, triggerTransition, isTransitioning, allAccounts, clearUserData, fetchAllData } = useFinance();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Secure Account Switch and Logout states
  const [selectedUserToSwitch, setSelectedUserToSwitch] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  // Logout/Add Account dialog states
  const [logoutActionType, setLogoutActionType] = useState(null);

  // Background colors array for user initials avatar
  const avatarColors = [
    "bg-indigo-50 border-indigo-100 text-indigo-600",
    "bg-emerald-50 border-emerald-100 text-emerald-600",
    "bg-amber-50 border-amber-100 text-amber-600",
    "bg-fuchsia-50 border-fuchsia-100 text-fuchsia-600",
    "bg-rose-50 border-rose-100 text-rose-600",
  ];

  const handleVerifyPasswordSwitch = (e) => {
    e.preventDefault();
    setConfirmError("");
    
    if (!selectedUserToSwitch) return;

    const trimmedInput = confirmPassword.trim();
    const targetPassword = selectedUserToSwitch.password?.trim();
    const currentPassword = currentUser?.password?.trim();

    // Support validating with either the target account password OR the current user's password
    if (trimmedInput === targetPassword || (currentPassword && trimmedInput === currentPassword)) {
      // Correct validation! Let's clear forms and launch secure transition modal
      setConfirmPassword("");
      triggerTransition(selectedUserToSwitch, () => {
        clearUserData();
        setCurrentUser(selectedUserToSwitch);
        fetchAllData(selectedUserToSwitch);
        setIsAccountModalOpen(false);
        setSelectedUserToSwitch(null);
      });
    } else {
      setConfirmError("Credencial incorrecta. Verifica la contraseña de acceso.");
    }
  };

  const currentIdx = currentUser ? Number(currentUser.id) : 3;
  const currentAvatarColor = avatarColors[currentIdx % avatarColors.length];

  return (
    <div className="flex h-screen w-full bg-white text-body overflow-hidden font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r border-hairline bg-white">
        <div className="flex items-center gap-2.5 px-8 h-24 border-b border-hairline">
          <img src={logoImg} alt="FinanceFlux Logo" className="w-8 h-8 object-contain" />
          <h1 className="text-2xl font-bold tracking-tight text-ink">Finance<span className="text-primary">Flux</span></h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-primary/5 text-primary font-semibold"
                    : "text-body hover:text-ink hover:bg-surface-soft"
                }`
              }
            >
              <span className="material-icons-google text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-24 flex items-center justify-between px-6 md:px-10 z-10 bg-white border-b border-hairline shrink-0">
            <div className="md:hidden flex items-center gap-2">
              <img src={logoImg} alt="FinanceFlux Logo" className="w-7 h-7 object-contain" />
              <h1 className="text-xl font-bold text-ink tracking-tight">Finance<span className="text-primary">Flux</span></h1>
            </div>
            
            {/* Topbar actions completely aligned to the right, without icons, name followed by avatar (Clickable profile to switch accounts) */}
            <button 
              id="header-profile-trigger"
              onClick={() => setIsAccountModalOpen(true)}
              className="ml-auto flex items-center gap-4 cursor-pointer hover:bg-surface-soft/80 p-2 pl-3 md:pl-4 pr-2 rounded-full border border-transparent hover:border-hairline transition-all duration-200 focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-ink leading-tight">
                  {currentUser?.name || "Esteban Perez"}
                </p>
                <p className="text-[11px] text-muted mt-0.5 font-normal">
                  {currentUser?.email || "teban@icloud.com"}
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xs overflow-hidden transition-transform duration-200 hover:scale-105 shrink-0">
                <img 
                  src={currentUser?.gender === "female" ? avatarFemale : avatarMale} 
                  alt={currentUser?.name || "Avatar"} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>
        </header>
        
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-24 md:pb-10 bg-surface-soft scroll-smooth">
            <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-hairline bg-white z-50 px-2 pb-safe pt-2 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => (
          <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-full transition-all duration-200 ${
                  isActive ? "text-primary bg-primary/5 w-16" : "text-muted"
              }`
              }
          >
              <span className="material-icons-google text-xl">{item.icon}</span>
          </NavLink>
        ))}
      </nav>

      {/* Pop-up Account Selector Modal */}
      <AnimatePresence>
        {isAccountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/40 backdrop-blur-xs transition-all duration-300"
              onClick={() => {
                if (!isTransitioning) {
                  setIsAccountModalOpen(false);
                  setSelectedUserToSwitch(null);
                  setConfirmPassword("");
                  setConfirmError("");
                  setLogoutActionType(null);
                }
              }}
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-3xl border border-hairline shadow-2xl p-6 md:p-8 overflow-hidden z-10"
            >
              {/* Conditional Rendering of Inner Screens */}
              {logoutActionType ? (
                /* SCREEN 3: Logout Confirmation Screen */
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-semantic-down/10 text-semantic-down flex items-center justify-center mx-auto mb-3">
                      <span className="material-icons-google text-2xl">logout</span>
                    </div>
                    <h3 className="text-lg font-bold text-ink">¿Confirmar Cierre de Sesión?</h3>
                    <p className="text-xs text-muted mt-1.5 max-w-sm mx-auto leading-relaxed">
                      Se destruirá el token de sesión y se borrarán las variables de caché locales para {currentUser?.name} para preservar la máxima confidencialidad financiera en este navegador.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setLogoutActionType(null)}
                      className="flex-1 py-3 bg-surface-soft hover:bg-surface-strong text-body font-semibold rounded-xl text-xs transition-colors cursor-pointer text-center"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        clearUserData();
                        setCurrentUser(null);
                        setIsAccountModalOpen(false);
                        setLogoutActionType(null);
                      }}
                      className="flex-1 py-3 bg-semantic-down hover:bg-semantic-down/95 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer text-center"
                    >
                      Sí, Cerrar Sesión
                    </button>
                  </div>
                </div>
              ) : selectedUserToSwitch ? (
                /* SCREEN 2: Password Verification / Confirmation Gate */
                <form onSubmit={handleVerifyPasswordSwitch} className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-ink tracking-tight flex items-center gap-1.5">
                        <span className="material-icons-google text-amber-500 text-lg">security</span>
                        Confirmación de Seguridad
                      </h3>
                      <p className="text-xs text-muted mt-0.5">Introduce las credenciales para verificar la sesión</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setSelectedUserToSwitch(null);
                        setConfirmPassword("");
                        setConfirmError("");
                      }}
                      className="w-8 h-8 rounded-full bg-surface-soft hover:bg-surface-strong text-body flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-icons-google text-sm">close</span>
                    </button>
                  </div>

                  {/* Account Information Banner */}
                  <div className="flex items-center gap-3.5 p-3.5 bg-surface-soft rounded-2xl border border-hairline my-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <img 
                        src={selectedUserToSwitch.gender === "female" ? avatarFemale : avatarMale} 
                        alt={selectedUserToSwitch.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted font-medium mb-0.5 uppercase tracking-wider">Cambio a cuenta</p>
                      <p className="text-sm font-bold text-ink truncate leading-tight">{selectedUserToSwitch.name}</p>
                      <p className="text-[11px] text-muted truncate mt-0.5">{selectedUserToSwitch.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirm-pass-gate" className="block text-xs font-semibold text-ink uppercase tracking-wider">
                      Contraseña de Acceso
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted material-icons-google text-sm">lock</span>
                      <input
                        id="confirm-pass-gate"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 pl-10 pr-11 rounded-xl border border-hairline bg-surface-soft text-sm text-ink outline-none focus:border-primary focus:bg-white transition-all duration-200"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer focus:outline-none"
                      >
                        <span className="material-icons-google text-sm">
                          {showConfirmPassword ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                    </div>
                    {confirmError && (
                      <p className="text-xs text-semantic-down font-medium mt-1.5 flex items-center gap-1">
                        <span className="material-icons-google text-sm">error</span>
                        {confirmError}
                      </p>
                    )}
                  </div>



                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUserToSwitch(null);
                        setConfirmPassword("");
                        setConfirmError("");
                      }}
                      className="flex-1 py-3 bg-surface-soft hover:bg-surface-strong text-body font-semibold rounded-xl text-xs transition-colors cursor-pointer text-center"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span className="material-icons-google text-xs">verified_user</span>
                      Confirmar Acceso
                    </button>
                  </div>
                </form>
              ) : (
                /* SCREEN 1: Standard Account Switcher List */
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-ink tracking-tight">Cambiar de Cuenta</h3>
                      <p className="text-xs text-muted mt-0.5 font-normal">Gestiona y cambia entre tus accesos guardados</p>
                    </div>
                    <button 
                      onClick={() => setIsAccountModalOpen(false)}
                      className="w-9 h-9 rounded-full bg-surface-soft hover:bg-surface-strong text-body hover:text-ink flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none"
                    >
                      <span className="material-icons-google text-base">close</span>
                    </button>
                  </div>

                  {/* Predefined Account List */}
                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 font-sans">
                    {allAccounts.map((acc, index) => {
                      const userColor = avatarColors[index % avatarColors.length];
                      const isActive = currentUser?.id === acc.id;

                      return (
                        <button
                          key={acc.id}
                          onClick={() => {
                            if (isActive) {
                              setIsAccountModalOpen(false);
                            } else {
                              setSelectedUserToSwitch(acc);
                              setConfirmPassword("");
                              setConfirmError("");
                            }
                          }}
                          className={`w-full text-left p-3 rounded-2xl border flex items-center gap-3.5 transition-all duration-200 cursor-pointer ${
                            isActive 
                              ? "border-primary bg-primary/[0.02] shadow-sm ring-1 ring-primary/10" 
                              : "border-hairline hover:bg-surface-soft hover:border-surface-strong"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                            <img 
                              src={acc.gender === "female" ? avatarFemale : avatarMale} 
                              alt={acc.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-ink truncate">{acc.name}</p>
                            <p className="text-xs text-muted truncate">{acc.email}</p>
                          </div>
                          {isActive ? (
                            <span className="material-icons-google text-primary text-[22px] shrink-0">check_circle</span>
                          ) : (
                            <span className="material-icons-google text-muted/30 text-lg group-hover:text-muted shrink-0">lock_outline</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 pt-5 border-t border-hairline flex flex-col gap-2.5">
                    <button
                      onClick={() => {
                        clearUserData();
                        setCurrentUser(null);
                        setIsAccountModalOpen(false);
                      }}
                      className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span className="material-icons-google text-sm">person_add</span>
                      Agregar Cuenta / Login
                    </button>
                    
                    <button
                      onClick={() => {
                        setLogoutActionType("logout");
                      }}
                      className="w-full py-2.5 border border-hairline hover:bg-semantic-down/5 hover:text-semantic-down hover:border-semantic-down/10 text-muted font-semibold rounded-xl text-xs transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      <span className="material-icons-google text-sm">logout</span>
                      Cerrar Sesión Activa
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
