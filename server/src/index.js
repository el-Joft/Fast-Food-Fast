import express from 'express';
import { urlencoded, json } from 'body-parser';
import path from 'path';
import cors from 'cors';
import Routes from './routes/index';
// import pool from './config/databaseConfig';


const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

// app.use('/api/v1/orders', orderRoutes);
// app.use('/api/v1/menus', menuRoute);
/* Connect static files */
app.use(express.static(path.resolve(__dirname, '../../frontend/')));

app.use(cors());
// app.get('/', (req, res) => res.sendFile('../../frontend/index.html'));

app.get('/', (req, res) => res.sendFile(path.resolve(`${app.get('appPath')}../../frontend/`)));

Routes(app);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});


const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log(`Application started on Port ${Port}`));

export default app;
