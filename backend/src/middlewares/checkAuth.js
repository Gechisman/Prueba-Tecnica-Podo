import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/auth/login');
  }
};

export default checkAuth;