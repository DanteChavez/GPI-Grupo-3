# FootballDB — Guía de Base de Datos para Developers (Control + shift + v)

> Documento orientado a developers que construirán el frontend en **Next.js**
> usando el driver nativo de **MongoDB** (`mongodb`).

---

## Índice

- [Cómo conectarse a MongoDB desde Next.js](#cómo-conectarse-a-mongodb-desde-nextjs)
- [countries](#countries)
- [competitions](#competitions)
- [clubs](#clubs)
- [national_teams](#national_teams)
- [players](#players)
- [games](#games)
- [appearances](#appearances)
- [game_events](#game_events)
- [transfers](#transfers)
- [Verificación Global](#verificación-global)

---

## Cómo conectarse a MongoDB desde Next.js

### Instalación

```bash
npm install mongodb
```

### Cliente reutilizable (Singleton Pattern)

Crear el archivo `lib/mongodb.js`:

```javascript
// lib/mongodb.js
// Singleton de conexión a MongoDB para Next.js
// Evita abrir múltiples conexiones en desarrollo (hot reload)

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/footballdb?authSource=admin';
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usar variable global para preservar la conexión entre hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, crear una nueva instancia
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

### Uso en Route Handlers (App Router)

```javascript
// app/api/players/route.js
import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('footballdb');

  const players = await db.collection('players')
    .find({})
    .limit(20)
    .toArray();

  return Response.json(players);
}
```

### Variables de entorno

Agregar en `.env.local`:

```env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/footballdb?authSource=admin
```

---

## countries

### 1. Descripción General

Representa los **países** registrados en el sistema. Cada país tiene una liga de fútbol asociada y estadísticas agregadas sobre sus clubes y jugadores.

**Casos de uso:**
- **CU010** — Filtrar jugadores y clubes por país/nacionalidad
- **CU011** — Ver estadísticas por país (número de clubes, jugadores, edad promedio)
- **CU012** — Explorar ligas por confederación

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | Identificador interno de MongoDB | `ObjectId("6a1ce5487d...")` |
| `country_id` | Integer | ID único del país | `157` |
| `country_name` | String | Nombre del país | `"Spain"` |
| `country_code` | String | Código de la liga principal del país. Referencia a `competitions.competition_id` | `"ES1"` |
| `confederation` | String | Confederación continental | `"europa"` |
| `total_clubs` | Integer | Total de clubes registrados en el país | `20` |
| `total_players` | Integer | Total de jugadores registrados | `518` |
| `average_age` | Float | Edad promedio de los jugadores | `27.3` |
| `url` | String | URL en Transfermarkt | `"https://www.transfermarkt.co.uk/..."` |

### 3. Consultas de Ejemplo

```javascript
// CU010 - Obtener un país por ID
await db.collection('countries').findOne({ country_id: 157 });
// → { country_name: "Spain", confederation: "europa", ... }

// CU012 - Listar países de una confederación
await db.collection('countries').find(
  { confederation: 'europa' },
  { projection: { country_name: 1, total_clubs: 1, total_players: 1 } }
).sort({ total_players: -1 }).toArray();

// CU011 - Top 10 países con más jugadores
await db.collection('countries').find(
  {},
  { projection: { country_name: 1, total_players: 1, average_age: 1 } }
).sort({ total_players: -1 }).limit(10).toArray();

// CU010 - Buscar país por nombre (búsqueda parcial)
await db.collection('countries').find(
  { country_name: { $regex: 'Arg', $options: 'i' } }
).toArray();
```

### 4. Índices

```javascript
// Búsqueda rápida por country_id (clave primaria lógica)
db.countries.createIndex({ country_id: 1 }, { unique: true });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 118
db.countries.countDocuments()

// b) Muestra de datos
db.countries.findOne({ country_name: "Spain" })

// c) Verificación de campos críticos
db.countries.countDocuments({ country_name: { $exists: true, $ne: null } })  // debe ser 118
db.countries.countDocuments({ total_players: { $gt: 0 } })  // mayoría > 0

// d) Integridad referencial — países referenciados por competitions
db.competitions.aggregate([
  { $match: { country_id: { $ne: -1, $ne: null } } },
  { $lookup: { from: "countries", localField: "country_id", foreignField: "country_id", as: "pais" } },
  { $match: { pais: { $size: 0 } } },
  { $count: "competitions_sin_pais" }
])
```

---

## competitions

### 1. Descripción General

Representa las **competiciones de fútbol**: ligas domésticas (La Liga, Bundesliga), copas nacionales (Copa del Rey, DFB-Pokal), y torneos internacionales (Champions League, Mundial). Es la tabla maestra que conecta partidos con su contexto competitivo.

**Casos de uso:**
- **CU003** — Filtrar partidos por competición
- **CU008** — Ver tabla de posiciones de una liga
- **CU012** — Explorar competiciones disponibles

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce549...")` |
| `competition_id` | String | ID único de la competición | `"CL"`, `"ES1"`, `"L1"` |
| `competition_code` | String | Slug legible de la competición | `"uefa-champions-league"` |
| `name` | String | Nombre de la competición (igual a `competition_code`) | `"uefa-champions-league"` |
| `sub_type` | String | Subtipo específico | `"uefa_champions_league"`, `"first_tier"` |
| `type` | String | Tipo de competición | `"international_cup"`, `"domestic_league"` |
| `country_id` | Integer | País al que pertenece. **FK → countries.country_id**. `-1` para internacionales. Nullable | `-1` (internacional), `157` (España) |
| `country_name` | String | Nombre del país. Nullable (vacío si `country_id = -1`) | `"Spain"`, `null` |
| `domestic_league_code` | String | Liga doméstica asociada. Nullable | `"ES1"` |
| `confederation` | String | Confederación. Nullable | `"europa"`, `"amerika"` |
| `total_clubs` | Integer | Número de clubes. Nullable | `20`, `null` |
| `url` | String | URL en Transfermarkt | `"https://www.transfermarkt.co.uk/..."` |

### 3. Consultas de Ejemplo

```javascript
// CU012 - Listar todas las ligas domésticas
await db.collection('competitions').find(
  { type: 'domestic_league' },
  { projection: { competition_id: 1, name: 1, country_name: 1, total_clubs: 1 } }
).sort({ country_name: 1 }).toArray();

// CU012 - Obtener competición por ID
await db.collection('competitions').findOne({ competition_id: 'CL' });
// → { name: "uefa-champions-league", type: "international_cup", ... }

// CU012 - Competiciones internacionales
await db.collection('competitions').find(
  { type: 'international_cup' }
).toArray();

// CU003 - Obtener competición con sus partidos (aggregation)
await db.collection('competitions').aggregate([
  { $match: { competition_id: 'ES1' } },
  { $lookup: {
      from: 'games',
      localField: 'competition_id',
      foreignField: 'competition_id',
      as: 'partidos',
      pipeline: [
        { $match: { season: 2024 } },
        { $sort: { date: -1 } },
        { $limit: 10 }
      ]
  }}
]).toArray();
```

### 4. Índices

```javascript
// Búsqueda por ID (clave primaria lógica)
db.competitions.createIndex({ competition_id: 1 }, { unique: true });
// Filtro por país
db.competitions.createIndex({ country_id: 1 });
// Filtro por tipo de competición
db.competitions.createIndex({ type: 1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 67
db.competitions.countDocuments()

// b) Muestra de datos
db.competitions.findOne({ competition_id: "CL" })

// c) Verificación de campos críticos
db.competitions.distinct("type")
// debe incluir: domestic_league, domestic_cup, international_cup, etc.
db.competitions.countDocuments({ type: { $exists: false } })  // debe ser 0

// d) Integridad referencial — competiciones referenciadas por games
db.games.distinct("competition_id").length  // comparar con total competitions
```

---

## clubs

### 1. Descripción General

Representa los **clubes de fútbol** profesionales. Cada club pertenece a una liga doméstica y tiene información sobre plantilla, estadio, y valor de mercado. Es la entidad central que conecta jugadores, partidos y transfers.

**Casos de uso:**
- **CU002** — Ver perfil completo de un club
- **CU004** — Ver plantilla de un club (jugadores actuales)
- **CU008** — Tabla de posiciones de la liga del club
- **CU013** — Buscar clubes por nombre, liga o país

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce549...")` |
| `club_id` | Integer | ID único del club | `27` |
| `club_code` | String | Slug del club | `"fc-bayern-munchen"` |
| `name` | String | Nombre completo del club | `"FC Bayern München"` |
| `domestic_competition_id` | String | Liga donde juega. **FK → competitions.competition_id** | `"L1"` (Bundesliga) |
| `total_market_value` | String | Valor total de mercado del plantel. Nullable | `null` |
| `squad_size` | Integer | Número de jugadores en plantilla. 0 para clubes disueltos | `25` |
| `average_age` | Float | Edad promedio de la plantilla. Nullable | `27.0` |
| `foreigners_number` | Integer | Número de extranjeros en plantilla | `13` |
| `foreigners_percentage` | Float | Porcentaje de extranjeros. Nullable | `52.0` |
| `national_team_players` | Integer | Jugadores convocados a selecciones | `20` |
| `stadium_name` | String | Nombre del estadio | `"Allianz Arena"` |
| `stadium_seats` | Integer | Capacidad del estadio | `75000` |
| `net_transfer_record` | String | Balance neto de fichajes (formato moneda) | `"+€12.90m"` |
| `coach_name` | String | Nombre del entrenador actual. Nullable | `"Vincent Kompany"` |
| `last_season` | Integer | Última temporada con datos | `2025` |
| `url` | String | URL en Transfermarkt | `"https://www.transfermarkt.co.uk/..."` |

### 3. Consultas de Ejemplo

```javascript
// CU013 - Buscar clubes por nombre
await db.collection('clubs').find(
  { name: { $regex: 'Bayern', $options: 'i' } },
  { projection: { club_id: 1, name: 1, domestic_competition_id: 1, stadium_name: 1 } }
).toArray();

// CU002 - Perfil completo de un club por ID
await db.collection('clubs').findOne({ club_id: 27 });
// → { name: "FC Bayern München", stadium_name: "Allianz Arena", ... }

// CU004 - Plantilla actual de un club (cruzar con players)
await db.collection('players').find(
  { current_club_id: 27 },
  { projection: { name: 1, position: 1, sub_position: 1, market_value_in_eur: 1, date_of_birth: 1 } }
).sort({ position: 1, market_value_in_eur: -1 }).toArray();

// CU013 - Clubes de una liga específica, ordenados por valor
await db.collection('clubs').find(
  { domestic_competition_id: 'ES1' },
  { projection: { name: 1, squad_size: 1, average_age: 1, stadium_name: 1 } }
).sort({ squad_size: -1 }).toArray();

// CU002 - Perfil de club con competición (aggregation)
await db.collection('clubs').aggregate([
  { $match: { club_id: 27 } },
  { $lookup: {
      from: 'competitions',
      localField: 'domestic_competition_id',
      foreignField: 'competition_id',
      as: 'liga'
  }},
  { $unwind: { path: '$liga', preserveNullAndEmptyArrays: true } }
]).toArray();
```

### 4. Índices

```javascript
// Búsqueda por ID (clave primaria lógica)
db.clubs.createIndex({ club_id: 1 }, { unique: true });
// Filtro por liga
db.clubs.createIndex({ domestic_competition_id: 1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 796
db.clubs.countDocuments()

// b) Muestra de datos
db.clubs.findOne({ name: /Bayern/i })

// c) Verificación de campos críticos
db.clubs.countDocuments({ squad_size: 0 })  // clubes disueltos, pocos
db.clubs.countDocuments({ domestic_competition_id: { $exists: true, $ne: null } })
// debe ser ~796

// d) Integridad referencial — clubes cuya liga no existe en competitions
db.clubs.aggregate([
  { $lookup: { from: "competitions", localField: "domestic_competition_id",
    foreignField: "competition_id", as: "liga" } },
  { $match: { liga: { $size: 0 } } },
  { $count: "clubs_sin_liga" }
])
```

---

## national_teams

### 1. Descripción General

Representa las **selecciones nacionales** de fútbol. Cada selección está asociada a un país y tiene estadísticas como ranking FIFA, valor de mercado del equipo y tamaño del plantel.

**Casos de uso:**
- **CU005** — Ver perfil de una selección nacional
- **CU010** — Explorar selecciones por confederación
- **CU011** — Ranking FIFA y comparativa entre selecciones

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce549...")` |
| `national_team_id` | Integer | ID único de la selección | `3437` |
| `name` | String | Nombre de la selección | `"Argentina"` |
| `team_code` | String | Slug | `"argentina"` |
| `country_id` | Integer | País asociado. **FK → countries.country_id** | `9` |
| `country_name` | String | Nombre del país (denormalizado) | `"Argentina"` |
| `country_code` | String | Código del país | `"ARG1"` |
| `confederation` | String | Confederación (MAYÚSCULAS) | `"CONMEBOL"`, `"UEFA"` |
| `team_image_url` | String | URL de la bandera/escudo | `"https://tmssl.akamaized.net/..."` |
| `squad_size` | Integer | Tamaño del plantel convocado | `29` |
| `average_age` | Float | Edad promedio. Nullable | `28.0` |
| `foreigners_number` | Integer | Jugadores que juegan en ligas extranjeras. Nullable | `24` |
| `foreigners_percentage` | Float | Porcentaje de "legionarios". Nullable | `82.8` |
| `total_market_value` | Integer | Valor total de la selección en EUR. Nullable | `761200012` |
| `coach_name` | String | Director técnico actual. Nullable | `"Lionel Scaloni"` |
| `fifa_ranking` | Integer | Posición en ranking FIFA | `3` |
| `last_season` | Integer | Última temporada | `2025` |
| `url` | String | URL en Transfermarkt | `"https://www.transfermarkt.co.uk/..."` |

### 3. Consultas de Ejemplo

```javascript
// CU005 - Perfil de selección por ID
await db.collection('national_teams').findOne({ national_team_id: 3437 });
// → { name: "Argentina", fifa_ranking: 3, confederation: "CONMEBOL", ... }

// CU011 - Top 10 selecciones por ranking FIFA
await db.collection('national_teams').find(
  {},
  { projection: { name: 1, fifa_ranking: 1, total_market_value: 1, coach_name: 1 } }
).sort({ fifa_ranking: 1 }).limit(10).toArray();

// CU010 - Selecciones de una confederación
await db.collection('national_teams').find(
  { confederation: 'UEFA' },
  { projection: { name: 1, fifa_ranking: 1, squad_size: 1 } }
).sort({ fifa_ranking: 1 }).toArray();

// CU005 - Selección con sus jugadores convocados (aggregation)
await db.collection('national_teams').aggregate([
  { $match: { national_team_id: 3437 } },
  { $lookup: {
      from: 'players',
      localField: 'national_team_id',
      foreignField: 'current_national_team_id',
      as: 'jugadores',
      pipeline: [
        { $sort: { market_value_in_eur: -1 } },
        { $project: { name: 1, position: 1, market_value_in_eur: 1, current_club_name: 1 } }
      ]
  }}
]).toArray();
```

### 4. Índices

```javascript
// Búsqueda por ID
db.national_teams.createIndex({ national_team_id: 1 }, { unique: true });
// Filtro por país
db.national_teams.createIndex({ country_id: 1 });
// Ordenar por ranking FIFA
db.national_teams.createIndex({ fifa_ranking: 1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 118
db.national_teams.countDocuments()

// b) Muestra de datos
db.national_teams.findOne({ name: "Argentina" })

// c) Verificación de campos críticos
db.national_teams.countDocuments({ fifa_ranking: { $gt: 0 } })  // debe ser ~118
db.national_teams.distinct("confederation")
// debe incluir: UEFA, CONMEBOL, CONCACAF, AFC, CAF, OFC

// d) Integridad referencial — selecciones cuyo país no existe
db.national_teams.aggregate([
  { $lookup: { from: "countries", localField: "country_id",
    foreignField: "country_id", as: "pais" } },
  { $match: { pais: { $size: 0 } } },
  { $count: "selecciones_sin_pais" }
])
```

---

## players

### 1. Descripción General

Representa los **jugadores profesionales de fútbol**. Es la colección más consultada del sistema — contiene datos personales, posición, club actual, selección nacional, valor de mercado y más. Es el eje central de la mayoría de consultas del frontend.

**Casos de uso:**
- **CU001** — Buscar jugadores por nombre, posición o nacionalidad
- **CU006** — Ver perfil completo de un jugador
- **CU007** — Ranking de jugadores por valor de mercado
- **CU009** — Comparar jugadores
- **CU014** — Filtrar jugadores por club o liga

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce549...")` |
| `player_id` | Integer | ID único del jugador | `28003` |
| `first_name` | String | Nombre. Nullable (jugadores de un solo nombre) | `"Lionel"` |
| `last_name` | String | Apellido. Nullable | `"Messi"` |
| `name` | String | Nombre de display completo | `"Lionel Messi"` |
| `last_season` | Integer | Última temporada activa | `2025` |
| `current_club_id` | Integer | Club actual. **FK → clubs.club_id** | `69261` |
| `current_club_name` | String | Nombre del club (denormalizado) | `"Club Internacional de Fútbol Miami"` |
| `current_club_domestic_competition_id` | String | Liga del club. **FK → competitions.competition_id**. Nullable | `"MLS1"` |
| `current_national_team_id` | Integer | Selección nacional. **FK → national_teams.national_team_id**. Nullable | `3437` |
| `player_code` | String | Slug para URLs | `"lionel-messi"` |
| `country_of_birth` | String | País de nacimiento. Nullable | `"Argentina"` |
| `city_of_birth` | String | Ciudad de nacimiento. Nullable | `"Rosario"` |
| `country_of_citizenship` | String | Nacionalidad | `"Argentina"` |
| `date_of_birth` | Date (ISODate) | Fecha de nacimiento. Nullable | `ISODate("1987-06-24")` |
| `sub_position` | String | Posición específica | `"Right Winger"` |
| `position` | String | Posición general: Attack, Midfield, Defender, Goalkeeper | `"Attack"` |
| `foot` | String | Pie dominante. Nullable | `"left"`, `"right"`, `"both"` |
| `height_in_cm` | Integer | Altura en centímetros. Nullable | `170` |
| `contract_expiration_date` | Date (ISODate) | Vencimiento del contrato. Nullable | `ISODate("2028-12-31")` |
| `agent_name` | String | Nombre del agente/representante. Nullable | `null` |
| `image_url` | String | URL de la foto del jugador | `"https://img.a.transfermarkt..."` |
| `international_caps` | Integer | Partidos con la selección. Nullable | `198` |
| `international_goals` | Integer | Goles con la selección. Nullable | `116` |
| `url` | String | URL en Transfermarkt | `"https://www.transfermarkt.co.uk/..."` |
| `market_value_in_eur` | Integer | Valor de mercado actual en EUR | `15000000` |
| `highest_market_value_in_eur` | Integer | Valor de mercado máximo histórico en EUR | `180000000` |

### 3. Consultas de Ejemplo

```javascript
// CU001 - Buscar jugador por nombre
await db.collection('players').find(
  { name: { $regex: 'Messi', $options: 'i' } },
  { projection: { name: 1, position: 1, current_club_name: 1, market_value_in_eur: 1 } }
).toArray();

// CU006 - Perfil completo de un jugador por ID
await db.collection('players').findOne({ player_id: 28003 });
// → { name: "Lionel Messi", position: "Attack", foot: "left", ... }

// CU007 - Top 20 jugadores más valiosos
await db.collection('players').find(
  { market_value_in_eur: { $gt: 0 } },
  { projection: { name: 1, position: 1, current_club_name: 1, market_value_in_eur: 1 } }
).sort({ market_value_in_eur: -1 }).limit(20).toArray();

// CU001 - Buscar jugadores por posición y nacionalidad
await db.collection('players').find(
  { position: 'Attack', country_of_citizenship: 'Brazil' },
  { projection: { name: 1, sub_position: 1, current_club_name: 1, market_value_in_eur: 1 } }
).sort({ market_value_in_eur: -1 }).limit(10).toArray();

// CU014 - Jugadores de un club específico
await db.collection('players').find(
  { current_club_id: 27 },
  { projection: { name: 1, position: 1, sub_position: 1, market_value_in_eur: 1 } }
).sort({ position: 1 }).toArray();

// CU006 - Perfil de jugador con historial de transfers (aggregation)
await db.collection('players').aggregate([
  { $match: { player_id: 28003 } },
  { $lookup: {
      from: 'transfers',
      localField: 'player_id',
      foreignField: 'player_id',
      as: 'historial_transfers',
      pipeline: [
        { $sort: { transfer_date: -1 } }
      ]
  }},
  { $lookup: {
      from: 'clubs',
      localField: 'current_club_id',
      foreignField: 'club_id',
      as: 'club_actual'
  }},
  { $unwind: { path: '$club_actual', preserveNullAndEmptyArrays: true } }
]).toArray();

// CU009 - Comparar dos jugadores
await db.collection('players').find(
  { player_id: { $in: [28003, 8198] } },
  { projection: {
      name: 1, position: 1, sub_position: 1,
      market_value_in_eur: 1, highest_market_value_in_eur: 1,
      international_caps: 1, international_goals: 1,
      height_in_cm: 1, foot: 1, date_of_birth: 1
  }}
).toArray();
```

### 4. Índices

```javascript
// Búsqueda por ID (clave primaria lógica)
db.players.createIndex({ player_id: 1 }, { unique: true });
// Jugadores de un club
db.players.createIndex({ current_club_id: 1 });
// Filtro por posición
db.players.createIndex({ position: 1 });
// Filtro por nacionalidad
db.players.createIndex({ country_of_citizenship: 1 });
// Ranking por valor de mercado (descendente)
db.players.createIndex({ market_value_in_eur: -1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 47,690
db.players.countDocuments()

// b) Muestra de datos
db.players.findOne({ name: /Messi/i })

// c) Verificación de campos críticos
db.players.countDocuments({ position: "Missing" })  // debe ser bajo (< 10)
db.players.countDocuments({ market_value_in_eur: { $gt: 0 } })  // mayoría
db.players.distinct("position")
// debe incluir: Attack, Midfield, Defender, Goalkeeper

// d) Integridad referencial — jugadores cuyo club no existe
db.players.aggregate([
  { $lookup: { from: "clubs", localField: "current_club_id",
    foreignField: "club_id", as: "club" } },
  { $match: { club: { $size: 0 }, current_club_id: { $ne: null } } },
  { $count: "huerfanos" }
])
```

---

## games

### 1. Descripción General

Representa los **partidos de fútbol** jugados en todas las competiciones. Cada partido tiene equipos local y visitante, resultado, formación, estadio y árbitro. Es la colección que alimenta las vistas de calendario, resultados y estadísticas de partidos.

**Casos de uso:**
- **CU003** — Ver partidos de una competición y temporada
- **CU008** — Tabla de posiciones (calculada a partir de resultados)
- **CU015** — Detalle de un partido (resultado, alineaciones, eventos)

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce54b...")` |
| `game_id` | Integer | ID único del partido | `2262147` |
| `competition_id` | String | Competición. **FK → competitions.competition_id** | `"CL"` |
| `competition_type` | String | Tipo de competición (denormalizado) | `"international_cup"` |
| `season` | Integer | Temporada (año de inicio) | `2012` |
| `round` | String | Ronda o jornada | `"Group A"`, `"1. Matchday"`, `"Final"` |
| `date` | Date (ISODate) | Fecha del partido | `ISODate("2012-09-18")` |
| `home_club_id` | Integer | Club local. **FK → clubs.club_id** | `419` |
| `away_club_id` | Integer | Club visitante. **FK → clubs.club_id** | `720` |
| `home_club_goals` | Integer | Goles del local | `0` |
| `away_club_goals` | Integer | Goles del visitante | `2` |
| `home_club_position` | Integer | Posición en tabla del local. Nullable (vacío en copas) | `5`, `null` |
| `away_club_position` | Integer | Posición en tabla del visitante. Nullable | `3`, `null` |
| `home_club_manager_name` | String | DT del local | `"Ante Cacic"` |
| `away_club_manager_name` | String | DT del visitante | `"Vítor Pereira"` |
| `stadium` | String | Estadio donde se jugó. Nullable | `"Maksimir"` |
| `attendance` | Integer | Asistencia de público | `4683` |
| `referee` | String | Árbitro principal | `"Daniele Orsato"` |
| `home_club_formation` | String | Formación táctica del local. Nullable | `"4-3-3"`, `null` |
| `away_club_formation` | String | Formación del visitante. Nullable | `"4-4-2"`, `null` |
| `home_club_name` | String | Nombre del club local (denormalizado) | `"GNK Dinamo Zagreb"` |
| `away_club_name` | String | Nombre del club visitante (denormalizado) | `"FC do Porto"` |
| `aggregate` | String | Resultado agregado (ida+vuelta) | `"0:2"` |
| `url` | String | URL en Transfermarkt | `"https://www.transfermarkt.co.uk/..."` |

### 3. Consultas de Ejemplo

```javascript
// CU003 - Partidos de Champions League temporada 2023
await db.collection('games').find(
  { competition_id: 'CL', season: 2023 },
  { projection: { date: 1, home_club_name: 1, away_club_name: 1,
                   home_club_goals: 1, away_club_goals: 1, round: 1 } }
).sort({ date: -1 }).toArray();

// CU015 - Detalle de un partido por ID
await db.collection('games').findOne({ game_id: 2262147 });

// CU003 - Últimos 10 partidos de un club
await db.collection('games').find(
  { $or: [{ home_club_id: 27 }, { away_club_id: 27 }] }
).sort({ date: -1 }).limit(10).toArray();

// CU015 - Partido con alineaciones y eventos (aggregation completo)
await db.collection('games').aggregate([
  { $match: { game_id: 2262147 } },
  { $lookup: {
      from: 'game_events',
      localField: 'game_id',
      foreignField: 'game_id',
      as: 'eventos',
      pipeline: [{ $sort: { minute: 1 } }]
  }},
  { $lookup: {
      from: 'appearances',
      localField: 'game_id',
      foreignField: 'game_id',
      as: 'participaciones',
      pipeline: [
        { $project: { player_name: 1, player_club_id: 1, goals: 1,
                       assists: 1, yellow_cards: 1, red_cards: 1, minutes_played: 1 } }
      ]
  }}
]).toArray();

// CU003 - Partidos de una fecha específica
await db.collection('games').find(
  { date: { $gte: new Date('2024-01-01'), $lt: new Date('2024-01-08') } },
  { projection: { home_club_name: 1, away_club_name: 1,
                   home_club_goals: 1, away_club_goals: 1, competition_id: 1 } }
).sort({ date: 1 }).toArray();
```

### 4. Índices

```javascript
// Búsqueda por ID
db.games.createIndex({ game_id: 1 }, { unique: true });
// Partidos por competición y temporada (caso de uso más común)
db.games.createIndex({ competition_id: 1, season: 1 });
// Partidos por fecha (calendario, últimos resultados)
db.games.createIndex({ date: 1 });
// Partidos de un club como local
db.games.createIndex({ home_club_id: 1 });
// Partidos de un club como visitante
db.games.createIndex({ away_club_id: 1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 88,783
db.games.countDocuments()

// b) Muestra de datos
db.games.findOne({ competition_id: "CL", season: 2023 })

// c) Verificación de campos críticos
db.games.countDocuments({ home_club_goals: { $gte: 0 }, away_club_goals: { $gte: 0 } })
// debe ser igual al total
db.games.distinct("competition_type")
// debe incluir: domestic_league, international_cup, etc.

// d) Integridad referencial — partidos cuya competición no existe
db.games.aggregate([
  { $lookup: { from: "competitions", localField: "competition_id",
    foreignField: "competition_id", as: "comp" } },
  { $match: { comp: { $size: 0 } } },
  { $count: "partidos_sin_competicion" }
])
```

---

## appearances

### 1. Descripción General

Registra la **participación de un jugador en un partido**: goles, asistencias, tarjetas, minutos jugados. Es la tabla de estadísticas individuales por partido. Es la colección más grande por volumen y la base para calcular estadísticas acumuladas de jugadores.

**Casos de uso:**
- **CU006** — Historial de partidos de un jugador
- **CU007** — Estadísticas acumuladas (goles, asistencias por temporada)
- **CU009** — Comparar rendimiento entre jugadores
- **CU015** — Jugadores que participaron en un partido

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce556...")` |
| `appearance_id` | String | ID único. Formato: `{game_id}_{player_id}` | `"2244378_28003"` |
| `game_id` | Integer | Partido. **FK → games.game_id** | `2244378` |
| `player_id` | Integer | Jugador. **FK → players.player_id** | `28003` |
| `player_club_id` | Integer | Club del jugador al momento del partido. **FK → clubs.club_id** | `131` (FC Barcelona) |
| `player_current_club_id` | Integer | Club actual del jugador. **FK → clubs.club_id** | `69261` (Inter Miami) |
| `date` | Date (ISODate) | Fecha del partido | `ISODate("2012-08-19")` |
| `player_name` | String | Nombre del jugador (denormalizado) | `"Lionel Messi"` |
| `competition_id` | String | Competición. **FK → competitions.competition_id** | `"ES1"` |
| `yellow_cards` | Integer | Tarjetas amarillas (0, 1 o 2) | `0` |
| `red_cards` | Integer | Tarjetas rojas (0 o 1) | `0` |
| `goals` | Integer | Goles anotados | `2` |
| `assists` | Integer | Asistencias | `0` |
| `minutes_played` | Integer | Minutos jugados | `90` |

### 3. Consultas de Ejemplo

```javascript
// CU006 - Últimos 20 partidos de Messi
await db.collection('appearances').find(
  { player_id: 28003 },
  { projection: { date: 1, competition_id: 1, goals: 1, assists: 1,
                   minutes_played: 1, yellow_cards: 1 } }
).sort({ date: -1 }).limit(20).toArray();

// CU007 - Total de goles y asistencias de un jugador por temporada
await db.collection('appearances').aggregate([
  { $match: { player_id: 28003 } },
  { $lookup: {
      from: 'games',
      localField: 'game_id',
      foreignField: 'game_id',
      as: 'partido',
      pipeline: [{ $project: { season: 1 } }]
  }},
  { $unwind: '$partido' },
  { $group: {
      _id: '$partido.season',
      partidos: { $sum: 1 },
      goles: { $sum: '$goals' },
      asistencias: { $sum: '$assists' },
      amarillas: { $sum: '$yellow_cards' },
      rojas: { $sum: '$red_cards' },
      minutos: { $sum: '$minutes_played' }
  }},
  { $sort: { _id: -1 } }
]).toArray();

// CU015 - Jugadores que participaron en un partido específico
await db.collection('appearances').find(
  { game_id: 2244378 },
  { projection: { player_name: 1, player_club_id: 1, goals: 1,
                   assists: 1, minutes_played: 1, yellow_cards: 1, red_cards: 1 } }
).sort({ player_club_id: 1 }).toArray();

// CU007 - Máximos goleadores de una competición en una temporada
await db.collection('appearances').aggregate([
  { $match: { competition_id: 'ES1' } },
  { $lookup: {
      from: 'games',
      localField: 'game_id',
      foreignField: 'game_id',
      as: 'g',
      pipeline: [
        { $match: { season: 2023 } },
        { $project: { _id: 1 } }
      ]
  }},
  { $match: { 'g.0': { $exists: true } } },
  { $group: {
      _id: { player_id: '$player_id', player_name: '$player_name' },
      goles: { $sum: '$goals' },
      asistencias: { $sum: '$assists' },
      partidos: { $sum: 1 }
  }},
  { $sort: { goles: -1 } },
  { $limit: 10 }
]).toArray();

// CU009 - Comparar estadísticas acumuladas de dos jugadores
await db.collection('appearances').aggregate([
  { $match: { player_id: { $in: [28003, 8198] } } },
  { $group: {
      _id: '$player_id',
      total_goles: { $sum: '$goals' },
      total_asistencias: { $sum: '$assists' },
      total_partidos: { $sum: 1 },
      total_amarillas: { $sum: '$yellow_cards' },
      total_rojas: { $sum: '$red_cards' },
      total_minutos: { $sum: '$minutes_played' }
  }}
]).toArray();
```

### 4. Índices

```javascript
// ID único
db.appearances.createIndex({ appearance_id: 1 }, { unique: true });
// Participaciones de un partido
db.appearances.createIndex({ game_id: 1 });
// Historial de un jugador
db.appearances.createIndex({ player_id: 1 });
// Participaciones por club
db.appearances.createIndex({ player_club_id: 1 });
// Filtro por competición
db.appearances.createIndex({ competition_id: 1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 1,885,448
db.appearances.countDocuments()

// b) Muestra de datos
db.appearances.findOne({ player_name: /Messi/i })

// c) Verificación de campos críticos
db.appearances.countDocuments({ goals: { $gte: 0 }, assists: { $gte: 0 } })
// debe ser igual al total
db.appearances.countDocuments({ minutes_played: { $gt: 90 } })  // debe ser 0 o muy bajo

// d) Integridad referencial — appearances cuyo game no existe
db.appearances.aggregate([
  { $sample: { size: 1000 } },
  { $lookup: { from: "games", localField: "game_id",
    foreignField: "game_id", as: "game" } },
  { $match: { game: { $size: 0 } } },
  { $count: "huerfanos" }
])
```

---

## game_events

### 1. Descripción General

Registra los **eventos que ocurren durante un partido**: goles, tarjetas, sustituciones y tiros en tanda de penales. Cada evento tiene el minuto, el jugador involucrado y una descripción detallada. Es la colección que permite reconstruir la "crónica" del partido.

**Casos de uso:**
- **CU015** — Cronología de eventos de un partido
- **CU006** — Detalles de goles/tarjetas de un jugador
- **CU007** — Estadísticas de goles (tipo de gol, asistente)

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce571...")` |
| `game_event_id` | String | ID único (hash de 32 chars) | `"1d3fe98d430492e65c..."` |
| `date` | Date (ISODate) | Fecha del partido | `ISODate("2006-06-16")` |
| `game_id` | Integer | Partido. **FK → games.game_id** | `1126204` |
| `minute` | Integer | Minuto del evento. `-1` para tiros de penal en shootout | `88`, `-1` |
| `type` | String | Tipo: `"Goals"`, `"Cards"`, `"Substitutions"`, `"Shootout"` | `"Goals"` |
| `club_id` | Integer | Club del jugador. **FK → clubs.club_id** | `3437` |
| `club_name` | String | Nombre del club (denormalizado) | `"Argentina"` |
| `player_id` | Integer | Jugador involucrado. **FK → players.player_id** | `28003` |
| `description` | String | Descripción detallada del evento | `"Right-footed shot, 1. Tournament Goal"` |
| `player_in_id` | Integer | Jugador que entra (solo en sustituciones). **FK → players.player_id**. Nullable | `null` |
| `player_assist_id` | Integer | Jugador que dio la asistencia (solo en goles). **FK → players.player_id**. Nullable | `4276` |

### 3. Consultas de Ejemplo

```javascript
// CU015 - Cronología de eventos de un partido (ordenados por minuto)
await db.collection('game_events').find(
  { game_id: 1126204 },
  { projection: { minute: 1, type: 1, club_name: 1, player_id: 1, description: 1 } }
).sort({ minute: 1 }).toArray();

// CU006 - Todos los goles de Messi
await db.collection('game_events').find(
  { player_id: 28003, type: 'Goals' },
  { projection: { date: 1, minute: 1, club_name: 1, description: 1, player_assist_id: 1 } }
).sort({ date: -1 }).toArray();

// CU015 - Goles de un partido con nombre del asistente (aggregation)
await db.collection('game_events').aggregate([
  { $match: { game_id: 1126204, type: 'Goals' } },
  { $lookup: {
      from: 'players',
      localField: 'player_id',
      foreignField: 'player_id',
      as: 'goleador',
      pipeline: [{ $project: { name: 1 } }]
  }},
  { $lookup: {
      from: 'players',
      localField: 'player_assist_id',
      foreignField: 'player_id',
      as: 'asistente',
      pipeline: [{ $project: { name: 1 } }]
  }},
  { $unwind: { path: '$goleador', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$asistente', preserveNullAndEmptyArrays: true } },
  { $sort: { minute: 1 } }
]).toArray();

// CU007 - Tarjetas rojas en una competición
await db.collection('game_events').aggregate([
  { $match: { type: 'Cards' } },
  { $lookup: {
      from: 'games',
      localField: 'game_id',
      foreignField: 'game_id',
      as: 'g',
      pipeline: [
        { $match: { competition_id: 'ES1', season: 2023 } },
        { $project: { _id: 1 } }
      ]
  }},
  { $match: { 'g.0': { $exists: true } } },
  { $match: { description: /Red card/i } },
  { $count: 'tarjetas_rojas' }
]).toArray();
```

### 4. Índices

```javascript
// ID único
db.game_events.createIndex({ game_event_id: 1 }, { unique: true });
// Eventos de un partido
db.game_events.createIndex({ game_id: 1 });
// Eventos de un jugador
db.game_events.createIndex({ player_id: 1 });
// Filtro por tipo de evento
db.game_events.createIndex({ type: 1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 1,271,743
db.game_events.countDocuments()

// b) Muestra de datos
db.game_events.findOne({ player_id: 28003, type: "Goals" })

// c) Verificación de campos críticos
db.game_events.distinct("type")
// debe ser: ["Cards", "Goals", "Shootout", "Substitutions"]
db.game_events.countDocuments({ minute: -1 })  // penales en shootout

// d) Integridad referencial — eventos cuyo partido no existe
db.game_events.aggregate([
  { $sample: { size: 1000 } },
  { $lookup: { from: "games", localField: "game_id",
    foreignField: "game_id", as: "game" } },
  { $match: { game: { $size: 0 } } },
  { $count: "huerfanos" }
])
```

---

## transfers

### 1. Descripción General

Registra los **traspasos (fichajes) de jugadores** entre clubes: compras, ventas, cesiones, jugadores libres y retiros. Incluye la fecha, el precio del traspaso y el valor de mercado del jugador al momento de la transferencia. Un jugador puede tener múltiples transfers a lo largo de su carrera.

**Casos de uso:**
- **CU006** — Historial de traspasos de un jugador
- **CU002** — Fichajes de un club (entradas/salidas)
- **CU007** — Ranking de traspasos más caros
- **CU014** — Actividad del mercado de fichajes

### 2. Campos

| Campo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `_id` | ObjectId | ID interno MongoDB | `ObjectId("6a1ce5b5...")` |
| `player_id` | Integer | Jugador. **FK → players.player_id** | `28003` |
| `player_name` | String | Nombre del jugador (denormalizado) | `"Lionel Messi"` |
| `transfer_date` | Date (ISODate) | Fecha del traspaso | `ISODate("2023-07-15")` |
| `transfer_season` | String | Temporada del traspaso (formato corto) | `"23/24"` |
| `from_club_id` | Integer | Club de origen. **FK → clubs.club_id** | `583` (PSG) |
| `from_club_name` | String | Nombre del club de origen (denormalizado) | `"PSG"` |
| `to_club_id` | Integer | Club de destino. **FK → clubs.club_id** | `69261` (Inter Miami) |
| `to_club_name` | String | Nombre del club destino. Valores especiales: `"Without Club"`, `"Retired"` | `"Miami"` |
| `transfer_fee` | Float | Precio del traspaso en EUR. Nullable (0 = gratis/libre) | `0`, `222000000.0` |
| `market_value_in_eur` | Float | Valor de mercado al momento del traspaso. Nullable | `35000000` |

### 3. Consultas de Ejemplo

```javascript
// CU006 - Historial de traspasos de Messi (ordenado cronológicamente)
await db.collection('transfers').find(
  { player_id: 28003 },
  { projection: { transfer_date: 1, from_club_name: 1, to_club_name: 1,
                   transfer_fee: 1, market_value_in_eur: 1 } }
).sort({ transfer_date: -1 }).toArray();

// CU007 - Top 10 fichajes más caros de la historia
await db.collection('transfers').find(
  { transfer_fee: { $gt: 0 } },
  { projection: { player_name: 1, from_club_name: 1, to_club_name: 1,
                   transfer_fee: 1, transfer_date: 1 } }
).sort({ transfer_fee: -1 }).limit(10).toArray();

// CU002 - Fichajes de entrada a un club (jugadores que llegaron)
await db.collection('transfers').find(
  { to_club_id: 27 },
  { projection: { player_name: 1, from_club_name: 1, transfer_fee: 1, transfer_date: 1 } }
).sort({ transfer_date: -1 }).limit(20).toArray();

// CU002 - Fichajes de salida de un club
await db.collection('transfers').find(
  { from_club_id: 27 },
  { projection: { player_name: 1, to_club_name: 1, transfer_fee: 1, transfer_date: 1 } }
).sort({ transfer_date: -1 }).limit(20).toArray();

// CU014 - Actividad del mercado en una temporada
await db.collection('transfers').aggregate([
  { $match: { transfer_season: '23/24', transfer_fee: { $gt: 0 } } },
  { $group: {
      _id: null,
      total_fichajes: { $sum: 1 },
      gasto_total: { $sum: '$transfer_fee' },
      fichaje_mas_caro: { $max: '$transfer_fee' },
      promedio_fichaje: { $avg: '$transfer_fee' }
  }}
]).toArray();

// CU002 - Balance de fichajes de un club por temporada (aggregation)
await db.collection('transfers').aggregate([
  { $match: {
      $or: [{ from_club_id: 27 }, { to_club_id: 27 }],
      transfer_fee: { $gt: 0 }
  }},
  { $addFields: {
      tipo: { $cond: [{ $eq: ['$to_club_id', 27] }, 'compra', 'venta'] }
  }},
  { $group: {
      _id: { temporada: '$transfer_season', tipo: '$tipo' },
      total: { $sum: '$transfer_fee' },
      cantidad: { $sum: 1 }
  }},
  { $sort: { '_id.temporada': -1 } }
]).toArray();
```

### 4. Índices

```javascript
// Historial de un jugador
db.transfers.createIndex({ player_id: 1 });
// Orden cronológico
db.transfers.createIndex({ transfer_date: 1 });
// Fichajes de un club (origen)
db.transfers.createIndex({ from_club_id: 1 });
// Fichajes de un club (destino)
db.transfers.createIndex({ to_club_id: 1 });
```

### 5. Comandos de Verificación

```js
// a) Conteo básico — debe ser 174,222
db.transfers.countDocuments()

// b) Muestra de datos
db.transfers.findOne({ player_id: 28003 })

// c) Verificación de campos críticos
db.transfers.countDocuments({ transfer_fee: { $gt: 0 } })  // fichajes de pago
db.transfers.countDocuments({ to_club_name: "Retired" })   // jugadores retirados
db.transfers.countDocuments({ to_club_name: "Without Club" })  // sin club

// d) Integridad referencial — transfers cuyo jugador no existe
db.transfers.aggregate([
  { $sample: { size: 1000 } },
  { $lookup: { from: "players", localField: "player_id",
    foreignField: "player_id", as: "player" } },
  { $match: { player: { $size: 0 } } },
  { $count: "huerfanos" }
])
```

---

## Verificación Global

### Acceder a mongosh en el contenedor

```sh
docker exec -it footballdb-mongo mongosh \
  -u admin -p admin123 --authenticationDatabase admin footballdb
```

### Conteo de documentos de todas las colecciones

```js
db.getCollectionNames().sort().forEach(function(c) {
    var count = db[c].countDocuments();
    print("  " + c + ": " + count.toLocaleString() + " documentos");
});
```

**Valores esperados:**

| Colección | Documentos Esperados |
|---|---|
| `appearances` | 1,885,448 |
| `club_games` | 177,566 |
| `clubs` | 796 |
| `competitions` | 67 |
| `countries` | 118 |
| `game_events` | 1,271,743 |
| `game_lineups` | 3,171,445 |
| `games` | 88,783 |
| `national_teams` | 118 |
| `player_valuations` | 647,626 |
| `players` | 47,690 |
| `transfers` | 174,222 |
| **TOTAL** | **7,465,622** |

### Resumen de integridad referencial cruzada

```js
// Jugadores → Clubs
db.players.aggregate([
  { $lookup: { from: "clubs", localField: "current_club_id",
    foreignField: "club_id", as: "club" } },
  { $match: { club: { $size: 0 }, current_club_id: { $ne: null } } },
  { $count: "players_sin_club" }
]).forEach(printjson);

// Clubs → Competitions
db.clubs.aggregate([
  { $lookup: { from: "competitions", localField: "domestic_competition_id",
    foreignField: "competition_id", as: "comp" } },
  { $match: { comp: { $size: 0 }, domestic_competition_id: { $ne: null } } },
  { $count: "clubs_sin_competicion" }
]).forEach(printjson);

// Competitions → Countries
db.competitions.aggregate([
  { $match: { country_id: { $ne: -1 } } },
  { $lookup: { from: "countries", localField: "country_id",
    foreignField: "country_id", as: "pais" } },
  { $match: { pais: { $size: 0 } } },
  { $count: "competitions_sin_pais" }
]).forEach(printjson);

// National Teams → Countries
db.national_teams.aggregate([
  { $lookup: { from: "countries", localField: "country_id",
    foreignField: "country_id", as: "pais" } },
  { $match: { pais: { $size: 0 } } },
  { $count: "selecciones_sin_pais" }
]).forEach(printjson);

// Games → Competitions
db.games.aggregate([
  { $sample: { size: 5000 } },
  { $lookup: { from: "competitions", localField: "competition_id",
    foreignField: "competition_id", as: "comp" } },
  { $match: { comp: { $size: 0 } } },
  { $count: "games_sin_competicion" }
]).forEach(printjson);

// Transfers → Players (muestreo)
db.transfers.aggregate([
  { $sample: { size: 5000 } },
  { $lookup: { from: "players", localField: "player_id",
    foreignField: "player_id", as: "player" } },
  { $match: { player: { $size: 0 } } },
  { $count: "transfers_sin_jugador" }
]).forEach(printjson);

print("\n✅ Si todos los conteos son 0 o no aparecen, la integridad es correcta.");
```

### Tamaño de cada colección en disco

```js
db.getCollectionNames().sort().forEach(function(c) {
    var stats = db[c].stats();
    var sizeMB = (stats.storageSize / (1024 * 1024)).toFixed(1);
    var indexMB = (stats.totalIndexSize / (1024 * 1024)).toFixed(1);
    var total = (parseFloat(sizeMB) + parseFloat(indexMB)).toFixed(1);
    print("  " + c + ": datos=" + sizeMB + " MB, índices=" + indexMB + " MB, total=" + total + " MB");
});
```

### Verificar que todos los índices están creados

```js
db.getCollectionNames().sort().forEach(function(c) {
    var indexes = db[c].getIndexes();
    print("\n📇 " + c + " (" + (indexes.length - 1) + " índices personalizados):");
    indexes.forEach(function(idx) {
        if (idx.name !== '_id_') {
            print("  → " + idx.name + (idx.unique ? " (unique)" : ""));
        }
    });
});
```
