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
          return res.render('auth/login', { errorMessage: 'Error leyendo usuarios' });
        }

        let users = [];

        try {
            users = JSON.parse(data);
        } catch {
            return res.render('auth/login', { errorMessage: 'Error leyendo información' });
        }

        const user = users.find(u => u.username === username);
        if (!user) {
          return res.render('auth/login', { errorMessage: 'El usuario no existe' });
        }

        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
          return res.render('auth/login', { errorMessage: 'Contraseña Incorrecta' });
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
        return res.render('auth/register', { errorMessage: 'No puede haber campos vacíos' })
    }
     if (password !== repeatPassword) {
      return res.render('auth/register', { errorMessage: 'Las contraseñas no coinciden' })
    }
    if(password.length < 6) {
      return res.render('auth/register', { errorMessage: 'La contraseña debe tener una longitud mínima de 6 carácteres' })
    }

    fs.readFile(filePath, 'utf8', async (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch {        
        return res.render('auth/register', { errorMessage: 'Error leyendo los datos de usuario' });
      }
    }
    
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.render('auth/register', { errorMessage: 'Ya existe una cuenta con este usuario' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, hashedPassword };
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.render('auth/register', { errorMessage: 'Error al guardar los datos' });
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