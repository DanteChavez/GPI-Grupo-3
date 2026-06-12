import PlayerCard from "@/components/PlayerCard";
import MatchCard from "@/components/MatchCard";

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      {/* Cabecera del Equipo */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center text-5xl font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
          RM
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-2">Real Madrid</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-6">La Liga • España</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Posición</p>
              <p className="text-2xl font-bold">1º</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Puntos</p>
              <p className="text-2xl font-bold">85</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Goles (F/C)</p>
              <p className="text-2xl font-bold">78 / 22</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Plantilla */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Plantilla Principal</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <PlayerCard id="1" name="Courtois" team="Real Madrid" position="POR" number={1} />
            <PlayerCard id="2" name="Bellingham" team="Real Madrid" position="MED" number={5} />
            <PlayerCard id="3" name="Vinícius Jr." team="Real Madrid" position="DEL" number={7} />
            <PlayerCard id="4" name="Valverde" team="Real Madrid" position="MED" number={15} />
            <PlayerCard id="5" name="Rodrygo" team="Real Madrid" position="DEL" number={11} />
            <PlayerCard id="6" name="Militao" team="Real Madrid" position="DEF" number={3} />
          </div>
        </div>

        {/* Últimos Partidos */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Últimos Partidos</h2>
          <div className="space-y-4">
            <MatchCard id="1" homeTeam="Real Madrid" awayTeam="Barcelona" homeScore={3} awayScore={1} status="Finalizado" date="Ayer" />
            <MatchCard id="5" homeTeam="Sevilla" awayTeam="Real Madrid" homeScore={1} awayScore={2} status="Finalizado" date="Hace 1 sem" />
            <MatchCard id="6" homeTeam="Real Madrid" awayTeam="Athletic" homeScore={2} awayScore={0} status="Finalizado" date="Hace 2 sem" />
          </div>
        </div>
      </div>
    </div>
  );
}
