SELECT * FROM posts p
JOIN users2 u ON u.user_id = p.author_id
WHERE p.author_id = $1;