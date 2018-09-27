import { Router } from 'express';
import { json, urlencoded } from 'body-parser';
import OrderController from '../../controllers/OrderController';

const router = new Router();


// Get all Orders
router.get('/', (req, res) => {
  OrderController.listAllOrders(req, res);
});

// Get one order by Id
router.get('/:id', (req, res) => {
  OrderController.fetchAnOrder(req, res);
});

// Add a new Order
router.post('/', (req, res) => {
  OrderController.placeAnOrder(req, res);
});

// Update an Order
router.put('/:id', (req, res) => {
  OrderController.updateAnOrderStatus(req, res);
});

// Delete an Order
router.delete('/:id', (req, res) => {
  OrderController.deleteAnOrder(req, res);
});

export default router;


// // orderRoute(orderRoute);
// // for parsing application/json
// orderRoute.use(json());

// // for parsing application/x-ww-form-urlencoded
// orderRoute.use(urlencoded({ extended: false }));


// orderRoute.route('/')

// /* Get all orders */

//   .get(OrderController.listAllOrders)
//   .post(OrderController.placeAnOrder);

// orderRoute.route('/:id')

// /* Fetch a specific Order */
//   .get(OrderController.fetchAnOrder)
//   .put(OrderController.updateAnOrderStatus)
//   .delete(OrderController.deleteAnOrder);


// export default orderRoute;
