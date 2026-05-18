import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BadgeDollarSign, Car, MoreHorizontal, Pencil, ShoppingCart, Trash2, Utensils, Wrench } from "lucide-react";
import { createPortal } from "react-dom";
import { AddGoalModal, type Goal } from "./components/AddGoalModal";
import { GoalItem } from "./components/GoalItem";
import { TransactionModal, type Transaction, type TxCategory } from "./components/TransactionModal";
import { AnadirForm } from "./components/AnadirForm";
import Inicio from "../imports/01Inicio/01Inicio";
import Transacciones from "../imports/02Transacciones/02Transacciones";
import Anadir from "../imports/03Anadir/03Anadir";
import Reportes from "../imports/04Reportes/04Reportes";
import SlideInicio from "../imports/Slide1691/Slide1691";
import SlideTransacciones from "../imports/Slide1692/Slide1692";
import SlideAnadir from "../imports/Slide1693/Slide1693";
import SlideReportes from "../imports/Slide1694/Slide1694";

type Tab = "inicio" | "transacciones" | "anadir" | "reportes";

export default function App() {
  const makeDateOffset = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().slice(0, 10);
  };
  const demoTransactions: Transaction[] = [
    {
      id: "demo-tx-1",
      tipo: "ingreso",
      categoria: "Salario",
      nombre: "Pago",
      fecha: makeDateOffset(1),
      monto: 1200,
    },
    {
      id: "demo-tx-2",
      tipo: "gasto",
      categoria: "Comida",
      nombre: "Supermercado",
      fecha: makeDateOffset(2),
      monto: 95.5,
    },
    {
      id: "demo-tx-3",
      tipo: "gasto",
      categoria: "Servicios",
      nombre: "Internet",
      fecha: makeDateOffset(4),
      monto: 42,
    },
    {
      id: "demo-tx-4",
      tipo: "gasto",
      categoria: "Transporte",
      nombre: "Gasolina",
      fecha: makeDateOffset(6),
      monto: 30,
    },
  ];
  const demoGoals: Goal[] = [
    {
      id: "demo-goal-1",
      nombre: "Fondo de emergencia",
      descripcion: "3 meses de gastos",
      objetivo: 1500,
      ahorrado: 350,
      icon: "shield",
    },
    {
      id: "demo-goal-2",
      nombre: "Laptop nueva",
      descripcion: "Trabajo y estudio",
      objetivo: 900,
      ahorrado: 120,
      icon: "laptop",
    },
  ];
  const [tab, setTab] = useState<Tab>("inicio");
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(() => {
    try { return JSON.parse(localStorage.getItem("ff_goals") || "[]"); } catch { return []; }
  });
  const [goalContainers, setGoalContainers] = useState<HTMLElement[]>([]);
  const [txContainers, setTxContainers] = useState<HTMLElement[]>([]);
  const [txModal, setTxModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    initial?: Partial<Transaction>;
    onSaveOverride?: (tx: Transaction) => void;
    onDelete?: () => void;
  }>({ open: false, mode: "add" });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try { return JSON.parse(localStorage.getItem("ff_tx") || "[]"); } catch { return []; }
  });
  useEffect(() => {
    const resetKey = "ff_reset_once_v2";
    if (!localStorage.getItem(resetKey)) {
      localStorage.removeItem("ff_tx");
      localStorage.removeItem("ff_goals");
      localStorage.setItem(resetKey, "1");
      setTransactions(demoTransactions);
      setGoals(demoGoals);
    }
  }, []);
  useEffect(() => {
    if (transactions.length === 0) setTransactions(demoTransactions);
    if (goals.length === 0) setGoals(demoGoals);
  }, []);
  useEffect(() => { localStorage.setItem("ff_tx", JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem("ff_goals", JSON.stringify(goals)); }, [goals]);

  // Dashboard data
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthTx = transactions.filter((t) => (t.fecha || "").startsWith(monthKey));
  const ingresosMes = monthTx.filter((t) => t.tipo === "ingreso").reduce((s, t) => s + t.monto, 0);
  const gastosMes = monthTx.filter((t) => t.tipo === "gasto").reduce((s, t) => s + t.monto, 0);
  const balance = ingresosMes - gastosMes;
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - 6);
  const weekKey = weekStart.toISOString().slice(0, 10);
  const gastosSemana = transactions
    .filter((t) => t.tipo === "gasto" && (t.fecha || "") >= weekKey)
    .reduce((s, t) => s + t.monto, 0);
  const maxGastoSemana = transactions
    .filter((t) => t.tipo === "gasto" && (t.fecha || "") >= weekKey)
    .reduce((m, t) => (t.monto > m ? t.monto : m), 0);
  const maxGastoMes = monthTx
    .filter((t) => t.tipo === "gasto")
    .reduce((m, t) => (t.monto > m ? t.monto : m), 0);
  const fmt = (n: number) => `$${Math.abs(Math.round(n * 100) / 100).toLocaleString("en-US")}`;

  // Mirror dashboard numbers into imported Inicio screen
  useLayoutEffect(() => {
    if (tab !== "inicio") return;
    const frames = Array.from(document.querySelectorAll<HTMLElement>(".mobile-frame, .desktop-frame"));
    frames.forEach((root) => {
      // Update Balance Actual, Ingresos Mes, Gastos Mes
      const find = (label: string): HTMLElement | null => {
        const lbl = Array.from(root.querySelectorAll<HTMLElement>("p")).find(
          (p) => p.textContent?.trim() === label
        );
        if (!lbl) return null;
        let parent: HTMLElement | null = lbl.parentElement;
        for (let i = 0; i < 6 && parent; i++) {
          const h2 = parent.querySelector<HTMLElement>('[data-name="Heading 2"] p');
          if (h2) return h2;
          parent = parent.parentElement;
        }
        return null;
      };
      const bP = find("Balance Actual");
      if (bP) bP.textContent = `${balance < 0 ? "-" : ""}${fmt(balance)}`;
      const iP = find("Ingresos Mes");
      if (iP) iP.textContent = `+ ${fmt(ingresosMes)}`;
      const gP = find("Gastos Mes");
      if (gP) gP.textContent = `- ${fmt(gastosMes)}`;

      // Update Gastos Semanales Y-Axis chart
      const semHeading = Array.from(root.querySelectorAll<HTMLElement>("p")).find(
        (p) => p.textContent?.trim() === "Gastos Semanales"
      );
      if (semHeading) {
        // Find the nearest Y-Axis Labels container from the heading
        let ancestor: HTMLElement | null = semHeading;
        while (ancestor) {
          const yAxis = ancestor.querySelector<HTMLElement>('[data-name="Y-Axis Labels"]');
          if (yAxis) {
            // Update Y-Axis labels: top, middle, bottom
            const ps = Array.from(yAxis.querySelectorAll<HTMLElement>("p"));
            if (ps.length >= 3) {
              const maxVal = Math.max(0, maxGastoSemana);
              ps[0].textContent = fmt(maxVal);
              ps[1].textContent = fmt(maxVal / 2);
              ps[2].textContent = "$0";
            }
            break;
          }
          ancestor = ancestor.parentElement;
        }
        // Update tooltip values (any p with $ price format) inside the chart container
        if (ancestor) {
          const allPrices = Array.from(ancestor.querySelectorAll<HTMLElement>("p")).filter(
            (p) => /^\$[\d,.]+$/.test(p.textContent?.trim() || "")
          );
          allPrices.forEach((p) => {
            p.textContent = maxGastoSemana > 0 ? fmt(maxGastoSemana) : "$0";
          });
        }
      }
    });
  }, [tab, transactions, balance, gastosMes, ingresosMes, maxGastoSemana]);

  // Mirror Reportes numbers from real transactions
  useLayoutEffect(() => {
    if (tab !== "reportes") return;
    const totalsByCat = new Map<string, number>();
    monthTx.filter((t) => t.tipo === "gasto").forEach((t) => {
      totalsByCat.set(t.categoria, (totalsByCat.get(t.categoria) || 0) + t.monto);
    });
    let topCat = "—";
    let topAmt = 0;
    totalsByCat.forEach((v, k) => { if (v > topAmt) { topAmt = v; topCat = k; } });
    const pct = ingresosMes > 0 ? Math.round((topAmt / ingresosMes) * 100) : 0;

    const frames = Array.from(document.querySelectorAll<HTMLElement>(".mobile-frame, .desktop-frame"));
    const knownCats = ["Comida", "Transporte", "Servicios", "Compras", "Salario"];
    frames.forEach((root) => {
      // Update Top Category Insight
      const insight = root.querySelector<HTMLElement>('[data-name="Top Category Insight"]');
      if (insight) {
        const ps = Array.from(insight.querySelectorAll<HTMLElement>("p"));
        ps.forEach((p) => {
          const txt = p.textContent?.trim() || "";
          if (knownCats.includes(txt)) p.textContent = topCat;
          else if (/^-\$/.test(txt)) p.textContent = `-${fmt(topAmt)}`;
          else if (/% del ingreso total$/.test(txt)) p.textContent = `${pct}% del ingreso total`;
        });
      }
      // Update MainChart/Pie Chart total amounts
      const mainChart = root.querySelector<HTMLElement>('[data-name="MainChart"]')
        || root.querySelector<HTMLElement>('[data-name="Pie Chart"]');
      if (mainChart) {
        const ps = Array.from(mainChart.querySelectorAll<HTMLElement>("p"));
        ps.forEach((p) => {
          const txt = p.textContent?.trim() || "";
          if (/^\$[\d,.]+$/.test(txt)) p.textContent = fmt(gastosMes);
        });
      }

      // Update Gasto Total Y-Axis chart
      const gastoTotalLbl = Array.from(root.querySelectorAll<HTMLElement>("p")).find(
        (p) => p.textContent?.trim() === "Gasto Total"
      );
      if (gastoTotalLbl) {
        // Find the nearest Y-Axis Labels container from the label
        let ancestor: HTMLElement | null = gastoTotalLbl;
        while (ancestor) {
          const yAxis = ancestor.querySelector<HTMLElement>('[data-name="Y-Axis Labels"]');
          if (yAxis) {
            // Update Y-Axis labels: top, middle, bottom
            const ps = Array.from(yAxis.querySelectorAll<HTMLElement>("p"));
            if (ps.length >= 3) {
              const maxVal = Math.max(0, maxGastoMes);
              ps[0].textContent = fmt(maxVal);
              ps[1].textContent = fmt(maxVal / 2);
              ps[2].textContent = "$0";
            }
            break;
          }
          ancestor = ancestor.parentElement;
        }
        // Update tooltip values (any p with $ price format) inside the chart container
        if (ancestor) {
          const allPrices = Array.from(ancestor.querySelectorAll<HTMLElement>("p")).filter(
            (p) => /^\$[\d,.]+$/.test(p.textContent?.trim() || "")
          );
          allPrices.forEach((p) => {
            p.textContent = maxGastoMes > 0 ? fmt(maxGastoMes) : "$0";
          });
        }
        // Also update the Heading 2 with total gasto amount if present
        let parent: HTMLElement | null = gastoTotalLbl.parentElement;
        for (let i = 0; i < 5 && parent; i++) {
          const h2 = parent.querySelector<HTMLElement>('[data-name="Heading 2"] p');
          if (h2) { h2.textContent = fmt(gastosMes); break; }
          parent = parent.parentElement;
        }
      }
    });
  }, [tab, transactions, monthTx, ingresosMes, gastosMes, maxGastoMes]);

  // Hide imported Anadir Main + Bottom area so AnadirForm shows over it
  useLayoutEffect(() => {
    if (tab !== "anadir") return;
    const frames = Array.from(document.querySelectorAll<HTMLElement>(".mobile-frame, .desktop-frame"));
    const restored: Array<() => void> = [];
    frames.forEach((root) => {
      const mains = root.querySelectorAll<HTMLElement>('[data-name="Main"]');
      mains.forEach((m) => {
        const prev = m.style.visibility;
        m.style.visibility = "hidden";
        restored.push(() => { m.style.visibility = prev; });
      });
    });
    return () => restored.forEach((r) => r());
  }, [tab]);

  // Locate Transacciones list container + Inicio Recent Transactions container
  useEffect(() => {
    if (tab !== "transacciones" && tab !== "inicio") {
      setTxContainers([]);
      return;
    }
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[data-name="Transaction Item"]')
    );
    const containers = new Set<HTMLElement>();
    items.forEach((it) => {
      const parent = it.parentElement;
      if (parent) containers.add(parent);
    });
    setTxContainers(Array.from(containers));
  }, [tab]);

  useEffect(() => {
    if (tab !== "inicio") {
      setGoalContainers([]);
      return;
    }
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-name="Goal Card 1: New Car"]')
    );
    const containers: HTMLElement[] = [];
    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>(":scope > div.content-stretch") ||
        card.querySelector<HTMLElement>(":scope > div:not([aria-hidden])");
      if (inner) {
        card.style.overflowY = "auto";
        (card.style as CSSStyleDeclaration & { scrollbarWidth?: string }).scrollbarWidth = "none";
        containers.push(inner);
      }
    });
    setGoalContainers(containers);
  }, [tab, goals.length]);

  useEffect(() => {
    if (tab !== "inicio") return;
    const cleanups: Array<() => void> = [];

    const wireSibling = (
      headingText: string,
      childSelector: string,
      onClick: () => void
    ) => {
      const headings = Array.from(document.querySelectorAll("p")).filter(
        (p) => p.textContent?.trim() === headingText
      );
      headings.forEach((p) => {
        let parent: HTMLElement | null = p.parentElement;
        let target: Element | null = null;
        for (let i = 0; i < 8 && parent && !target; i++) {
          target = parent.querySelector(childSelector);
          if (!target) parent = parent.parentElement;
        }
        if (target) {
          const el = target as HTMLElement;
          el.style.cursor = "pointer";
          const handler = (e: Event) => {
            e.stopPropagation();
            onClick();
          };
          el.addEventListener("click", handler);
          cleanups.push(() => el.removeEventListener("click", handler));
        }
      });
    };

    wireSibling("Metas Financieras", '[data-name="Add-Square Streamline Core"]', () =>
      setGoalModalOpen(true)
    );
    wireSibling("Transacciones", '[data-name="Add-Square Streamline Core"]', () =>
      setTab("anadir")
    );
    wireSibling("Gastos Semanales", '[data-name="Button"]', () => setTab("reportes"));

    return () => cleanups.forEach((c) => c());
  }, [tab]);

  const Screen =
    tab === "inicio" ? Inicio
    : tab === "transacciones" ? Transacciones
    : tab === "anadir" ? Anadir
    : Reportes;

  const tabs: { id: Tab; label: string }[] = [
    { id: "inicio", label: "Inicio" },
    { id: "transacciones", label: "Transacciones" },
    { id: "anadir", label: "Añadir" },
    { id: "reportes", label: "Reportes" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] flex items-start justify-center">
      <style>{`
        .mobile-frame [data-name="Main"] {
          bottom: 77px;
          overflow-y: auto;
          overflow-x: hidden;
          right: 0;
          left: 0;
          max-width: 100% !important;
          padding-bottom: 24px;
        }
        .mobile-frame [data-name="Main"]::-webkit-scrollbar { width: 0; height: 0; }
        .mobile-frame ::-webkit-scrollbar,
        .desktop-frame ::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none; }
        .mobile-frame *, .desktop-frame * { scrollbar-width: none; -ms-overflow-style: none; }
        .mobile-frame [data-name="Header - TopAppBar"],
        .mobile-frame [data-name="BottomNavBar"] {
          width: 100% !important;
        }
        .mobile-frame [data-name="Header - TopAppBar"] {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          background: transparent !important;
        }
        .desktop-frame {
          width: 1920px;
          height: 1080px;
          transform-origin: top left;
        }
        .desktop-frame [data-name="Header - TopAppBar"] {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          background: transparent !important;
        }
        /* Hide imported sample transactions — real ones rendered via portals */
        .mobile-frame [data-name="Transaction Item"],
        .desktop-frame [data-name="Transaction Item"] { display: none !important; }
        /* AnadirForm overrides for better visibility */
        .anadir-form-container {
          width: 100%;
          max-width: 430px;
        }
      `}</style>

      {/* Mobile (< lg) */}
      <div className="lg:hidden mobile-frame relative w-full max-w-[430px] h-screen overflow-hidden">
        <Screen />
        {tab === "anadir" && (
          <div className="absolute anadir-form-container inset-0 top-[101px] bottom-[77px] overflow-y-auto z-40 flex flex-col items-center justify-start px-4 py-6">
            <AnadirForm
              onSave={(t) => {
                setTransactions((prev) => [...prev, t]);
                setTab("transacciones");
              }}
            />
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full flex gap-[28px] items-center px-[22px] py-[16px] z-50">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-label={t.label}
              className="h-[45px] w-[60px] rounded-[12px] cursor-pointer bg-transparent border-0"
            />
          ))}
        </div>
      </div>

      {/* Desktop (>= lg) */}
      <DesktopSlide tab={tab} setTab={setTab} />

      <AddGoalModal
        open={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        onSave={(g) => setGoals((prev) => [...prev, g])}
      />

      {goalContainers.map((container, idx) =>
        createPortal(
          <>
            {goals.map((g) => (
              <GoalItem 
                key={g.id} 
                goal={g} 
                onDelete={(goalId) => setGoals((prev) => prev.filter((x) => x.id !== goalId))}
              />
            ))}
          </>,
          container,
          `goals-${idx}`
        )
      )}

      <TransactionModal
        open={txModal.open}
        mode={txModal.mode}
        initial={txModal.initial}
        onClose={() => setTxModal({ open: false, mode: "add" })}
        onSave={(t) => {
          if (txModal.onSaveOverride) txModal.onSaveOverride(t);
          else setTransactions((prev) => [...prev, t]);
        }}
        onDelete={txModal.onDelete}
      />

      {txContainers.map((container, idx) => {
        const sorted = [...transactions].sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
        const list = tab === "inicio" ? sorted.slice(0, 4) : sorted;
        const showAddBtn = tab === "transacciones";
        const emptyMsg = list.length === 0;
        return createPortal(
          <>
            {emptyMsg && (
              <div
                className="w-full text-center py-6"
                style={{ color: "#d7d7d7", fontFamily: "SF Pro, sans-serif", fontSize: 14 }}
              >
                {tab === "inicio" ? "Sin transacciones aún" : "No hay transacciones. Añade la primera."}
              </div>
            )}
            {list.map((t) => (
              <TransactionRow
                key={t.id}
                tx={t}
                onEdit={() =>
                  setTxModal({
                    open: true,
                    mode: "edit",
                    initial: t,
                    onSaveOverride: (updated) =>
                      setTransactions((prev) =>
                        prev.map((x) => (x.id === t.id ? updated : x))
                      ),
                    onDelete: () =>
                      setTransactions((prev) => prev.filter((x) => x.id !== t.id)),
                  })
                }
                onDelete={() =>
                  setTransactions((prev) => prev.filter((x) => x.id !== t.id))
                }
              />
            ))}
            {showAddBtn && (
              <button
                type="button"
                onClick={() => setTxModal({ open: true, mode: "add" })}
                className="w-full flex items-center justify-center gap-2 rounded-[12px] py-3 cursor-pointer border-0 mt-1"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px dashed rgba(199,198,202,0.3)",
                  color: "#f1f3f5",
                  fontFamily: "SF Pro, sans-serif",
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
                <span>Añadir transacción</span>
              </button>
            )}
          </>,
          container,
          `tx-${idx}`
        );
      })}
    </div>
  );
}

function TransactionRow({
  tx,
  onEdit,
  onDelete,
}: {
  tx: Transaction;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isIngreso = tx.tipo === "ingreso";
  const categoryIcons = {
    Comida: Utensils,
    Transporte: Car,
    Servicios: Wrench,
    Compras: ShoppingCart,
    Salario: MoreHorizontal,
  } as const;
  const isPago = (tx.nombre || "").trim().toLowerCase() === "pago";
  const Icon = isPago ? BadgeDollarSign : (categoryIcons[tx.categoria] ?? MoreHorizontal);
  return (
    <div
      className="w-full flex items-center justify-between py-3 pr-3"
      style={{ fontFamily: "SF Pro, sans-serif" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="rounded-[12px] flex items-center justify-center"
          style={{ background: "rgba(241,243,245,0.4)", width: 48, height: 48 }}
        >
          <Icon size={22} color="#fff" fill="#fff" strokeWidth={0.75} />
        </div>
        <div>
          <div style={{ color: "#f1f3f5", fontWeight: 700, fontSize: 14 }}>{tx.nombre}</div>
          <div style={{ color: "#d7d7d7", fontSize: 12 }}>{tx.fecha}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div style={{ color: isIngreso ? "#a6ff88" : "#ff999a", fontWeight: 500, fontSize: 14 }}>
          {isIngreso ? "+" : "-"}${tx.monto}
        </div>
        <button
          type="button"
          onClick={onEdit}
          aria-label="Editar"
          className="cursor-pointer bg-transparent border-0 flex items-center justify-center"
          style={{ width: 24, height: 24, padding: 0 }}
        >
          <Pencil size={20} color="#d7d7d7" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Eliminar"
          className="cursor-pointer bg-transparent border-0 flex items-center justify-center"
          style={{ width: 24, height: 24, padding: 0 }}
        >
          <Trash2 size={20} color="#d7d7d7" />
        </button>
      </div>
    </div>
  );
}

function DesktopSlide({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const DesktopScreen =
    tab === "transacciones" ? SlideTransacciones
    : tab === "anadir" ? SlideAnadir
    : tab === "reportes" ? SlideReportes
    : SlideInicio;
  const tabPositions: { id: Tab; left: number }[] = [
    { id: "inicio", left: 1253.36 },
    { id: "transacciones", left: 1373.18 },
    { id: "anadir", left: 1493.0 },
    { id: "reportes", left: 1612.82 },
  ];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = wrapperRef.current?.clientWidth ?? window.innerWidth;
      setScale(w / 1920);
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="hidden lg:block relative overflow-hidden w-full"
      style={{ height: `${scale * 1080}px` }}
    >
      <div
        className="desktop-frame absolute top-0 left-0"
        style={{ transform: `scale(${scale})` }}
      >
        <DesktopScreen />
        {tabPositions.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-label={t.id}
            className="absolute cursor-pointer bg-transparent border-0 z-50"
            style={{ left: t.left, top: 47, width: 81.692, height: 95 }}
          />
        ))}
      </div>
    </div>
  );
}
