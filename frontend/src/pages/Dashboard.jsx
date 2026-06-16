import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { cn, formatDate } from "../lib/utils";
import { useFinance } from "../context/FinanceContext";

export default function Dashboard() {
  const { transactions, goals, currentUser } = useFinance();
  const [timeframe, setTimeframe] = useState("semanal");

  const name = currentUser ? currentUser.name : "Esteban Perez";

  // Calculations (real-time up-to-date values)
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Monthly values for KPIs based on current local month (avoids timezone offsets)
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthVal = String(now.getMonth() + 1).padStart(2, "0");
  const currentMonth = `${currentYear}-${currentMonthVal}`;

  const monthlyIncome = transactions
    .filter((t) => t.type === "income" && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  // Recent transactions sorted by date descending to ensure real-time accuracy
  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const getWeeklyData = () => {
    const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = days[d.getDay()];
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      // Calculate cumulative balance up to and including this local date
      const txsUpToDay = transactions.filter((t) => t.date <= dateStr);
      const totalIncomeUpToDay = txsUpToDay
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpenseUpToDay = txsUpToDay
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      const balanceUpToDay = totalIncomeUpToDay - totalExpenseUpToDay;

      result.push({ name: dayName, value: Number(balanceUpToDay.toFixed(2)) });
    }
    return result;
  };

  const getMonthlyData = () => {
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const result = [];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = months[d.getMonth()];
      
      const year = d.getFullYear();
      const monthVal = String(d.getMonth() + 1).padStart(2, "0");
      const monthKey = `${year}-${monthVal}`;

      // Cumulative balance up to the end of this month
      const txsUpToMonth = transactions.filter((t) => t.date.substring(0, 7) <= monthKey);
      const totalIncomeUpToMonth = txsUpToMonth
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpenseUpToMonth = txsUpToMonth
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      const balanceUpToMonth = totalIncomeUpToMonth - totalExpenseUpToMonth;

      result.push({ name: monthName, value: Number(balanceUpToMonth.toFixed(2)) });
    }
    return result;
  };

  const chartData = timeframe === "semanal" ? getWeeklyData() : getMonthlyData();

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out py-6">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-tight animate-in fade-in slide-in-from-left duration-300">Dashboard Inteligente</h1>
          <p className="text-xs sm:text-sm text-muted mt-1 animate-in fade-in slide-in-from-left duration-500 delay-100">Bienvenido de nuevo, {name}. Tu resumen en tiempo real.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <GlassCard className="hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted uppercase tracking-wider">Balance Total</p>
            <p className="text-3xl font-medium text-ink font-mono tracking-tight">
              {totalBalance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
          </div>
          <div className="mt-4 flex items-center text-semantic-up text-xs font-semibold gap-1">
            <span className="material-icons-google text-base">arrow_outward</span>
            <span>Historial Activo</span>
          </div>
        </GlassCard>

        {/* Ingresos Card */}
        <GlassCard className="hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted uppercase tracking-wider">Ingresos Mensuales</p>
            <p className="text-3xl font-medium text-ink font-mono tracking-tight">
              {monthlyIncome.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
          </div>
          <div className="mt-4 flex items-center text-primary text-xs font-semibold">
            {formatDate(new Date())} • Ritmo de ingresos
          </div>
        </GlassCard>

        {/* Gastos Card */}
        <GlassCard className="hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted uppercase tracking-wider">Gastos Mensuales</p>
            <p className="text-3xl font-medium text-ink font-mono tracking-tight">
              {monthlyExpense.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
          </div>
          <div className="mt-4 flex items-center text-semantic-down text-xs font-semibold gap-1">
            <span className="material-icons-google text-base">south_east</span>
            <span>Flujos de saldos</span>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Flujo de Caja */}
        <GlassCard className="col-span-1 lg:col-span-2 min-h-[350px] flex flex-col pt-6 px-6">
          <div className="flex justify-between items-center mb-6">
             <h4 className="text-lg font-semibold text-ink">Flujo de Efectivo</h4>
             <div className="flex bg-surface-strong p-1 rounded-full">
               <button 
                 onClick={() => setTimeframe("semanal")}
                 className={cn(
                   "px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200",
                   timeframe === "semanal" 
                     ? "bg-primary text-white shadow-sm" 
                     : "text-muted hover:text-ink"
                 )}
               >
                 Semanal
               </button>
               <button 
                 onClick={() => setTimeframe("mensual")}
                 className={cn(
                   "px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200",
                   timeframe === "mensual" 
                     ? "bg-primary text-white shadow-sm" 
                     : "text-muted hover:text-ink"
                 )}
               >
                 Mensual
               </button>
             </div>
          </div>
          <div className="flex-1 w-full h-[250px] -ml-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052ff" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0052ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dee1e6" opacity={0.6} />
                <XAxis dataKey="name" stroke="#7c828a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7c828a" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid #dee1e6', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)', 
                    backgroundColor: '#ffffff', 
                    color: '#0a0b0d' 
                  }}
                  itemStyle={{color: '#0a0b0d'}}
                  cursor={{ stroke: '#dee1e6', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area name="Valor" type="monotone" dataKey="value" stroke="#0052ff" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Transacciones Recientes */}
        <GlassCard className="p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-start mb-6 gap-4">
            <div>
              <h4 className="text-lg font-semibold text-ink">Transacciones</h4>
              <p className="text-xs text-muted mt-0.5">Últimos movimientos registrados.</p>
            </div>
            <Link to="/transactions" className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">Ver todas</Link>
          </div>
          <div className="flex flex-col divide-y divide-hairline flex-1">
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                <p className="text-xs text-muted">No hay transacciones registradas</p>
              </div>
            ) : (
              recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center transition-colors bg-surface-soft", tx.type === 'income' ? "text-semantic-up" : "text-semantic-down")}>
                      {tx.type === 'income' ? (
                        <span className="material-icons-google text-base">arrow_outward</span>
                      ) : (
                        <span className="material-icons-google text-base">south_east</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-ink text-xs truncate">{tx.description}</p>
                      <p className="text-[10px] text-muted truncate">{formatDate(tx.date)}</p>
                    </div>
                  </div>
                  <span className={cn("font-semibold font-mono text-xs ml-2 flex-shrink-0", tx.type === 'income' ? "text-semantic-up" : "text-semantic-down")}>
                    {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      {/* Metas Financieras */}
      <GlassCard className="p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <h4 className="text-lg font-semibold text-ink">Metas Financieras</h4>
            <p className="text-xs text-muted mt-0.5">Progreso y cumplimiento de tus objetivos de ahorro.</p>
          </div>
          <Link to="/goals" className="text-sm font-semibold text-primary hover:underline whitespace-nowrap">Gestionar Metas</Link>
        </div>
        
        {goals.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-body">No tienes metas de ahorro registradas todavía.</p>
            <Link to="/goals" className="text-xs text-primary font-bold hover:underline mt-1 block">Crear mi primera meta</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {goals.slice(0, 4).map((goal) => {
              const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
              return (
                <div key={goal.id} className="bg-surface-soft/40 border border-hairline p-5 rounded-2xl flex flex-col justify-between hover:bg-surface-soft/70 transition-all duration-300">
                  <div>
                    <span className="text-4xl font-medium tracking-tighter text-primary font-mono">{pct}%</span>
                    <h5 className="text-sm font-semibold text-ink mt-2 truncate">{goal.name}</h5>
                  </div>
                  <div className="mt-4">
                    <div className="h-1.5 w-full bg-surface-strong rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                    </div>
                    <p className="text-[10px] text-muted font-mono mt-1.5">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
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
