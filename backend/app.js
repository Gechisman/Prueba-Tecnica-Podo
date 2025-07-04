import express from 'express'
import router from './src/routes/index.js'
import dotenv from 'dotenv'
import sequelize from './src/config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

sequelize.authenticate()
  .then(() => console.log('✔️  Database Connected'))
  .catch(err => console.error('❌  Error connecting to database:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', router)

app.set('view engine', 'ejs')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'src/views')); 
app.use(express.static(path.join(__dirname, 'src/public')));

const PORT = process.env.PORT || 3500
app.listen(PORT, () =>{
    console.log(`App funcionando en http://localhost:${PORT}`);
})