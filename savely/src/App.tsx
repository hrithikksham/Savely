import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardScreen }    from './screens/DashboardScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { InsightsScreen }     from './screens/InsightsScreen';
import { SettingsScreen }     from './screens/SettingsScreen';
import type { UserRole }      from './components/layout/Sidebar'; 

const queryClient = new QueryClient({ 
  defaultOptions: { 
    queries: { retry: 1, refetchOnWindowFocus: false } 
  } 
});

type Route = '/' | '/transactions' | '/insights'| '/settings';

function AppContent() {
  const [route, setRoute] = useState<Route>('/');
  
  // ── Global Role State ────────────────────────────────────────────────
  const [role, setRole] = useState<UserRole>('editor');
  const handleRoleToggle = () => setRole(r => r === 'editor' ? 'viewer' : 'editor');

  // Route map
  const screens: Record<Route, React.ReactElement> = {
    '/':             <DashboardScreen />,
    // Pass the role down so the screen knows whether to show Editor controls
    '/transactions': <TransactionsScreen role={role} />, 
    '/insights':     <InsightsScreen />,
    '/settings':     <SettingsScreen />,
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] p-3 gap-4 overflow-hidden box-border font-sans">
      
      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <Sidebar 
        active={route} 
        onNavigate={r => setRoute(r as Route)} 
        role={role}
        onRoleToggle={handleRoleToggle}
      />
      
      {/* ── Main Content Area ─────────────────────────────────────────── */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden min-w-0 pr-2 custom-scrollbar">
        {screens[route]}
      </main>
      
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}