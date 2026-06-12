import MatchCard from "@/components/MatchCard";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-3">Partidos</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Consulta resultados, estadísticas y análisis de los encuentros más importantes.</p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search-match" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Buscar partido
            </label>
            <input
              id="search-match"
              type="text"
              placeholder="Ej: Real Madrid vs Barcelona..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
          <div className="md:w-56">
            <label htmlFor="filter-competition" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Competición
            </label>
            <select
              id="filter-competition"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              {COMPETITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:w-48">
            <label htmlFor="filter-status" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Estado
            </label>
            <select
              id="filter-status"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
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
        {MOCK_MATCHES.map((match) => (
          <MatchCard key={match.id} {...match} />
        ))}
      </div>
    </div>
  );
}
