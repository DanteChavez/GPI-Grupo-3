export const dynamic = 'force-dynamic';

import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import PlayerImage from "@/components/PlayerImage";
import Link from "next/link";
import PlayerStatsClient from "@/components/PlayerStatsClient";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getPlayer(id: string) {
  try {
    const res = await fetch(`${API_URL}/players/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function getAppearances(id: string) {
  try {
    const res = await fetch(`${API_URL}/players/${id}/appearances`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

function calculateAge(dateString: string) {
  if (!dateString) return "-";
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function formatPosition(position: string, subPosition?: string) {
  if (subPosition) return subPosition;
  const map: Record<string, string> = {
    'Goalkeeper': 'Portero',
    'Defender': 'Defensa',
    'Midfield': 'Mediocampista',
    'Attack': 'Delantero',
  };
  return map[position] || position;
}

function formatFoot(foot: string) {
  const map: Record<string, string> = { right: 'Diestro', left: 'Zurdo', both: 'Ambidiestro' };
  return map[foot] || foot || '-';
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [playerData, appearancesData] = await Promise.all([
    getPlayer(id),
    getAppearances(id),
  ]);

  if (!playerData) return <div className="p-20 text-center text-white">Jugador no encontrado</div>;

  const age = playerData.date_of_birth ? calculateAge(playerData.date_of_birth) : "-";

  const formattedValue = playerData.market_value_in_eur
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', notation: 'compact', maximumFractionDigits: 1 }).format(playerData.market_value_in_eur)
    : "-";

  const highestValue = playerData.highest_market_value_in_eur
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', notation: 'compact', maximumFractionDigits: 1 }).format(playerData.highest_market_value_in_eur)
    : "-";

  const summary = appearancesData?.summary || {
    appearances: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0,
  };

  const recentAppearances = appearancesData?.recent || [];

  const playerInfo = {
    name: playerData.name || "Jugador Desconocido",
    initial: playerData.name ? playerData.name.charAt(0).toUpperCase() : "J",
    team: playerData.team || "Equipo Libre",
    current_club_id: playerData.current_club_id,
    position: formatPosition(playerData.position, playerData.sub_position),
    nationality: playerData.country_of_citizenship || "Nacionalidad",
    countryOfBirth: playerData.country_of_birth,
    cityOfBirth: playerData.city_of_birth,
    image_url: playerData.image_url,
    agent: playerData.agent_name,
    quickStats: [
      { label: "Edad", value: age },
      { label: "Altura", value: playerData.height_in_cm ? `${playerData.height_in_cm}cm` : "-" },
      { label: "Pie", value: formatFoot(playerData.foot) },
      { label: "Valor", value: formattedValue },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero del jugador */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl animate-float-delayed z-0"></div>
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] border border-emerald-400/5 rounded-full animate-spin-slow z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Jugadores", href: "/players" }, { label: playerInfo.name }]} />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
            {/* Avatar */}
            <div className="animate-scale-in relative w-36 h-36 md:w-44 md:h-44 rounded-full glass border-4 border-emerald-400/20 shadow-2xl shadow-emerald-500/10 shrink-0 flex items-center justify-center text-6xl md:text-7xl font-bold text-emerald-400/70 overflow-hidden">
              {playerInfo.image_url ? (
                <PlayerImage 
                  src={playerInfo.image_url} 
                  alt={playerInfo.name} 
                  className="object-cover" 
                  sizes="(max-width: 176px) 100vw, 176px" 
                  fallbackNode={playerInfo.initial}
                />
              ) : (
                playerInfo.initial
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="animate-fade-in-up inline-block glass rounded-full px-4 py-1.5 text-sm font-bold text-emerald-300 mb-3">
                {playerInfo.current_club_id ? (
                  <Link href={`/teams/${playerInfo.current_club_id}`} className="hover:text-emerald-200 transition-colors">
                    {playerInfo.team}
                  </Link>
                ) : playerInfo.team} • {playerInfo.position}
              </div>
              <h1 className="animate-fade-in-up delay-100 text-4xl md:text-5xl font-extrabold text-white mb-2">{playerInfo.name}</h1>
              <p className="animate-fade-in-up delay-200 text-emerald-100/60 text-lg mb-8">
                🌍 {playerInfo.nationality}
                {playerInfo.cityOfBirth && ` • 📍 ${playerInfo.cityOfBirth}, ${playerInfo.countryOfBirth}`}
              </p>

              <div className="animate-fade-in-up delay-300 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {playerInfo.quickStats.map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-4 text-center hover-lift cursor-default">
                    <p className="text-2xl md:text-3xl font-black text-emerald-400">{stat.value}</p>
                    <p className="text-[10px] text-emerald-200/50 mt-1 uppercase tracking-wider font-semibold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* Estadísticas Interactivas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <PlayerStatsClient 
          playerInfo={playerInfo}
          summary={summary}
          highestValue={highestValue}
          appearances={appearancesData?.recent || []}
        />
      </section>
    </div>
  );
}
