from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS (app, resources={r"/api/*": {"origins": "http://localhost:3005"}})

# Connect to MongoDB (Replace with your MongoDB connection string)
client = MongoClient("mongodb://localhost:27017/")
db = client["rtsp_app_db"]
overlay_settings_collection = db["overlay_settings"]

@app.route("/")
def home():
    return "Hello, World!" 

@app.route("/api/overlay_settings", methods=["OPTIONS"])
def handle_preflight():
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3005"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.route("/api/overlay_settings", methods=["GET"])
def get_overlay_settings():
    overlay_settings = list(overlay_settings_collection.find({}, {"_id": 0}))
    response = jsonify(overlay_settings)
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3005"
    return response

@app.route("/api/overlay_settings", methods=["POST"])
def add_overlay_settings():
    data = request.get_json()
    overlay_settings_collection.insert_one(data)
    
    response = jsonify({"message": "Overlay settings created successfully"})
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3005"
    return response

if __name__ == "__main__":
    app.run(debug=True, port=5000)
