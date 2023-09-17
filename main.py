import flask
from flask_cors import CORS
from GPT4 import llm_call

app = flask.Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/callGPT', methods=['POST'])
def get_data():
    data = flask.request.get_json()
    print(data)

    response = llm_call.call_gpt4([data['breakfast']['meal'], data['breakfast']['satiety'],
                                   data['lunch']['meal'], data['lunch']['satiety'],
                                   data['dinner']['meal'], data['dinner']['satiety'],
                                   data['snack']['meal'], data['snack']['satiety'],
                                   data['age'], data['gender'], data['height'], data['weight'], data['ethnicity']])
    data = {"message": response}
    return flask.jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)