"""
Flask application for Python image calculations.
"""

from flask import Flask, request
import psycopg2
from PIL import Image
from io import BytesIO
import base64
import numpy as np

con = psycopg2.connect(database="SPECTech", user="postgres",host="postgres", port="5432")
cursor = con.cursor()


application = Flask(__name__)



@application.route("/getimages")
def getimages():
    """
    Default route
    """
    cursor.execute("select * from images")
    result = cursor.fetchall()
    response= []
    for item in result:
        img_response = {}
        arr = np.array(item[2])
        img = Image.fromarray(np.uint8(arr))
        # img = Image.fromarray(arr)
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())
        img_response['name'] = item[1]
        img_response['data'] = img_str.decode("utf-8")
        response.append(img_response)
    return {"response": response}

@application.route("/denoise")
def denoise():
    return {"response": 'denoise operation performed'}


if __name__ == "__main__":
    application.run(host="0.0.0.0:5000")
