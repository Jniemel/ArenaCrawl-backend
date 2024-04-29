import jwt from 'jsonwebtoken';

export default function authUser(req, res, next) {
  const token = req.cookies.jwt;

  // check jwt exists & verify
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res.status(401).json({ err });
      }
      // save user id in request
      req.username = decoded.username;
      req.userId = decoded.id;
      next();
      return null;
    });
  }
  return res.status(401);
}
