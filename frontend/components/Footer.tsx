export default function Footer() {
  return (
    <footer className="w-full py-10 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-200/50 dark:border-zinc-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-400">
            FootballDB
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 text-sm">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </span>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-all duration-300 hover:-translate-y-0.5 text-sm">Términos</a>
          <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-all duration-300 hover:-translate-y-0.5 text-sm">Privacidad</a>
          <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-all duration-300 hover:-translate-y-0.5 text-sm">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
