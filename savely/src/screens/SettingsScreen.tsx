import { useState } from 'react';
import { User, Palette, Shield, Sparkles, Download, Trash2, Bell, Check } from 'lucide-react';
import { Header } from '../components/layout/Header';

type SettingsTab = 'profile' | 'appearance' | 'data';

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activeAccent, setActiveAccent] = useState('#3b82f6'); // Default Blue

  const accents = [
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Violet', color: '#8b5cf6' },
    { name: 'Rose', color: '#f43f5e' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full font-sans pb-6 overflow-y-auto pr-2 custom-scrollbar">
      <Header showSearch={false} />

      <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-[32px] font-semibold tracking-tight m-0">
          Settings
        </h1>
      </div>

      <div className="flex gap-8 items-start flex-1 mt-2">
        
        {/* ── Settings Sidebar ────────────────────────────────────────── */}
        <div className="w-[240px] shrink-0 flex flex-col gap-2">
          <TabButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            icon={User} label="Profile & Preferences" 
          />
          <TabButton 
            active={activeTab === 'appearance'} 
            onClick={() => setActiveTab('appearance')} 
            icon={Palette} label="Appearance" 
          />
          <TabButton 
            active={activeTab === 'data'} 
            onClick={() => setActiveTab('data')} 
            icon={Shield} label="Data & Privacy" 
          />
        </div>

        {/* ── Settings Content Area ───────────────────────────────────── */}
        <div className="flex-1 bg-white rounded-[24px] p-8 shadow-sm min-h-[600px]">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-[20px] font-semibold text-gray-900 mb-1">Account Details</h2>
                <p className="text-[14px] text-gray-500">Manage your personal information and app preferences.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#444] to-[#888] shadow-inner" />
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex gap-4">
                    <input type="text" defaultValue="Hrithiksham" className="flex-1 bg-[#f4f4f4] border-none rounded-[12px] px-4 py-3 text-[14px] text-gray-900 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                    <input type="email" defaultValue="hrithik@example.com" className="flex-1 bg-[#f4f4f4] border-none rounded-[12px] px-4 py-3 text-[14px] text-gray-900 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                  </div>
                  <button className="self-start text-[13px] font-semibold text-blue-600 hover:text-blue-700">Change Avatar</button>
                </div>
              </div>

              {/* AI Features Toggle (Impressive to recruiters) */}
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" /> Smart Features
                </h3>
                <div className="flex items-center justify-between p-4 rounded-[16px] border border-gray-100 bg-gray-50/50">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-gray-900">AI Auto-Categorization</span>
                    <span className="text-[13px] text-gray-500">Automatically assign categories to new transactions based on merchant name.</span>
                  </div>
                  
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => setAiEnabled(!aiEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${aiEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${aiEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-[20px] font-semibold text-gray-900 mb-1">Theme & Accents</h2>
                <p className="text-[14px] text-gray-500">Customize how Savely looks on your device.</p>
              </div>

              <div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Accent Color</h3>
                <div className="flex items-center gap-4">
                  {accents.map((accent) => (
                    <button
                      key={accent.name}
                      onClick={() => setActiveAccent(accent.color)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeAccent === accent.color ? 'ring-4 ring-offset-2 scale-110' : 'hover:scale-105'}`}
                      style={{ backgroundColor: accent.color, '--tw-ring-color': accent.color } as React.CSSProperties}
                      title={accent.name}
                    >
                      {activeAccent === accent.color && <Check size={20} color="white" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-[20px] font-semibold text-gray-900 mb-1">Data Management</h2>
                <p className="text-[14px] text-gray-500">Control your financial data and privacy settings.</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-5 rounded-[16px] border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-gray-900">Export Financial Data</span>
                    <span className="text-[13px] text-gray-500">Download all your transactions as a CSV file.</span>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#f4f4f4] text-gray-700 text-[13px] font-semibold hover:bg-[#e6e6e6] transition-colors">
                    <Download size={16} /> Export CSV
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="mt-8">
                  <h3 className="text-[12px] font-bold text-rose-500 uppercase tracking-widest mb-4">Danger Zone</h3>
                  <div className="flex items-center justify-between p-5 rounded-[16px] border border-rose-100 bg-rose-50/30">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-gray-900">Delete Account</span>
                      <span className="text-[13px] text-gray-500">Permanently delete your account and all financial data.</span>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-rose-500 text-white text-[13px] font-semibold hover:bg-rose-600 transition-colors shadow-sm">
                      <Trash2 size={16} /> Delete Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ── Reusable Tab Button ──────────────────────────────────────────────
function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-4 py-3.5 rounded-[16px] text-[14px] font-medium transition-all duration-200 border-none outline-none cursor-pointer
        ${active ? 'bg-white text-gray-900 shadow-sm' : 'bg-transparent text-gray-400 hover:text-gray-300 hover:bg-[#2a2a2a]'}
      `}
    >
      <Icon size={18} className={active ? 'text-blue-600' : 'text-gray-500'} />
      {label}
    </button>
  );
}