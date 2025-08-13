import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const PORT = 3000;
const baseUrl = "/trackly_api";
const app = express();

dotenv.config();
const validUrl = 'http://localhost:1008';

app.use(express.json());
app.use(cors({
  origin: validUrl,
  credentials: true,
}));
app.use(baseUrl + '/auth', authRoutes)

app.listen(PORT, () => { console.log('init trackly'); })