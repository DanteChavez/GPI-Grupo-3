"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PlayerStatsClient({ playerInfo, summary, highestValue, appearances }: { playerInfo: any, summary: any, highestValue: string, appearances: any[] }) {
  const [activeTab, setActiveTab] = useState<'appearances' | 'goals' | 'assists'>('appearances');
  const [visibleCount, setVisibleCount] = useState(15);

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleCount(15);
  }, [activeTab]);

  // Filter appearances based on active tab
  const filteredAppearances = appearances.filter(a => {
    if (activeTab === 'goals') return a.goals > 0;
    if (activeTab === 'assists') return a.assists > 0;
    return true; // appearances tab shows all
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 150;
    if (bottom && visibleCount < filteredAppearances.length) {
      setVisibleCount(prev => prev + 15);
    }
  };

  return (
    <div className="w-full">
      {/* Global Summary Tabs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setActiveTab('appearances')}
          className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 ${activeTab === 'appearances' ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'glass hover:bg-white/10'} border`}
        >
          <span className={`text-4xl font-black mb-1 ${activeTab === 'appearances' ? 'text-emerald-400' : 'text-emerald-500'}`}>
            {summary.appearances}
          </span>
          <span className="text-xs text-emerald-100/60 font-semibold uppercase tracking-widest">Partidos</span>
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 ${activeTab === 'goals' ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'glass hover:bg-white/10'} border`}
        >
          <span className={`text-4xl font-black mb-1 ${activeTab === 'goals' ? 'text-emerald-400' : 'text-emerald-500'}`}>
            {summary.goals}
          </span>
          <span className="text-xs text-emerald-100/60 font-semibold uppercase tracking-widest">Goles</span>
        </button>

        <button
          onClick={() => setActiveTab('assists')}
          className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 ${activeTab === 'assists' ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'glass hover:bg-white/10'} border`}
        >
          <span className={`text-4xl font-black mb-1 ${activeTab === 'assists' ? 'text-emerald-400' : 'text-emerald-500'}`}>
            {summary.assists}
          </span>
          <span className="text-xs text-emerald-100/60 font-semibold uppercase tracking-widest">Asistencias</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Additional Stats Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card rounded-3xl p-8">
            <div className="text-center mb-6">
              <span className="text-4xl font-black text-indigo-400">{new Intl.NumberFormat('es-ES').format(summary.minutesPlayed)}</span>
              <p className="text-[10px] text-emerald-200/50 mt-1 uppercase tracking-wider font-semibold">Minutos Jugados</p>
            </div>
            <div className="space-y-4 pt-6 border-t border-emerald-500/10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">🟨 T. Amarillas</span>
                <span className="font-bold text-yellow-500">{summary.yellowCards}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">🟥 T. Rojas</span>
                <span className="font-bold text-red-500">{summary.redCards}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">💰 Valor Max</span>
                <span className="font-bold text-emerald-500">{highestValue}</span>
              </div>
              {playerInfo.agent && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">🤝 Agente</span>
                  <span className="font-medium text-emerald-100/70 text-right truncate ml-2 max-w-[120px]">{playerInfo.agent}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Detail Area */}
        <div className="lg:col-span-3">
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">
                {activeTab === 'appearances' && '📅'}
                {activeTab === 'goals' && '⚽'}
                {activeTab === 'assists' && '👟'}
              </span>
              {activeTab === 'appearances' && 'Historial de Partidos'}
              {activeTab === 'goals' && 'Partidos con Goles'}
              {activeTab === 'assists' && 'Partidos con Asistencias'}
            </h2>

            {filteredAppearances.length > 0 ? (
              <div className="flex flex-col w-full">
                <div className="w-full glass-card rounded-3xl overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-6 gap-4 border-b border-emerald-500/10 bg-white/5 py-4 px-6 text-xs uppercase tracking-widest text-emerald-100/60 font-semibold sticky top-0 z-10">
                    <div className="col-span-2">Partido / Competición</div>
                    <div className="text-center">Minutos</div>
                    <div className="text-center">Goles</div>
                    <div className="text-center">Asist.</div>
                    <div className="text-center hidden sm:block">Tarjetas</div>
                  </div>
                  {/* Body - Scrollable */}
                  <div className="divide-y divide-emerald-500/5 max-h-[600px] overflow-y-auto custom-scrollbar" onScroll={handleScroll}>
                    {filteredAppearances.slice(0, visibleCount).map((a: any, i: number) => (
                      <Link key={i} href={`/matches/${a.gameId}`} className="block group">
                        <div className="grid grid-cols-6 gap-4 items-center py-4 px-6 hover:bg-emerald-500/10 hover:shadow-[inset_0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300">
                          <div className="col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
                            <span className="text-sm font-medium text-zinc-100 group-hover:text-emerald-400 transition-colors">{a.date}</span>
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 w-fit">{a.competition}</span>
                          </div>
                          <div className="text-center text-sm font-medium text-emerald-100/70">{a.minutesPlayed}&apos;</div>
                          <div className="text-center text-sm font-black text-emerald-400">{a.goals > 0 ? a.goals : <span className="text-emerald-500/30 font-medium">-</span>}</div>
                          <div className="text-center text-sm font-black text-teal-400">{a.assists > 0 ? a.assists : <span className="text-emerald-500/30 font-medium">-</span>}</div>
                          <div className="text-center text-sm hidden sm:flex justify-center gap-1.5 items-center">
                            {a.yellowCards > 0 && <span className="w-3.5 h-4.5 rounded-[3px] bg-yellow-400 inline-block shadow-sm"></span>}
                            {a.redCards > 0 && <span className="w-3.5 h-4.5 rounded-[3px] bg-red-500 inline-block shadow-sm"></span>}
                            {a.yellowCards === 0 && a.redCards === 0 && <span className="text-emerald-500/30 font-medium">-</span>}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-3xl py-16 text-center">
                <span className="text-4xl block mb-4 opacity-30">
                  {activeTab === 'appearances' && '📅'}
                  {activeTab === 'goals' && '⚽'}
                  {activeTab === 'assists' && '👟'}
                </span>
                <p className="text-emerald-100/60 font-medium text-lg">No hay partidos registrados en esta categoría.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
