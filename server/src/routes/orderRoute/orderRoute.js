import { Router } from 'express';
import { json, urlencoded } from 'body-parser';
import OrderController from '../../controllers/OrderController';

const orderRouter = Router();

// for parsing application/json
orderRouter.use(json());


// for parsing application/x-ww-form-urlencoded
orderRouter.use(urlencoded({ extended: false }));


orderRouter.route('/')

/* Get all orders */

  .get(OrderController.listAllOrders)
  .post(OrderController.placeAnOrder);

orderRouter.route('/:id')

/* Fetch a specific Order */
  .get(OrderController.fetchAnOrder)
  .put(OrderController.updateAnOrderStatus)
  .delete(OrderController.deleteAnOrder);


export default orderRouter;
