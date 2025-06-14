import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

const filePath = path.resolve('src/data/users.json');

const login = async (req, res) => {
    res.render('auth/login', { errorMessage: null })
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username }, process.env.SECRET_JWT, { 
        expiresIn: '1h' 
      });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          return res.render('auth/login', { errorMessage: 'Error reading users' });
        }

        let users = [];

        try {
            users = JSON.parse(data);
        } catch {
            return res.render('auth/login', { errorMessage: 'Error reading user data' });
        }

        const user = users.find(u => u.username === username);
        if (!user) {
          return res.render('auth/login', { errorMessage: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
          return res.render('auth/login', { errorMessage: 'Wrong password' });
        }

        //TODO: Pasar el usuario a la sesión (express-session).
        //Si lo hago con jwt borrar express-session
        res.redirect('../contracts');
  });
}

const register = async (req, res) => {
    res.render('auth/register', { errorMessage: null })
}

const registerUser = async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if([username, password, repeatPassword].includes('')){
        return res.render('auth/register', { errorMessage: 'All fields are required' })
    }
     if (password !== repeatPassword) {
      return res.render('auth/register', { errorMessage: 'Passwords do not match' })
    }
    if(password.length < 6) {
      return res.render('auth/register', { errorMessage: 'Password must be at least 6 characters long' })
    }

    fs.readFile(filePath, 'utf8', async (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch {        
        return res.render('auth/register', { errorMessage: 'Error reading user data' });
      }
    }
    
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.render('auth/register', { errorMessage: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, hashedPassword };
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.render('auth/register', { errorMessage: 'Failed to save user data' });
      }

      res.render('auth/login', {
        errorMessage: null
      });
    });
  });
}

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};

export {
    login,
    loginUser,
    register,
    registerUser,
    logoutUser
}