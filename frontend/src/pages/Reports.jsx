import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { cn } from "../lib/utils";
import { GlassCard } from "../components/ui/GlassCard";
import { useFinance } from "../context/FinanceContext";

// Complementary primary themed colors for our charts
const PALETTE = ["#0052ff", "#2a72ff", "#548eff", "#7faaff", "#a9c6ff", "#05b169", "#cf202f", "#ea580c"];

export default function Reports() {
  const { transactions } = useFinance();
  const [period, setPeriod] = useState("mensual");

  // Determine period threshold & filter
  const getFilteredTransactions = () => {
    const now = new Date();
    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      if (isNaN(txDate.getTime())) return true; // fallback
      
      const diffTime = Math.abs(now.getTime() - txDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (period === "mensual") {
        return diffDays <= 30;
      } else if (period === "trimestral") {
        return diffDays <= 90;
      } else { // anual
        return diffDays <= 365;
      }
    });
  };

  const currentPeriodTransactions = getFilteredTransactions();

  // 1. KPI Calculations
  const periodIncome = currentPeriodTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const periodExpense = currentPeriodTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = periodIncome > 0 
    ? Math.max(0, Math.round(((periodIncome - periodExpense) / periodIncome) * 100))
    : 0;

  // Group by Category helper
  const getCategoryData = () => {
    const catMap = {};
    currentPeriodTransactions
      .filter((t) => t.type === "expense")
      .forEach((tx) => {
        catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
      });

    const entries = Object.entries(catMap).map(([name, value], i) => ({
      name,
      value,
      color: PALETTE[i % PALETTE.length]
    }));

    return entries.sort((a, b) => b.value - a.value);
  };

  const categoryData = getCategoryData();
  
  // Find highest expense category
  const topCategoryName = categoryData.length > 0 && periodExpense > 0 
    ? categoryData[0].name 
    : "Sin gastos";

  // Dynamic grouping for Income vs Expense bar charts
  const getCompareData = () => {
    // Group monthly or weekly
    if (period === "mensual") {
      // Group by weeks
      const result = [
        { name: "Semana 1", Ingresos: 0, Gastos: 0 },
        { name: "Semana 2", Ingresos: 0, Gastos: 0 },
        { name: "Semana 3", Ingresos: 0, Gastos: 0 },
        { name: "Semana 4", Ingresos: 0, Gastos: 0 },
      ];

      currentPeriodTransactions.forEach((tx) => {
        const d = new Date(tx.date);
        const day = d.getDate();
        const weekIdx = Math.min(3, Math.floor((day - 1) / 7));
        if (tx.type === "income") {
          result[weekIdx].Ingresos += tx.amount;
        } else {
          result[weekIdx].Gastos += tx.amount;
        }
      });

      return result;
    } else if (period === "trimestral") {
      // Group by past 3 months
      const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const monthsCollected = {};

      for (let i = 2; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const name = months[d.getMonth()];
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        monthsCollected[key] = { name, Ingresos: 0, Gastos: 0 };
      }

      currentPeriodTransactions.forEach((tx) => {
        const key = tx.date.substring(0, 7);
        if (monthsCollected[key]) {
          if (tx.type === "income") {
            monthsCollected[key].Ingresos += tx.amount;
          } else {
            monthsCollected[key].Gastos += tx.amount;
          }
        }
      });

      return Object.values(monthsCollected);
    } else {
      // Group by past 6 months to make a nice annual/mid-annual projection
      const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const monthsCollected = {};

      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const name = months[d.getMonth()];
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        monthsCollected[key] = { name, Ingresos: 0, Gastos: 0 };
      }

      currentPeriodTransactions.forEach((tx) => {
        const key = tx.date.substring(0, 7);
        if (monthsCollected[key]) {
          if (tx.type === "income") {
            monthsCollected[key].Ingresos += tx.amount;
          } else {
            monthsCollected[key].Gastos += tx.amount;
          }
        }
      });

      return Object.values(monthsCollected);
    }
  };

  const compareData = getCompareData();
  const totalCatExpenses = categoryData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12 py-6">
      {/* Header and Filter */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 min-w-0">
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-tight animate-in fade-in slide-in-from-left duration-300">Reportes Dinámicos</h2>
          <p className="text-xs sm:text-sm text-muted mt-1 animate-in fade-in slide-in-from-left duration-500 delay-100">Análisis interactivo de flujos, gastos y rendimiento de ahorros.</p>
        </div>
        
        {/* Toggle Periodo */}
        <div className="flex bg-surface-strong p-1 rounded-full border border-hairline w-fit shadow-sm">
          <button 
            onClick={() => setPeriod("mensual")} 
            className={cn("px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200", period === "mensual" ? "bg-primary text-white" : "text-body hover:text-ink")}
          >
            Este mes
          </button>
          <button 
            onClick={() => setPeriod("trimestral")} 
            className={cn("px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200", period === "trimestral" ? "bg-primary text-white" : "text-body hover:text-ink")}
          >
            Trimestre
          </button>
          <button 
            onClick={() => setPeriod("anual")} 
            className={cn("px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200", period === "anual" ? "bg-primary text-white" : "text-body hover:text-ink")}
          >
            Año completo
          </button>
        </div>
      </header>

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-5 flex items-center gap-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 rounded-full bg-surface-soft border border-hairline text-semantic-up flex items-center justify-center">
            <span className="material-icons-google text-xl text-semantic-up">north_east</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Total Ingresos</p>
            <p className="text-2xl font-semibold text-ink mt-1 font-mono">${periodIncome.toLocaleString()}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 rounded-full bg-surface-soft border border-hairline text-semantic-down flex items-center justify-center">
            <span className="material-icons-google text-xl text-semantic-down">south_west</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Total Gastos</p>
            <p className="text-2xl font-semibold text-ink mt-1 font-mono">${periodExpense.toLocaleString()}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 rounded-full bg-surface-soft border border-hairline text-primary flex items-center justify-center">
            <span className="material-icons-google text-xl text-primary">percent</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Tasa de Ahorro</p>
            <p className="text-2xl font-semibold text-ink mt-1 font-mono">{savingsRate}%</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 rounded-full bg-surface-soft border border-hairline text-[#a855f7] flex items-center justify-center">
            <span className="material-icons-google text-xl text-[#a855f7]">trending_up</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Mayor Categoría</p>
            <p className="text-lg font-semibold text-ink mt-1 line-clamp-1">{topCategoryName}</p>
          </div>
        </GlassCard>
      </div>

      {/* Visual Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expenses Comparison Chart */}
        <GlassCard className="lg:col-span-2 p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-icons-google text-primary text-xl">bar_chart</span>
            <h3 className="text-lg font-semibold text-ink">Relación Ingresos vs Gastos</h3>
          </div>
          <div className="flex-1 w-full h-[300px] -ml-6 pr-4">
            {currentPeriodTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full ml-6 space-y-2">
                <span className="material-icons-google text-4xl text-muted/40 font-light">show_chart</span>
                <p className="text-sm font-medium text-body">Sin transacciones registradas</p>
                <p className="text-xs text-muted max-w-xs">Tus ingresos y gastos aparecerán graficados aquí en tiempo real para el período seleccionado.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compareData} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dee1e6" opacity={0.6} vertical={false} />
                  <XAxis dataKey="name" stroke="#7c828a" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#7c828a" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#ffffff", 
                      borderRadius: "16px", 
                      border: "1px solid #dee1e6",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                      color: "#0a0b0d" 
                    }} 
                    itemStyle={{ color: "#0a0b0d" }}
                    cursor={{ fill: "rgba(0, 82, 255, 0.02)", radius: 8 }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Bar dataKey="Ingresos" fill="#05b169" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="Gastos" fill="#cf202f" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </GlassCard>

        {/* Expenses Category Pie Chart */}
        <GlassCard className="p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-icons-google text-primary text-xl">pie_chart</span>
            <h3 className="text-lg font-semibold text-ink">Distribución de Gastos</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            {categoryData.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                <span className="material-icons-google text-4xl text-muted/40 font-light">donut_large</span>
                <p className="text-sm font-medium text-body">Sin datos de gastos</p>
                <p className="text-xs text-muted max-w-[200px]">Registra transacciones de tipo gasto para ver la distribución por categoría.</p>
              </div>
            ) : (
              <>
                <div className="relative w-full h-[220px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#ffffff", 
                          borderRadius: "16px", 
                          border: "1px solid #dee1e6" 
                        }} 
                      />
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute text-center mt-1">
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">Total</p>
                    <p className="text-2xl font-semibold text-ink font-mono">${totalCatExpenses.toLocaleString()}</p>
                  </div>
                </div>

                {/* Micro-legends list */}
                <div className="grid grid-cols-2 gap-3 w-full mt-4 border-t border-hairline pt-4">
                  {categoryData.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-xs text-body font-medium truncate">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Category Breakdown Table */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-ink mb-6">Desglose Detallado de Gastos</h3>
        {categoryData.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-2">
            <span className="material-icons-google text-4xl text-muted/40 font-light">list_alt</span>
            <p className="text-sm font-medium text-body">No hay gastos registrados en este período</p>
          </div>
        ) : (
          <div className="space-y-5">
            {categoryData.map((cat, i) => {
              const pct = (cat.value / Math.max(1, totalCatExpenses)) * 100;
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-ink font-semibold">{cat.name}</span>
                    </div>
                    <span className="text-ink font-semibold font-mono">
                      ${cat.value.toLocaleString()} <span className="text-xs text-muted font-normal">({Math.round(pct)}%)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-strong rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ 
                        width: `${pct}%`, 
                        backgroundColor: cat.color
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
