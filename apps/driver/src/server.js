import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.example' });
const app = express();
const port = process.env.DRIVER_PORT || 3002;
app.use(express.static(new URL('.', import.meta.url).pathname));
app.listen(port, () => console.log(`Driver app on http://localhost:${port}`));
