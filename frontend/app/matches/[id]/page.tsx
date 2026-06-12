import PlayerCard from "@/components/PlayerCard";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Datos mockeados de un partido
  const matchInfo = {
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 3,
    awayScore: 1,
    status: "Finalizado",
    date: "12 Junio 2026",
    competition: "La Liga",
    stadium: "Santiago Bernabéu"
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 w-full">
      {/* Cabecera del Partido */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 mb-10">
        <div className="text-center mb-6">
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
            {matchInfo.competition}
          </span>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">{matchInfo.date} • {matchInfo.stadium}</p>
        </div>

        <div className="flex justify-between items-center px-4 md:px-12">
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-4xl font-bold shadow-inner">
              {matchInfo.homeTeam.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold">{matchInfo.homeTeam}</h2>
          </div>

          <div className="flex flex-col items-center justify-center px-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl font-black">{matchInfo.homeScore}</span>
              <span className="text-4xl text-zinc-300 dark:text-zinc-600">-</span>
              <span className="text-6xl font-black">{matchInfo.awayScore}</span>
            </div>
            <span className="mt-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
              {matchInfo.status}
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-4xl font-bold shadow-inner">
              {matchInfo.awayTeam.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold">{matchInfo.awayTeam}</h2>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Estadísticas del Partido</h3>
          <div className="space-y-6">
            {[
              { label: "Posesión", home: "55%", away: "45%", value: 55 },
              { label: "Tiros al arco", home: "8", away: "4", value: 66 },
              { label: "Faltas", home: "12", away: "15", value: 44 }
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>{stat.home}</span>
                  <span className="text-zinc-500">{stat.label}</span>
                  <span>{stat.away}</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: `${stat.value}%` }}></div>
                  <div className="h-full bg-teal-500" style={{ width: `${100 - stat.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Línea de Tiempo</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="font-bold text-emerald-500 w-12 text-right">12'</span>
              <p>⚽ Gol de Real Madrid (Vinícius Jr.)</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-emerald-500 w-12 text-right">45'</span>
              <p>🟨 Tarjeta amarilla para Gavi (Barcelona)</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-emerald-500 w-12 text-right">67'</span>
              <p>⚽ Gol de Barcelona (Lewandowski)</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-emerald-500 w-12 text-right">89'</span>
              <p>⚽ Gol de Real Madrid (Bellingham)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
