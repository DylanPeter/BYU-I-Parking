-- Create the project database and application role.
-- This database requires SSL/TLS, so run psql with sslmode=require.
-- Example:
--   PGSSLMODE=require psql "postgresql://postgres@<host>:5432/postgres" -f src/sql/create_db.sql
-- Then run:
--   PGSSLMODE=require psql "postgresql://postgres@<host>:5432/byui_parking" -f src/sql/db.sql
--   PGSSLMODE=require psql "postgresql://postgres@<host>:5432/byui_parking" -f src/sql/seed.sql

-- Update the password before running if you want a different secret.
CREATE ROLE byui_parking_user WITH LOGIN PASSWORD 'pyPiyTeUuGEP3sk4jOXnlhjNdQsUPdDP';

CREATE DATABASE byui_parking OWNER byui_parking_user;

\connect byui_parking;

-- Once the database exists, run the schema script:
-- \i src/sql/db.sql
