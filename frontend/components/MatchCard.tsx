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
  return (
    <Link href={`/matches/${id}`}>
      <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800 overflow-hidden cursor-pointer transform hover:-translate-y-1">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          <span className="font-medium">{date}</span>
          <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-semibold">{status}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl font-bold">
              {homeTeam.charAt(0)}
            </div>
            <span className="font-semibold text-sm text-center line-clamp-1">{homeTeam}</span>
          </div>

          <div className="flex items-center justify-center gap-4 px-4">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400">
              {homeScore}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600 font-light">-</span>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400">
              {awayScore}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl font-bold">
              {awayTeam.charAt(0)}
            </div>
            <span className="font-semibold text-sm text-center line-clamp-1">{awayTeam}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
