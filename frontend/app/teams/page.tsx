'use client';

import { useState, useEffect, useCallback } from 'react';
import TeamCard from "@/components/TeamCard";
import Breadcrumb from "@/components/Breadcrumb";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [competition, setCompetition] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch competitions for filter tabs
  useEffect(() => {
    fetch(`${API_URL}/competitions?type=domestic_league`)
      .then(res => res.ok ? res.json() : [])
      .then(setCompetitions)
      .catch(() => setCompetitions([]));
  }, []);

  // Fetch teams with debounce
  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (competition) params.set('competition', competition);
      params.set('limit', '30');
      const res = await fetch(`${API_URL}/clubs?${params.toString()}`);
      if (res.ok) {
        setTeams(await res.json());
      }
    } catch (e) {
      console.error('Failed to fetch teams:', e);
    }
    setLoading(false);
  }, [search, competition]);

  useEffect(() => {
    const timer = setTimeout(fetchTeams, 300);
    return () => clearTimeout(timer);
  }, [fetchTeams]);

  return (
    <div className="flex flex-col w-full">
      {/* Mini hero */}
      <section className="relative w-full py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-0 right-20 w-56 h-56 bg-emerald-400/10 rounded-full blur-2xl animate-float-delayed z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Equipos" }]} />
          <h1 className="animate-fade-in-up text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            🏟️ Equipos
          </h1>
          <p className="animate-fade-in-up delay-100 text-emerald-100/70 text-lg max-w-xl">
            Explora los clubes de las principales ligas del mundo y consulta sus estadísticas detalladas.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* Contenido */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Filtros */}
        <div className="animate-fade-in-up delay-200 glass-card rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search-team" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🔍 Buscar equipo
              </label>
              <input
                id="search-team"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ej: Real Madrid, Bayern..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="md:w-56">
              <label htmlFor="filter-league" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🌍 Liga
              </label>
              <select
                id="filter-league"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                <option value="">Todas</option>
                {competitions.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.countryName})</option>
                ))}
              </select>
            </div>
          </div>
        </div>



        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.length > 0 ? (
              teams.map((team: any, i: number) => (
                <div key={team.id} className={`animate-stagger-in delay-${((i % 6) + 1) * 100}`}>
                  <TeamCard {...team} />
                </div>
              ))
            ) : (
              <p className="text-zinc-500 col-span-3 text-center py-10">No se encontraron equipos con esos criterios.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
