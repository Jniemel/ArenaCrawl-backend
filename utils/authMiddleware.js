import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check jwt exists & verify 
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
      if (err) {
        console.log(err.message);
        return res.redirect('/login');
      }
      next();
    })
  }
  return res.redirect('/login');  
};
