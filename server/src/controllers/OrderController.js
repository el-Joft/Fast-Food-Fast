import database from '../data/index';
import { error, isValid } from '../helpers/helpers';

const { orders } = database;

class OrderController {
  static listAllOrders(req, res) {
    return res.status(200).json({
      AllOrders: orders,
      status: 'Success',
      message: 'All orders',
    });
  }

  static placeAnOrder(req, res) {
    const {
      menuId,
      timeOrdered,
      dateOrdered,
      orderedBy,
      quantity,
      totalPrice,
    } = req.body;

    const { statusCode, errMsg } = isValid(req.body);
    if (!errMsg) {
      // Check if the id of the menu and the User is a Number

      const foodId = parseInt(req.body.menuId, 10);

      const userId = parseInt(req.body.orderedBy, 10);
      /* Check if id is a Not a number */
      /* Check if id is  a Not a number */

      if (isNaN(foodId)) {
        return error(res, 400, 'Menu is invalid');
      }
      if (isNaN(userId)) {
        return error(res, 400, 'User is not Valid');
      }

      const ItemOrdered = {
        id: orders.length + 1,
        menuId,
        timeOrdered,
        dateOrdered,
        orderedBy,
        quantity,
        totalPrice,
      };
      orders.push(ItemOrdered);
      return res.status(200).json({
        order: orders,
        status: 'Success',
        message: 'Order was successfully made',
      });
    }
    return error(res, statusCode, errMsg);
  }

  static fetchAnOrder(req, res) {
    const orderId = req.params.id;
    // const parsedId = parsedInt(orderId);
    /* Check if id is  a Not a number */
    const orderInt = parseInt(orderId, 10);
    if (isNaN(orderInt)) {
      return error(res, 400, 'Order Id is invalid');
    }
    // Look up if it exists or not
    const order = orders.find(order => order.id === orderInt);

    if (!order) return res.status(404).send('The order with the given ID was not found');// return 404
    return res.status(200).json({
      order,
      status: 'Success',
      message: 'Your Order',
    });
  }

  static updateAnOrderStatus(req, res) {
    const { statusCode, errMsg } = isValid(req.body);
    if (!errMsg) {
      const orderId = req.params.id;
      const parsedId = parseInt(orderId, 10);
      /* Check if id is a Not a number */
      if (isNaN(parsedId)) {
        return error(res, 400, 'Order Id is invalid');
      }

      // const orderIndex = orders.indexOf(order => order.id === parseInt(req.params.orderId, 10));
      // Look up if it exists or not
      const order = orders.find(order => order.id === parseInt(req.params.id, 10));

      if (!order) return res.status(404).send('The order with the given ID was not found');// return 404

      // Update the Order
      order.menuId = req.body.menuId;
      order.timeOrdered = req.body.timeOrdered;
      order.dateOrdered = req.body.dateOrdered;
      order.orderedBy = req.body.orderedBy;
      order.quantity = req.body.quantity;
      order.totalPrice = req.body.totalPrice;

      return res.status(200).json({
        order,
        status: 'Success',
        message: 'Order updated successfully',
      });
    }
    return error(res, statusCode, errMsg);
  }

  static deleteAnOrder(req, res) {
    const order = orders.find(order => order.id === parseInt(req.params.id, 10));
    // Not existing, return 404
    if (!order) return res.status(404).send('The Order with the given ID was not found');// return  404
    // Delete
    const index = orders.indexOf(order);
    orders.splice(index, 1);
    // Return the course
    return res.status(200).json({
      order,
      status: 'Success',
      message: 'Order Deleted Successfully',
    });
  }
}


export default OrderController;
