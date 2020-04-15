SELECT p.post_id,p.title,u.username,u.profile_pic FROM posts p
JOIN users2 u ON u.user_id = p.author_id
WHERE p.title ILIKE $1;