-- Seed data for BYU-I Parking app
-- The password values below correspond to these plaintext examples:
--   Student123! and Faculty123!

INSERT INTO users (name, email, password_hash, role)
VALUES
  ('Sample Student', 'student@byui.edu', '$2a$10$Uu3NOm0NOCEXP49qSHQMiuepaxJbZ5zoK0VMgq67fW8zkyXF0NGL.', 'Student'),
  ('Sample Faculty', 'faculty@byui.edu', '$2a$10$5SA2fiumQxiD5WILJuASNO/qeOd.VX.vtOXaDrrO4mwkliDOetVSS', 'Faculty')
ON CONFLICT (email) DO NOTHING;

INSERT INTO parking_lots (name, location, total_spots, available_spots, permit_types, distance, lat, lng, has_accessible_spots, has_ev_charging, has_compact_spots)
VALUES
  ('Manwaring Lot', 'Near MC / Student Center', 120, 18, ARRAY['Student', 'Faculty'], '0.2 mi', 43.8154, -111.7834, TRUE, TRUE, TRUE),
  ('Library Lot', 'Near McKay Library', 90, 4, ARRAY['Student'], '0.4 mi', 43.8184, -111.7837, TRUE, FALSE, TRUE),
  ('Hart Lot', 'Near Hart Building', 160, 42, ARRAY['Student', 'Visitor'], '0.6 mi', 43.8202, -111.7846, FALSE, TRUE, FALSE),
  ('Stadium Lot', 'Near Stadium / Athletic Fields', 200, 67, ARRAY['Student', 'Visitor'], '0.8 mi', 43.8211, -111.7868, TRUE, FALSE, FALSE)
ON CONFLICT (name) DO NOTHING;

INSERT INTO parking_spots (lot_id, spot_number, spot_type, is_available)
SELECT lot.id, CONCAT('A', row_number() OVER (PARTITION BY lot.id ORDER BY lot.id)),
  CASE
    WHEN row_number() OVER (PARTITION BY lot.id ORDER BY lot.id) % 15 = 0 THEN 'EV'
    WHEN row_number() OVER (PARTITION BY lot.id ORDER BY lot.id) % 10 = 0 THEN 'Accessible'
    WHEN row_number() OVER (PARTITION BY lot.id ORDER BY lot.id) % 8 = 0 THEN 'Compact'
    ELSE 'Standard'
  END,
  TRUE
FROM parking_lots AS lot
CROSS JOIN generate_series(1, 20) AS g(n)
ON CONFLICT DO NOTHING;
