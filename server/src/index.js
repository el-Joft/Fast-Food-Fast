import express from 'express';
import { urlencoded, json } from 'body-parser';
import orderRoute from './routes/orderRoute/orderRoute';
import menuRoute from './routes/menuRoute/menuRoute';


const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/menus', menuRoute);


app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to fast food fast' });
});

const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log(`Application started on Port ${Port}`));

export default app;
