import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardScreen } from './screens/DashboardScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 1, refetchOnWindowFocus: false }
    }
});
function AppContent() {
    const [route, setRoute] = useState('/');
    // ── Global Role State ────────────────────────────────────────────────
    const [role, setRole] = useState('editor');
    const handleRoleToggle = () => setRole(r => r === 'editor' ? 'viewer' : 'editor');
    // Route map
    const screens = {
        '/': _jsx(DashboardScreen, {}),
        // Pass the role down so the screen knows whether to show Editor controls
        '/transactions': _jsx(TransactionsScreen, { role: role }),
        '/insights': _jsx(InsightsScreen, {}),
        '/settings': _jsx(SettingsScreen, {}),
    };
    return (_jsxs("div", { className: "flex h-screen bg-[#1e1e1e] p-3 gap-4 overflow-hidden box-border font-sans", children: [_jsx(Sidebar, { active: route, onNavigate: r => setRoute(r), role: role, onRoleToggle: handleRoleToggle }), _jsx("main", { className: "flex-1 h-full overflow-y-auto overflow-x-hidden min-w-0 pr-2 custom-scrollbar", children: screens[route] })] }));
}
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(AppContent, {}) }));
}
