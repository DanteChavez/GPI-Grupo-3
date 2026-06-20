export const dynamic = 'force-dynamic';

import PlayerCard from "@/components/PlayerCard";
import MatchCard from "@/components/MatchCard";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getTeam(id: string) {
  try {
    const res = await fetch(`${API_URL}/clubs/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function getTeamPlayers(id: string) {
  try {
    const res = await fetch(`${API_URL}/clubs/${id}/players`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

async function getTeamGames(id: string) {
  try {
    const res = await fetch(`${API_URL}/clubs/${id}/games?limit=5`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [teamData, players, games] = await Promise.all([
    getTeam(id),
    getTeamPlayers(id),
    getTeamGames(id),
  ]);

  if (!teamData) return <div className="p-20 text-center text-white">Equipo no encontrado</div>;

  const teamInfo = {
    name: teamData.name || "Equipo Desconocido",
    initials: teamData.name ? teamData.name.substring(0, 2).toUpperCase() : "EQ",
    league: teamData.league || "Liga Desconocida",
    stadium: teamData.stadium_name || "Estadio Desconocido",
    stadium_seats: teamData.stadium_seats
      ? new Intl.NumberFormat('es-ES').format(teamData.stadium_seats)
      : "-",
    stats: [
      { label: "Plantilla", value: teamData.squad_size || "-" },
      { label: "Edad Media", value: teamData.average_age || "-" },
      { label: "Extranjeros", value: teamData.foreigners_percentage ? `${teamData.foreigners_percentage}%` : "-" },
      { label: "Internacionales", value: teamData.national_team_players || "-" },
      { label: "Balance Fichajes", value: teamData.net_transfer_record || "-" },
      { label: "Última Temporada", value: teamData.last_season || "-" },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero del equipo */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl animate-float-delayed z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-emerald-400/5 rounded-full animate-spin-slow z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Equipos", href: "/teams" }, { label: teamInfo.name }]} />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
            <div className="animate-scale-in w-32 h-32 md:w-40 md:h-40 rounded-2xl glass flex items-center justify-center text-5xl md:text-6xl font-bold text-emerald-400 shrink-0 shadow-xl shadow-emerald-500/10">
              {teamInfo.initials}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="animate-fade-in-up text-4xl md:text-5xl font-extrabold text-white mb-2">{teamInfo.name}</h1>
              <p className="animate-fade-in-up delay-100 text-emerald-100/60 text-lg mb-8">
                {teamInfo.league} • 🏟️ {teamInfo.stadium} (Aforo: {teamInfo.stadium_seats})
              </p>

              <div className="animate-fade-in-up delay-200 grid grid-cols-2 md:grid-cols-6 gap-3">
                {teamInfo.stats.map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-3 text-center hover-lift cursor-default">
                    <p className="text-xl md:text-2xl font-black text-emerald-400">{stat.value}</p>
                    <p className="text-[10px] text-emerald-200/50 mt-1 uppercase tracking-wider font-semibold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* Plantilla y partidos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Plantilla real */}
          <div className="lg:col-span-2">
            <h2 className="animate-fade-in-up text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">👥</span>
              Plantilla ({players.length} jugadores)
            </h2>
            {players.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {players.map((p: any, i: number) => (
                  <div key={p.id} className={`animate-stagger-in delay-${((i % 6) + 1) * 100}`}>
                    <PlayerCard {...p} team={teamInfo.name} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-center py-10">No hay jugadores registrados en la plantilla actual.</p>
            )}
          </div>

          {/* Últimos partidos reales */}
          <div>
            <h2 className="animate-fade-in-up text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">📅</span>
              Últimos Partidos
            </h2>
            {games.length > 0 ? (
              <div className="space-y-4">
                {games.map((m: any, i: number) => (
                  <div key={m.id} className={`animate-stagger-in delay-${(i + 1) * 100}`}>
                    <MatchCard {...m} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-center py-10">No hay partidos registrados.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
