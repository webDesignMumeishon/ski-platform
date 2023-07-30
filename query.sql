SELECT p.id as post_id, c.id as comment_id, c.parent, c.created_at, u.first_name, u.last_name, l.post_id, l.user_id like_user_id
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
LEFT JOIN likes l ON l.post_id = p.id AND c.user_id = l.user_id 
JOIN users u ON u.id = c.user_id
WHERE p.id = 1
ORDER BY c.created_at ASC;


SELECT p.id as post_id, c.id, c.parent, c.created_at, u.first_name, u.last_name FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
JOIN users u ON u.id = c.user_id
WHERE p.id = 1
ORDER BY c.created_at ASC;