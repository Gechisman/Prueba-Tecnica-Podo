import jwt from 'jsonwebtoken';

const checkNotAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_JWT);
      return res.redirect('/contracts');
    } catch (err) {
      return next();
    }
  }

  next();
};

export default checkNotAuth;
