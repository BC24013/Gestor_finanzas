import { useState } from "react";
import { Utensils, Car, Wrench, ShoppingCart, MoreHorizontal, Calendar, FileText, Delete } from "lucide-react";
import type { Transaction, TxCategory } from "./TransactionModal";

const categorias: { id: TxCategory; label: string; Icon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { id: "Comida", label: "Comida", Icon: Utensils },
  { id: "Transporte", label: "Transporte", Icon: Car },
  { id: "Servicios", label: "Servicios", Icon: Wrench },
  { id: "Compras", label: "Compras", Icon: ShoppingCart },
  { id: "Salario", label: "Más", Icon: MoreHorizontal },
];

type Props = {
  onSave: (tx: Transaction) => void;
};

export function AnadirForm({ onSave }: Props) {
  const [amount, setAmount] = useState("0");
  const [tipo, setTipo] = useState<"gasto" | "ingreso">("gasto");
  const [categoria, setCategoria] = useState<TxCategory>("Comida");
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));

  const press = (key: string) => {
    setAmount((a) => {
      if (key === "back") return a.length > 1 ? a.slice(0, -1) : "0";
      if (key === ".") return a.includes(".") ? a : a + ".";
      if (a === "0") return key;
      return a + key;
    });
  };

  const handleSave = () => {
    const monto = parseFloat(amount) || 0;
    if (!nombre.trim() || monto <= 0) return;
    onSave({
      id: crypto.randomUUID(),
      tipo,
      categoria,
      nombre: nombre.trim(),
      fecha,
      monto,
    });
    setAmount("0");
    setNombre("");
    setCategoria("Comida");
    setTipo("gasto");
    setFecha(new Date().toISOString().slice(0, 10));
  };

  const amountColor = tipo === "gasto" ? "#ff999a" : "#a6ff87";
  const sign = tipo === "gasto" ? "-" : "+";

  return (
    <div
      className="flex flex-col items-center gap-3 w-full px-2 sm:px-4"
      style={{ fontFamily: "SF Pro, sans-serif" }}
    >
      {/* Amount */}
      <div className="flex flex-col items-center w-full">
        <div
          style={{
            color: amountColor,
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.96px",
            lineHeight: "56px",
          }}
        >
          {sign}${amount}
        </div>
        <div
          className="flex items-center mt-3 p-[1px] rounded-[8px]"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(199,198,202,0.2)",
            width: "auto",
            minWidth: "150px",
            maxWidth: "200px",
            height: 42,
            backdropFilter: "blur(15px)",
          }}
        >
          {(["gasto", "ingreso"] as const).map((t) => {
            const active = tipo === t;
            const activeColor = t === "gasto" ? "#ff999a" : "#a6ff87";
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className="flex-1 h-full rounded-[8px] border-0 cursor-pointer capitalize"
                style={{
                  background: active ? `${activeColor}26` : "transparent",
                  color: active ? activeColor : "rgba(255,255,255,0.6)",
                  fontWeight: 590,
                  fontSize: 12,
                  letterSpacing: "0.6px",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Details card */}
      <div
        className="w-full rounded-[8px] p-[25px] flex flex-col gap-3"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(199,198,202,0.2)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div style={{ color: "#fff", fontWeight: 590, fontSize: 18, padding: "0 8px" }}>
          Categoría
        </div>
        <div
          className="flex gap-[10px] w-full overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {categorias.map(({ id, label, Icon }) => {
            const active = categoria === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategoria(id)}
                className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer"
                style={{
                  minWidth: 64,
                  opacity: active ? 1 : 0.5,
                  color: active ? "#fff" : "rgba(215,215,215,0.6)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-[12px]"
                  style={{
                    background: "rgba(241,243,245,0.4)",
                    width: 48,
                    height: 48,
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Icon size={22} color="#fff" />
                </div>
                <span style={{ fontSize: 14 }}>{label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <label
            className="w-full rounded-[12px] flex items-center gap-4 px-[13px] py-[13px]"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Calendar size={22} color="#fff" />
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-white"
              style={{ colorScheme: "dark", fontSize: 16 }}
            />
          </label>
          <label
            className="w-full rounded-[12px] flex items-center gap-4 px-[13px] py-[13px]"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
            }}
          >
            <FileText size={22} color="#fff" />
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la Transacción"
              className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-white/40"
              style={{ fontSize: 16 }}
            />
          </label>
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm mt-1">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            className="rounded-[8px] border-0 cursor-pointer flex items-center justify-center aspect-square"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(199,198,202,0.2)",
              backdropFilter: "blur(15px)",
              color: "#fff",
              fontWeight: 590,
              fontSize: 32,
            }}
          >
            {k === "back" ? <Delete size={24} color="#fff" /> : k}
          </button>
        ))}
      </div>

      {/* Save */}
      <button
        type="button"
        onClick={handleSave}
        className="rounded-[8px] border-0 cursor-pointer mt-4 w-full max-w-sm"
        style={{
          background: "#ff999a",
          color: "#161618",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.14px",
          padding: "12px 0",
        }}
      >
        Guardar
      </button>
    </div>
  );
}
