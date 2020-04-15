INSERT INTO users2
  (username, password)
VALUES
  ($1, $2)
RETURNING *;