DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  fname VARCHAR(100) NOT NULL,
  lname VARCHAR(100) NOT NULL
)
;

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
)
;

DROP TABLE IF EXISTS replies;
CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  parent_reply_id INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (parent_reply_id) REFERENCES replies(id)
)
;

DROP TABLE IF EXISTS question_likes;
CREATE TABLE question_likes (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,


  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
)
;

DROP TABLE IF EXISTS question_follows;
CREATE TABLE question_follows (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
)
;


INSERT INTO
  users (fname, lname)
VALUES
  ('Alexander', 'Marks-Katz'),
  ('Nicholas', 'Williams')
;

INSERT INTO
  questions (title, body, user_id)
VALUES
  ("Today's date", 'What day is today, again?', 1),
  ('Existentialism', 'WHY ARE WE HERE?!?!?!?!?!', 2)
;

INSERT INTO
  replies (body, user_id, question_id, parent_reply_id)
VALUES
  ('To become very well-paid software engineers.', 1, 2, NULL),
  ('It''s Tuesday', 2, 1, NULL),
  ('thx', 1, 1, 2)
;

INSERT INTO
  question_likes (user_id, question_id)
VALUES
  (1, 2), (2, 1)
;

INSERT INTO
  question_follows (user_id, question_id)
VALUES
  (1, 2)
;
