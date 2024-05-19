/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

export default function checkAuth(req, res) {
  const token = req.cookies.jwt;

  // check jwt exists & verify
  if (!token) {
    return res.status(401).end();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.status(401).end();
    }
    const { username } = decoded;
    return res.status(200).json({ username });
  });
}
