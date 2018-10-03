import pool from '../config/databaseConfig';


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

  static placeAnOrder(req, res) {}

  static fetchAnOrder(req, res) {}

  static updateAnOrderStatus(req, res) {}

  static deleteAnOrder(req, res) {}
}


export default OrderController;
