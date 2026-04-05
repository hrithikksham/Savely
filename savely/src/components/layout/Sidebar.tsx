import { Home, Menu, BarChart2, Settings, Eye, LogOut } from 'lucide-react';

const NAV = [
  { icon: Home,      label: 'Dashboard',    route: '/' },
  { icon: Menu,      label: 'Transactions', route: '/transactions' },
  { icon: BarChart2, label: 'Insights',     route: '/insights' },
  { icon: Settings,  label: 'Settings',     route: '/settings' },
];

export function Sidebar({ active, onNavigate }: { active: string; onNavigate: (r: string) => void }) {
  return (
    <aside style={{
      width: 80, background: '#e0e0e0', borderRadius: 100,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '24px 0 20px', gap: 12, flexShrink: 0,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Logo / Avatar */}
      <div style={{ 
        width: 48, height: 48, borderRadius: '50%', 
        background: 'linear-gradient(135deg, #444, #888)', 
        marginBottom: 8 
      }} />
      <span style={{ fontSize: 13, fontWeight: 600, color: '#333', letterSpacing: 0.5, marginBottom: 4 }}>Savely</span>
      <div style={{ width: 40, height: 1, background: '#ccc', margin: '4px 0 12px' }} />

      {/* Nav icons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {NAV.map(({ icon: Icon, label, route }) => (
          <button
            key={route} title={label}
            onClick={() => onNavigate(route)}
            style={{
              width: 48, height: 48, borderRadius: 16, border: 'none', cursor: 'pointer',
              background: active === route ? 'white' : 'transparent',
              color: active === route ? '#222' : '#777',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: active === route ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (active !== route) (e.currentTarget as HTMLElement).style.color = '#333'; }}
            onMouseLeave={e => { if (active !== route) (e.currentTarget as HTMLElement).style.color = '#777'; }}
          >
            <Icon size={22} strokeWidth={active === route ? 2.5 : 2} />
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Bottom buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <button style={{
          width: 48, height: 48, borderRadius: 24, background: '#999', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Eye size={20} color="white" />
        </button>
        
        <button
          style={{ 
            width: 48, height: 48, borderRadius: 16, border: 'none', 
            background: 'transparent', cursor: 'pointer', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' 
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#000'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#555'; }}
        >
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
}