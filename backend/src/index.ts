import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

const PORT = 3000;
const baseUrl = "/trackly_api";
const app = express();

dotenv.config();

app.use(express.json());
app.use(baseUrl + '/auth', authRoutes)

app.listen(PORT, () => { console.log('init trackly'); })