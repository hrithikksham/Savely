import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowBtn } from '../ui/primitives';
export function BalanceTrendChart({ data }) {
    return (_jsxs("div", { style: {
            background: '#1a1a1a', borderRadius: 16, padding: 20,
            display: 'flex', flexDirection: 'column', gap: 12,
            height: '100%', boxSizing: 'border-box',
        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }, children: [_jsx("span", { style: { color: 'white', fontWeight: 500, fontSize: 15 }, children: "Balance Trend" }), _jsx(ArrowBtn, { blue: true })] }), _jsx("div", { style: { flex: 1, minHeight: 0 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: data, margin: { top: 8, right: 8, left: 0, bottom: 0 }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "blueGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#3B82F6", stopOpacity: 0.6 }), _jsx("stop", { offset: "100%", stopColor: "#3B82F6", stopOpacity: 0.02 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#2a2a2a", vertical: false }), _jsx(XAxis, { dataKey: "date", tick: { fill: '#666', fontSize: 10 }, axisLine: false, tickLine: false, interval: "preserveStartEnd" }), _jsx(YAxis, { tick: { fill: '#666', fontSize: 10 }, axisLine: false, tickLine: false, tickFormatter: v => `$${(v / 1000).toFixed(0)}k`, width: 46 }), _jsx(Tooltip, { contentStyle: { background: '#2a2a2a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }, formatter: (v) => {
                                    const amount = typeof v === 'number' ? v : 0;
                                    return [`₹${amount.toLocaleString('en-IN')}`, 'Balance'];
                                } }), _jsx(Area, { type: "monotone", dataKey: "balance", stroke: "#3B82F6", strokeWidth: 2.5, fill: "url(#blueGrad)", dot: false })] }) }) })] }));
}
