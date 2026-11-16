import React, { useState } from 'react';
import { 
  ExternalLink,
  ChefHat,
  UtensilsCrossed,
  Flame,
  Volume2,
  Bell
} from 'lucide-react';

interface MockupProps {
  title?: string;
  subtitle?: string;
}

export const InteractiveDashboardMockup: React.FC<MockupProps> = ({
  title = 'OrderEase Smart-Kiosk & Kitchen KDS Live Simulator',
  subtitle = 'Interactive Table-Side Touch Terminal & Kitchen Line Sync'
}) => {
  const [activeTab, setActiveTab] = useState<'kiosk' | 'kitchen' | 'manager'>('kiosk');
  const [selectedSpice, setSelectedSpice] = useState<'Mild' | 'Medium' | 'Hot' | 'Extra Hot'>('Medium');
  const [ticketStatus, setTicketStatus] = useState<'New' | 'Chef Preparing' | 'Ready to Serve'>('Chef Preparing');
  const [activeLang, setActiveLang] = useState<'English' | 'தமிழ்' | 'हिंदी'>('English');
  const [callWaiterSent, setCallWaiterSent] = useState(false);

  const handleCallWaiter = () => {
    setCallWaiterSent(true);
    setTimeout(() => setCallWaiterSent(false), 3000);
  };

  return (
    <div className="relative rounded-2xl bg-[#090d16] border border-blue-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.15)] overflow-hidden transition-all duration-300">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0c101a] border-b border-white/[0.08] gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-xs font-mono text-slate-400 pl-2 border-l border-white/10 hidden sm:inline">
            nexora://smart-kiosk-runtime/table-03
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-xs font-medium">
          <button
            onClick={() => setActiveTab('kiosk')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'kiosk'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Table Kiosk</span>
          </button>
          <button
            onClick={() => setActiveTab('kitchen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'kitchen'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Kitchen KDS</span>
          </button>
          <button
            onClick={() => setActiveTab('manager')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'manager'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Live Floor</span>
          </button>
        </div>

        {/* Live Cloud Link */}
        <a
          href="https://maniselmagi.github.io/smart-kiosk-demo/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Open Full 24/7 Demo</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Terminal Body */}
      <div className="p-6 space-y-6">
        {/* Header Information */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{title}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Table 03
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          </div>

          {/* Multilingual Switcher */}
          <div className="flex items-center gap-1.5 text-xs bg-white/[0.03] p-1.5 rounded-lg border border-white/[0.08]">
            <span className="text-slate-400 text-[11px] px-1">Language:</span>
            {(['English', 'தமிழ்', 'हिंदी'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activeLang === lang
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Table Kiosk Ordering Experience */}
        {activeTab === 'kiosk' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Featured Dish Card */}
              <div className="md:col-span-7 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src="./assets/smart_kiosk/restaurant_food_welcome.jpg"
                  alt="Royal Paneer Tikka Platter"
                  className="w-full sm:w-36 h-28 object-cover rounded-lg border border-white/10 shrink-0"
                />
                <div className="space-y-2 flex-grow text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Veg 🌱 • Bestseller
                    </span>
                    <span className="text-xs font-mono text-slate-300">12 mins prep</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Royal Paneer Tikka + Mint Chutney</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Char-grilled cottage cheese cubes marinated in aromatic spices.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-bold font-mono text-blue-400">₹265</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Pair with Cold Coffee Frappé (+₹63)</span>
                  </div>
                </div>
              </div>

              {/* Spice Customization Matrix */}
              <div className="md:col-span-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Custom Spice Level:</span>
                  </span>
                  <span className="text-amber-400 font-bold">{selectedSpice}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {(['Mild', 'Medium', 'Hot', 'Extra Hot'] as const).map((spice) => (
                    <button
                      key={spice}
                      onClick={() => setSelectedSpice(spice)}
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        selectedSpice === spice
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                          : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white'
                      }`}
                    >
                      {spice}
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/[0.06]">
                  <button
                    onClick={handleCallWaiter}
                    className="flex-1 py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-slate-300 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>{callWaiterSent ? 'Calling Staff...' : 'Call Waiter'}</span>
                  </button>

                  <button
                    onClick={() => setTicketStatus(ticketStatus === 'New' ? 'Chef Preparing' : ticketStatus === 'Chef Preparing' ? 'Ready to Serve' : 'New')}
                    className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-bold transition-all shadow-md shadow-blue-600/30"
                  >
                    Order Placed (#1028)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Order Tracker Banner */}
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="text-slate-300">Live Status Tracker:</span>
                <span className="font-bold text-white font-mono bg-blue-600/30 px-2 py-0.5 rounded border border-blue-500/40">
                  {ticketStatus}
                </span>
              </div>
              <span className="text-slate-400 text-[11px]">
                BroadcastChannel sync active (Table &rarr; Kitchen &rarr; Staff)
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Kitchen KDS Display */}
        {activeTab === 'kitchen' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-slate-300">Active Kitchen Station 01 (Hot Line)</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                Audio Signals Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Ticket 1 */}
              <div className="p-3.5 rounded-xl bg-[#0e1424] border border-blue-500/40 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="font-mono font-bold text-white text-xs">#1028 • Table 03</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    3m 12s
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-white">1x Royal Paneer Tikka</div>
                  <div className="text-[11px] text-amber-300">Customization: {selectedSpice} Spice, Extra Mint</div>
                  <div className="font-semibold text-white">1x Cold Coffee Frappé</div>
                </div>
                <button
                  onClick={() => setTicketStatus(ticketStatus === 'Chef Preparing' ? 'Ready to Serve' : 'Chef Preparing')}
                  className="w-full mt-2 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold text-white transition-colors"
                >
                  {ticketStatus === 'Ready to Serve' ? 'Completed & Plated ✓' : 'Mark Ready to Serve'}
                </button>
              </div>

              {/* Ticket 2 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="font-mono font-bold text-white text-xs">#1027 • Table 07</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Ready
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-white">2x Tandoori Naan</div>
                  <div className="font-semibold text-white">1x Dal Makhani</div>
                  <div className="text-[11px] text-slate-400">Diner split bill: 2 Guests</div>
                </div>
                <div className="w-full text-center py-1 text-[11px] text-emerald-400 bg-emerald-500/10 rounded-lg">
                  Delivered to Table
                </div>
              </div>

              {/* Ticket 3 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="font-mono font-bold text-white text-xs">#1029 • Table 02</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                    New Ticket
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-white">1x Veg Biryani</div>
                  <div className="text-[11px] text-slate-400">Spice: Mild • No onion garnish</div>
                </div>
                <button className="w-full mt-2 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-[11px] font-bold text-white transition-colors">
                  Start Preparing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Live Floor & Telemetry */}
        {activeTab === 'manager' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-slate-400 text-[11px]">Table Turnaround</div>
                <div className="text-base font-bold font-mono text-white mt-0.5">34 Mins</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-slate-400 text-[11px]">Menu Gross Margin</div>
                <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">48.2% Avg</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-slate-400 text-[11px]">Diner Reviews</div>
                <div className="text-base font-bold font-mono text-amber-400 mt-0.5">4.9 / 5.0 ★</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-slate-400 text-[11px]">Active Kiosks</div>
                <div className="text-base font-bold font-mono text-cyan-400 mt-0.5">8 Online</div>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="space-y-1.5 bg-black/40 p-3 rounded-xl border border-white/[0.06] font-mono text-xs">
              <div className="text-[11px] text-slate-400 pb-1 border-b border-white/[0.06]">
                Live Kiosk Event Bus Feed:
              </div>
              <div className="text-slate-300 flex items-center justify-between text-[11px]">
                <span>14:22:10 — Table 03 order #1028 broadcast to Kitchen KDS</span>
                <span className="text-emerald-400 font-bold">ACK 200</span>
              </div>
              <div className="text-slate-300 flex items-center justify-between text-[11px]">
                <span>14:22:15 — Chef marked ticket #1028 as "Chef Preparing"</span>
                <span className="text-blue-400 font-bold">STATE_SYNC</span>
              </div>
              <div className="text-slate-300 flex items-center justify-between text-[11px]">
                <span>14:23:01 — Table 07 split bill settled via demo UPI</span>
                <span className="text-emerald-400 font-bold">SUCCESS</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
