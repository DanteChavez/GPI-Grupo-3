import PlayerCard from "@/components/PlayerCard";
import Breadcrumb from "@/components/Breadcrumb";

// Datos mock – se reemplazarán con llamadas al backend
const MOCK_PLAYERS = [
  { id: "1", name: "Vinícius Jr.", team: "Real Madrid", position: "DEL", number: 7 },
  { id: "2", name: "Jude Bellingham", team: "Real Madrid", position: "MED", number: 5 },
  { id: "3", name: "Erling Haaland", team: "Man City", position: "DEL", number: 9 },
  { id: "4", name: "Kevin De Bruyne", team: "Man City", position: "MED", number: 17 },
  { id: "5", name: "Robert Lewandowski", team: "Barcelona", position: "DEL", number: 9 },
  { id: "6", name: "Pedri", team: "Barcelona", position: "MED", number: 8 },
  { id: "7", name: "Kylian Mbappé", team: "Real Madrid", position: "DEL", number: 10 },
  { id: "8", name: "Bukayo Saka", team: "Arsenal", position: "EXT", number: 7 },
  { id: "9", name: "Lamine Yamal", team: "Barcelona", position: "EXT", number: 19 },
];

const POSITIONS = ["Todas", "POR", "DEF", "MED", "EXT", "DEL"];
const TEAMS = ["Todos", "Real Madrid", "Barcelona", "Man City", "Arsenal"];

export default function PlayersPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Mini hero */}
      <section className="relative w-full py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-5 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl animate-float-slow z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Jugadores" }]} />
          <h1 className="animate-fade-in-up text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            🧑‍🤝‍🧑 Jugadores
          </h1>
          <p className="animate-fade-in-up delay-100 text-emerald-100/70 text-lg max-w-xl">
            Descubre el rendimiento individual de los mejores futbolistas del mundo.
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
              <label htmlFor="search-player" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🔍 Buscar jugador
              </label>
              <input
                id="search-player"
                type="text"
                placeholder="Ej: Vinícius Jr., Haaland..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="md:w-52">
              <label htmlFor="filter-team" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🏟️ Equipo
              </label>
              <select
                id="filter-team"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                {TEAMS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="md:w-44">
              <label htmlFor="filter-position" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                📋 Posición
              </label>
              <select
                id="filter-position"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                {POSITIONS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_PLAYERS.map((player, i) => (
            <div key={player.id} className={`animate-stagger-in delay-${((i % 8) + 1) * 100}`}>
              <PlayerCard {...player} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
