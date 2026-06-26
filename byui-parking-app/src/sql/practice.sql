-- Practice queries for the BYU-I Parking database.

-- Find all student and faculty users.
SELECT id, name, email, role, created_at
FROM users
ORDER BY role, name;

-- Lookup available parking lots that accept visitor parking.
SELECT id, name, location, total_spots, available_spots, permit_types
FROM parking_lots
WHERE permit_types @> ARRAY['Visitor']::TEXT[]
ORDER BY name;

-- Example reservation insertion pattern.
-- INSERT INTO reservations (user_id, lot_id, spot_id, start_time, end_time, status, reservation_code, permit_type)
-- VALUES (1, 3, 45, NOW(), NOW() + INTERVAL '2 hours', 'Confirmed', 'RES-123456', 'Visitor');

-- Report active reservations per lot.
SELECT lot_id, COUNT(*) AS reservation_count
FROM reservations
WHERE status = 'Confirmed'
GROUP BY lot_id
ORDER BY reservation_count DESC;
