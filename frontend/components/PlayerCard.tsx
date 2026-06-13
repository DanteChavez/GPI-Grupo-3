import Link from "next/link";

interface PlayerCardProps {
  id: string;
  name: string;
  team: string;
  position: string;
  number: number;
}

export default function PlayerCard({ id, name, team, position, number }: PlayerCardProps) {
  return (
    <Link href={`/players/${id}`}>
      <div className="group glass-card rounded-2xl p-6 transition-all duration-500 cursor-pointer flex flex-col items-center text-center hover-lift hover-glow">
        <div className="relative w-24 h-24 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 mb-4 overflow-hidden border-4 border-white/50 dark:border-zinc-950/50 shadow-sm group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-500">
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-zinc-300 dark:text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300">
            {name.charAt(0)}
          </div>
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors duration-300">{name}</h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{team}</p>
        <div className="flex gap-2 mt-3">
          <span className="px-2 py-1 text-xs rounded-md bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors duration-300">
            {position}
          </span>
          <span className="px-2 py-1 text-xs rounded-md bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors duration-300">
            #{number}
          </span>
        </div>
      </div>
    </Link>
  );
}
