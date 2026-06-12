import PlayerCard from "@/components/PlayerCard";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-3">Jugadores</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Descubre el rendimiento individual de los mejores futbolistas del mundo.</p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search-player" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Buscar jugador
            </label>
            <input
              id="search-player"
              type="text"
              placeholder="Ej: Vinícius Jr., Haaland..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
          <div className="md:w-52">
            <label htmlFor="filter-team" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Equipo
            </label>
            <select
              id="filter-team"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              {TEAMS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="md:w-44">
            <label htmlFor="filter-position" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
              Posición
            </label>
            <select
              id="filter-position"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              {POSITIONS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid de jugadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_PLAYERS.map((player) => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>
    </div>
  );
}
