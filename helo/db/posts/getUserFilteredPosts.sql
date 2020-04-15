SELECT p.post_id,p.title,u.username,u.profile_pic FROM posts p
JOIN users2 u ON u.user_id = p.author_id
WHERE p.author_id=$1 and p.title ILIKE $2;