  
SELECT * FROM posts p
JOIN userss u ON u.user_id = p.author_id
WHERE p.author_id = $1;