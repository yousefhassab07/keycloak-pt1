from flask import Flask, request, jsonify, g
from flask_cors import CORS
from auth import require_auth, require_role
from db import Database

app = Flask(__name__)
# Configurazione CORS più robusta
CORS(app, resources={r"/*": {"origins": "*"}})

db = Database()

@app.route("/voti", methods=["GET"])
@require_auth
def get_voti():
    try:
        ruoli_utente = g.user.get("realm_access", {}).get("roles", [])
        username = g.user.get("preferred_username")

        if "docente" in ruoli_utente:
            voti = db.esegui_query("SELECT * FROM voti")
            return jsonify({"voti": voti})
        elif "studente" in ruoli_utente:
            voti = db.esegui_query("SELECT * FROM voti WHERE nome_studente = %s", (username,))
            return jsonify({"voti": voti})
        else:
            return jsonify({"error": "Permesso negato"}), 403
    except Exception as e:
        print(f"Errore GET: {e}") # Questo apparirà nel terminale
        return jsonify({"error": str(e)}), 500

@app.route("/voti", methods=["POST"])
@require_auth
@require_role("docente")
def add_voto():
    try:
        data = request.get_json()
        nome_studente = data.get("nome_studente")
        materia = data.get("materia")
        voto = data.get("voto")

        db.esegui_query(
            "INSERT INTO voti (nome_studente, materia, voto) VALUES (%s, %s, %s)",
            (nome_studente, materia, voto)
        )
        return jsonify({"message": "Voto inserito"}), 201
    except Exception as e:
        print(f"Errore POST: {e}") # Questo apparirà nel terminale
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)