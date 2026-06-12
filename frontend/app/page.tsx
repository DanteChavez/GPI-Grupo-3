import MatchCard from "@/components/MatchCard";

export default function Home() {
  const recentMatches = [
    { id: "1", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 1, status: "Finalizado", date: "Hoy" },
    { id: "2", homeTeam: "Man City", awayTeam: "Arsenal", homeScore: 2, awayScore: 2, status: "Finalizado", date: "Ayer" },
    { id: "3", homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeScore: 4, awayScore: 0, status: "Finalizado", date: "Ayer" },
    { id: "4", homeTeam: "PSG", awayTeam: "Marseille", homeScore: 1, awayScore: 0, status: "En vivo", date: "Hoy" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-zinc-900 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0 opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Las Mejores <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Estadísticas</span> de Fútbol
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl font-light mb-10">
            Sigue los resultados en vivo, descubre el rendimiento de tus equipos favoritos y analiza el juego de los mejores jugadores del mundo en un solo lugar.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all shadow-lg hover:shadow-emerald-500/50">
              Ver Partidos de Hoy
            </button>
            <button className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/20 transition-all">
              Explorar Equipos
            </button>
          </div>
        </div>
      </section>

      {/* Partidos Recientes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Partidos Destacados</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Los encuentros más importantes del momento</p>
          </div>
          <a href="#" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">Ver todos →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentMatches.map((match) => (
            <MatchCard key={match.id} {...match} />
          ))}
        </div>
      </section>
    </div>
  );
}
