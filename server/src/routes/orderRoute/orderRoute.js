import express from 'express';
import { json, urlencoded } from 'body-parser';
import OrderController from '../../controllers/OrderController';

const orderRoute = express();


// orderRoute(orderRoute);
// for parsing application/json
orderRoute.use(json());

// for parsing application/x-ww-form-urlencoded
orderRoute.use(urlencoded({ extended: false }));


orderRoute.route('/')

/* Get all orders */

  .get(OrderController.listAllOrders)
  .post(OrderController.placeAnOrder);

orderRoute.route('/:id')

/* Fetch a specific Order */
  .get(OrderController.fetchAnOrder)
  .put(OrderController.updateAnOrderStatus)
  .delete(OrderController.deleteAnOrder);


export default orderRoute;
