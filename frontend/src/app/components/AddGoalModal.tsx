import { useEffect, useState } from "react";

export type Goal = {
  id: string;
  nombre: string;
  descripcion: string;
  objetivo: number;
  ahorrado: number;
  icon?: "target" | "shield" | "laptop";
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
};

export function AddGoalModal({ open, onClose, onSave }: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [ahorrado, setAhorrado] = useState("");

  useEffect(() => {
    if (open) {
      setNombre("");
      setDescripcion("");
      setObjetivo("");
      setAhorrado("");
    }
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !objetivo) return;
    onSave({
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      objetivo: parseFloat(objetivo) || 0,
      ahorrado: parseFloat(ahorrado) || 0,
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
            Nueva Meta Financiera
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

        <Field label="Nombre">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Vacaciones"
            required
            className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
          />
        </Field>

        <Field label="Descripción">
          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej. Playa El Tunco, El Salvador"
            className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
          />
        </Field>

        <div className="flex gap-3">
          <Field label="Objetivo ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="200"
              required
              className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
            />
          </Field>
          <Field label="Ahorrado ($)">
            <input
              type="number"
              min="0"
              step="0.01"
              value={ahorrado}
              onChange={(e) => setAhorrado(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
            />
          </Field>
        </div>

        <div className="flex gap-3 pt-2">
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
