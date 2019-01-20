import pool from '../config/databaseConfig';
import { orderText, find, deleteOrder } from '../helpers/queryHelpers';


class OrderController {
  static listAllOrders(req, res) {
    // pool.query(findAllOrder('*', 'orders'), (err, response) => {
    // const userHistoryQuery = `SELECT o.order_id, o.mealitem,o.created_on, o.quantity, o.cost, o.status, u.user_id, u.lastname, u.firstname  FROM orders
    //  as o INNER JOIN users AS u ON o.user_id = u.user_id WHERE u.user_id = $1`;

    const value = `
    SELECT name, description, price, quantity, firstname, totalprice FROM menus INNER JOIN orders
        ON menus.id = orders.menuid INNER JOIN users ON orders.orderedby = users.id 
    `;

    pool.query(value, (err, response) => {
      if (err) {
        res.status(500).json('Could not establish database connection');
      } else if (response.rowCount > 0) {
        const result = response.rows;
        res.status(200).json({
          result,
          // status: 'Success',
          // message: 'Your Order',
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
    } = req.body;

    pool.query(find('*', 'menus', 'id', menuid), (err, response) => {
      if (err) {
        res.status(500).send('Could not establish database connection');
      } else {
        const results = response.rows[0];
        if (results) {
          pool.query(find('*', 'users', 'id', orderedby), (error, data) => {
            if (error) {
              res.status(500).send('Could not establish database connection');
            } else {
              const result = data.rows[0];
              if (result) {
                const totalprice = quantity * results.price;
                const values = [
                  menuid,
                  orderedby,
                  quantity,
                  totalprice,
                ];

                pool.query(orderText, values, (errMsg, order) => {
                  if (errMsg) {
                    return res.status(500).json({
                      message: 'Could not successfully create an Order',
                      error: errMsg.stack,
                    });
                  }
                  const ordered = order.rows[0];
                  return res.status(201).json({
                    ordered,
                    status: 'Success',
                    message: 'Order was successfully made',
                  });
                });
              } else {
                res.json({
                  status: 404,
                  message: 'User with the Id not found',
                });
              }
            }
          });
        } else {
          res.json({
            status: 404,
            message: 'Menu with the Id not found',
          });
        }
      }
    });
  }

  static fetchAnOrderByUser(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).send('User Id is Invalid');
    } else {
      const value = `
    SELECT name, description, price, quantity, totalprice FROM menus INNER JOIN orders
        ON menus.id = orders.menuid INNER JOIN users ON orders.orderedby = users.id WHERE orderedBy = ${id}
    `;
      // pool.query(find('*', 'orders', 'orderedBy', id), (err, data) => {
      pool.query(value, (err, data) => {
        if (err) {
          res.status(500).send('Could not establish database connection');
        } else {
          const result = data.rows;
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
            menuId,
            orderedby,
            quantity,
            totalprice,
          } = req.body;
          const values = [
            menuId,
            orderedby,
            quantity,
            totalprice,
          ];
          pool.query(`
            UPDATE orders SET menuId = $1, orderedby= $2, quantity = $3, totalprice = $4 WHERE id = ${id} returning *`, values, (error, responses) => {
            if (error) {
              res.status(500).send('Could not establish database connection');
            } else {
              const order = responses.rows[0];
              res.status(200).json({
                order,
                status: 'Success',
                message: 'Your Order',
              });
            }
          });
        } else {
          res.status(404).json({

            message: 'Order with the Id not found',
          });
        }
      }
    });
  }

  static adminUpdateOrder(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'Order Id is Invalid' });
    }
    pool.query(find('*', 'orders', 'id', id), (err, response) => {
      if (err) {
        res.status(500).send('Could not establish database connection');
      } else {
        const result = response.rows[0];
        if (result) {
          const {
            status,
          } = req.body;
          const orderStatus = status.toLowerCase();
          const values = [
            orderStatus,
          ];
          pool.query(`
            UPDATE orders SET status = $1 WHERE id = ${id} returning *`, values, (error, responses) => {
            if (error) {
              res.status(500).send('Could not establish database connection');
            } else {
              const order = responses.rows[0];
              res.status(200).json({
                order,
                status: 'Success',
                message: 'Your Order',
              });
            }
          });
        } else {
          res.status(404).json({

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
