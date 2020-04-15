CREATE TABLE users2
(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password TEXT UNIQUE NOT NULL,
  profile_pic TEXT
);

CREATE TABLE posts
(
  post_id SERIAL PRIMARY KEY,
  author_id INTEGER REFERENCES users2(user_id),
  title VARCHAR(45),
  img TEXT,
  content TEXT
);