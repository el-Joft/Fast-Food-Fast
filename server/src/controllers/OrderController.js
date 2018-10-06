import pool from '../config/databaseConfig';
import { orderText, find, deleteOrder } from '../helpers/queryHelpers';


class OrderController {
  static listAllOrders(req, res) {
    // pool.query(findAllOrder('*', 'orders'), (err, response) => {
    pool.query(('SELECT * FROM orders'), (err, response) => {
      if (err) {
        res.status(500).json('Could not establish database connection');
      } else if (response.rowCount > 0) {
        const result = response.row;
        res.status(200).json({
          result,
          status: 'Success',
          message: 'Your Order',
        });
      } else {
        res.status(404).json({
          message: 'Order Not Found',
        });
      }
    });
  }

  static placeAnOrder(req, res) {
    const {
      menuid,
      orderedby,
      quantity,
      totalprice,
    } = req.body;

    const values = [
      menuid,
      orderedby,
      quantity,
      totalprice,
    ];

    // callback
    pool.query(orderText, values, (err, response) => {
      if (err) {
        console.log(err.stack);
        return res.status(500).json({
          message: 'Could not successfully create an Order',
          error: err.stack,
        });
      }
      const result = response.rows[0];
      return res.status(201).json({
        result,
        status: 'Success',
        message: 'Order was successfully made',
      });
    });
  }

  static fetchAnOrderByUser(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).send('User Id is Invalid');
    } else {
      pool.query(find('*', 'orders', 'orderedBy', id), (err, data) => {
        if (err) {
          res.status(500).send('Could not establish database connection');
        } else {
          const result = data.rows[0];
          if (result) {
            res.status(200).json({
              result,
              status: 'Success',
              message: 'Your Order',
            });
          } else {
            res.status(404).json({
              // status: 404,
              message: 'Order with the User Id not found',
            });
          }
        }
      });
    }
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
            res.status(200).json({
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
    }
    pool.query(find('*', 'orders', 'id', id), (err, response) => {
      if (err) {
        res.status(500).send('Could not establish database connection');
      } else {
        const result = response.rows[0];
        if (result) {
          const {
            menuid,
            orderedby,
            quantity,
            totalprice,
          } = req.body;
          const values = [
            menuid,
            orderedby,
            quantity,
            totalprice,
          ];
          pool.query(`
            UPDATE orders SET menuid = $1, orderedby= $2, quantity = $3, totalprice = $4 WHERE id = ${id} RETURNING *`, values, (error, responses) => {
            if (error) {
              return res.status(500).send('Could not establish database connection');
            }
            const order = responses.rows[0];
            return res.status(200).json({
              order,
              status: 'Success',
              message: 'Your Order',
            });
          });
        } else {
          return res.status(404).json({

            message: 'Order with the Id not found',
          });
        }
      }
    });
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
