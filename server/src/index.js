import express from 'express';
import { urlencoded, json } from 'body-parser';
import Routes from './routes/index';

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

// app.use('/api/v1/orders', orderRoutes);
// app.use('/api/v1/menus', menuRoute);

Routes(app);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to fast food fast' });
});

const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log(`Application started on Port ${Port}`));

export default app;
