begin;
create table images
(
    timestamp bigint primary key,
    name character varying(40),
    intensity integer[][][] not null
);
commit;
