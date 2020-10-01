FROM postgres:latest

USER postgres
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgrespassword
ENV POSTGRES_DB SPECTech

COPY --chown=postgres:postgres ./create_database.sql /docker-entrypoint-initdb.d/.
