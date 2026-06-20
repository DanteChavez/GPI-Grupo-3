'use client';

import { useState, useEffect, useCallback } from 'react';
import MatchCard from "@/components/MatchCard";
import Breadcrumb from "@/components/Breadcrumb";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [competition, setCompetition] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch competitions for dropdown
  useEffect(() => {
    fetch(`${API_URL}/competitions`)
      .then(res => res.ok ? res.json() : [])
      .then(setCompetitions)
      .catch(() => setCompetitions([]));
  }, []);

  // Fetch matches with debounce
  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (competition) params.set('competition', competition);
      params.set('limit', '30');
      const res = await fetch(`${API_URL}/games?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMatches(data);
      }
    } catch (e) {
      console.error('Failed to fetch matches:', e);
    }
    setLoading(false);
  }, [search, competition]);

  useEffect(() => {
    const timer = setTimeout(fetchMatches, 300);
    return () => clearTimeout(timer);
  }, [fetchMatches]);

  return (
    <div className="flex flex-col w-full">
      {/* Mini hero */}
      <section className="relative w-full py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-teal-950/80 to-zinc-950 z-0"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl animate-float-delayed z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Partidos" }]} />
          <h1 className="animate-fade-in-up text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            ⚽ Partidos
          </h1>
          <p className="animate-fade-in-up delay-100 text-emerald-100/70 text-lg max-w-xl">
            Consulta resultados, estadísticas y análisis de los encuentros históricos.
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
              <label htmlFor="search-match" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🔍 Buscar partido
              </label>
              <input
                id="search-match"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por equipo o estadio..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="md:w-56">
              <label htmlFor="filter-competition" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                🏆 Competición
              </label>
              <select
                id="filter-competition"
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

        {/* Grid de partidos */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length > 0 ? (
              matches.map((match: any, i: number) => (
                <div key={match.id} className={`animate-stagger-in delay-${Math.min((i + 1) * 100, 500)}`}>
                  <MatchCard {...match} />
                </div>
              ))
            ) : (
              <p className="text-zinc-500 col-span-3 text-center py-10">No se encontraron partidos con esos criterios.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
