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
    arg1 = str(data.get('arg1'))
    arg2 = str(data.get('arg2'))
    arg3 = str(data.get('arg3'))

    response = llm_call.call_gpt4([arg1, arg2, arg3])
    print(response)
    data = {"message": response}
    return flask.jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)