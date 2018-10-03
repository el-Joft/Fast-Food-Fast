import pool from '../config/databaseConfig';
import { orderText } from '../helpers/queryHelpers';


class OrderController {
  static listAllOrders(req, res) {
    // pool.query(findAllOrder('*', 'orders'), (err, response) => {
    pool.query(('SELECT * FROM orders'), (err, response) => {
      if (err) {
        res.status(500).send('Could not establish database connection');
      } else {
        const result = response.rows[0];
        if (result) {
          res.json({
            result,
            status: 'Success',
            message: 'Your Order',
          });
        } else {
          res.json({
            result,
            status: 404,
            message: 'Order Not Found',
          });
        }
      }
    });
  }

  static placeAnOrder(req, res) {
    const {
      menuId,
      orderedBy,
      quantity,
      totalPrice,
    } = req.body;

    const values = [
      menuId,
      orderedBy,
      quantity,
      totalPrice,
    ];

    // callback
    pool.query(orderText, values, (err, response) => {
      if (err) {
        console.log(err.stack);
        res.status(500).json({
          message: 'Could not successfully create an Order',
          error: err.stack,
        });
      } else {
        const result = response.rows[0];
        res.json({
          result,
          status: 'Success',
          message: 'Order was successfully made',
        });
      }
    });
  }

  static fetchAnOrder(req, res) {}

  static updateAnOrderStatus(req, res) {}

  static deleteAnOrder(req, res) {}
}


export default OrderController;
