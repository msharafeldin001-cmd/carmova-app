import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.example' });
const app = express();
const port = process.env.ADMIN_PORT || 3003;
app.use(express.static(new URL('.', import.meta.url).pathname));
app.listen(port, () => console.log(`Admin app on http://localhost:${port}`));
