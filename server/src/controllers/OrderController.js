import pool from '../config/databaseConfig';
import { orderText, find, deleteOrder } from '../helpers/queryHelpers';


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

  static fetchAnOrder(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'Order Id is Invalid' });
    } else {
      pool.query(find('*', 'orders', 'id', id), (err, response) => {
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
            res.status(404).json({
              // status: 404,
              message: 'Order with the Id not found',
            });
          }
        }
      });
    }
  }

  static updateAnOrderStatus(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'User Id is Invalid' });
    } else {
      pool.query(find('*', 'orders', 'id', id), (err, response) => {
        if (err) {
          res.status(500).send('Could not establish database connection');
        } else {
          const result = response.rows[0];
          if (result) {
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
            pool.query(`
            UPDATE orders SET menuId = $1, orderedBy= $2, quantity = $3, totalPrice = $4 WHERE id = ${id} returning *`, values, (err, responses) => {
              if (err) {
                res.status(500).send('Could not establish database connection');
              } else {
                const order = responses.rows[0];
                res.json({
                  order,
                  status: 'Success',
                  message: 'Your Order',
                });
              }
            });
          } else {
            res.status(404).json({
              // status: 404,
              message: 'Order with the Id not found',
            });
          }
        }
      });
    }
  }

  static deleteAnOrder(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'OrderId is Invalid' });
    } else {
      pool.query(find('*', 'orders', 'id', id), (err, response) => {
        if (err) {
          res.status(500).send('Could not establish database connection');
        } else {
          const result = response.rows[0];
          if (result) {
            pool.query(deleteOrder(id, 'orders'), (error, responses) => {
              if (error) {
                res.status(500).send('Could not establish database connection');
              } else {
                const order = responses.rows[0];
                res.status(200).json({
                  order,
                  status: 'Success',
                  message: 'Deleted',
                });
              }
            });
          } else {
            res.status(404).json({
              message: 'Order does not exist',
            });
          }
        }
      });
    }
  }
}


export default OrderController;
