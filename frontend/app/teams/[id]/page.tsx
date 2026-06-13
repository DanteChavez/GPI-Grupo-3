import PlayerCard from "@/components/PlayerCard";
import MatchCard from "@/components/MatchCard";
import Breadcrumb from "@/components/Breadcrumb";

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const teamInfo = {
    name: "Real Madrid",
    initials: "RM",
    league: "La Liga",
    country: "España",
    stats: [
      { label: "Posición", value: "1º" },
      { label: "Puntos", value: "85" },
      { label: "Goles a favor", value: "78" },
      { label: "Goles en contra", value: "22" },
      { label: "Victorias", value: "27" },
      { label: "Partidos", value: "35" },
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
              <p className="animate-fade-in-up delay-100 text-emerald-100/60 text-lg mb-8">{teamInfo.league} • {teamInfo.country}</p>
              
              <div className="animate-fade-in-up delay-200 grid grid-cols-3 md:grid-cols-6 gap-3">
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
          {/* Plantilla */}
          <div className="lg:col-span-2">
            <h2 className="animate-fade-in-up text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">👥</span>
              Plantilla Principal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: "1", name: "Courtois", position: "POR", number: 1 },
                { id: "2", name: "Bellingham", position: "MED", number: 5 },
                { id: "3", name: "Vinícius Jr.", position: "DEL", number: 7 },
                { id: "4", name: "Valverde", position: "MED", number: 15 },
                { id: "5", name: "Rodrygo", position: "DEL", number: 11 },
                { id: "6", name: "Militao", position: "DEF", number: 3 },
              ].map((p, i) => (
                <div key={p.id} className={`animate-stagger-in delay-${(i + 1) * 100}`}>
                  <PlayerCard {...p} team="Real Madrid" />
                </div>
              ))}
            </div>
          </div>

          {/* Últimos partidos */}
          <div>
            <h2 className="animate-fade-in-up text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">📅</span>
              Últimos Partidos
            </h2>
            <div className="space-y-4">
              {[
                { id: "1", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 1, status: "Finalizado", date: "Ayer" },
                { id: "5", homeTeam: "Sevilla", awayTeam: "Real Madrid", homeScore: 1, awayScore: 2, status: "Finalizado", date: "Hace 1 sem" },
                { id: "6", homeTeam: "Real Madrid", awayTeam: "Athletic", homeScore: 2, awayScore: 0, status: "Finalizado", date: "Hace 2 sem" },
              ].map((m, i) => (
                <div key={m.id} className={`animate-stagger-in delay-${(i + 1) * 100}`}>
                  <MatchCard {...m} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
