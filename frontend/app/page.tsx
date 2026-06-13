import MatchCard from "@/components/MatchCard";
import Link from "next/link";

export default function Home() {
  const recentMatches = [
    { id: "1", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 1, status: "Finalizado", date: "Hoy" },
    { id: "2", homeTeam: "Man City", awayTeam: "Arsenal", homeScore: 2, awayScore: 2, status: "Finalizado", date: "Ayer" },
    { id: "3", homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeScore: 4, awayScore: 0, status: "Finalizado", date: "Ayer" },
    { id: "4", homeTeam: "PSG", awayTeam: "Marseille", homeScore: 1, awayScore: 0, status: "En vivo", date: "Hoy" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ====== HERO SECTION ====== */}
      <section className="relative w-full py-24 lg:py-40 overflow-hidden flex items-center justify-center min-h-[70vh]">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>

        {/* Orbes decorativos flotantes con transparencia */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-float-delayed z-0"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-300/10 rounded-full blur-2xl animate-float-slow z-0"></div>

        {/* Anillo decorativo giratorio */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-emerald-400/10 rounded-full animate-spin-slow z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-teal-400/5 rounded-full animate-spin-slow z-0" style={{ animationDirection: "reverse", animationDuration: "35s" }}></div>

        {/* Contenido principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Badge animado */}
          <div className="animate-fade-in-up glass rounded-full px-5 py-2 text-sm font-medium text-emerald-300 mb-8 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft"></span>
            Resultados en vivo disponibles
          </div>

          <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Las Mejores{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 animate-shimmer">
              Estadísticas
            </span>
            <br />
            de Fútbol
          </h1>

          <p className="animate-fade-in-up delay-300 text-lg md:text-xl text-emerald-100/80 max-w-2xl font-light mb-12 leading-relaxed">
            Sigue los resultados en vivo, descubre el rendimiento de tus equipos favoritos y analiza el juego de los mejores jugadores del mundo en un solo lugar.
          </p>

          <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-4">
            <Link href="/matches" className="group px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 hover:scale-105 flex items-center gap-2">
              <span>Ver Partidos de Hoy</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/teams" className="group glass px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:bg-white/15 hover:scale-105 flex items-center gap-2">
              <span>Explorar Equipos</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Stats rápidas en cristal */}
          <div className="animate-fade-in-up delay-700 mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="glass rounded-2xl p-4 text-center hover-lift cursor-default">
              <p className="text-2xl md:text-3xl font-black text-emerald-400">120+</p>
              <p className="text-xs text-emerald-200/60 mt-1 uppercase tracking-wider">Partidos</p>
            </div>
            <div className="glass rounded-2xl p-4 text-center hover-lift cursor-default">
              <p className="text-2xl md:text-3xl font-black text-teal-400">85</p>
              <p className="text-xs text-emerald-200/60 mt-1 uppercase tracking-wider">Equipos</p>
            </div>
            <div className="glass rounded-2xl p-4 text-center hover-lift cursor-default">
              <p className="text-2xl md:text-3xl font-black text-emerald-300">2K+</p>
              <p className="text-xs text-emerald-200/60 mt-1 uppercase tracking-wider">Jugadores</p>
            </div>
          </div>
        </div>

        {/* Degradado inferior para transición suave al contenido */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* ====== PARTIDOS RECIENTES ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="animate-fade-in-up flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              Partidos Destacados
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Los encuentros más importantes del momento</p>
          </div>
          <Link href="/matches" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline hover:translate-x-1 transition-all inline-flex items-center gap-1">
            Ver todos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentMatches.map((match, index) => (
            <div key={match.id} className={`animate-stagger-in delay-${(index + 1) * 100}`}>
              <MatchCard {...match} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
