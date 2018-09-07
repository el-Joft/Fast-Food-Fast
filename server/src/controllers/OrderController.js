import database from '../data/index';
import { error, parsedInt, isValid } from '../helpers/helpers';

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
      
      const foodId = parsedInt(req.body.menuId);

      const userId = parsedInt(req.body.orderedBy);
      /* Check if id is a Not a number */
      /* Check if id is  a Not a number */
      
      if (!(Number.isInteger(foodId))) {
        return error(res, 400, 'Menu is invalid');
      }
      if (!(Number.isInteger(userId))) {
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
    const parsedId = parsedInt(orderId);
    /* Check if id is  a Not a number */
    if (!(Number.isInteger(parsedId))) {
      return error(res, 400, 'Order Id is invalid');
    }
    // Look up if it exists or not
    const order = orders.find(order => order.id === parsedId);

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
      const parsedId = parsedInt(orderId);
      /* Check if id is a Not a number */
      if (!(Number.isInteger(parsedId))) {
        return error(res, 400, 'Order Id is invalid');
      }

      // const orderIndex = orders.indexOf(order => order.id === parseInt(req.params.orderId, 10));
      // Look up if it exists or not
      const order = orders.find(order => order.id === parsedInt(req.params.id));
   
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

  
}


export default OrderController;
