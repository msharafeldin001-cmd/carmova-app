import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.example' });
const app = express();
const port = process.env.RIDER_PORT || 3001;
app.use(express.static(new URL('.', import.meta.url).pathname));
app.listen(port, () => console.log(`Rider app on http://localhost:${port}`));
