import MatchCard from "@/components/MatchCard";

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full">
      {/* Cabecera del Jugador */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 dark:border-zinc-800 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative w-40 h-40 rounded-full bg-zinc-100 dark:bg-zinc-800 border-4 border-white dark:border-zinc-950 shadow-xl shrink-0 flex items-center justify-center text-6xl font-bold text-zinc-300 dark:text-zinc-600">
            V
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-3">
              Real Madrid • #7
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-zinc-900 dark:text-white">Vinícius Jr.</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-6">Delantero • Brasil</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">23</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Edad</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">1.76</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Altura (m)</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">15</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Goles</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">8</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider font-semibold">Asist.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Estadísticas de Temporada */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-xl font-bold mb-6">Rendimiento en Temporada</h2>
          <div className="space-y-6">
            {[
              { label: "Partidos Jugados", value: 28, max: 38 },
              { label: "Tiros al Arco por Partido", value: 2.4, max: 5 },
              { label: "Pases Completados", value: "82%", width: 82 },
              { label: "Regates Exitosos", value: "65%", width: 65 }
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-zinc-600 dark:text-zinc-300">{stat.label}</span>
                  <span className="font-bold">{stat.value}</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" 
                    style={{ width: `${stat.width || (Number(stat.value) / Number(stat.max)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Últimas participaciones */}
        <div>
          <h2 className="text-xl font-bold mb-6">Últimos Partidos Jugados</h2>
          <div className="space-y-4">
            <MatchCard id="1" homeTeam="Real Madrid" awayTeam="Barcelona" homeScore={3} awayScore={1} status="Finalizado" date="Ayer" />
            <MatchCard id="5" homeTeam="Sevilla" awayTeam="Real Madrid" homeScore={1} awayScore={2} status="Finalizado" date="Hace 1 sem" />
          </div>
        </div>
      </div>
    </div>
  );
}
