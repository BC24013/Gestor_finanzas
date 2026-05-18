import { useEffect, useState } from "react";

export type TxType = "gasto" | "ingreso";
export type TxCategory = "Comida" | "Transporte" | "Servicios" | "Compras" | "Salario";

export type Transaction = {
  id: string;
  tipo: TxType;
  categoria: TxCategory;
  nombre: string;
  fecha: string;
  monto: number;
};

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initial?: Partial<Transaction>;
  onClose: () => void;
  onSave: (tx: Transaction) => void;
  onDelete?: () => void;
};

const categorias: TxCategory[] = ["Comida", "Transporte", "Servicios", "Compras", "Salario"];

export function TransactionModal({ open, mode, initial, onClose, onSave, onDelete }: Props) {
  const [tipo, setTipo] = useState<TxType>("gasto");
  const [categoria, setCategoria] = useState<TxCategory>("Comida");
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [monto, setMonto] = useState("");

  useEffect(() => {
    if (open) {
      setTipo(initial?.tipo ?? "gasto");
      setCategoria(initial?.categoria ?? "Comida");
      setNombre(initial?.nombre ?? "");
      setFecha(initial?.fecha ?? new Date().toISOString().slice(0, 10));
      setMonto(initial?.monto != null ? String(initial.monto) : "");
    }
  }, [open, initial]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !monto) return;
    onSave({
      id: initial?.id ?? crypto.randomUUID(),
      tipo,
      categoria,
      nombre: nombre.trim(),
      fecha,
      monto: parseFloat(monto) || 0,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] rounded-[16px] p-[25px] flex flex-col gap-4"
        style={{
          background: "rgba(30,30,35,0.95)",
          border: "1px solid rgba(199,198,202,0.2)",
          backdropFilter: "blur(15px)",
          color: "#f1f3f5",
          fontFamily: "SF Pro, sans-serif",
        }}
      >
        <div className="flex items-center justify-between">
          <h2 style={{ fontSize: 22, fontWeight: 590, letterSpacing: "-0.24px" }}>
            {mode === "edit" ? "Editar Transacción" : "Nueva Transacción"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-white/60 hover:text-white text-xl leading-none cursor-pointer bg-transparent border-0"
          >
            ×
          </button>
        </div>

        <div
          className="flex p-[6px] rounded-[12px]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(199,198,202,0.18)",
          }}
        >
          {(["gasto", "ingreso"] as TxType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className="flex-1 py-2 rounded-[8px] cursor-pointer border-0 capitalize"
              style={{
                background: tipo === t ? (t === "gasto" ? "#ff999a" : "#a6ff87") : "transparent",
                color: tipo === t ? "#161618" : "#d7d7d7",
                fontWeight: tipo === t ? 600 : 400,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <Field label="Categoría">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as TxCategory)}
            className="w-full bg-transparent outline-none text-white"
            style={{ appearance: "none" }}
          >
            {categorias.map((c) => (
              <option key={c} value={c} style={{ background: "#1e1e23", color: "#fff" }}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Nombre">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Supermercado"
            required
            className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
          />
        </Field>

        <div className="flex gap-3">
          <Field label="Fecha">
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full bg-transparent outline-none text-white"
              style={{ colorScheme: "dark" }}
            />
          </Field>
          <Field label="Monto ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="0.00"
              required
              className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
            />
          </Field>
        </div>

        <div className="flex gap-3 pt-2">
          {mode === "edit" && onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="rounded-[12px] py-3 px-4 cursor-pointer border-0"
              style={{ background: "#ff999a", color: "#161618", fontWeight: 600 }}
            >
              Eliminar
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[12px] py-3 cursor-pointer border-0"
            style={{ background: "rgba(255,255,255,0.08)", color: "#f1f3f5" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 rounded-[12px] py-3 cursor-pointer border-0"
            style={{ background: "#a6ff87", color: "#161618", fontWeight: 600 }}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 flex-1">
      <span style={{ fontSize: 12, color: "#d7d7d7" }}>{label}</span>
      <div
        className="rounded-[10px] px-3 py-2"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(199,198,202,0.18)",
        }}
      >
        {children}
      </div>
    </label>
  );
}
