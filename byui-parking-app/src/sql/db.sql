-- Database schema for BYU-I Parking app
-- Run this script against the target database (e.g. byui_parking).

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Student', 'Faculty')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parking_lots (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  total_spots INTEGER NOT NULL DEFAULT 0,
  available_spots INTEGER NOT NULL DEFAULT 0,
  permit_types TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  distance TEXT,
  lat NUMERIC(10,6),
  lng NUMERIC(10,6),
  has_accessible_spots BOOLEAN NOT NULL DEFAULT FALSE,
  has_ev_charging BOOLEAN NOT NULL DEFAULT FALSE,
  has_compact_spots BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parking_spots (
  id SERIAL PRIMARY KEY,
  lot_id INTEGER NOT NULL REFERENCES parking_lots(id) ON DELETE CASCADE,
  spot_number TEXT NOT NULL,
  spot_type TEXT NOT NULL CHECK (spot_type IN ('Standard', 'Accessible', 'EV', 'Compact', 'Visitor')),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(lot_id, spot_number)
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  lot_id INTEGER REFERENCES parking_lots(id) ON DELETE CASCADE,
  spot_id INTEGER REFERENCES parking_spots(id) ON DELETE SET NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Completed', 'Cancelled')),
  reservation_code TEXT NOT NULL UNIQUE,
  permit_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_lot_id ON reservations(lot_id);
CREATE INDEX IF NOT EXISTS idx_parking_lots_permit_types ON parking_lots USING GIN (permit_types);
