import { Laptop, Shield, Target, Trash2 } from "lucide-react";
import type { Goal } from "./AddGoalModal";

export function GoalItem({ goal, onDelete }: { goal: Goal; onDelete?: (goalId: string) => void }) {
  const progress = goal.objetivo > 0 ? Math.min(100, (goal.ahorrado / goal.objetivo) * 100) : 0;
  const restante = Math.max(0, goal.objetivo - goal.ahorrado);
  const iconMap = {
    target: Target,
    shield: Shield,
    laptop: Laptop,
  } as const;
  const Icon = iconMap[goal.icon ?? "target"] ?? Target;
  return (
    <div
      className="w-full pt-3 mt-3"
      style={{ borderTop: "1px solid rgba(199,198,202,0.18)", fontFamily: "SF Pro, sans-serif" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="rounded-[12px] flex items-center justify-center"
            style={{ background: "rgba(241,243,245,0.4)", width: 48, height: 48, backdropFilter: "blur(20px)" }}
          >
            <Icon size={24} color="#fff" fill="#fff" strokeWidth={0.75} />
          </div>
          <div>
            <div style={{ color: "#f1f3f5", fontWeight: 700, fontSize: 14, letterSpacing: "0.14px", lineHeight: "20px" }}>
              {goal.nombre}
            </div>
            {goal.descripcion && (
              <div style={{ color: "#d7d7d7", fontSize: 12, lineHeight: "16px" }}>{goal.descripcion}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ color: "#a6ff87", fontWeight: 700, fontSize: 14, letterSpacing: "0.14px" }}>
            ${goal.objetivo}
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1 hover:bg-[rgba(255,255,255,0.1)] rounded cursor-pointer border-0 transition-colors"
              style={{ background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}
              title="Eliminar meta"
            >
              <Trash2 size={18} color="#d7d7d7" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span style={{ color: "#f1f3f5", fontSize: 14, fontWeight: 700, letterSpacing: "0.14px", lineHeight: "20px" }}>
          Progreso
        </span>
        <span style={{ color: "#f1f3f5", fontSize: 14, fontWeight: 700, letterSpacing: "0.14px", lineHeight: "20px" }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div
        className="w-full rounded-full mt-2"
        style={{ background: "#eeedf3", height: 4, overflow: "hidden" }}
      >
        <div style={{ background: "#a6ff87", width: `${progress}%`, height: "100%" }} />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span style={{ color: "#d7d7d7", fontSize: 12, lineHeight: "16px" }}>
          Ahorrado: ${goal.ahorrado}
        </span>
        <span style={{ color: "#d7d7d7", fontSize: 12, lineHeight: "16px" }}>
          Restante: ${restante}
        </span>
      </div>
    </div>
  );
}
