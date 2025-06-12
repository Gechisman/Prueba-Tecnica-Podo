import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/users.json');

const login = async (req, res) => {
    res.render('auth/login')
    
}

const register = async (req, res) => {
    res.render('auth/register')
}

const registerUser = async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    console.log(req.body);

    if([username, password, repeatPassword].includes('')){
        return res.status(400).send(('All fields are required'))
    }
     if (password !== repeatPassword) {
        return res.status(400).send('Passwords do not match');
    }
    if(password.length < 6) {
      return res.status(400).send('Password must be at least 6 characters long')
    }

    const newUser = { username, password };

    fs.readFile(filePath, 'utf8', (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch {
        return res.status(500).send('Error parsing user data');
      }
    }
    
    const userExists = users.find(user => user.username === username);

    if (userExists) {
      return res.status(400).send('User already registered');
    }
    
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Failed to save user data');
      }

      res.status(200).send('Successfully registered user');
    });
  });
}

export {
    login,
    register,
    registerUser
}