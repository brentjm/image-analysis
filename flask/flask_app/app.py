"""
Flask application for Python image calculations.
"""

from flask import Flask

application = Flask(__name__)


@application.route("/denoise")
def denoise():
    """
    Default route
    """
    return "Flask has executed denoise algorithm"


if __name__ == "__main__":
    application.run(host="0.0.0.0:5000")
