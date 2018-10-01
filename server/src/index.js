import express from 'express';
import { urlencoded, json } from 'body-parser';
import Routes from './routes/index';
// import pool from './config/databaseConfig';


const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

// app.use('/api/v1/orders', orderRoutes);
// app.use('/api/v1/menus', menuRoute);

Routes(app);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});


const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log(`Application started on Port ${Port}`));

export default app;
