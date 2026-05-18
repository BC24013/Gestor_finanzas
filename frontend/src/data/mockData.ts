import type { Goal } from "../app/components/AddGoalModal";
import type { Transaction } from "../app/components/TransactionModal";const makeDateOffset = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().slice(0, 10);
};

export const demoTransactions: Transaction[] = [
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

export const demoGoals: Goal[] = [
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