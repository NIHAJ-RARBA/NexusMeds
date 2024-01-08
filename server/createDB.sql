CREATE DATABASE NEXUSMEDS;

CREATE TABLE Person (
    person_id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL, 
    phone VARCHAR(15) UNIQUE NOT NULL,

    fullname VARCHAR(255),
    date_of_birth DATE NOT NULL,
    profile_pic bytea,
    gender BOOLEAN,
    _address VARCHAR(255)
);