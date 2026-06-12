export default function Footer() {
  return (
    <footer className="w-full py-8 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-zinc-500 dark:text-zinc-400 text-sm">
          © {new Date().getFullYear()} FutStat. Todos los derechos reservados.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-colors">Términos</a>
          <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-colors">Privacidad</a>
          <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
