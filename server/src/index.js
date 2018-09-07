import express from 'express';
import { urlencoded, json } from 'body-parser';
import orderRoute from './routes/orderRoute/orderRoute';
import menuRoute from './routes/menuRoute/menuRoute';


const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/menus', menuRoute);

// app.get('/', (req, res) => res.send('Hello World!'));
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

export default app;
