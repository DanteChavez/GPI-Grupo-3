import TeamCard from "@/components/TeamCard";
import Breadcrumb from "@/components/Breadcrumb";

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
    <div className="flex flex-col w-full">
      {/* Mini hero */}
      <section className="relative w-full py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-0 right-20 w-56 h-56 bg-emerald-400/10 rounded-full blur-2xl animate-float-delayed z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Equipos" }]} />
          <h1 className="animate-fade-in-up text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            🏟️ Equipos
          </h1>
          <p className="animate-fade-in-up delay-100 text-emerald-100/70 text-lg max-w-xl">
            Explora los clubes de las principales ligas del mundo y consulta sus estadísticas detalladas.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Filtros */}
        <div className="animate-fade-in-up delay-200 glass-card rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search-team" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🔍 Buscar equipo
              </label>
              <input
                id="search-team"
                type="text"
                placeholder="Ej: Real Madrid, Bayern..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="md:w-56">
              <label htmlFor="filter-league" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🌍 Liga
              </label>
              <select
                id="filter-league"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                {LEAGUES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs de liga */}
        <div className="animate-fade-in-up delay-300 flex gap-2 flex-wrap mb-8">
          {LEAGUES.map((l, i) => (
            <button
              key={l}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                i === 0
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                  : "glass-card text-zinc-600 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TEAMS.map((team, i) => (
            <div key={team.id} className={`animate-stagger-in delay-${((i % 6) + 1) * 100}`}>
              <TeamCard {...team} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
