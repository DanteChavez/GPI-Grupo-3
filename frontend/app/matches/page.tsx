import MatchCard from "@/components/MatchCard";
import Breadcrumb from "@/components/Breadcrumb";

// Datos mock – se reemplazarán con llamadas al backend
const MOCK_MATCHES = [
  { id: "1", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 1, status: "Finalizado", date: "11 Jun 2026", competition: "La Liga" },
  { id: "2", homeTeam: "Man City", awayTeam: "Arsenal", homeScore: 2, awayScore: 2, status: "Finalizado", date: "10 Jun 2026", competition: "Premier League" },
  { id: "3", homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeScore: 4, awayScore: 0, status: "Finalizado", date: "10 Jun 2026", competition: "Bundesliga" },
  { id: "4", homeTeam: "PSG", awayTeam: "Marseille", homeScore: 1, awayScore: 0, status: "En vivo", date: "11 Jun 2026", competition: "Ligue 1" },
  { id: "5", homeTeam: "Juventus", awayTeam: "Inter", homeScore: 0, awayScore: 1, status: "Finalizado", date: "09 Jun 2026", competition: "Serie A" },
  { id: "6", homeTeam: "Atletico", awayTeam: "Sevilla", homeScore: 2, awayScore: 2, status: "Finalizado", date: "08 Jun 2026", competition: "La Liga" },
];

const COMPETITIONS = ["Todas", "La Liga", "Premier League", "Bundesliga", "Ligue 1", "Serie A"];

export default function MatchesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Mini hero */}
      <section className="relative w-full py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl animate-float-delayed z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Partidos" }]} />
          <h1 className="animate-fade-in-up text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            ⚽ Partidos
          </h1>
          <p className="animate-fade-in-up delay-100 text-emerald-100/70 text-lg max-w-xl">
            Consulta resultados, estadísticas y análisis de los encuentros más importantes.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Filtros con glassmorphism */}
        <div className="animate-fade-in-up delay-200 glass-card rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search-match" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🔍 Buscar partido
              </label>
              <input
                id="search-match"
                type="text"
                placeholder="Ej: Real Madrid vs Barcelona..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="md:w-56">
              <label htmlFor="filter-competition" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🏆 Competición
              </label>
              <select
                id="filter-competition"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                {COMPETITIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:w-48">
              <label htmlFor="filter-status" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                📊 Estado
              </label>
              <select
                id="filter-status"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                <option>Todos</option>
                <option>En vivo</option>
                <option>Finalizado</option>
                <option>Próximo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de partidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MATCHES.map((match, i) => (
            <div key={match.id} className={`animate-stagger-in delay-${(i + 1) * 100}`}>
              <MatchCard {...match} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
