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
      <div className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-zinc-100 dark:border-zinc-800 cursor-pointer flex flex-col items-center text-center">
        <div className="relative w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4 overflow-hidden border-4 border-white dark:border-zinc-950 shadow-sm group-hover:scale-105 transition-transform">
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-zinc-300 dark:text-zinc-600">
            {name.charAt(0)}
          </div>
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">{name}</h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{team}</p>
        <div className="flex gap-2 mt-3">
          <span className="px-2 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {position}
          </span>
          <span className="px-2 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            #{number}
          </span>
        </div>
      </div>
    </Link>
  );
}
