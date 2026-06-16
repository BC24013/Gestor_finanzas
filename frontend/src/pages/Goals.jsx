import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GlassCard } from "../components/ui/GlassCard";
import { cn, formatDate } from "../lib/utils";
import { useFinance } from "../context/FinanceContext";
import { motion, AnimatePresence } from "motion/react";

export default function Goals() {
  const { goals, addGoal, deleteGoal, updateGoal, addFundsToGoal, autoSaveRule, updateAutoSaveRule } = useFinance();
  
  // Custom manual funds state per goal id
  const [manualAmounts, setManualAmounts] = useState({});
  const [deleteGoalId, setDeleteGoalId] = useState(null);
  const [deleteGoalName, setDeleteGoalName] = useState("");

  // Edit Goal State
  const [editingGoal, setEditingGoal] = useState(null);

  // Mobile layout state
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState("goal");

  const { 
    register: registerGoalDesktop, 
    handleSubmit: handleSubmitGoalDesktop, 
    reset: resetGoalDesktop, 
    setValue: setGoalValueDesktop, 
    formState: { errors: goalErrorsDesktop } 
  } = useForm({
    defaultValues: { 
      current: 0,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0] 
    }
  });

  const { 
    register: registerGoalMobile, 
    handleSubmit: handleSubmitGoalMobile, 
    reset: resetGoalMobile, 
    setValue: setGoalValueMobile, 
    formState: { errors: goalErrorsMobile } 
  } = useForm({
    defaultValues: { 
      current: 0,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0] 
    }
  });

  const { register: registerRule, handleSubmit: handleSubmitRule, setValue: setRuleValue } = useForm({
    defaultValues: autoSaveRule
  });

  const onGoalSubmit = async (data) => {
    const targetVal = Number(data.target);
    const currentVal = Number(data.current || 0);

    if (currentVal < 0) {
      toast.error("El monto acumulado no puede ser un número negativo");
      return;
    }

    if (editingGoal) {
      if (targetVal < currentVal) {
        toast.error(`El monto objetivo ($${targetVal}) no puede ser menor al monto acumulado ($${currentVal})`);
        return;
      }
      await updateGoal(editingGoal.id, {
        name: data.name.trim(),
        target: targetVal,
        current: currentVal,
        deadline: data.deadline,
      });
      setEditingGoal(null);
    } else {
      if (targetVal < currentVal) {
        toast.error(`El monto inicial acumulado ($${currentVal}) no pueden superar el monto objetivo ($${targetVal})`);
        return;
      }
      await addGoal({
        ...data,
        target: targetVal,
        current: currentVal,
      });
    }
    
    const resetVals = { 
      name: "", 
      target: undefined, 
      current: 0, 
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0] 
    };
    resetGoalDesktop(resetVals);
    resetGoalMobile(resetVals);
  };

  const onRuleSubmit = (data) => {
    updateAutoSaveRule({
      ...data,
      enabled: Boolean(data.enabled),
      value: Number(data.value)
    });
  };

  const handleManualFundSubmit = async (goalId) => {
    const amountStr = manualAmounts[goalId];
    const amount = Number(amountStr);
    if (!amountStr || isNaN(amount) || amount <= 0) {
      toast.error("Por favor ingresa un monto válido");
      return;
    }

    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const remaining = goal.target - goal.current;
    if (amount > remaining) {
      toast.error(`El monto ingresado ($${amount}) supera lo requerido para completar la meta ($${remaining})`);
      return;
    }

    await addFundsToGoal(goalId, amount);
    setManualAmounts(prev => ({ ...prev, [goalId]: "" }));
  };

  const handleQuickAdd = async (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const remaining = goal.target - goal.current;
    const finalAmount = Math.min(amount, remaining);
    if (finalAmount <= 0) {
      toast.info("La meta ya está completada 🎉");
      return;
    }

    await addFundsToGoal(goalId, finalAmount);
  };

  const triggerDeleteConfirm = (id, name) => {
    setDeleteGoalId(id);
    setDeleteGoalName(name);
  };

  const confirmDelete = async () => {
    if (deleteGoalId) {
      await deleteGoal(deleteGoalId);
      setDeleteGoalId(null);
      setDeleteGoalName("");
    }
  };

  const cancelDelete = () => {
    setDeleteGoalId(null);
    setDeleteGoalName("");
  };

  const handleStartEdit = (goal) => {
    setEditingGoal(goal);
    
    // Set for desktop form
    setGoalValueDesktop("name", goal.name);
    setGoalValueDesktop("target", goal.target);
    setGoalValueDesktop("current", goal.current);
    setGoalValueDesktop("deadline", goal.deadline);

    // Set for mobile form
    setGoalValueMobile("name", goal.name);
    setGoalValueMobile("target", goal.target);
    setGoalValueMobile("current", goal.current);
    setGoalValueMobile("deadline", goal.deadline);

    setIsGoalFormOpen(true);
    setActiveFormTab("goal");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClasses = "w-full bg-white border border-hairline rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted h-12";
  const labelClasses = "block text-[11px] font-bold text-muted uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out py-6">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-tight animate-in fade-in slide-in-from-left duration-300">Metas y Ahorros</h2>
          <p className="text-xs sm:text-sm text-muted mt-1 animate-in fade-in slide-in-from-left duration-500 delay-100">Gestiona tus metas de ahorro y automatizaciones de ingresos o descuentos.</p>
        </div>
        <div className="flex gap-2 lg:hidden shrink-0 w-full sm:w-auto">
          <button
            onClick={() => {
              setEditingGoal(null);
              setIsGoalFormOpen(true);
              setActiveFormTab("goal");
            }}
            className="flex-1 sm:flex-initial bg-primary hover:bg-primary-active text-white rounded-full px-4 h-11 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-icons-google text-sm">add</span>
            Nueva Meta
          </button>
          <button
            onClick={() => {
              setIsGoalFormOpen(true);
              setActiveFormTab("auto");
            }}
            className="flex-1 sm:flex-initial bg-surface-strong hover:bg-surface-soft text-ink rounded-full px-4 h-11 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer border border-hairline"
          >
            <span className="material-icons-google text-sm font-normal">autorenew</span>
            Regla
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Formularios del panel lateral - Ocultos en móvil */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          {/* Nueva Meta */}
          <GlassCard className={cn("p-6 relative overflow-hidden transition-all duration-300", editingGoal && "border-[#0052ff] border-2 shadow-[0_4px_20px_rgba(0,82,255,0.08)]")}>
            <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2">
               <span className="material-icons-google text-primary text-xl">
                 {editingGoal ? "edit" : "track_changes"}
               </span>
               {editingGoal ? "Editar Meta" : "Nueva Meta"}
            </h3>
            {editingGoal && (
              <p className="text-xs text-muted -mt-4 mb-4">
                Editando la meta <strong className="font-semibold text-ink">"{editingGoal.name}"</strong>
              </p>
            )}
            <form onSubmit={handleSubmitGoalDesktop(onGoalSubmit)} className="space-y-4">
              <div>
                <label htmlFor="desktop-goal-name" className={labelClasses}>Nombre de la Meta</label>
                <input
                  id="desktop-goal-name"
                  {...registerGoalDesktop("name", { required: true })}
                  placeholder="Ej: Auto Nuevo u Vacaciones"
                  className={inputClasses}
                />
                {goalErrorsDesktop.name && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
              </div>

              <div>
                <label htmlFor="desktop-goal-target" className={labelClasses}>Monto Objetivo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                  <input
                    id="desktop-goal-target"
                    type="number"
                    inputMode="decimal"
                    {...registerGoalDesktop("target", { required: true, min: 1 })}
                    placeholder="10000"
                    className={cn(inputClasses, "pl-7")}
                  />
                </div>
                {goalErrorsDesktop.target && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
              </div>

              <div>
                <label htmlFor="desktop-goal-current" className={labelClasses}>
                  {editingGoal ? "Ahorro Acumulado Actual" : "Ahorro Inicial (Opcional)"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                  <input
                    id="desktop-goal-current"
                    type="number"
                    inputMode="decimal"
                    {...registerGoalDesktop("current", { min: 0 })}
                    placeholder="0"
                    className={cn(inputClasses, "pl-7")}
                  />
                </div>
                {goalErrorsDesktop.current && <span className="text-xs text-semantic-down mt-1 block">Debe ser mayor o igual a 0</span>}
              </div>

              <div>
                <label htmlFor="desktop-goal-deadline" className={labelClasses}>Fecha Límite</label>
                <input
                  id="desktop-goal-deadline"
                  type="date"
                  {...registerGoalDesktop("deadline", { required: true })}
                  className={inputClasses}
                />
                {goalErrorsDesktop.deadline && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
              </div>

              <div className="flex gap-2 mt-2">
                {editingGoal && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingGoal(null);
                      const resetVals = { 
                        name: "", 
                        target: undefined, 
                        current: 0, 
                        deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0] 
                      };
                      resetGoalDesktop(resetVals);
                      resetGoalMobile(resetVals);
                    }}
                    className="flex-1 py-3 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-xs font-semibold transition-colors h-11 cursor-pointer border border-hairline text-center flex items-center justify-center"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className={cn(
                    "py-3 font-semibold transition-colors shadow-sm h-11 cursor-pointer rounded-full text-xs text-center flex items-center justify-center",
                    editingGoal ? "flex-1 bg-primary hover:bg-primary-active text-white" : "w-full bg-primary hover:bg-primary-active text-white"
                  )}
                >
                  {editingGoal ? "Guardar" : "Crear Meta"}
                </button>
              </div>
            </form>
          </GlassCard>

          {/* Regla de Ahorro Automático */}
          <GlassCard className="p-6 relative overflow-hidden border-2 border-primary/10">
            <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
               <span className="material-icons-google text-primary text-xl">autorenew</span>
               Automatización de Ingresos
            </h3>
            <p className="text-xs text-body mb-5">
              Se deducirá el monto/porcentaje configurado de cualquier nuevo ingreso que registres, depositándolo directamente en la meta que selecciones.
            </p>
            
            <form onSubmit={handleSubmitRule(onRuleSubmit)} className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-surface-soft border border-hairline rounded-xl">
                <span className="text-sm font-semibold text-ink">Activar automatización</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    {...registerRule("enabled")} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClasses}>Tipo Regla</label>
                  <select 
                    {...registerRule("type")} 
                    className={cn(inputClasses, "py-2 bg-white")}
                  >
                    <option value="percent">Porcentaje (%)</option>
                    <option value="fixed">Monto Fijo ($)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Valor</label>
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    {...registerRule("value", { required: true, min: 0.01 })}
                    className={inputClasses}
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Meta de ahorro objetivo</label>
                <select 
                  {...registerRule("targetGoalId")} 
                  className={cn(inputClasses, "py-2 bg-white")}
                >
                  <option value="" disabled>Selecciona una meta...</option>
                  {goals.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.name} (${g.current.toLocaleString()} / ${g.target.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-ink hover:bg-ink-active text-white rounded-full text-sm font-semibold transition-colors shadow-sm h-11 cursor-pointer"
              >
                Guardar Regla
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Listado y detalles de Metas */}
        <div className="lg:col-span-2 space-y-6">
          {goals.length === 0 ? (
            <GlassCard className="p-12 text-center flex flex-col items-center justify-center">
              <span className="material-icons-google text-5xl text-muted mb-4">track_changes</span>
              <p className="text-ink font-semibold text-lg">No tienes metas de ahorro registradas</p>
              <p className="text-sm text-body mt-1 max-w-md">Comienza creando tu primera meta en el formulario de la izquierda para organizarte.</p>
            </GlassCard>
          ) : (
            goals.map((goal) => {
              const percentage = Math.min(goal.current / goal.target, 1);
              const isCompleted = percentage >= 1;
              const remaining = Math.max(0, goal.target - goal.current);

              return (
                <GlassCard key={goal.id} className="p-6 sm:p-8 hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-primary/20 relative group overflow-hidden border border-hairline bg-white rounded-2xl">
                  
                  {/* ========================================== */}
                  {/* DESKTOP VERSION */}
                  {/* ========================================== */}
                  <div className="hidden md:flex flex-col gap-6">
                    {/* Header de la meta y fecha límite */}
                    <div className="flex items-center justify-between gap-3 border-b border-hairline pb-4">
                      <h4 className="text-xl font-medium text-ink tracking-tight">{goal.name}</h4>
                      <div className="flex items-center justify-end h-9 overflow-hidden">
                        <div className="flex items-center justify-center text-xs text-body font-semibold bg-surface-soft border border-hairline px-4 h-9 rounded-full font-mono shrink-0">
                          <span>{formatDate(goal.deadline)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 w-0 opacity-0 group-hover:w-[78px] group-hover:opacity-100 group-hover:ml-1.5 transition-all duration-300 ease-in-out overflow-hidden shrink-0">
                          <button
                            onClick={() => handleStartEdit(goal)}
                            className="w-9 h-9 text-primary hover:bg-blue-50 bg-surface-soft border border-hairline hover:border-blue-100 rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0"
                            title="Editar meta"
                          >
                            <span className="material-icons-google text-base">edit</span>
                          </button>
                          <button
                            onClick={() => triggerDeleteConfirm(goal.id, goal.name)}
                            className="w-9 h-9 text-semantic-down hover:bg-red-50 bg-surface-soft border border-hairline hover:border-red-100 rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0"
                            title="Eliminar meta"
                          >
                            <span className="material-icons-google text-base">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Fila de progreso de Desktop */}
                    <div className="flex md:items-center justify-between gap-6 pt-1">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-medium tracking-tighter text-primary font-mono">
                            {Math.round(percentage * 100)}%
                          </span>
                          <span className="text-xs font-semibold text-muted uppercase tracking-wider">completado</span>
                        </div>

                        {/* Barra de progreso */}
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-surface-strong rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${percentage * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted font-mono">
                            <span>Acumulado: <strong className="text-ink font-semibold font-mono">${goal.current.toLocaleString()}</strong></span>
                            <span>Monto Objetivo: <strong className="text-ink font-semibold font-mono">${goal.target.toLocaleString()}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Panel de aportación manual of Desktop */}
                      <div className="border-l border-hairline pl-6 min-w-[240px] flex flex-col gap-3 justify-center">
                        <p className="text-xs font-semibold text-muted uppercase tracking-wider">Aporte Manual</p>
                        
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted font-mono">$</span>
                            <input
                              type="number"
                              inputMode="decimal"
                              disabled={isCompleted}
                              placeholder="Monto"
                              value={manualAmounts[goal.id] || ""}
                              onChange={(e) => setManualAmounts(prev => ({ ...prev, [goal.id]: e.target.value }))}
                              className="w-full bg-white border border-hairline rounded-lg pl-6 pr-2.5 py-1.5 text-ink text-xs focus:outline-none focus:border-primary transition-all font-mono h-9"
                            />
                          </div>
                          <button
                            onClick={() => handleManualFundSubmit(goal.id)}
                            disabled={isCompleted}
                            className="bg-primary hover:bg-primary-active disabled:bg-surface-strong disabled:text-muted disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors h-9 shrink-0 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span className="material-icons-google text-sm">attach_money</span>
                            Aportar
                          </button>
                        </div>

                        {/* Accesos rápidos de aporte */}
                        {!isCompleted ? (
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => handleQuickAdd(goal.id, 50)}
                              className="px-2 py-1 text-[10px] font-mono font-semibold text-body hover:text-ink hover:bg-surface-strong rounded border border-hairline transition-colors cursor-pointer"
                            >
                              +$50
                            </button>
                            <button
                              onClick={() => handleQuickAdd(goal.id, 100)}
                              className="px-2 py-1 text-[10px] font-mono font-semibold text-body hover:text-ink hover:bg-surface-strong rounded border border-hairline transition-colors cursor-pointer"
                            >
                              +$100
                            </button>
                            <button
                              onClick={() => handleQuickAdd(goal.id, 500)}
                              className="px-2 py-1 text-[10px] font-mono font-semibold text-body hover:text-ink hover:bg-surface-strong rounded border border-hairline transition-colors cursor-pointer"
                            >
                              +$500
                            </button>
                          </div>
                        ) : (
                          <div className="text-center bg-emerald-50 text-emerald-800 text-xs font-semibold py-1 px-3 rounded-full flex items-center justify-center gap-1">
                            <span className="material-icons-google text-sm leading-none">stars</span>
                            ¡Meta Completada! 🎉
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* MOBILE VERSION */}
                  {/* ========================================== */}
                  <div className="flex md:hidden flex-col gap-6">
                    {/* Header de la meta y fecha límite */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4 min-w-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-hairline",
                          isCompleted ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-primary border-blue-100"
                        )}>
                          <span className="material-icons-google text-xl font-normal">
                            {isCompleted ? "stars" : "track_changes"}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-lg font-semibold text-ink tracking-tight truncate leading-tight">{goal.name}</h4>
                          <span className="text-[10px] text-muted font-semibold uppercase tracking-wider">Meta de Ahorro</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-muted bg-surface-soft border border-hairline px-3 h-8 rounded-lg font-mono">
                          <span className="material-icons-google text-xs">calendar_today</span>
                          <span>{formatDate(goal.deadline)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleStartEdit(goal)}
                            className="w-8 h-8 text-body hover:text-primary hover:bg-blue-50/50 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                            title="Editar meta"
                          >
                            <span className="material-icons-google text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => triggerDeleteConfirm(goal.id, goal.name)}
                            className="w-8 h-8 text-muted hover:text-semantic-down hover:bg-red-50/50 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                            title="Eliminar meta"
                          >
                            <span className="material-icons-google text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Contenido: Progreso y Aporte */}
                    <div className="flex flex-col justify-between gap-6 items-stretch">
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Progreso Acumulado</span>
                          <div className="flex items-center gap-2">
                            <span className="text-4xl font-semibold tracking-tighter text-ink font-mono leading-none">
                              {Math.round(percentage * 100)}%
                            </span>
                            <span className={cn(
                              "text-xs font-semibold px-2 py-0.5 rounded-full leading-none",
                              isCompleted ? "bg-emerald-50 text-emerald-700 font-medium" : "bg-blue-50 text-primary font-medium"
                            )}>
                              {isCompleted ? "Completado" : "En progreso"}
                            </span>
                          </div>
                        </div>

                        {/* Barra de progreso */}
                        <div className="space-y-3">
                          <div className="h-2.5 w-full bg-surface-strong rounded-full overflow-hidden p-0.5 border border-hairline">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-1000 ease-out shadow-xs",
                                isCompleted ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-primary to-blue-500"
                              )}
                              style={{ width: `${percentage * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-hairline/60">
                            <div className="min-w-0">
                              <span className="text-[10px] font-semibold text-muted uppercase block tracking-wider truncate">Acumulado</span>
                              <span className="text-sm font-semibold text-ink font-mono block mt-0.5">${goal.current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="min-w-0 border-l border-hairline/60 pl-2">
                              <span className="text-[10px] font-semibold text-muted uppercase block tracking-wider truncate">Objetivo</span>
                              <span className="text-sm font-semibold text-ink font-mono block mt-0.5">${goal.target.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="min-w-0 border-l border-hairline/60 pl-2">
                              <span className="text-[10px] font-semibold text-muted uppercase block tracking-wider truncate">Faltante</span>
                              <span className={cn(
                                "text-sm font-semibold font-mono block mt-0.5 truncate",
                                isCompleted ? "text-emerald-600" : "text-amber-600"
                              )}>
                                {isCompleted ? "$0.00" : `$${remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Control de aporte manual */}
                      <div className="flex flex-col justify-between bg-surface-soft/60 hover:bg-surface-soft/80 border border-hairline p-4 rounded-xl transition-all duration-300">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Aporte Manual</span>
                            {remaining > 0 && (
                              <span className="text-[10px] text-primary bg-primary/5 px-2 py-0.5 rounded font-medium">Sumar fondos</span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted font-mono">$</span>
                              <input
                                type="number"
                                inputMode="decimal"
                                disabled={isCompleted}
                                placeholder="0.00"
                                value={manualAmounts[goal.id] || ""}
                                onChange={(e) => setManualAmounts(prev => ({ ...prev, [goal.id]: e.target.value }))}
                                className="w-full bg-white border border-hairline rounded-lg pl-7 pr-2.5 py-2 text-ink text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all font-mono h-10"
                              />
                            </div>
                            <button
                              onClick={() => handleManualFundSubmit(goal.id)}
                              disabled={isCompleted}
                              className="bg-primary hover:bg-primary-active disabled:bg-surface-strong disabled:text-muted disabled:cursor-not-allowed text-white text-xs font-semibold px-4 rounded-lg transition-colors h-10 shrink-0 flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                            >
                              <span className="material-icons-google text-sm">add</span>
                              <span>Aportar</span>
                            </button>
                          </div>
                        </div>

                        {/* Accesos rápidos */}
                        {!isCompleted ? (
                          <div className="grid grid-cols-3 gap-1.5 mt-4">
                            <button
                              onClick={() => handleQuickAdd(goal.id, 50)}
                              className="h-8 flex items-center justify-center text-xs font-mono font-semibold text-body hover:text-primary bg-white hover:bg-blue-50/30 border border-hairline rounded-md transition-colors cursor-pointer"
                            >
                              +$50
                            </button>
                            <button
                              onClick={() => handleQuickAdd(goal.id, 100)}
                              className="h-8 flex items-center justify-center text-xs font-mono font-semibold text-body hover:text-primary bg-white hover:bg-blue-50/30 border border-hairline rounded-md transition-colors cursor-pointer"
                            >
                              +$100
                            </button>
                            <button
                              onClick={() => handleQuickAdd(goal.id, 500)}
                              className="h-8 flex items-center justify-center text-xs font-mono font-semibold text-body hover:text-primary bg-white hover:bg-blue-50/30 border border-hairline rounded-md transition-colors cursor-pointer"
                            >
                              +$500
                            </button>
                          </div>
                        ) : (
                          <div className="mt-4 text-center bg-emerald-500/10 text-emerald-800 dark:text-emerald-950 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 border border-emerald-500/20">
                            <span className="material-icons-google text-base leading-none">task_alt</span>
                            <span>¡Meta Completada! 🎉</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })
          )}
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación de Meta */}
      <AnimatePresence>
        {deleteGoalId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="absolute inset-0 bg-[#0a0b0d]/40 backdrop-blur-sm"
              id="delete-goal-backdrop"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white border border-hairline rounded-[24px] max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden relative z-10 p-6"
              id="delete-goal-modal-content"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-semantic-down/10 text-semantic-down flex items-center justify-center shrink-0">
                  <span className="material-icons-google text-2xl">warning</span>
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-lg font-medium text-ink tracking-tight">Eliminar meta de ahorro</h4>
                  <p className="text-sm text-body leading-relaxed">
                    ¿Estás seguro de que deseas eliminar la meta de ahorro <strong className="text-ink font-semibold">"{deleteGoalName}"</strong>? Se eliminarán los fondos acumulados asociados a esta meta.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-hairline pt-4">
                <button
                  onClick={cancelDelete}
                  className="px-5 py-2.5 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-xs font-semibold transition-all border border-hairline cursor-pointer"
                  id="btn-cancel-delete-goal"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 bg-semantic-down hover:bg-red-600 text-white rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  id="btn-confirm-delete-goal"
                >
                  <span className="material-icons-google text-xs">delete</span>
                  Eliminar Meta
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet para creación/edición de metas en móvil */}
      <AnimatePresence>
        {isGoalFormOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGoalFormOpen(false)}
              className="absolute inset-0 bg-[#0a0b0d]/60 backdrop-blur-xs"
              id="goals-sheet-backdrop"
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute bottom-0 left-0 right-0 max-h-[90vh] bg-white rounded-t-[32px] border-t border-hairline p-6 overflow-y-auto shadow-[0_-12px_45px_rgba(0,0,0,0.18)] flex flex-col z-10"
              id="goals-sheet-content"
            >
              <div 
                className="mx-auto w-12 h-1.5 bg-surface-strong rounded-full mb-5 shrink-0 cursor-pointer" 
                onClick={() => setIsGoalFormOpen(false)} 
              />
              
              <div className="flex bg-surface-strong p-1 rounded-full border border-hairline w-full mb-6 shadow-xs">
                <button 
                  type="button"
                  onClick={() => setActiveFormTab("goal")} 
                  className={cn(
                    "flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200", 
                    activeFormTab === "goal" ? "bg-primary text-white" : "text-body hover:text-ink"
                  )}
                >
                  {editingGoal ? "Editar Meta" : "Nueva Meta"}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (editingGoal) {
                      toast.info("Guarda o cancela la edición antes de configurar automatizaciones");
                      return;
                    }
                    setActiveFormTab("auto");
                  }} 
                  className={cn(
                    "flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200", 
                    activeFormTab === "auto" ? "bg-primary text-white" : "text-body hover:text-ink",
                    editingGoal && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Automatizar
                </button>
              </div>

              {activeFormTab === "goal" ? (
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2 flex items-center gap-2">
                     <span className="material-icons-google text-primary text-2xl">
                       {editingGoal ? "edit" : "track_changes"}
                     </span>
                     {editingGoal ? "Editar Meta" : "Crear Nueva Meta"}
                  </h3>
                  {editingGoal && (
                    <p className="text-xs text-muted mb-4">
                      Editando la meta <strong className="font-semibold text-ink">"{editingGoal.name}"</strong>
                    </p>
                  )}
                  
                  <form onSubmit={handleSubmitGoalMobile((data) => {
                    onGoalSubmit(data);
                    setIsGoalFormOpen(false);
                  })} className="space-y-4">
                    <div>
                      <label htmlFor="mobile-goal-name" className={labelClasses}>Nombre de la Meta</label>
                      <input
                        id="mobile-goal-name"
                        {...registerGoalMobile("name", { required: true })}
                        placeholder="Ej: Auto Nuevo u Vacaciones"
                        className={inputClasses}
                      />
                      {goalErrorsMobile.name && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                    </div>

                    <div>
                      <label htmlFor="mobile-goal-target" className={labelClasses}>Monto Objetivo</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                        <input
                          id="mobile-goal-target"
                          type="number"
                          inputMode="decimal"
                          {...registerGoalMobile("target", { required: true, min: 1 })}
                          placeholder="10000"
                          className={cn(inputClasses, "pl-7")}
                        />
                      </div>
                      {goalErrorsMobile.target && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                    </div>

                    <div>
                      <label htmlFor="mobile-goal-current" className={labelClasses}>
                        {editingGoal ? "Ahorro Acumulado Actual" : "Ahorro Inicial (Opcional)"}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                        <input
                          id="mobile-goal-current"
                          type="number"
                          inputMode="decimal"
                          {...registerGoalMobile("current", { min: 0 })}
                          placeholder="0"
                          className={cn(inputClasses, "pl-7")}
                        />
                      </div>
                      {goalErrorsMobile.current && <span className="text-xs text-semantic-down mt-1 block">Debe ser mayor o igual a 0</span>}
                    </div>

                    <div>
                      <label htmlFor="mobile-goal-deadline" className={labelClasses}>Fecha Límite</label>
                      <input
                        id="mobile-goal-deadline"
                        type="date"
                        {...registerGoalMobile("deadline", { required: true })}
                        className={inputClasses}
                      />
                      {goalErrorsMobile.deadline && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGoal(null);
                          const resetVals = { 
                            name: "", 
                            target: undefined, 
                            current: 0, 
                            deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0] 
                          };
                          resetGoalDesktop(resetVals);
                          resetGoalMobile(resetVals);
                          setIsGoalFormOpen(false);
                        }}
                        className="flex-1 py-3 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-sm font-semibold transition-colors h-12 border border-hairline align-middle flex items-center justify-center cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary-active text-white rounded-full text-sm font-semibold transition-colors shadow-sm h-12 flex items-center justify-center cursor-pointer"
                      >
                        {editingGoal ? "Guardar" : "Crear Meta"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-ink mb-1 flex items-center gap-2">
                     <span className="material-icons-google text-primary text-2xl font-normal">autorenew</span>
                     Automatización de Ingresos
                  </h3>
                  <p className="text-xs text-body mb-5">
                    Se deducirá el monto/porcentaje de cualquier nuevo ingreso que registres en tu meta.
                  </p>
                  
                  <form onSubmit={handleSubmitRule((data) => {
                    onRuleSubmit(data);
                    setIsGoalFormOpen(false);
                  })} className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-surface-soft border border-hairline rounded-xl">
                      <span className="text-sm font-semibold text-ink">Activar automatización</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          {...registerRule("enabled")} 
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-surface-strong peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClasses}>Tipo Regla</label>
                        <select 
                          {...registerRule("type")} 
                          className={cn(inputClasses, "py-2 bg-white")}
                        >
                          <option value="percent">Porcentaje (%)</option>
                          <option value="fixed">Monto Fijo ($)</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Valor</label>
                        <input
                          type="number"
                          step="any"
                          inputMode="decimal"
                          {...registerRule("value", { required: true, min: 0.01 })}
                          className={inputClasses}
                          placeholder="10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Meta de ahorro objetivo</label>
                      <select 
                        {...registerRule("targetGoalId")} 
                        className={cn(inputClasses, "py-2 bg-white")}
                      >
                        <option value="" disabled>Selecciona una meta...</option>
                        {goals.map(g => (
                          <option key={g.id} value={g.id}>
                            {g.name} (${g.current.toLocaleString()} / ${g.target.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsGoalFormOpen(false)}
                        className="flex-1 py-3 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-sm font-semibold transition-colors h-12 flex items-center justify-center border border-hairline cursor-pointer"
                      >
                        Cerrar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-ink hover:bg-ink-active text-white rounded-full text-sm font-semibold transition-colors shadow-sm h-12 flex items-center justify-center cursor-pointer"
                      >
                        Guardar Regla
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
