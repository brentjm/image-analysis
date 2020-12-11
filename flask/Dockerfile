FROM python:3.6
RUN mkdir /app
RUN pip install flask gunicorn  psycopg2 numpy pillow
COPY ./flask_app/app.py /app/app.py
WORKDIR /app
EXPOSE 8000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:application"]
