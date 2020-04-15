const bcrypt = require('bcryptjs');

async function register(req, res) {
  const { username, password } = req.body;
  const db = req.app.get('db');

  const foundUser = await db.user.get_user(username).catch(err => console.error(err));
  if (foundUser.length !== 0) return res.status(406).json('Username Taken');

  const hash = bcrypt.hashSync(password, 12);
  const registeredUser = await db.user.register_user(username, hash);

  const user = registeredUser[0];
  req.session.user = { username: user.username, user_id: user.user_id };

  return res.status(201).json(req.session.user);
}

async function login(req, res) {
  const { username, password } = req.body;
  const db = req.app.get('db');

  const foundUser = await db.user.get_user(username).catch(err => console.error(err));
  if (foundUser.length === 0) return res.status(401).json('User Not Found');
  const user = foundUser[0];
  const isAuth = await bcrypt.compare(password, user.password);
  if (isAuth) {
    req.session.user = { username: user.username, user_id: user.user_id };
    return res.status(202).json(req.session.user);
  }

  return res.status(401).json('Username or Password incorrect');
}

function logout(req, res) {
  req.session.destroy();
  res.sendStatus(200);
}

function getSession(req, res) {
  return req.session.user ? res.status(200).json(req.session.user) : res.status(403).json('Session does not exist');
}


module.exports = {
  register,
  login,
  logout,
  getSession
}