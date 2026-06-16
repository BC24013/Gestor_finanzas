import React, { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import logoImg from "../png/logo.svg";
import fondoImg from "../png/Fondo.svg";
import avatarMale from "../png/Avatar.png";
import avatarFemale from "../png/Avatar2.png";
import { motion, AnimatePresence } from "motion/react";

export default function LoginScreen() {
  const { loginUser, registerUser, allAccounts, deleteUser } = useFinance();
  const [activeTab, setActiveTab] = useState("login");
  
  // User deletion state
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserName, setDeleteUserName] = useState(null);

  const confirmDeleteUser = (id, name) => {
    setDeleteUserId(id);
    setDeleteUserName(name);
  };

  const handleDeleteUserConfirm = async () => {
    if (deleteUserId) {
      await deleteUser(deleteUserId);
      setDeleteUserId(null);
      setDeleteUserName(null);
      setEmail("");
      setPassword("");
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Registration Form States
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regGender, setRegGender] = useState("male");
  const [regShowPassword, setRegShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    
    const success = await loginUser(email, password);
    if (!success) {
      setError("Usuario o contraseña incorrectos. Verifica las credenciales.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!regName || !regEmail || !regPassword) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    if (regPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const success = await registerUser(regName, regEmail, regPassword, regGender);
    if (!success) {
      setError("No se pudo crear la cuenta. El correo podría estar en uso.");
    } else {
      // Clear values on successful signup
      setRegName("");
      setRegEmail("");
      setRegPassword("");
    }
  };

  const handleQuickSelect = (uEmail, uPass) => {
    setEmail(uEmail);
    setPassword(uPass);
    setError("");
    setActiveTab("login");
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-8 font-sans animate-fade-in bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondoImg})` }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-hairline shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
        
        {/* Brand Logo/Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-4">
            <img src={logoImg} alt="FinanceFlux Logo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-ink tracking-tight">
            Finance<span className="text-primary">Flux</span>
          </h1>
          <p className="text-sm text-muted mt-1.5">
            {activeTab === "login" 
              ? "Ingresa a tu cuenta para gestionar tus finanzas" 
              : "Registra tu nueva cuenta en segundos"}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-1 bg-surface-soft border border-hairline rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab("login"); setError(""); }}
            className={`py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "login"
                ? "bg-white text-ink shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("register"); setError(""); }}
            className={`py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "register"
                ? "bg-white text-ink shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-semantic-down/5 border border-semantic-down/10 text-semantic-down text-xs font-medium flex items-center gap-2 animate-shake">
            <span className="material-icons-google text-sm">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form area depending on Tab */}
        {activeTab === "login" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-input" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted material-icons-google text-sm">mail</span>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-hairline bg-surface-soft text-sm text-ink outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password-input" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted material-icons-google text-sm">lock</span>
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-11 rounded-xl border border-hairline bg-surface-soft text-sm text-ink outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer focus:outline-none"
                >
                  <span className="material-icons-google text-sm">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-primary/10 tracking-wide mt-2 hover:translate-y-[-1px] active:translate-y-[0px] cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name-input" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Nombre Completo
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted material-icons-google text-sm">person</span>
                <input
                  id="reg-name-input"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-hairline bg-surface-soft text-sm text-ink outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email-input" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted material-icons-google text-sm">mail</span>
                <input
                  id="reg-email-input"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="admin@ejemplo.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-hairline bg-surface-soft text-sm text-ink outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password-input" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted material-icons-google text-sm">lock</span>
                <input
                  id="reg-password-input"
                  type={regShowPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-11 rounded-xl border border-hairline bg-surface-soft text-sm text-ink outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setRegShowPassword(!regShowPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer focus:outline-none"
                >
                  <span className="material-icons-google text-sm">
                    {regShowPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                Género (para avatar)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRegGender("male")}
                  className={`h-11 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    regGender === "male"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-hairline bg-surface-soft text-muted hover:bg-white hover:text-ink"
                  }`}
                >
                  <span className="material-icons-google text-base">face</span>
                  <span>Masculino</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegGender("female")}
                  className={`h-11 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    regGender === "female"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-hairline bg-surface-soft text-muted hover:bg-white hover:text-ink"
                  }`}
                >
                  <span className="material-icons-google text-base">face_3</span>
                  <span>Femenino</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-primary/10 tracking-wide mt-4 hover:translate-y-[-1px] active:translate-y-[0px] cursor-pointer"
            >
              Crear Cuenta
            </button>
          </form>
        )}

        {/* Dynamic Connected Accounts (Quick Access Section) */}
        <div className="mt-8 border-t border-hairline pt-6">
          <p className="text-xs font-semibold text-ink uppercase tracking-wider mb-3.5 text-center">
            Hola de nuevo! Elige tu cuenta
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {allAccounts.map((acc, index) => {
              const isSelected = email.toLowerCase() === acc.email.toLowerCase();

              return (
                <div
                  key={acc.id}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/[0.02] shadow-sm"
                      : "border-hairline bg-surface-soft hover:bg-white"
                  }`}
                >
                  {/* Clickable user info area */}
                  <div 
                    onClick={() => handleQuickSelect(acc.email, acc.password || "")}
                    className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <img 
                        src={acc.gender === "female" ? avatarFemale : avatarMale} 
                        alt={acc.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-ink truncate">{acc.name}</p>
                      <p className="text-[11px] text-muted truncate">{acc.email}</p>
                    </div>
                  </div>

                  {/* Delete User Button */}
                  <button
                    type="button"
                    onClick={() => confirmDeleteUser(acc.id, acc.name)}
                    className="p-1.5 hover:bg-semantic-down/10 text-muted hover:text-semantic-down rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Eliminar Cuenta"
                  >
                    <span className="material-icons-google text-sm">delete</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          FinanceFlux © {new Date().getFullYear()}
        </p>

      </div>

      {/* Modal de Confirmación de Eliminación de Usuario */}
      <AnimatePresence>
        {deleteUserId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop con Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setDeleteUserId(null); setDeleteUserName(null); }}
              className="absolute inset-0 bg-[#0a0b0d]/40 backdrop-blur-sm"
              id="delete-user-backdrop"
            />
            
            {/* Contenedor Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white border border-hairline rounded-[24px] max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden relative z-10 p-6"
              id="delete-user-modal-content"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-semantic-down/10 text-semantic-down flex items-center justify-center shrink-0">
                  <span className="material-icons-google text-2xl">warning</span>
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-lg font-medium text-ink tracking-tight">Confirmar eliminación de cuenta</h4>
                  <p className="text-sm text-body leading-relaxed">
                    ¿Estás seguro de que deseas eliminar la cuenta de <strong className="text-ink font-semibold">"{deleteUserName}"</strong>? Todos sus datos financieros (metas y transacciones) se perderán de manera permanente.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-hairline pt-4">
                <button
                  onClick={() => { setDeleteUserId(null); setDeleteUserName(null); }}
                  className="px-5 py-2.5 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-xs font-semibold transition-all border border-hairline cursor-pointer"
                  id="btn-cancel-delete-user"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteUserConfirm}
                  className="px-5 py-2.5 bg-semantic-down hover:bg-red-600 text-white rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  id="btn-confirm-delete-user"
                >
                  <span className="material-icons-google text-xs">delete</span>
                  Eliminar Cuenta
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
