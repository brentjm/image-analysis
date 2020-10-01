FROM python:3.6
RUN mkdir /app
COPY ./flask_app/app.py /app/app.py
WORKDIR /app
RUN pip install flask gunicorn
EXPOSE 8000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:application"]
