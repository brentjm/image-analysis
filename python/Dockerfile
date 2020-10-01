FROM python:3.6

RUN useradd --create-home --home /home/psycopg --shell /bin/bash --uid 1000 --user-group psycopg\
  && pip install psycopg2 numpy

USER psycopg
RUN mkdir /home/psycopg/python
COPY --chown=psycopg:psycopg ./psycopg.py /home/psycopg/python/
WORKDIR /home/psycopg/python

#CMD ["/bin/bash", "-c", "sleep 1000000000"]
CMD ["python", "psycopg.py"]
