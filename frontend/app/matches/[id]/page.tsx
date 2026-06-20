export const dynamic = 'force-dynamic';

import Breadcrumb from "@/components/Breadcrumb";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getMatch(id: string) {
  try {
    const res = await fetch(`${API_URL}/games/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function getEvents(id: string) {
  try {
    const res = await fetch(`${API_URL}/games/${id}/events`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

async function getLineups(id: string) {
  try {
    const res = await fetch(`${API_URL}/games/${id}/lineups`, { cache: 'no-store' });
    if (!res.ok) return { home: [], away: [] };
    return res.json();
  } catch { return { home: [], away: [] }; }
}

function getEventIcon(type: string) {
  switch (type) {
    case 'Goals': return '⚽';
    case 'Cards': return '🟨';
    case 'Substitutions': return '🔄';
    default: return '📋';
  }
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [matchData, events, lineups] = await Promise.all([
    getMatch(id),
    getEvents(id),
    getLineups(id),
  ]);

  if (!matchData) return <div className="p-20 text-center text-white">Partido no encontrado</div>;

  const matchInfo = {
    homeTeam: matchData.homeTeam || "Local",
    awayTeam: matchData.awayTeam || "Visitante",
    homeScore: matchData.homeScore ?? 0,
    awayScore: matchData.awayScore ?? 0,
    homeClubId: matchData.homeClubId,
    awayClubId: matchData.awayClubId,
    status: matchData.status || "Finalizado",
    date: matchData.date || "Fecha desconocida",
    competition: matchData.competition || "Competición",
    competitionType: matchData.competitionType,
    season: matchData.season,
    stadium: matchData.stadium || "Estadio Desconocido",
    round: matchData.round,
    referee: matchData.referee,
    aggregate: matchData.aggregate,
    attendance: matchData.attendance ? new Intl.NumberFormat('es-ES').format(matchData.attendance) : "-",
    homeManager: matchData.home_club_manager_name,
    awayManager: matchData.away_club_manager_name,
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero del partido */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float-delayed z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Partidos", href: "/matches" }, { label: `${matchInfo.homeTeam} vs ${matchInfo.awayTeam}` }]} />

          {/* Badge de competición */}
          <div className="animate-fade-in-up text-center mb-8">
            <span className="glass rounded-full px-4 py-1.5 text-sm font-semibold text-emerald-300 inline-flex items-center gap-2">
              🏆 {matchInfo.competition} {matchInfo.round && `• ${matchInfo.round}`} {matchInfo.season && `• Temporada ${matchInfo.season}`}
            </span>
            <p className="text-emerald-100/60 text-sm mt-2">{matchInfo.date} • {matchInfo.stadium}</p>
          </div>

          {/* Marcador principal */}
          <div className="animate-fade-in-up delay-200 flex justify-between items-center px-4 md:px-16">
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full glass flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl animate-scale-in delay-300">
                {matchInfo.homeTeam.charAt(0)}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white text-center">{matchInfo.homeTeam}</h2>
            </div>

            <div className="flex flex-col items-center justify-center px-6 md:px-8">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-5xl md:text-7xl font-black text-white animate-scale-in delay-400">{matchInfo.homeScore}</span>
                <span className="text-3xl md:text-4xl text-emerald-300/40">-</span>
                <span className="text-5xl md:text-7xl font-black text-white animate-scale-in delay-500">{matchInfo.awayScore}</span>
              </div>
              <span className="mt-4 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-bold backdrop-blur-sm border border-emerald-400/20">
                {matchInfo.status}
              </span>
              {matchInfo.aggregate && matchInfo.aggregate !== `${matchInfo.homeScore}:${matchInfo.awayScore}` && (
                <span className="mt-2 text-xs text-emerald-200/50">Global: {matchInfo.aggregate}</span>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full glass flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl animate-scale-in delay-300">
                {matchInfo.awayTeam.charAt(0)}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white text-center">{matchInfo.awayTeam}</h2>
            </div>
          </div>

          <div className="animate-fade-in-up delay-600 flex justify-between px-4 md:px-16 mt-8">
            <div className="flex-1 text-center text-emerald-100/50 text-xs md:text-sm">
              <span className="block text-emerald-400 font-semibold mb-1">Mánager</span>
              {matchInfo.homeManager || "Desconocido"}
            </div>
            <div className="flex-1 text-center text-emerald-100/50 text-xs md:text-sm">
              <span className="block text-emerald-400 font-semibold mb-1">Árbitro</span>
              {matchInfo.referee || "Desconocido"}
              <div className="mt-1">Asistencia: {matchInfo.attendance}</div>
            </div>
            <div className="flex-1 text-center text-emerald-100/50 text-xs md:text-sm">
              <span className="block text-emerald-400 font-semibold mb-1">Mánager</span>
              {matchInfo.awayManager || "Desconocido"}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* Eventos y Alineaciones */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timeline de eventos */}
          <div className="animate-fade-in-up delay-300 glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">⏱️</span>
              Eventos del Partido
            </h3>
            {events.length > 0 ? (
              <div className="relative">
                <div className="absolute left-[52px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/30 via-teal-500/20 to-transparent"></div>
                <div className="space-y-5">
                  {events.map((event: any, i: number) => (
                    <div key={event.id || i} className="flex gap-4 items-start animate-fade-in-left" style={{ animationDelay: `${400 + i * 50}ms` }}>
                      <span className="font-bold text-emerald-500 w-12 text-right shrink-0 text-sm pt-0.5">{event.minute}&apos;</span>
                      <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shrink-0 mt-1 shadow-md shadow-emerald-500/30 relative z-10"></div>
                      <div className="flex-1 pb-1">
                        <p className="font-semibold text-sm">{getEventIcon(event.type)} {event.type} — {event.clubName}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm text-center py-6">No hay eventos registrados para este partido.</p>
            )}
          </div>

          {/* Alineaciones */}
          <div className="animate-fade-in-up delay-400 glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">👥</span>
              Alineaciones
            </h3>
            {(lineups.home?.length > 0 || lineups.away?.length > 0) ? (
              <div className="grid grid-cols-2 gap-6">
                {/* Home lineup */}
                <div>
                  <h4 className="font-bold text-emerald-500 mb-4 text-sm uppercase tracking-wider">{matchInfo.homeTeam}</h4>
                  <div className="space-y-2">
                    {lineups.home?.map((p: any, i: number) => (
                      <div key={i} className={`flex items-center gap-2 text-sm ${p.type === 'starting_lineup' ? '' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        <span className="w-6 text-right font-mono text-xs text-emerald-500">{p.number || '-'}</span>
                        <span className={`flex-1 truncate ${p.teamCaptain ? 'font-bold' : ''}`}>
                          {p.playerName} {p.teamCaptain && '©'}
                        </span>
                        {p.type !== 'starting_lineup' && <span className="text-[10px] text-zinc-400">SUP</span>}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Away lineup */}
                <div>
                  <h4 className="font-bold text-teal-500 mb-4 text-sm uppercase tracking-wider">{matchInfo.awayTeam}</h4>
                  <div className="space-y-2">
                    {lineups.away?.map((p: any, i: number) => (
                      <div key={i} className={`flex items-center gap-2 text-sm ${p.type === 'starting_lineup' ? '' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        <span className="w-6 text-right font-mono text-xs text-teal-500">{p.number || '-'}</span>
                        <span className={`flex-1 truncate ${p.teamCaptain ? 'font-bold' : ''}`}>
                          {p.playerName} {p.teamCaptain && '©'}
                        </span>
                        {p.type !== 'starting_lineup' && <span className="text-[10px] text-zinc-400">SUP</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm text-center py-6">No hay alineaciones registradas para este partido.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
