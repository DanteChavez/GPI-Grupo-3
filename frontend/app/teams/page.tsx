import TeamCard from "@/components/TeamCard";

// Datos mock – se reemplazarán con llamadas al backend
const MOCK_TEAMS = [
  { id: "1", name: "Real Madrid", league: "La Liga", position: 1 },
  { id: "2", name: "Barcelona", league: "La Liga", position: 2 },
  { id: "3", name: "Manchester City", league: "Premier League", position: 1 },
  { id: "4", name: "Arsenal", league: "Premier League", position: 2 },
  { id: "5", name: "Bayern Munich", league: "Bundesliga", position: 1 },
  { id: "6", name: "Borussia Dortmund", league: "Bundesliga", position: 2 },
  { id: "7", name: "PSG", league: "Ligue 1", position: 1 },
  { id: "8", name: "Juventus", league: "Serie A", position: 1 },
  { id: "9", name: "Inter Milan", league: "Serie A", position: 2 },
];

const LEAGUES = ["Todas", "La Liga", "Premier League", "Bundesliga", "Ligue 1", "Serie A"];

export default function TeamsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-3">Equipos</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Explora los clubes de las principales ligas del mundo y consulta sus estadísticas detalladas.</p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search-team" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Buscar equipo
            </label>
            <input
              id="search-team"
              type="text"
              placeholder="Ej: Real Madrid, Bayern..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
          <div className="md:w-56">
            <label htmlFor="filter-league" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Liga
            </label>
            <select
              id="filter-league"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              {LEAGUES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs por liga */}
      <div className="flex gap-2 flex-wrap mb-8">
        {LEAGUES.map((l) => (
          <button
            key={l}
            className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:border-emerald-700 dark:hover:text-emerald-400 transition-all"
          >
            {l}
          </button>
        ))}
      </div>

      {/* Grid de equipos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEAMS.map((team) => (
          <TeamCard key={team.id} {...team} />
        ))}
      </div>
    </div>
  );
}
