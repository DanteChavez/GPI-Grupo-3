import Link from "next/link";

interface MatchCardProps {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  date: string;
}

export default function MatchCard({ id, homeTeam, awayTeam, homeScore, awayScore, status, date }: MatchCardProps) {
  const isLive = status === "En vivo";

  return (
    <Link href={`/matches/${id}`}>
      <div className="group relative glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer hover-lift hover-glow">
        {/* Barra superior gradiente */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow sutil en hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/0 via-teal-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-teal-500/5 group-hover:to-emerald-500/5 rounded-2xl transition-all duration-500 blur-xl -z-10" />

        <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          <span className="font-medium">{date}</span>
          <span className={`px-2 py-1 rounded-full font-semibold ${
            isLive 
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 animate-pulse-soft" 
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          }`}>
            {isLive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse-soft"></span>}
            {status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20">
              {homeTeam.charAt(0)}
            </div>
            <span className="font-semibold text-sm text-center line-clamp-1">{homeTeam}</span>
          </div>

          <div className="flex items-center justify-center gap-4 px-4">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400 group-hover:from-emerald-600 group-hover:to-teal-500 dark:group-hover:from-emerald-400 dark:group-hover:to-teal-300 transition-all duration-500">
              {homeScore}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600 font-light">-</span>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400 group-hover:from-emerald-600 group-hover:to-teal-500 dark:group-hover:from-emerald-400 dark:group-hover:to-teal-300 transition-all duration-500">
              {awayScore}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20">
              {awayTeam.charAt(0)}
            </div>
            <span className="font-semibold text-sm text-center line-clamp-1">{awayTeam}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
