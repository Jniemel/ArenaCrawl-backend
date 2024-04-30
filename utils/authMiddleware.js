import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
export default function authUser(req, res, next) {
  console.log('auth called');
  const token = req.cookies.jwt;

  // check jwt exists & verify
  if (!token) {
    console.log('no token found');
    return res
      .status(401)
      .json({ error: 401, msg: 'Authorization failed: No token found' });
  }
  console.log('token found');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res
        .status(401)
        .json({ error: 401, msg: `Authorization failed: ${err}` });
    }
    // save user id in request
    req.username = decoded.username;
    req.userId = decoded.id;
    next();
    return null;
  });
}
