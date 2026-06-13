import Breadcrumb from "@/components/Breadcrumb";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
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

  const timeline = [
    { minute: "12'", event: "⚽ Gol de Real Madrid", detail: "Vinícius Jr. (Asistencia: Bellingham)", type: "goal" },
    { minute: "34'", event: "⚽ Gol de Real Madrid", detail: "Rodrygo (Asistencia: Modric)", type: "goal" },
    { minute: "45'", event: "🟨 Tarjeta amarilla", detail: "Gavi (Barcelona)", type: "card" },
    { minute: "67'", event: "⚽ Gol de Barcelona", detail: "Lewandowski (Asistencia: Pedri)", type: "goal" },
    { minute: "78'", event: "🔄 Sustitución", detail: "Sale Modric, entra Camavinga (Real Madrid)", type: "sub" },
    { minute: "89'", event: "⚽ Gol de Real Madrid", detail: "Bellingham (Tiro libre)", type: "goal" },
  ];

  const stats = [
    { label: "Posesión", home: "55%", away: "45%", value: 55 },
    { label: "Tiros al arco", home: "8", away: "4", value: 66 },
    { label: "Corners", home: "6", away: "3", value: 66 },
    { label: "Faltas", home: "12", away: "15", value: 44 },
    { label: "Pases completados", home: "456", away: "389", value: 54 },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero del partido */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float-delayed z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Partidos", href: "/matches" }, { label: `${matchInfo.homeTeam} vs ${matchInfo.awayTeam}` }]} />

          {/* Badge de competición */}
          <div className="animate-fade-in-up text-center mb-8">
            <span className="glass rounded-full px-4 py-1.5 text-sm font-semibold text-emerald-300 inline-flex items-center gap-2">
              🏆 {matchInfo.competition}
            </span>
            <p className="text-emerald-100/60 text-sm mt-2">{matchInfo.date} • {matchInfo.stadium}</p>
          </div>

          {/* Marcador principal */}
          <div className="animate-fade-in-up delay-200 flex justify-between items-center px-4 md:px-16">
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full glass flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl animate-scale-in delay-300">
                {matchInfo.homeTeam.charAt(0)}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">{matchInfo.homeTeam}</h2>
            </div>

            <div className="flex flex-col items-center justify-center px-6 md:px-8">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-5xl md:text-7xl font-black text-white animate-scale-in delay-400">{matchInfo.homeScore}</span>
                <span className="text-3xl md:text-4xl text-emerald-300/40">-</span>
                <span className="text-5xl md:text-7xl font-black text-white animate-scale-in delay-500">{matchInfo.awayScore}</span>
              </div>
              <span className="mt-4 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-bold backdrop-blur-sm border border-emerald-400/20">
                {matchInfo.status}
              </span>
            </div>

            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full glass flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl animate-scale-in delay-300">
                {matchInfo.awayTeam.charAt(0)}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">{matchInfo.awayTeam}</h2>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* Estadísticas y timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Estadísticas */}
          <div className="animate-fade-in-up delay-300 glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">📊</span>
              Estadísticas del Partido
            </h3>
            <div className="space-y-6">
              {stats.map((stat, i) => (
                <div key={i} className="animate-fade-in-left" style={{ animationDelay: `${400 + i * 100}ms` }}>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{stat.home}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{stat.label}</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">{stat.away}</span>
                  </div>
                  <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full transition-all duration-1000" style={{ width: `${stat.value}%` }}></div>
                    <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-r-full transition-all duration-1000" style={{ width: `${100 - stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="animate-fade-in-up delay-400 glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">⏱️</span>
              Línea de Tiempo
            </h3>
            <div className="relative">
              {/* Línea vertical */}
              <div className="absolute left-[52px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/30 via-teal-500/20 to-transparent"></div>

              <div className="space-y-5">
                {timeline.map((event, i) => (
                  <div key={i} className="flex gap-4 items-start animate-fade-in-left" style={{ animationDelay: `${500 + i * 100}ms` }}>
                    <span className="font-bold text-emerald-500 w-12 text-right shrink-0 text-sm pt-0.5">{event.minute}</span>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shrink-0 mt-1 shadow-md shadow-emerald-500/30 relative z-10"></div>
                    <div className="flex-1 pb-1">
                      <p className="font-semibold text-sm">{event.event}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
