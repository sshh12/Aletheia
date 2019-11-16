import os
from flask import Flask

BUILD_DIR = os.path.join(os.path.dirname(__file__), 'build')

app = Flask(__name__, static_url_path='', static_folder=BUILD_DIR)


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/2')
def index2():
    return app.send_static_file('index2.html')

@app.route('/3')
def index3():
    return app.send_static_file('index-demo.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 5000), debug=True)