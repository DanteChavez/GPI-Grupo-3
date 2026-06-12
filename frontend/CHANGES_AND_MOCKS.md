# Registro de Cambios: Estructura del Frontend y Datos Mock

Este documento detalla los cambios realizados en el proyecto del frontend (basado en Next.js App Router) para la página de estadísticas de fútbol y sirve como registro de los datos estáticos (mocks) que se implementaron de forma provisional.

## 1. Configuraciones Globales
- **`frontend.config.json`**: Se creó un archivo de configuración en la raíz del frontend (`frontend/frontend.config.json`) para centralizar el puerto (`5000`) y los certificados HTTPS.
- **`next.config.ts`**: Se modificó para leer la configuración dinámicamente desde `frontend.config.json`.
- **`package.json`**: Los scripts `dev` y `start` fueron actualizados con una inyección en Node (`node -e ...`) para asegurar que Next.js inicie utilizando el puerto definido en el archivo JSON.

## 2. Nueva Arquitectura de Rutas (App Router)
Para mantener una coherencia en la navegación y URLs, se estructuraron las carpetas en plural para las páginas de búsqueda, y las subcarpetas con el parámetro `[id]` para los detalles:

| Ruta | Archivo en `app/` | Descripción |
|------|-------------------|-------------|
| `/` | `page.tsx` | Landing page / Inicio. |
| `/matches` | `matches/page.tsx` | Buscador de partidos (incluye filtros de liga y estado). |
| `/matches/[id]` | `matches/[id]/page.tsx` | Vista detallada del partido (marcador, línea de tiempo). |
| `/teams` | `teams/page.tsx` | Buscador de equipos (incluye filtro por ligas). |
| `/teams/[id]` | `teams/[id]/page.tsx` | Vista del equipo (información, plantilla, últimos partidos). |
| `/players` | `players/page.tsx` | Buscador de jugadores (incluye filtro de posición y equipo). |
| `/players/[id]` | `players/[id]/page.tsx` | Vista de estadísticas individuales de un jugador. |

## 3. Componentes Base (`/components`)
Se crearon componentes reutilizables con un diseño moderno (usando TailwindCSS, gradientes, y efectos glassmorphism):
- **`Navbar.tsx`**: Menú de navegación anclado superiormente. Se corrigieron los enlaces estáticos hacia `/matches`, `/teams` y `/players`.
- **`Footer.tsx`**: Pie de página estándar.
- **`MatchCard.tsx`**: Tarjeta resumen con el marcador entre dos equipos.
- **`TeamCard.tsx`**: Tarjeta con el logo (inicial) de un equipo, la liga a la que pertenece y su posición actual.
- **`PlayerCard.tsx`**: Tarjeta de jugador destacando su posición, dorsal y equipo.

---

## 4. Registro de Datos Mock (Ejemplo)

Para visualizar el diseño sin depender temporalmente del backend, se inyectaron datos simulados (*mocks*) directamente en las vistas principales.

### Mocks en `matches/page.tsx` (Lista de Partidos)
```javascript
const MOCK_MATCHES = [
  { id: "1", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 1, status: "Finalizado", date: "11 Jun 2026", competition: "La Liga" },
  { id: "2", homeTeam: "Man City", awayTeam: "Arsenal", homeScore: 2, awayScore: 2, status: "Finalizado", date: "10 Jun 2026", competition: "Premier League" },
  { id: "3", homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeScore: 4, awayScore: 0, status: "Finalizado", date: "10 Jun 2026", competition: "Bundesliga" },
  { id: "4", homeTeam: "PSG", awayTeam: "Marseille", homeScore: 1, awayScore: 0, status: "En vivo", date: "11 Jun 2026", competition: "Ligue 1" },
  { id: "5", homeTeam: "Juventus", awayTeam: "Inter", homeScore: 0, awayScore: 1, status: "Finalizado", date: "09 Jun 2026", competition: "Serie A" },
  { id: "6", homeTeam: "Atletico", awayTeam: "Sevilla", homeScore: 2, awayScore: 2, status: "Finalizado", date: "08 Jun 2026", competition: "La Liga" },
];
```

### Mocks en `teams/page.tsx` (Lista de Equipos)
```javascript
const MOCK_TEAMS = [
  { id: "1", name: "Real Madrid", league: "La Liga", position: 1 },
  { id: "2", name: "Barcelona", league: "La Liga", position: 2 },
  { id: "3", name: "Manchester City", league: "Premier League", position: 1 },
  { id: "4", name: "Arsenal", league: "Premier League", position: 2 },
  { id: "5", name: "Bayern Munich", league: "Bundesliga", position: 1 },
  { id: "6", name: "Borussia Dortmund", league: "Bundesliga", position: 2 },
  { id: "7", name: "PSG", league: "Ligue 1", position: 1 },
  { id: "8", name: "Juventus", league: "Serie A", position: 1 },
  { id: "9", name: "Inter Milan", league: "Serie A", position: 2 },
];
```

### Mocks en `players/page.tsx` (Lista de Jugadores)
```javascript
const MOCK_PLAYERS = [
  { id: "1", name: "Vinícius Jr.", team: "Real Madrid", position: "DEL", number: 7 },
  { id: "2", name: "Jude Bellingham", team: "Real Madrid", position: "MED", number: 5 },
  { id: "3", name: "Erling Haaland", team: "Man City", position: "DEL", number: 9 },
  { id: "4", name: "Kevin De Bruyne", team: "Man City", position: "MED", number: 17 },
  { id: "5", name: "Robert Lewandowski", team: "Barcelona", position: "DEL", number: 9 },
  { id: "6", name: "Pedri", team: "Barcelona", position: "MED", number: 8 },
  { id: "7", name: "Kylian Mbappé", team: "Real Madrid", position: "DEL", number: 10 },
  { id: "8", name: "Bukayo Saka", team: "Arsenal", position: "EXT", number: 7 },
  { id: "9", name: "Lamine Yamal", team: "Barcelona", position: "EXT", number: 19 },
];
```

### Notas para futura conexión al Backend:
- Las llamadas a la API deberán sustituir las constantes `MOCK_...`.
- Todos los componentes usan `Link` de Next.js (`<Link href={\`/ruta/\${id}\`}>`), por lo tanto, es importante asegurar que el backend devuelva propiedades `id` (string o numérico) por cada elemento que coincidan con la lógica de generación estática/dinámica requerida.
- La página de detalle de un partido (`matches/[id]`) tiene datos *hardcodeados* sobre un partido "Real Madrid vs Barcelona" que también deben volverse dinámicos a través de los props o un `fetch` dentro de un Server Component en el futuro.
