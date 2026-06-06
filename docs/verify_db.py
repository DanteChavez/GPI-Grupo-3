"""
verify_db.py — Script básico para verificar el buen funcionamiento
de la base de datos FootballDB en MongoDB mediante consultas de ejemplo en Python.

Requiere: pip install pymongo
Uso: python verify_db.py
"""

import sys
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# Conexión a MongoDB (usando las credenciales de docker-compose)
URI = "mongodb://admin:admin123@localhost:27017/footballdb?authSource=admin"

try:
    # serverSelectionTimeoutMS limita el tiempo de espera si no hay conexión
    client = MongoClient(URI, serverSelectionTimeoutMS=5000)
    # Verificar la conexión con un ping
    client.admin.command('ping')
    print("✅ Conectado exitosamente a MongoDB.\n")
except ConnectionFailure:
    print("❌ Error: No se pudo conectar a MongoDB.")
    print("Asegúrate de que los contenedores estén corriendo (docker compose up -d).")
    sys.exit(1)

db = client['footballdb']

def separator(title):
    print(f"\n{'-'*70}")
    print(f" {title}")
    print(f"{'-'*70}")

# =====================================================================
# EJEMPLOS BÁSICOS DE VERIFICACIÓN (10 Consultas)
# =====================================================================

# 1. Conteo básico
separator("1. Conteo total de jugadores (players)")
total_players = db.players.count_documents({})
print(f"Total de jugadores en la base de datos: {total_players:,}")

# 2. Búsqueda por texto y campos específicos
separator("2. Buscar un jugador por nombre (Lionel Messi)")
messi = db.players.find_one(
    {"name": {"$regex": "Lionel Messi", "$options": "i"}},
    {"_id": 0, "player_id": 1, "name": 1, "market_value_in_eur": 1}
)
if messi:
    print(f"ID: {messi.get('player_id')}, Nombre: {messi.get('name')}, "
          f"Valor actual: €{messi.get('market_value_in_eur', 0):,}")

# 3. Consultar otra entidad principal
separator("3. Obtener perfil de un club (FC Bayern München)")
bayern = db.clubs.find_one(
    {"name": {"$regex": "Bayern", "$options": "i"}},
    {"_id": 0, "club_id": 1, "name": 1, "stadium_name": 1}
)
if bayern:
    print(f"ID: {bayern.get('club_id')}, Nombre: {bayern.get('name')}, "
          f"Estadio: {bayern.get('stadium_name')}")

# 4. Obtener documentos relacionados (uno a muchos)
separator("4. Obtener plantilla actual de un club (Ej. Bayern München)")
if bayern:
    bayern_players = list(db.players.find(
        {"current_club_id": bayern.get("club_id")},
        {"_id": 0, "name": 1, "position": 1}
    ).limit(5))
    print("Ejemplos de jugadores actuales:")
    for p in bayern_players:
        print(f" - {p.get('name')} ({p.get('position')})")

# 5. Filtrar por fecha y ordenamiento
separator("5. Últimos resultados de Champions League (Temporada 2023)")
cl_games = list(db.games.find(
    {"competition_id": "CL", "season": 2023},
    {"_id": 0, "date": 1, "home_club_name": 1, "away_club_name": 1, "home_club_goals": 1, "away_club_goals": 1}
).sort("date", -1).limit(3))
for g in cl_games:
    date_str = g.get('date').strftime("%Y-%m-%d") if g.get('date') else "N/A"
    print(f"{date_str}: {g.get('home_club_name')} {g.get('home_club_goals')} - "
          f"{g.get('away_club_goals')} {g.get('away_club_name')}")

# 6. Historial de un jugador (ejemplo con Lionel Messi)
separator("6. Historial de traspasos de un jugador (Lionel Messi)")
if messi:
    transfers = list(db.transfers.find(
        {"player_id": messi.get("player_id")},
        {"_id": 0, "transfer_date": 1, "from_club_name": 1, "to_club_name": 1, "transfer_fee": 1}
    ).sort("transfer_date", -1))
    for t in transfers:
        date_str = t.get('transfer_date').strftime("%Y") if t.get('transfer_date') else "N/A"
        print(f"{date_str}: {t.get('from_club_name')} ➔ {t.get('to_club_name')} "
              f"(Costo: €{t.get('transfer_fee', 0):,})")

# 7. Ranking top (ordenar valores numéricos)
separator("7. Top 5 jugadores más valiosos del mundo")
top_valuable = list(db.players.find(
    {"market_value_in_eur": {"$gt": 0}},
    {"_id": 0, "name": 1, "market_value_in_eur": 1, "current_club_name": 1}
).sort("market_value_in_eur", -1).limit(5))
for i, p in enumerate(top_valuable, 1):
    print(f"{i}. {p.get('name')} ({p.get('current_club_name')}): €{p.get('market_value_in_eur'):,}")

# 8. Consulta en otra colección (selecciones nacionales)
separator("8. Top 3 selecciones según Ranking FIFA")
top_teams = list(db.national_teams.find(
    {"fifa_ranking": {"$gt": 0}},
    {"_id": 0, "name": 1, "fifa_ranking": 1, "confederation": 1}
).sort("fifa_ranking", 1).limit(3))
for t in top_teams:
    print(f"#{t.get('fifa_ranking')} {t.get('name')} ({t.get('confederation')})")

# 9. Verificación de integridad cruzada con Aggregate ($lookup)
separator("9. Integridad: Competiciones domésticas sin país asignado")
# Busca ligas domésticas cuyo country_id no tiene coincidencia en la colección countries
orphan_comps = list(db.competitions.aggregate([
    {"$match": {"type": "domestic_league"}},
    {"$lookup": {
        "from": "countries",
        "localField": "country_id",
        "foreignField": "country_id",
        "as": "pais_relacionado"
    }},
    {"$match": {"pais_relacionado": {"$size": 0}}}
]))
print(f"Competiciones huérfanas encontradas: {len(orphan_comps)} (Se espera 0)")

# 10. Listar colecciones y su tamaño para verificar la importación completa
separator("10. Resumen de documentos cargados por colección")
for coll_name in sorted(db.list_collection_names()):
    count = db[coll_name].count_documents({})
    print(f" - {coll_name}: {count:,} documentos")

print("\n✅ Script de verificación completado exitosamente.")
client.close()
