import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GlassCard } from "../components/ui/GlassCard";
import { cn, formatDate } from "../lib/utils";
import { useFinance } from "../context/FinanceContext";
import { motion, AnimatePresence } from "motion/react";

export default function Transactions() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: { type: "expense", date: new Date().toISOString().split('T')[0], status: "Completado" }
  });

  // When changing to edit mode, populate the form
  useEffect(() => {
    if (editingId) {
      const txToEdit = transactions.find(t => t.id === editingId);
      if (txToEdit) {
        setValue("description", txToEdit.description);
        setValue("amount", txToEdit.amount);
        setValue("type", txToEdit.type);
        setValue("category", txToEdit.category);
        setValue("date", txToEdit.date);
        setValue("status", txToEdit.status);
      }
    } else {
      reset({ description: "", amount: undefined, type: "expense", category: "", date: new Date().toISOString().split('T')[0], status: "Completado" });
    }
  }, [editingId, transactions, setValue, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      amount: Number(data.amount)
    };

    if (editingId) {
      await updateTransaction(editingId, formattedData);
      setEditingId(null);
    } else {
      await addTransaction(formattedData);
    }
    reset({ description: "", amount: undefined, type: "expense", category: "", date: new Date().toISOString().split('T')[0], status: "Completado" });
  };

  const startEdit = (tx) => {
    setEditingId(tx.id);
    toast.info(`Editando transacción: ${tx.description}`);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const triggerDeleteConfirm = (id, description) => {
    setDeleteId(id);
    setDeleteName(description);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteTransaction(deleteId);
      setDeleteId(null);
      setDeleteName("");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteName("");
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const inputClasses = "w-full bg-white border border-hairline rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted h-12";
  const labelClasses = "block text-[11px] font-bold text-muted uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out py-6">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-tight animate-in fade-in slide-in-from-left duration-300">Transacciones</h2>
          <p className="text-xs sm:text-sm text-muted mt-1 animate-in fade-in slide-in-from-left duration-500 delay-100">Historial y flujo de tus movimientos.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setIsFormOpen(true);
          }}
          className="lg:hidden bg-primary hover:bg-primary-active text-white rounded-full px-5 h-11 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer w-full sm:w-auto shrink-0"
        >
          <span className="material-icons-google text-sm">add</span>
          Registrar
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Formulario Lateral (Nueva o Edición) - Oculto en móvil */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <GlassCard 
            className={cn(
              "p-6 relative overflow-hidden transition-all duration-300",
              editingId ? "border-2 border-[#0052ff] shadow-[0_4px_20px_rgba(0,82,255,0.1)] bg-white" : ""
            )}
          >
            <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2">
              <span className="material-icons-google text-primary text-xl">
                {editingId ? "edit" : "add"}
              </span>
              {editingId ? "Editar Transacción" : "Nueva Transacción"}
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="tx-description" className={labelClasses}>Descripción</label>
                <input
                  id="tx-description"
                  {...register("description", { required: true })}
                  placeholder="Ej: Compra supermercado"
                  className={inputClasses}
                />
                {errors.description && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tx-amount" className={labelClasses}>Monto</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                    <input
                      id="tx-amount"
                      type="number"
                      step="0.01"
                      {...register("amount", { required: true, min: 0.01 })}
                      placeholder="0.00"
                      className={cn(inputClasses, "pl-7")}
                    />
                  </div>
                  {errors.amount && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                </div>
                <div>
                  <label htmlFor="tx-type" className={labelClasses}>Tipo</label>
                  <select id="tx-type" {...register("type")} className={cn(inputClasses, "py-2 bg-white")}>
                    <option value="expense">Gasto</option>
                    <option value="income">Ingreso</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tx-category" className={labelClasses}>Categoría</label>
                  <input
                    id="tx-category"
                    {...register("category", { required: true })}
                    placeholder="Ej: Alimentación"
                    className={inputClasses}
                  />
                  {errors.category && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                </div>
                <div>
                  <label htmlFor="tx-status" className={labelClasses}>Estado</label>
                  <select id="tx-status" {...register("status")} className={cn(inputClasses, "py-2 bg-white")}>
                    <option value="Completado">Completado</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="tx-date" className={labelClasses}>Fecha</label>
                <input
                  id="tx-date"
                  type="date"
                  {...register("date", { required: true })}
                  className={inputClasses}
                />
                {errors.date && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
              </div>

              <div className="flex gap-3 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 py-3 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-sm font-semibold transition-colors h-11 border border-hairline"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className={cn(
                    "py-3 rounded-full text-sm font-semibold transition-colors shadow-sm h-11 cursor-pointer",
                    editingId ? "flex-1 bg-primary hover:bg-primary-active text-white" : "w-full bg-primary hover:bg-primary-active text-white"
                  )}
                >
                  {editingId ? "Guardar" : "Registrar Movimiento"}
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

        {/* Data Grid / Lista de Transacciones */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-0 overflow-hidden flex flex-col h-full min-h-[500px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <div className="p-6 border-b border-hairline flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-soft">
              <div className="relative w-full md:w-64">
                <span className="material-icons-google text-base absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">search</span>
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-hairline rounded-full pl-10 pr-4 py-2 h-10 text-ink text-sm focus:outline-none focus:border-primary transition-all placeholder:text-muted"
                />
              </div>
              <div className="flex bg-surface-strong p-1 rounded-full border border-hairline w-full md:w-auto shadow-sm">
                <button 
                  onClick={() => setFilterType("all")} 
                  className={cn("flex-1 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200", filterType === "all" ? "bg-primary text-white" : "text-body hover:text-ink")}
                >
                  Todas
                </button>
                <button 
                  onClick={() => setFilterType("income")} 
                  className={cn("flex-1 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200", filterType === "income" ? "bg-primary text-white" : "text-body hover:text-ink")}
                >
                  Ingresos
                </button>
                <button 
                  onClick={() => setFilterType("expense")} 
                  className={cn("flex-1 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200", filterType === "expense" ? "bg-primary text-white" : "text-body hover:text-ink")}
                >
                  Gastos
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-surface-soft border border-hairline flex items-center justify-center mb-4">
                    <span className="material-icons-google text-2xl text-muted">search</span>
                  </div>
                  <p className="text-ink font-semibold">No se encontraron transacciones</p>
                  <p className="text-sm text-body mt-1">Ajusta los filtros o registra un nuevo movimiento.</p>
                </div>
              ) : (
                <>
                  {/* Vista Mobile: Tarjetas con Acciones Deslizables (Swipe Gestures) */}
                  <div className="block md:hidden p-4 space-y-3">
                    <div className="flex justify-between items-center px-1 text-[10px] text-muted font-bold uppercase tracking-wider mb-2 gap-2">
                      <span className="shrink-0">Movimiento</span>
                      <span className="text-right text-[9px] text-[rgba(100,116,139,0.8)] font-medium normal-case truncate">Desliza para editar/eliminar</span>
                    </div>
                    {filteredTransactions.map((tx) => {
                      const isIncome = tx.type === "income";
                      return (
                        <div key={tx.id} className="relative overflow-hidden rounded-2xl bg-surface-soft border border-hairline h-[92px]">
                          {/* Capa inferior con acciones (Underlay) */}
                          <div className="absolute inset-0 flex justify-between items-center px-4">
                            <div className="bg-blue-500/10 text-primary px-3 py-1.5 rounded-lg flex items-center gap-1">
                              <span className="material-icons-google text-sm">edit</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider">Editar</span>
                            </div>
                            <div className="bg-red-500/10 text-semantic-down px-3 py-1.5 rounded-lg flex items-center gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider">Eliminar</span>
                              <span className="material-icons-google text-sm">delete</span>
                            </div>
                          </div>

                          {/* Tarjeta deslizable superior (Foreground) */}
                          <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={{ left: 0.5, right: 0.5 }}
                            onDragEnd={(event, info) => {
                              if (info.offset.x < -80) {
                                triggerDeleteConfirm(tx.id, tx.description);
                              } else if (info.offset.x > 80) {
                                startEdit(tx);
                                setIsFormOpen(true);
                              }
                            }}
                            className="absolute inset-0 bg-white p-4 flex items-center justify-between border-b border-hairline select-none touch-none cursor-grab active:cursor-grabbing"
                          >
                            <div className="flex items-center gap-3 min-w-0 text-left">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-surface-soft shrink-0",
                                isIncome ? "text-semantic-up" : "text-semantic-down"
                              )}>
                                <span className="material-icons-google text-lg">
                                  {isIncome ? 'arrow_outward' : 'south_east'}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-ink text-sm truncate">{tx.description}</p>
                                <div className="flex flex-col gap-0.5 mt-1">
                                  <span className="text-[11px] text-muted">
                                    {tx.category}
                                  </span>
                                  <span className="font-mono text-[9px] text-muted">{formatDate(tx.date)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right shrink-0">
                              <span className={cn("font-semibold font-mono text-sm block", isIncome ? "text-semantic-up" : "text-semantic-down")}>
                                {isIncome ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                              </span>
                              <span className={cn(
                                "inline-block text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider mt-1",
                                tx.status === "Completado" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                              )}>
                                {tx.status || "Completado"}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Vista Desktop: Tabla tradicional */}
                  <div className="hidden md:block">
                    <ul className="divide-y divide-hairline">
                      {filteredTransactions.map((tx) => (
                        <li key={tx.id} className={cn("p-4 hover:bg-surface-soft transition-colors flex items-center justify-between group", editingId === tx.id && "bg-surface-soft border-l-2 border-l-primary")}>
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-surface-soft shrink-0", tx.type === 'income' ? "text-semantic-up" : "text-semantic-down")}>
                              {tx.type === 'income' ? (
                                <span className="material-icons-google text-lg">arrow_outward</span>
                              ) : (
                                <span className="material-icons-google text-lg">south_east</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-ink text-sm truncate">{tx.description}</p>
                              <p className="text-xs text-muted mt-0.5 truncate">
                                {tx.category} • <span className="font-mono">{formatDate(tx.date)}</span>
                                <span className={cn(
                                  "ml-2 text-[10px] px-1.5 py-0.5 rounded-md font-semibold",
                                  tx.status === "Completado" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                                )}>
                                  {tx.status || "Completado"}
                                </span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <span className={cn("font-semibold font-mono text-sm block", tx.type === 'income' ? "text-semantic-up" : "text-semantic-down")}>
                                {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                              </span>
                              <span className="text-[10px] text-muted font-bold uppercase tracking-wider block mt-0.5">
                                {tx.type === 'income' ? 'Ingreso' : 'Gasto'}
                              </span>
                            </div>

                            <div className="flex items-center justify-end h-9 overflow-hidden">
                              <div className="flex items-center gap-1.5 w-0 opacity-0 group-hover:w-[72px] group-hover:opacity-100 group-hover:ml-1.5 transition-all duration-300 ease-in-out overflow-hidden shrink-0">
                                <button
                                  onClick={() => startEdit(tx)}
                                  title="Editar transacción"
                                  className="w-8 h-8 text-primary hover:bg-blue-50 bg-surface-soft border border-hairline hover:border-blue-100 rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0"
                                >
                                  <span className="material-icons-google text-base">edit</span>
                                </button>
                                <button
                                  onClick={() => triggerDeleteConfirm(tx.id, tx.description)}
                                  title="Eliminar transacción"
                                  className="w-8 h-8 text-semantic-down hover:bg-red-50 bg-surface-soft border border-hairline hover:border-red-100 rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0"
                                >
                                  <span className="material-icons-google text-base">delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop con Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="absolute inset-0 bg-[#0a0b0d]/40 backdrop-blur-sm"
              id="delete-backdrop"
            />
            
            {/* Contenedor Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white border border-hairline rounded-[24px] max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden relative z-10 p-6"
              id="delete-modal-content"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-semantic-down/10 text-semantic-down flex items-center justify-center shrink-0">
                  <span className="material-icons-google text-2xl">warning</span>
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-lg font-medium text-ink tracking-tight">Confirmar eliminación</h4>
                  <p className="text-sm text-body leading-relaxed">
                    ¿Estás seguro de que deseas eliminar la transacción <strong className="text-ink font-semibold">"{deleteName}"</strong>? Esta acción no se puede deshacer y afectará tus reportes y balance acumulado.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-hairline pt-4">
                <button
                  onClick={cancelDelete}
                  className="px-5 py-2.5 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-xs font-semibold transition-all border border-hairline cursor-pointer"
                  id="btn-cancel-delete"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 bg-semantic-down hover:bg-red-600 text-white rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  id="btn-confirm-delete"
                >
                  <span className="material-icons-google text-xs">delete</span>
                  Eliminar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet para creación/edición de transacciones en móvil */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop con Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-[#0a0b0d]/60 backdrop-blur-xs"
              id="bottom-sheet-backdrop"
            />
            
            {/* Panel deslizable */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute bottom-0 left-0 right-0 max-h-[90vh] bg-white rounded-t-[32px] border-t border-hairline p-6 overflow-y-auto shadow-[0_-12px_45px_rgba(0,0,0,0.18)] flex flex-col z-10"
              id="bottom-sheet-content"
            >
              {/* Barra de arrastre */}
              <div 
                className="mx-auto w-12 h-1.5 bg-surface-strong rounded-full mb-6 shrink-0 cursor-pointer" 
                onClick={() => setIsFormOpen(false)} 
              />
              
              <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <span className="material-icons-google text-primary text-2xl">
                  {editingId ? "edit" : "add"}
                </span>
                {editingId ? "Editar Transacción" : "Nueva Transacción"}
              </h3>
              
              <form onSubmit={handleSubmit((data) => {
                onSubmit(data);
                setIsFormOpen(false);
              })} className="space-y-4">
                <div>
                  <label className={labelClasses}>Descripción</label>
                  <input
                    {...register("description", { required: true })}
                    placeholder="Ej: Compra supermercado"
                    className={inputClasses}
                  />
                  {errors.description && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Monto</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
                      <input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        {...register("amount", { required: true, min: 0.01 })}
                        placeholder="0.00"
                        className={cn(inputClasses, "pl-7")}
                      />
                    </div>
                    {errors.amount && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                  </div>
                  <div>
                    <label className={labelClasses}>Tipo</label>
                    <select {...register("type")} className={cn(inputClasses, "py-2 bg-white")}>
                      <option value="expense">Gasto</option>
                      <option value="income">Ingreso</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Categoría</label>
                    <input
                      {...register("category", { required: true })}
                      placeholder="Ej: Alimentación"
                      className={inputClasses}
                    />
                    {errors.category && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                  </div>
                  <div>
                    <label className={labelClasses}>Estado</label>
                    <select {...register("status")} className={cn(inputClasses, "py-2 bg-white")}>
                      <option value="Completado">Completado</option>
                      <option value="Pendiente">Pendiente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Fecha</label>
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className={inputClasses}
                  />
                  {errors.date && <span className="text-xs text-semantic-down mt-1 block">Requerido</span>}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      cancelEdit();
                      setIsFormOpen(false);
                    }}
                    className="flex-1 py-3 bg-surface-strong hover:bg-surface-soft text-body rounded-full text-sm font-semibold transition-colors h-12 border border-hairline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-active text-white rounded-full text-sm font-semibold transition-colors shadow-sm h-12 cursor-pointer"
                  >
                    {editingId ? "Guardar" : "Registrar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
