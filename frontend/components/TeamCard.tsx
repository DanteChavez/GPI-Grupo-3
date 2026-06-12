import Link from "next/link";

interface TeamCardProps {
  id: string;
  name: string;
  league: string;
  position: number;
}

export default function TeamCard({ id, name, league, position }: TeamCardProps) {
  return (
    <Link href={`/teams/${id}`}>
      <div className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-zinc-100 dark:border-zinc-800 cursor-pointer flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">{name}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{league}</p>
          <div className="mt-2 inline-block px-2 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            Posición: {position}
          </div>
        </div>
      </div>
    </Link>
  );
}
