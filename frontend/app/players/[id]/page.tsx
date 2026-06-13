import MatchCard from "@/components/MatchCard";
import Breadcrumb from "@/components/Breadcrumb";

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const playerInfo = {
    name: "Vinícius Jr.",
    initial: "V",
    team: "Real Madrid",
    number: 7,
    position: "Delantero",
    nationality: "Brasil",
    quickStats: [
      { label: "Edad", value: "23" },
      { label: "Altura", value: "1.76m" },
      { label: "Goles", value: "15" },
      { label: "Asist.", value: "8" },
    ],
  };

  const seasonStats = [
    { label: "Partidos Jugados", value: 28, max: 38 },
    { label: "Tiros al Arco / Partido", value: 2.4, max: 5 },
    { label: "Pases Completados", value: "82%", width: 82 },
    { label: "Regates Exitosos", value: "65%", width: 65 },
    { label: "Duelos Aéreos", value: "45%", width: 45 },
  ];

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
            {/* Avatar grande */}
            <div className="animate-scale-in relative w-36 h-36 md:w-44 md:h-44 rounded-full glass border-4 border-emerald-400/20 shadow-2xl shadow-emerald-500/10 shrink-0 flex items-center justify-center text-6xl md:text-7xl font-bold text-emerald-400/70">
              {playerInfo.initial}
              <div className="absolute -bottom-2 -right-2 glass rounded-full px-3 py-1 text-sm font-bold text-emerald-300">
                #{playerInfo.number}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="animate-fade-in-up inline-block glass rounded-full px-4 py-1.5 text-sm font-bold text-emerald-300 mb-3">
                {playerInfo.team} • {playerInfo.position}
              </div>
              <h1 className="animate-fade-in-up delay-100 text-4xl md:text-5xl font-extrabold text-white mb-2">{playerInfo.name}</h1>
              <p className="animate-fade-in-up delay-200 text-emerald-100/60 text-lg mb-8">{playerInfo.position} • {playerInfo.nationality}</p>

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

      {/* Estadísticas y partidos */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rendimiento */}
          <div className="animate-fade-in-up delay-400 glass-card rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">📈</span>
              Rendimiento en Temporada
            </h2>
            <div className="space-y-6">
              {seasonStats.map((stat, i) => (
                <div key={i} className="animate-fade-in-left" style={{ animationDelay: `${500 + i * 100}ms` }}>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-zinc-600 dark:text-zinc-300">{stat.label}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</span>
                  </div>
                  <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000" 
                      style={{ width: `${stat.width || (Number(stat.value) / Number(stat.max)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Últimos partidos */}
          <div>
            <h2 className="animate-fade-in-up text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">📅</span>
              Últimos Partidos Jugados
            </h2>
            <div className="space-y-4">
              {[
                { id: "1", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 1, status: "Finalizado", date: "Ayer" },
                { id: "5", homeTeam: "Sevilla", awayTeam: "Real Madrid", homeScore: 1, awayScore: 2, status: "Finalizado", date: "Hace 1 sem" },
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
