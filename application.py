from flask import Flask,request,jsonify,send_from_directory
from flask_cors import CORS

from src.pipeline.predict_pipeline import PredictPipeline,CustomData

application = Flask(__name__,static_folder="app/build",static_url_path="/")

app = application
CORS(app)

@app.route("/",methods=["POST"])
def index():
    return jsonify("Rajveer Singh")

@app.route("/api/predict",methods=["GET","POST"])
def predict_datapoint():
    if request.method == "GET":
        return jsonify("Rajveer Singh")
    else:
        json_data = request.get_json()
        
        data=CustomData(
            gender=json_data["gender"],
            race_ethnicity=json_data["race_ethnicity"],
            parental_level_of_education=json_data["parental_level_of_education"],
            lunch=json_data["lunch"],
            test_preparation_course=json_data["test_preparation_course"],
            reading_score=float(json_data["reading_score"]),
            writing_score=float(json_data["writing_score"])
            )
        pred_df = data.get_data_as_data_frame()
       
        predict_pipeline = PredictPipeline()
        results = predict_pipeline.predict(pred_df)
       

        return jsonify(results[0])
    

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, path) if path else send_from_directory(app.static_folder, 'index.html')

if __name__=="__main__":
    app.run(host="0.0.0.0")

