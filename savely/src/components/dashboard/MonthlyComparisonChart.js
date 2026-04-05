import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowBtn } from '../ui/primitives';
export function MonthlyComparisonChart({ data }) {
    return (_jsxs("div", { style: {
            background: '#1a1a1a', borderRadius: 16, padding: 20,
            display: 'flex', flexDirection: 'column', gap: 12,
            height: '100%', boxSizing: 'border-box',
        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }, children: [_jsx("span", { style: { color: 'white', fontWeight: 500, fontSize: 15 }, children: "Monthly Comparison" }), _jsx(ArrowBtn, {})] }), _jsx("div", { style: { flex: 1, minHeight: 180 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: data, barCategoryGap: "35%", barGap: 4, margin: { top: 4, right: 4, left: -16, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#2a2a2a", vertical: false }), _jsx(XAxis, { dataKey: "month", tick: { fill: '#888', fontSize: 12 }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fill: '#888', fontSize: 10 }, axisLine: false, tickLine: false, tickFormatter: v => `${(v / 1000).toFixed(0)}k` }), _jsx(Tooltip, { contentStyle: { background: '#2a2a2a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }, formatter: (value) => typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : '' }), _jsx(Bar, { dataKey: "income", name: "Income", fill: "#3B82F6", radius: [4, 4, 0, 0] }), _jsx(Bar, { dataKey: "expenses", name: "Expenses", fill: "#d1d5db", radius: [4, 4, 0, 0] })] }) }) })] }));
}
